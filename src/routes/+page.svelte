<script lang="ts">
	import type { SkincareEntry } from '$lib/database.types';
  import { supabase } from '$lib/supabase'
  import { onMount } from 'svelte'
  import { formatDate } from '$lib/utils/date'

  let entries: SkincareEntry[] = $state([])
  let loading = $state(true)

  onMount(async () => {
    const { data, error } = await supabase
      .from('skincare')
      .select('*')
      .order('start_date', { ascending: false })

    if (error) console.error(error)
    console.log(data)
    entries = data ?? []
    loading = false
  })
</script>

<h1>Skincare Log</h1>

{#if loading}
  <p>Loading...</p>
{:else if entries.length === 0}
  <p>No entries yet.</p>
{:else}
  <ul>
    {#each entries as entry (entry.id)}
      <li>
        <strong>{entry.name}</strong> — {entry.status === 'In Queue' ? 'Not started' : formatDate(entry.start_date)}
        {#if entry.notes}<p>{entry.notes}</p>{/if}
      </li>
    {/each}
  </ul>
{/if}

<strong class="text-3xl underline text-blue-400"></strong>

<style lang="postcss">
  @reference "tailwindcss";

</style>