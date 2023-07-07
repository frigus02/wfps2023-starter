import { App } from "octokit";

export interface QueryVariables {
  [name: string]: unknown;
}

async function queryGraphQl(
  query: string,
  variables?: QueryVariables,
): Promise<unknown> {
  const { github } = useRuntimeConfig();

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

export async function useGraphql(
  query: string,
  variables?: QueryVariables,
): Promise<unknown> {
  const { github } = useRuntimeConfig();

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
