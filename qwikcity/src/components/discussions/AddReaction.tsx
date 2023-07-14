import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { REACTIONS, REACTION_EMOJI } from "~/lib/github/discussions";

export default component$(() => {
  useStylesScoped$(`
        .add-reaction {
            display: inline-block;
            position: relative;
        }
        
        dialog {
            left: calc(100% + 0.3em);
            top: 0;
            white-space: nowrap;
            border: 1px solid var(--color-bg-1);
            border-radius: 0.5em;
            padding: 0.3em;
        }    
  `);

  const shown = useSignal(false);

  return (
    <>
      <div class="add-reaction">
        <button onClick$={() => (shown.value = !shown.value)}>
          Add reaction
        </button>
        <dialog open={shown.value}>
          {REACTIONS.map((r) => (
            <button
              onClick$={() => {
                console.log("reacted with", r);
                shown.value = false;
              }}
            >
              {REACTION_EMOJI[r]}
            </button>
          ))}
        </dialog>
      </div>
    </>
  );
});
