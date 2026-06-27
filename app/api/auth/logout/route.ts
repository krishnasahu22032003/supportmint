import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { scalekitConfig } from "@/lib/scaleKit";
import ENV_SECRETS from "@/lib/ENV";

export async function GET() {
    const cookieStore = await cookies();

    // Get the ID token BEFORE deleting it
    
    const idToken = cookieStore.get("id_token")?.value;

    const postLogoutRedirectUri = `${ENV_SECRETS.BASE_URL}`;

    const logoutUrl = scalekitConfig.getLogoutUrl({
        idTokenHint: idToken,
        postLogoutRedirectUri,
    });
    console.log(logoutUrl)
    const response = NextResponse.redirect(logoutUrl);

    response.cookies.delete("access_token");
    response.cookies.delete("id_token");
    response.cookies.delete("refresh_token");

    return response;
}