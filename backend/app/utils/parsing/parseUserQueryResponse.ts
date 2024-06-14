import { UserDto } from "../../dtos/user_dto";
import { APIResponse } from "../../libs/orm/types/response_type";
import { UserDtoArrayAsString } from "../../models/user_model";

export function parseUserQueryResponse(
  queryResponse: APIResponse<UserDtoArrayAsString>
): UserDto[] {
  const userDtosAsString: UserDtoArrayAsString[] = queryResponse.rows;
  const userDtos: UserDto[] = userDtosAsString.map((userDtoAsString) => {
    return {
      ...userDtoAsString,
      interests: userDtoAsString.interests
        ? JSON.parse(userDtoAsString.interests)
        : [],
      pictures: userDtoAsString.pictures
        ? JSON.parse(userDtoAsString.pictures)
        : [],
    };
  });
  return userDtos;
}
