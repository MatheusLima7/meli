const capitalizeWord = (str: string) => {
  const stringLength = str.length;

  const result = [];

  for (let i = 0; i < stringLength; i += 1) result[i] = str[i].toUpperCase();

  return result.join('');
};

export default {
  capitalizeWord,
};
