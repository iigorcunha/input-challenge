export const convertStringToNumber = (value: string): number => {
  return Number(value.replace(/\D/g, ''));
};
