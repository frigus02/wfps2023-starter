import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import AddReaction from "~/components/discussions/AddReaction";
import {
  REACTION_EMOJI,
  getDiscussionComments,
  getDiscussionDetails,
} from "~/lib/github/discussions";

export const useDiscussion = routeLoader$(async (requestEvent) =>
  getDiscussionDetails(Number(requestEvent.params.id))
);
export const useComments = routeLoader$(async (requestEvent) =>
  getDiscussionComments(Number(requestEvent.params.id))
);

export default component$(() => {
  const discussion = useDiscussion();
  const comments = useComments();

  return (
    <>
      <section>
        <h1>{discussion.value.title}</h1>
        <p>
          by {discussion.value.author} on {discussion.value.createdAt}
        </p>
        <div dangerouslySetInnerHTML={discussion.value.bodyHTML} />
        <div class="reactions">
          {discussion.value.reactionGroups.map((group) => (
            <button disabled>
              {REACTION_EMOJI[group.content]}
              {group.totalCount}
            </button>
          ))}
          <AddReaction />
        </div>
        <div class="comments">
          <h2>Comments</h2>
          <ul>
            {comments.value.map((comment) => (
              <div dangerouslySetInnerHTML={comment.bodyHTML}></div>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
});
