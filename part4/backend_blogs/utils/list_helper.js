const dummy = (blogs) => {
  return 1;
};

const totalLikes = (array) => {
  const reducer = (a, b) => {
    return a + b;
  };

  return array.length === 0 ? 0 : array.map((o) => o.likes).reduce(reducer);
};

const favoriteBlog = (array) => {
  const reducer = (a, b) => {
    return a > b ? a : b;
  };
  const max = array.map((o) => o.likes).reduce(reducer);
  const coincidences = array.filter((o) => o.likes === max);

  return coincidences;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
