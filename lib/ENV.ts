import "dotenv/config";

const ENV_SECRETS = {

    SCALEKIT_ENVIRONMENT_UR: process.env.SCALEKIT_ENVIRONMENT_URL,
    SCALEKIT_CLIENT_ID: process.env.SCALEKIT_CLIENT_ID,
    SCALEKIT_CLIENT_SECRET: process.env.SCALEKIT_CLIENT_SECRET

};

export default ENV_SECRETS; 