<script lang="ts">
  import type { SkincareEntry } from '$lib/database.types'
  import { resolve } from '$app/paths';
  import { formatDate } from '$lib/utils/date'
  import { typeColors } from '$lib/utils/color';
  import { calendarIcon, editIcon, deleteIcon } from '$lib/utils/icons';

  let { entry }: { entry: SkincareEntry } = $props()

  let expanded = $state(false)

  // update styling for icons
  const scCalendarIcon: string = calendarIcon.concat(' size-4 shrink-0');

  const setBaseColor = () => {
    if (entry.status === 'Emptied') {
      return '#848484';
    } else {
      return entry.type ? (typeColors[entry.type.toLowerCase()] ?? '#9ca3af') : '#9ca3af';
    }
  }

  const baseColor = $derived(setBaseColor())
</script>

<div class="card rounded-xl overflow-hidden p-2" style="--accent: {baseColor}">

  <!-- Header bar: always visible, tappable only on mobile -->
  <button
    class="text-xl font-bold overlay-text w-full flex text-left justify-between p-3 md:cursor-default"
    onclick={() => (expanded = !expanded)}
  >
    <span>
      {entry.name}
    </span>

    <!-- Toggle chevron: only rendered/shown on mobile -->
    <svg
      class="w-4 h-4 transition-transform md:hidden {expanded ? 'rotate-180' : ''}"
      viewBox="0 0 20 20" fill="currentColor"
    >
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 
        11.148l3.71-3.918a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 
        0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
    </svg>
  </button>

  <!-- Detail body: collapsible on mobile, always shown on desktop -->
  <div
    class="p-3 rounded-xl {expanded ? 'block' : 'hidden'} card-innards md:block"
  >
    <p class="text-md opacity-90 overlay-text">
      {entry.brand} <span class="opacity-60">//</span> {entry.type}
    </p>
    {#if entry.rating}
      <p class="text-sm overlay-text py-1">Rating: {entry.rating}/5</p>
    {/if}

    <p class="text-sm/relaxed opacity-60 inline-flex items-center overlay-text gap-1.5">
      <span class={scCalendarIcon}></span> {formatDate(entry.start_date)} – {formatDate(entry.end_date)}
    </p>

    {#if entry.notes}
      <p class="text-sm italic mt-1 overlay-text">{entry.notes}</p>
    {/if}
  </div>
  <!-- Edit/Delete -->
  <div class="flex flex-row justify-end text-xl pt-4 pb-1 pr-3">
    <a href="{resolve('/edit')}?id={entry.id}" class="edit-btn cursor-pointer pr-2" aria-label="edit">
      <span class={editIcon}></span>
    </a>
    <button class="delete-btn cursor-pointer" aria-label="delete" onclick={() => null}>
      <span class={deleteIcon}></span>
    </button>
  </div>
</div>

<style lang="postcss">
  @reference "tailwindcss";

  * {
    font-family: 'SN Pro', sans-serif;
  }

  .card {
    background-color: var(--accent);
  }

  .card-innards {
    background: color-mix(in srgb, var(--accent) 40%, white);
  }

  .overlay-text {
    mix-blend-mode: multiply;
    color: color-mix(in srgb, var(--accent) 60%, black);
  }

  .brand {
    font-size: 0.85rem;
  }

  .notes {
    font-style: italic;
    font-size: 0.9rem;
  }

  .edit-btn {
    mix-blend-mode: multiply;
    color: color-mix(in srgb, var(--accent) 60%, black);
    transition: color 0.3s ease, opacity 0.3s ease;
  }

  .edit-btn:hover {
    mix-blend-mode: screen;
    opacity: 0.6;
    color: white;
  }

  .delete-btn {
    mix-blend-mode: multiply;
    color: color-mix(in srgb, var(--accent) 60%, black);
    transition: color 0.3s ease, opacity 0.3s ease;
  }

  .delete-btn:hover {
    opacity: 1;
    color: red;
  }
</style>