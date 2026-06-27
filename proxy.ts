import ENV_SECRETS from "./lib/ENV";
import { getSession } from "./lib/getSession";
import { NextRequest , NextResponse } from "next/server";

export const proxy = async (req:NextRequest) => {

const session = await getSession();

if(!session){

    return NextResponse.redirect(`${ENV_SECRETS.BASE_URL}`);

};

return NextResponse.next();

};

export const config = {

      matcher: '/dashboard/:path*',
};