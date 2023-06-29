# WPFS 2023 SvelteKit starter kit

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

Extended by your friendly Web Framework Perspective Summit team.

## Developing

Prerequisites:

- Install dependencies: `npm install`

- Create a GitHub personal access token:

  - Open https://github.com/settings/tokens?type=beta
  - Create token for your repository only, with scopes "Discussions: read-only".

- Create a `.env` file with the content:

  ```
  GITHUB_TOKEN=your_personal_access_token
  ```

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
