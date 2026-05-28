export const dateStringToDBDate = (dateString: string) => {
  const [month, day, year] = dateString.split(/[/-]/).map(Number);
  return new Date(year, month - 1, day);
};
