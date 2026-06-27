import { cookies } from "next/headers";
import { scalekitConfig } from "./scaleKit";

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const result: any = await scalekitConfig.validateToken(token);

    const response = await scalekitConfig.user.getUser(result.sub);

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