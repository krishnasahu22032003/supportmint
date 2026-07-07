import { Scalekit } from "@scalekit-sdk/node";
import { getEnv } from "./ENV";

let scalekit: Scalekit | null = null;

export function getScalekit() {
  if (!scalekit) {
    scalekit = new Scalekit(
      getEnv("SCALEKIT_ENVIRONMENT_URL"),
      getEnv("SCALEKIT_CLIENT_ID"),
      getEnv("SCALEKIT_CLIENT_SECRET")
    );
  }

  return scalekit;
}