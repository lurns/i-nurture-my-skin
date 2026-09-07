export const statusOptions = [
  'In Use', 
  'Abandoned', 
  'In Queue', 
  'Emptied'
] as const;

export type Status = typeof statusOptions[number];

export const Status = {
  InUse: 'In Use',
  Abandoned: 'Abandoned',
  InQueue: 'In Queue',
  Emptied: 'Emptied'
} as const satisfies Record<string, Status>

export const productTypeOptions = [
  'Cleanser',
  'Toner',
  'Essence',
  'Serum',
  'Eye Cream',
  'Moisturizer',
  'Sunscreen',
  'Mask',
  'Lip'
] as const;

export type ProductType = typeof productTypeOptions[number];

export const ProductType = {
  Cleanser: 'Cleanser',
  Toner: 'Toner',
  Essence: 'Essence',
  Serum: 'Serum',
  EyeCream: 'Eye Cream',
  Moisturizer: 'Moisturizer',
  Sunscreen: 'Sunscreen',
  Mask: 'Mask',
  Lip: 'Lip'
} as const satisfies Record<string, ProductType>