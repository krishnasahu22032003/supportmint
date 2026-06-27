import ENV_SECRETS from "@/lib/ENV";
import { scalekitConfig } from "@/lib/scaleKit";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {

    const redirectUri=`${ENV_SECRETS.BASE_URL}/api/auth/callback`
    const url=scalekitConfig.getAuthorizationUrl(redirectUri)
    return NextResponse.redirect(url)

};