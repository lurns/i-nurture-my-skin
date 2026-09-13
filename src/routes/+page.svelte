<script lang="ts">
  import { skincareStore, loadEntries } from '$lib/state/entries.svelte'
  import SkincareCard from '$lib/components/SkincareCard.svelte';
  import { onMount } from 'svelte'
  import { Status } from '$lib/utils/constants';
	import Nav from '$lib/components/Nav.svelte';

  const activeStatuses: Status[] = [Status.InUse, Status.Emptied]

  onMount(() => loadEntries())

  const entries = $derived(
    skincareStore.entries
      .filter(e => activeStatuses.includes(e.status))
      .sort((a, b) => {
        if (a.start_date === null) return 1
        if (b.start_date === null) return -1
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      })
  )

  $effect(() => {
    console.log(entries.map(e => e.start_date))
  })

  const countInUse = $derived(skincareStore.entries.filter(e => e.status === Status.InUse).length)
</script>

<Nav />
{#if entries}
  <p class="text-center text-sm text-gray-500 pb-3">
    {countInUse} products in use
  </p>
  <!-- <div class="columns-1 md:columns-2 gap-3 [&>*]:mb-3 [&>*]:break-inside-avoid"> -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
    {#each entries as entry (entry.id)}
      <SkincareCard {entry} />
    {/each}
  </div>
{/if}

<style lang="postcss">
  @reference "tailwindcss";

  h1 {
    font-family: "Bagel Fat One", sans-serif;
  }

</style>