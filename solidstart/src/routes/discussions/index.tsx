import {createResource, For} from "solid-js";
import {A, Title, useRouteData} from "solid-start";

export function routeData() {
  const [discussions] = createResource(async () => {
    const response = await Promise.resolve([{
      id: 1,
      title: 'Title 1',
      by: 'Anonymous'
    }]);
    return response;
  });
  return {discussions};
}

export default function Discussions() {
  const { discussions } = useRouteData<typeof routeData>();
  return (
    <main>
      <Title>Discussions</Title>
      <h1>Discussions</h1>
      <ul>
      <For each={discussions()}>
        {(d) => <li><A href={"/discussions/" + d.id}>{d.title}</A> by {d.by}</li>}
      </For>
      </ul>
    </main>
  );
}
