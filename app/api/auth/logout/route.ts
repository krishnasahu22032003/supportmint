import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getScalekit } from "@/lib/scaleKit";
import { getEnv } from "@/lib/ENV";

export async function GET() {
    const cookieStore = await cookies();
      const scalekit = getScalekit();
    // Get the ID token BEFORE deleting it
    
    const idToken = cookieStore.get("id_token")?.value;

   const postLogoutRedirectUri = getEnv("NEXT_PUBLIC_API_URL");

    const logoutUrl = scalekit.getLogoutUrl({
        idTokenHint: idToken,
        postLogoutRedirectUri,
    });
    const response = NextResponse.redirect(logoutUrl);

    response.cookies.delete("access_token");
    response.cookies.delete("id_token");
    response.cookies.delete("refresh_token");

    return response;
}