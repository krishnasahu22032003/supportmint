import { cookies } from "next/headers";
import { scalekitConfig } from "./scaleKit";

export async function getSession() {

    const session = await cookies();
    const token = session.get("access_token")?.value;

    if (!token) {
        return null
    };

    try {
        const result: any = await scalekitConfig.validateToken(token)
        const user = await scalekitConfig.user.getUser(result.sub)
        return user
    } catch (error) {
        console.log(error)
    };

};