import { connect } from "mongoose";
import ENV_SECRETS from "./ENV";

const mongo_url = ENV_SECRETS.MONGO_URL ;

if(!mongo_url){
    console.error("Mongo Url error");
};

const cache = global.mongoose