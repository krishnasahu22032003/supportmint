import { cookies } from "next/headers";
import { getScalekit } from "./scaleKit";

export async function getSession() {
  const cookieStore = await cookies();
 const scalekit = getScalekit();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const result: any = await scalekit.validateToken(token);

    const response = await scalekit.user.getUser(result.sub);

    if (!response.user) {
      return null;
    }

    return {
      id: response.user.id,
      email: response.user.email,
      name: response.user.userProfile?.name ?? "",
      firstName: response.user.userProfile?.givenName ?? "",
      lastName: response.user.userProfile?.familyName ?? "",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}