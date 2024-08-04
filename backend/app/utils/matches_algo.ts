import { UserDto } from "../dtos/user_dto";
import { User } from "../models/user_model";
import { getGPSDistance } from "./getGPSDistance";

interface UserAlgoData {
  user: UserDto;
  score: number;
}

const INTERESTS_WEIGHT = 50;
const DISTANCE_WEIGHT = 50;
const FAME_RATING_WEIGHT = 50;

export function matchesAlgorithm(authUser: User, userDtos: UserDto[]) {
  const userAlgoDatas: UserAlgoData[] = userDtos.map((user) => {
    return {
      user,
      score: 0,
    };
  });

  userAlgoDatas.forEach((userAlgoData) => {
    authUser.interests.forEach((interest) => {
      if (userAlgoData.user.interests?.includes(interest)) {
        userAlgoData.score += INTERESTS_WEIGHT;
      }
    });

    if (userAlgoData.user.geolocation) {
      const distance = getGPSDistance(
        authUser.geolocation,
        userAlgoData.user.geolocation
      );
      userAlgoData.score += DISTANCE_WEIGHT - distance / 1000;
    }

    if (userAlgoData.user.fame_rating) {
      userAlgoData.score += userAlgoData.user.fame_rating * FAME_RATING_WEIGHT;
    }
  });

  // This is a placeholder for the actual algorithm
  return userAlgoDatas
    .sort((a, b) => b.score - a.score)
    .map((userAlgoData) => userAlgoData.user);
}
