import {component$, useSignal, useStylesScoped$} from "@builder.io/qwik";
import {REACTIONS} from "~/lib/github/discussions";

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

  function addReaction(reaction: (typeof REACTIONS)[number]) {
    console.log('react with', reaction);
    shown.value = false;
  }
    
  return (
    <>
        <div class="add-reaction">
            <button onClick$={() => shown.value = !shown.value}>Add reaction</button>
            <dialog open={shown.value}>
                
            </dialog>
        </div>    
    </>
  );
});
