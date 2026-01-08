// (예: 2024-03-01 -> 03월 01일)
export const formatDateToWord = (dateString: string) => {
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[1]}월 ${parts[2]}일`;
  }
  return dateString;
};