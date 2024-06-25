import { UserDto } from "../../dtos/user_dto";
import { APIResponse } from "../../libs/orm/types/response_type";
import { UserDtoArrayAsString } from "../../models/user_model";

export function parseUserQueryResponse(
  queryResponse: APIResponse<UserDtoArrayAsString>
): UserDto[] {
  const userDtosAsString: UserDtoArrayAsString[] = queryResponse.rows;
  const userDtos: UserDto[] = userDtosAsString.map((userDtoAsString) => {
    const interestsAsArray = userDtoAsString.interests
      ? userDtoAsString.interests.replace(/{/g, "[").replace(/}/g, "]")
      : "[]";
    const picturesAsArray = userDtoAsString.pictures
      ? userDtoAsString.pictures.replace(/{/g, "[").replace(/}/g, "]")
      : "[]";
    return {
      ...userDtoAsString,
      interests: JSON.parse(interestsAsArray),
      pictures: JSON.parse(picturesAsArray),
    };
  });
  return userDtos;
}
