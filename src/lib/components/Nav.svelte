<script lang="ts">
	import { resolve } from '$app/paths';
  import { addIcon, queueIcon } from '$lib/utils/icons';

  const navAddIcon: string = addIcon.concat(' size-4 shrink-0')
  const navQueueIcon: string = queueIcon.concat(' size-4 shrink-0')
</script>

<div>
  <a href={resolve("/")}>
    <h1 class="text-5xl text-teal-900 pb-3">Skincare Log</h1>
  </a>

  <div class="flex flex-row pb-4">
    <a href={resolve("/queue")} class="queue-btn inline-block cursor-pointer bg-teal-400 text-md rounded-full mr-3 py-2 px-4" aria-label="queued">
      <span class={navQueueIcon}></span> In Queue
    </a>
    <a href={resolve("/new")} class="add-btn inline-block cursor-pointer bg-teal-400 text-md rounded-full py-2 px-4" aria-label="add">
      <span class={navAddIcon}></span> Add
    </a>
  </div>
</div>

<style lang="postcss">
  @reference "tailwindcss";

  h1 {
    font-family: "Bagel Fat One", sans-serif;
  }

  .add-btn {
    mix-blend-mode: multiply;
    color: color-mix(in srgb,teal 60%, black);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .add-btn:hover {
    mix-blend-mode: multiply;
    color: white;
    background-color: color-mix(in srgb,teal 60%, black);
  }

  .queue-btn {
    mix-blend-mode: multiply;
    color: color-mix(in srgb,teal 60%, black);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .queue-btn:hover {
    mix-blend-mode: multiply;
    color: white;
    background-color: color-mix(in srgb,teal 60%, black);
  }

</style>