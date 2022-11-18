export const IsValidObjectId = (str: string): boolean => {
  if (!str) return false;
  return !!str.match(/^[a-f\d]{24}$/i);
};
