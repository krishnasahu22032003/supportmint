import "dotenv/config";

const ENV_SECRETS = {

    SCALEKIT_ENVIRONMENT_URL: process.env.SCALEKIT_ENVIRONMENT_URL,
    SCALEKIT_CLIENT_ID: process.env.SCALEKIT_CLIENT_ID,
    SCALEKIT_CLIENT_SECRET: process.env.SCALEKIT_CLIENT_SECRET,
    BASE_URL:process.env.NEXT_BASE_URL,
    NODE:process.env.NODE_ENV,
    MONGO_URL:process.env.MONGO_URL,
    GEMINI_KEY:process.env.GEMINI_API_KEY

};

export default ENV_SECRETS; 