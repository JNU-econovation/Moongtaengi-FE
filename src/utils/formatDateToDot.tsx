export const formatDateToDot = (dateString: string): string => {
    return dateString.replace(/-/g, '. ');
};