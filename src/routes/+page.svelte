<script lang="ts">
	import type { SkincareEntry } from '$lib/database.types';
  import SkincareCard from '$lib/components/SkincareCard.svelte';
  import { supabase } from '$lib/supabase'
  import { onMount } from 'svelte'
	import Nav from '$lib/components/Nav.svelte';

  let entries: SkincareEntry[] = $state([])
  let loading = $state(true)

  onMount(async () => {
    const { data, error } = await supabase
      .from('skincare')
      .select('*')
      .order('start_date', { ascending: false })
      .neq('status', 'In Queue')

    if (error) console.error(error)
    console.log(data)
    entries = data ?? []
    loading = false
  })
</script>

<Nav />
{#if loading}
  <strong>loading...</strong>
{:else}
  <div class="columns-1 md:columns-2 gap-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
  <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-3 items-start"> -->
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