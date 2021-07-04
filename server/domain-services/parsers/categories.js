const getCategories = (filters) => {
  const currentCategory = filters.find(function (item) {
    if (item.id === "category") {
      return item;
    }
  });

  if (!currentCategory) return [];

  const { values } = currentCategory;

  if (!values.length) return [];

  const firstItem = values[0];
  const { path_from_root: categories } = firstItem;

  return categories.map(function (item) {
    return item.name;
  });
};

export default {
  getCategories,
};
