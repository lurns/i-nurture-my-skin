<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import SkincareForm from "$lib/components/SkincareForm.svelte";

  let isSuccess = $state(false)

  const setSuccess = (() => isSuccess = true)

</script>

<Nav />

{#if isSuccess}
<div>Skincare added!</div>
{/if}

<SkincareForm onSuccess={setSuccess} />