import { readFileSync } from "node:fs";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (value == null) {
    throw new Error(`Missing ${key} env var. Did you create a .env file?`);
  }

  return value;
}

function loadGithubAppKey() {
  return readFileSync(".env.private-key.pem", "utf8");
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    github: {
      appConfig: {
        appId: requireEnv("GITHUB_APP_ID"),
        privateKey: loadGithubAppKey(),
        oauth: {
          clientId: requireEnv("GITHUB_CLIENT_ID"),
          clientSecret: requireEnv("GITHUB_CLIENT_SECRET"),
        },
      },
      installationId: Number(requireEnv("GITHUB_INSTALLATION_ID")),
      repoConfig: {
        repoOwner: requireEnv("GITHUB_REPO_OWNER"),
        repoName: requireEnv("GITHUB_REPO_NAME"),
      },
    },
  },
});
