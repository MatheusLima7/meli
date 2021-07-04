const DEFAULT_CATEGORY = { name: "Sin categoria" };

const getCategories = (filters) => {
  const currentCategory = filters?.find((item) => item.id === "category");

  if (!currentCategory) return [DEFAULT_CATEGORY];

  const { values } = currentCategory;

  if (!values.length) return [DEFAULT_CATEGORY];

  const firstItem = values[0];
  const { path_from_root: categories } = firstItem;

  return categories;
};

export default {
  getCategories,
};
