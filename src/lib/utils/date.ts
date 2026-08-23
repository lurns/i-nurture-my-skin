export function formatDate(date: string | null): string {
  if (!date) return 'No date'
  return new Date(date).toLocaleDateString()
}