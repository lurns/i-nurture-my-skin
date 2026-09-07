<script lang="ts">
	import type { SkincareEntry } from '$lib/database.types';
  import SkincareCard from '$lib/components/SkincareCard.svelte';
  import { supabase } from '$lib/supabase'
  import { onMount } from 'svelte'
  import { Status } from '$lib/utils/constants';
	import Nav from '$lib/components/Nav.svelte';

  let entries: SkincareEntry[] = $state([])
  let loading = $state(true)

  let countInUse = $state(0);

  onMount(async () => {
    const { data, error } = await supabase
      .from('skincare')
      .select('*')
      .order('start_date', { ascending: false })
      .neq('status', Status.InQueue)

    if (error) console.error(error)
    console.log(data)
    entries = data ?? []
    loading = false

    // get count of products in use
    if (data) {
      countInUse = data.filter(d => d.status === 'In Use').length;
    }
  })
</script>

<Nav />
{#if loading}
  <strong>loading...</strong>
{:else}
  <p class="text-center text-sm text-gray-500 pb-3">
    {countInUse} products in use
  </p>
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