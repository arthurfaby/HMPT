import { Session } from "../../models/session_model";
import { User } from "../../models/user_model";

export default async function getAuthenticatedUser(
  sessionId: string
): Promise<User | null> {
  const session = (await Session.select({ token: { equal: sessionId } }))[0];

  if (!session) return null;

  const user = (
    await User.select({
      id: {
        equal: session.userId,
      },
    })
  )[0];

  if (!user) return null;

  return user;
}
