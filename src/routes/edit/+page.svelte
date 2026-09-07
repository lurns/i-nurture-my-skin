<script lang="ts">
	import { page } from "$app/state";
	import Nav from "$lib/components/Nav.svelte";
	import SkincareForm from "$lib/components/SkincareForm.svelte";
	import type { SkincareEntry } from "$lib/database.types";
	import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";
  
  let entry = $state<SkincareEntry | null>(null)
  let loading = $state(true)
  let isSuccess = $state(false)

  const id = page.url.searchParams.get('id')

  onMount(async () => {
    if (!id) {
      loading = false
      return
    }
    const { data } = await supabase.from('skincare').select('*').eq('id', id).single()
    // if (error) console.error('Fetch error:', error)
    
    entry = data
    loading = false
  })

  const setSuccess = (() => isSuccess = true)

</script>

<Nav />

{#if isSuccess}
  <div>Skincare updated!</div>
{:else if loading}
  <p>Loading...</p>
{:else if !entry}
  <p>Entry not found.</p>
{:else}
  <SkincareForm {entry} onSuccess={setSuccess} />
{/if}