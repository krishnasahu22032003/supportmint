import { getEnv } from "@/lib/ENV";
import { getScalekit } from "@/lib/scaleKit";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const scalekit = getScalekit();

   const redirectUri = `${getEnv("NEXT_PUBLIC_API_URL")}/api/auth/callback`;
    const url=scalekit.getAuthorizationUrl(redirectUri)
    return NextResponse.redirect(url)

};