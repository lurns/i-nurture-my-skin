<!-- <script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()} -->

<script lang="ts">
  import { supabase } from '$lib/supabase'
	import type { Session } from '@supabase/supabase-js';
  import { onMount } from 'svelte'

	let { children } = $props()

  let session = $state<Session | null>(null)
  let loading = $state(true)
	let email = $state('')
  let password = $state('')

  onMount(async () => {
    const { data } = await supabase.auth.getSession()
    session = data.session
    loading = false

    supabase.auth.onAuthStateChange((_event, newSession) => {
      session = newSession
    })
  })

	async function login() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
  }
</script>

{#if loading}
  <p>Loading...</p>
{:else if !session}
  <div>
    <input type="email" bind:value={email} placeholder="email" />
    <input type="password" bind:value={password} placeholder="password" />
    <button onclick={login}>Log in</button>
  </div>
{:else}
  {@render children()}
{/if}