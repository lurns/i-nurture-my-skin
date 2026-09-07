<script lang="ts">
  import { supabase } from '$lib/supabase'
  import { skincareEntrySchema } from '$lib/schemas/skincare'
  import { productTypeOptions, statusOptions } from '$lib/utils/constants';
  import type { SkincareEntry } from '$lib/database.types';
	import { untrack } from 'svelte';
	import { toDateInputValue } from '$lib/utils/date';

  let { entry, onSuccess }: { entry?: SkincareEntry; onSuccess: () => void } = $props()

  const isEditing = $derived(!!entry);

  let brand = $state(untrack(() => entry?.brand ?? ''))
  let name = $state(untrack(() => entry?.name ?? ''))
  let type = $state(untrack(() => entry?.type ?? ''))
  let status = $state(untrack(() => entry?.status ?? ''))
  let start_date = $state(untrack(() => toDateInputValue(entry?.start_date  ?? '')))
  let end_date = $state(untrack(() => toDateInputValue(entry?.end_date ?? '')))
  let rating = $state<number | null>(untrack(() => entry?.rating ?? null))
  let notes = $state(untrack(() => entry?.notes ?? ''))

  let errors = $state<Record<string, string>>({})
  let submitting = $state(false)

  async function handleSubmit() {
    errors = {}

    const result = skincareEntrySchema.safeParse({
      brand, 
      name, 
      type, 
      status, 
      start_date: start_date || null,
      end_date: end_date || null,
      rating,
      notes: notes || null
    })

    if (!result.success) {
      for (const issue of result.error.issues) {
        errors[issue.path[0] as string] = issue.message
      }
      return
    }

    submitting = true

    const { error } = isEditing
      ? await supabase.from('skincare').update(result.data).eq('id', entry!.id)
      : await supabase.from('skincare').insert(result.data)

    submitting = false

    if (error) {
      errors.form = error.message
      return
    }

    if (!isEditing) {
      brand = name = type = status = start_date = end_date = notes = ''
      rating = null
    }

    onSuccess()
  }
</script>

<form onsubmit={(e) => { e.preventDefault(); handleSubmit() }} class="space-y-3">
  <div>
    <input bind:value={brand} placeholder="Brand" class="border rounded px-2 py-1 w-full" />
    {#if errors.brand}<p class="text-red-500 text-sm">{errors.brand}</p>{/if}
  </div>

  <div>
    <input bind:value={name} placeholder="Product name" class="border rounded px-2 py-1 w-full" />
    {#if errors.name}<p class="text-red-500 text-sm">{errors.name}</p>{/if}
  </div>

  <div>
    <select bind:value={type} class="border rounded px-2 py-1 w-full">
      <option value="" disabled>Select product type</option>
      {#each productTypeOptions as typeOption (typeOption)}
        <option value={typeOption}>{typeOption}</option>
      {/each}
    </select>
    {#if errors.type}<p class="text-red-500 text-sm">{errors.type}</p>{/if}
  </div>

  <div>
    <select bind:value={status} class="border rounded px-2 py-1 w-full">
      <option value="" disabled>Select status</option>
      {#each statusOptions as statusOption (statusOption)}
        <option value={statusOption}>{statusOption}</option>
      {/each}
    </select>
    {#if errors.status}<p class="text-red-500 text-sm">{errors.status}</p>{/if}
  </div>

  <div>
    <input type="date" bind:value={start_date} class="border rounded px-2 py-1 w-full" />
    {#if errors.start_date}<p class="text-red-500 text-sm">{errors.start_date}</p>{/if}
  </div>

  <input type="date" bind:value={end_date} class="border rounded px-2 py-1 w-full" />
  <input type="number" bind:value={rating} min="1" max="5" step="0.25" placeholder="Rating" class="border rounded px-2 py-1 w-full" />
  <textarea bind:value={notes} placeholder="Notes" class="border rounded px-2 py-1 w-full"></textarea>

  {#if errors.form}<p class="text-red-500 text-sm">{errors.form}</p>{/if}

  <button type="submit" disabled={submitting} class="bg-blue-500 text-white px-4 py-2 rounded">
    {submitting ? 'Saving...' : isEditing ? 'Update entry' : 'Add entry'}
  </button>
</form>