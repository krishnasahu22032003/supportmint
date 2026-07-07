import { getEnv } from "@/lib/ENV";
import { getScalekit } from "@/lib/scaleKit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const scalekit = getScalekit();
    const redirectUri = `${getEnv("NEXT_PUBLIC_API_URL")}/api/auth/callback`;

    if (!code) {
        return NextResponse.json({ message: "code is not found" }, { status: 400 });
    }

    const session = await scalekit.authenticateWithCode(code, redirectUri);

    const response = NextResponse.redirect(`${getEnv("NEXT_PUBLIC_API_URL")}/dashboard`)

    response.cookies.set("access_token", session.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        path: "/"
    });

    response.cookies.set("id_token", session.idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    return response;
}