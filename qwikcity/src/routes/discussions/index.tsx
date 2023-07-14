import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { getDiscussionList } from "~/lib/github/discussions";

export const useDiscussions = routeLoader$(async () => getDiscussionList());

export default component$(() => {
  const discussions = useDiscussions();

  return (
    <main>
      <h1>Discussions</h1>
      <ul>
        {discussions.value.map((d) => (
          <li key={d.number}>
            <Link href={"/discussions/" + d.number}>{d.title}</Link> by{" "}
            {d.author}, created: {d.createdAt}
          </li>
        ))}
      </ul>
    </main>
  );
});
