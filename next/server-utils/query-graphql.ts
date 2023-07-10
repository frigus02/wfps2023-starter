import {App} from "octokit";
//import getConfig from 'next/config'
import fs from 'fs';

function requireEnv(key: string): string {
  const value = process.env[key];
  if (value == null) {
    throw new Error(`Missing ${key} env var. Did you create a .env file?`);
  }

  return value;
}

function loadGithubAppKey() {
  return fs.readFileSync(".env.private-key.pem", "utf8");
}

interface QueryVariables {
  [name: string]: unknown;
}

interface GitHubInfo {
  appConfig: {
    appId: string,
    privateKey: string,
    oauth: {
      clientId: string,
      clientSecret: string,
    },
  },
  installationId: number,
  repoConfig: {
    repoOwner: string,
    repoName: string,
  },
}

function getGithubInfo(): GitHubInfo {
  return {
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
  };
}

export async function queryGraphql(
  query: string,
  variables?: QueryVariables,
): Promise<unknown> {
  const github = getGithubInfo();

  const app = new App(github.appConfig);
  const octokit = await app.getInstallationOctokit(github.installationId);

  return await octokit.graphql(
    query,
    Object.assign(
      {
        repoOwner: github.repoConfig.repoOwner,
        repoName: github.repoConfig.repoName,
      },
      variables,
    ),
  );
}
