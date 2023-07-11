import {For} from "solid-js";
import {A, Title, useRouteData} from "solid-start";
import {createServerData$} from "solid-start/server";
import {loadDiscussionsList} from "~/lib/github/discussions";

export function routeData() {
  return createServerData$(() => loadDiscussionsList());
}

export default function Discussions() {
  const discussions = useRouteData<typeof routeData>();
  return (
    <main>
      <Title>Discussions</Title>
      <h1>Discussions</h1>
      <ul>
      <For each={discussions()}>
        {(d) => <li><A href={"/discussions/" + d.id}>{d.title}</A> by {d.by}, created: {d.time}</li>}
      </For>
      </ul>
    </main>
  );
}
