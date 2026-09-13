<script lang="ts">
  import { skincareStore } from '$lib/state/entries.svelte'
	import type { SkincareEntry } from '$lib/database.types';
  import { typeColors } from '$lib/utils/color';
  import SkincareCard from '$lib/components/SkincareCard.svelte';
  import { SvelteMap } from 'svelte/reactivity';
	import Nav from '$lib/components/Nav.svelte';
	import { productTypeOptions, Status } from '$lib/utils/constants';

  const entries = $derived.by(() => {
    const grouped = skincareStore.entries
      .filter(e => e.status === Status.InQueue)
      .reduce((acc, entry) => {
        acc[entry.type] = acc[entry.type] || []
        acc[entry.type].push(entry)
        return acc
      }, {} as Record<string, SkincareEntry[]>)

    return Object.values(grouped).flat()
  })

  const skincareTypesCount = $derived.by(() => {
    const counts = new SvelteMap<string, number>(productTypeOptions.map(type => [type, 0]))
    
    for (const entry of entries) {
      if (!entry.type) continue
      counts.set(entry.type, (counts.get(entry.type) ?? 0) + 1)
    }
    return counts
  })
</script>

<Nav />

{#if entries}
  <!-- summary of item types and counts -->
  <div class="flex flex-row flex-wrap pb-3 justify-center">
      {#each [...skincareTypesCount] as [type, count] (type)}
      {const accent = $derived(typeColors[type.toLowerCase()] ?? '#9ca3af')}
      <span
        class="inline-flex items-center gap-1 px-3 py-1 m-1 rounded-full text-sm font-medium pill-text"
        style="--accent: {accent}"
      >
        {type}
        <span class="opacity-60">({count})</span>
      </span>
    {/each}
  </div>

  <!-- skincare cards -->
  <div class="columns-1 md:columns-2 gap-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
    {#each entries as entry (entry.id)}
      <SkincareCard {entry} />
    {/each}
  </div>
{/if}

<style lang="postcss">
  @reference "tailwindcss";

  .pill-text {
    background-color: color-mix(in srgb, var(--accent) 20%, white);
    color: color-mix(in srgb, var(--accent) 70%, black)
  }

</style>