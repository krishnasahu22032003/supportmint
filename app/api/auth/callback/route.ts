import ENV_SECRETS from "@/lib/ENV";
import { scalekitConfig } from "@/lib/scaleKit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    const redirectUri = `${ENV_SECRETS.BASE_URL}/api/auth/callback`;

    if (!code) {
        return NextResponse.json({ message: "code is not found" }, { status: 400 });
    }

    const session = await scalekitConfig.authenticateWithCode(code, redirectUri);

    console.log(session)
    const response = NextResponse.redirect(`${ENV_SECRETS.BASE_URL}/dashboard`);

    response.cookies.set("access_token", session.accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        path: "/"
    });

    return response ;
}