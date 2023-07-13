# Web Framework Perspective Summit 2023 - Starter kits

## Instruction regarding creating a Github app for fetching repo discussions
Create a GitHub app and install it on the repository. This has to be done by the repo owner but only has to happen once.

  - Open https://github.com/settings/apps/new
  - Enter the following settings:
    - Github App name: Your choice but inlude "(local dev)" for clarity.
    - Homepage URL: http://localhost:1234 (1234 can be replaced by your dev server port number, e.g., 3000 for Next, but it ain't important really ...)
    - Callback URL: http://localhost:1234/oauth/callback
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
