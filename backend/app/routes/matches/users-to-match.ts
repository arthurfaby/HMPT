import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import query from "../../libs/orm/queries/abstract_query";
import { UserDtoArrayAsString } from "../../models/user_model";
import { parseUserQueryResponse } from "../../utils/parsing/parseUserQueryResponse";
import { matchesAlgorithm } from "../../utils/matches_algo";
import { Preference } from "../../models/preference_model";
import { getGPSDistance } from "../../utils/getGPSDistance";

const router = Router();

router.get("/usersToMatch/:sort?", async (req: Request, res: Response) => {
  const authUser = await getAuthenticatedUser(req.sessionID);
  if (!authUser || !authUser.id) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  const preference: Preference | null = (
    await Preference.select({
      user_id: { equal: authUser.id },
    })
  )[0];

  if (!preference) {
    return res.status(400).send({
      error: "Preference not found",
    });
  }

  let filterGender: string = "";
  if (preference.sexualPreference === "bisexual") {
    filterGender = "male OR female";
  } else if (preference.sexualPreference === "heterosexual") {
    filterGender = authUser.gender;
  } else {
    filterGender = "nopreference";
  }

  const queryResponse = await query<UserDtoArrayAsString>(
    `
  SELECT *
  FROM users u
  WHERE
      u.id != $1
      AND u.id NOT IN (
          SELECT liked_id
          FROM matches
          WHERE
              liker_id = $2
      )
      AND u.id NOT IN (
          SELECT disliked_id
          FROM dislikes
          WHERE
              disliker_id = $3
      )
      AND u.id NOT IN (
          SELECT reported_id
          FROM reports
          WHERE
              reporter_id = $4
      )
      AND u.id NOT IN (
          SELECT blocked_id
          FROM blocks
          WHERE
              blocker_id = $5
      )
      AND u.verified = true
      AND u.gender != $6
      AND u.age >= $7
      AND u.age <= $8
      AND u.fame_rating >= $9
      AND u.fame_rating <= $10
  `,
    [
      authUser.id,
      authUser.id,
      authUser.id,
      authUser.id,
      authUser.id,
      filterGender,
      preference.ageGapMin,
      preference.ageGapMax,
      preference.fameRatingMin,
      preference.fameRatingMax,
    ]
  );
  const userDtos = parseUserQueryResponse(queryResponse);
  const userDtosInDistance = userDtos.filter((userDto) => {
    if (!authUser.geolocation || !userDto.geolocation) return false;
    const distance = getGPSDistance(authUser.geolocation, userDto.geolocation);
    return distance/1000 <= preference.distance;
  });
  const sortedUserDtos = matchesAlgorithm(authUser, userDtosInDistance);
  const sortOption: string | undefined = req.params.sort;
  if (sortOption === "distance_asc" || sortOption === "distance_desc") {
    sortedUserDtos.sort((a, b) => {
      if (!authUser.geolocation || !a.geolocation || !b.geolocation) return 0;
      const distanceA = getGPSDistance(authUser.geolocation, a.geolocation);
      const distanceB = getGPSDistance(authUser.geolocation, b.geolocation);
      return sortOption === "distance_desc"
        ? distanceB - distanceA
        : distanceA - distanceB;
    });
  } else if (sortOption === "age_asc" || sortOption === "age_desc") {
    sortedUserDtos.sort((a, b) =>
      sortOption === "age_asc" ? a.age! - b.age! : b.age! - a.age!
    );
  } else if (
    sortOption === "fame_rating_asc" ||
    sortOption === "fame_rating_desc"
  ) {
    sortedUserDtos.sort((a, b) =>
      sortOption === "fame_rating_asc"
        ? b.fame_rating! - a.fame_rating!
        : a.fame_rating! - b.fame_rating!
    );
  }

  return res.json(sortedUserDtos);
});

export default router;
