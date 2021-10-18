export const convertStringToNumber = (value: string ) => {
  return Number(value.replace(/\D/g,''))
}