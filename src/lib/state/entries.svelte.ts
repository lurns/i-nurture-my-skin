// src/lib/state/skincare.svelte.ts
import { supabase } from '$lib/supabase'
import type { SkincareEntry } from '$lib/database.types'

let entries = $state<SkincareEntry[]>([])
let loaded = $state(false)

export const skincareStore = {
  get entries() { return entries },
  get loaded() { return loaded }
}

export async function loadEntries(force = false) {
  if (loaded && !force) return // already have data, skip the fetch

  const { data, error } = await supabase.from('skincare')
    .select('*')
    .order('start_date', { ascending: false })

  console.log('fetched', data?.length, 'entries')

  if (error) {
    console.error(error)
    return
  }

  entries = data ?? []
  loaded = true
}

export async function addEntry(newEntry: Omit<SkincareEntry, 'id'>) {
  const { data, error } = await supabase.from('skincare')
    .insert(newEntry)
    .select()
    .single()

  if (error) throw error

  entries.push(data) // local update, no refetch needed
}

export async function updateEntry(id: string, changes: Partial<SkincareEntry>) {
  const { data, error } = await supabase.from('skincare')
    .update(changes)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  const index = entries.findIndex(e => e.id === id)

  if (index !== -1) entries[index] = data
}

export async function deleteEntry(id: string) {
  const { error } = await supabase.from('skincare').delete().eq('id', id)

  if (error) throw error

  entries = entries.filter(e => e.id !== id)
}