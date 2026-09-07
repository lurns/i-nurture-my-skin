export const formatDate = (date: string | null): string => {
  if (!date) return 'No date'
  return new Date(date).toLocaleDateString()
}

// Convert supabase date to something an input can parse
export const toDateInputValue = (dateStr: string | null): string => {
  if (!dateStr) return ''
  return dateStr.slice(0, 10)
}