# WPFS 2023 SvelteKit starter kit

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

Extended by your friendly Web Framework Perspective Summit team.

## Developing

Prerequisites:

- Install dependencies: `npm install`

- Create a GitHub app and install it on the repository. This has to be done by
  the repo owner but only has to happen once.

  - Open https://github.com/settings/apps/new
  - Enter the following settings:
    - Github App name: Your choice but inlude "(local dev)" for clarity.
    - Homepage URL: http://localhost:5173
    - Callback URL: http://localhost:5173/oauth/callback
    - Uncheck "Active" under "Webhook".
    - Under "Permissions", expand "Repository permissions". Check "Read-only"
      for "Discussions".
    - For the other options, leaving the defaults should be enough.
  - Once the app is installed, use "Install App" to add it to your team's repo.
    You'll find a numeric "installation id" in the URL.
  - Share the app id and the client id with your team members.
  - Each team member will also need a private key and a client secrets. Note
    that these cannot be accessed in the UI later. Copy them immediately.

- Create a `.env` file with the content:

  ```
  GITHUB_REPO_OWNER=frigus02
  GITHUB_REPO_NAME=wpfs2023-starter

  GITHUB_CLIENT_ID="Client ID"
  GITHUB_APP_ID="App ID"
  GITHUB_INSTALLATION_ID="Installation id for this repo"
  GITHUB_CLIENT_SECRET="Client secret"
  ```

- Copy the private key to `.env.private-key.pem`.

The repo owner needs to create the application but can generate keys and secrets
for each team member. For deployment, create an app with similar settings but
include "(prod)" in the name and adjust the URLs accordingly. You can also add
multiple callback URLs if you want to try multiple rollout stages.

Start a development server:

```bash
npm run dev

# if you're developing via SSH and want to open the  site locally
npm run dev -- --host

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## More

Check out the npm scripts in the package.json for more on:

- Formatting (with Prettier)
- Linting (with ESLint)
- Unit testing (with Vitest)
- Browser testing (with Playwright)
