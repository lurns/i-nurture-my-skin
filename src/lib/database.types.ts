import type { Status } from "./utils/constants"

export type SkincareEntry ={
  brand: string
  end_date: string | null
  id: string
  name: string
  notes: string | null
  rating: number | null
  start_date: string | null
  status: Status
  type: string
}