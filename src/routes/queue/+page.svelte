<script lang="ts">
	import type { SkincareEntry } from '$lib/database.types';
  import { typeColors } from '$lib/utils/color';
  import SkincareCard from '$lib/components/SkincareCard.svelte';
  import { supabase } from '$lib/supabase'
  import { onMount } from 'svelte'
  import { SvelteMap } from 'svelte/reactivity';
	import Nav from '$lib/components/Nav.svelte';

  let entries: SkincareEntry[] = $state([])
  let loading = $state(true)

  let skincareTypesCount: SvelteMap<string, number> = new SvelteMap(Object.keys(typeColors).map(type => [type, 0]));

  
  onMount(async () => {
    const { data, error } = await supabase
      .from('skincare')
      .select('*')
      .order('type')
      .eq('status', 'In Queue')

    if (error) console.error(error)
    console.log(data)
    entries = data ?? []
    loading = false

    if (data) {
      for (const entry of data) {
        if (!entry.type) continue
        skincareTypesCount.set(entry.type.toLowerCase(), (skincareTypesCount.get(entry.type.toLowerCase()) ?? 0) + 1)
      }
    }

  })
</script>

<Nav />

{#if loading}
  <strong>loading...</strong>
{:else}
  <!-- summary of item types and counts -->
  <div class="flex flex-row flex-wrap pb-3">
      {#each [...skincareTypesCount] as [type, count] (type)}
      {@const accent = typeColors[type.toLowerCase()] ?? '#9ca3af'}
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