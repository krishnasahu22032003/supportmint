import ENV_SECRETS from "./ENV";
import { Scalekit } from "@scalekit-sdk/node";

export const scalekitConfig = new Scalekit(

    ENV_SECRETS.SCALEKIT_ENVIRONMENT_URL as string,
    ENV_SECRETS.SCALEKIT_CLIENT_ID as string,
    ENV_SECRETS.SCALEKIT_CLIENT_SECRET as string
) ;


