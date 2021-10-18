export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-CA', 
  {currency: 'CAD', 
   style: 'currency', 
   compactDisplay: 'long', 
   minimumFractionDigits: 0,
   maximumFractionDigits: 0,
   }).format(value)
}