import { Session } from "../../models/session_model";
import { User } from "../../models/user_model";

export default async function getAuthenticatedUser(sessionId: string) {
  const session = (await Session.select({ token: { equal: sessionId } }))[0];
  return (
    await User.select({
      id: {
        equal: session.userId,
      },
    })
  )[0];
}
