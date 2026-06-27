
import ENV_SECRETS from "@/lib/ENV";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {

   const cookieStore=await cookies();
   cookieStore.delete("access_token");
   return NextResponse.redirect(`${ENV_SECRETS.BASE_URL}`);

};