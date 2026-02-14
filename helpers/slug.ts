export const createSlug = (text: string) => {
  return decodeURIComponent(text).toLowerCase().replace(/\s+/g, "-");
};

export const deSlug = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
