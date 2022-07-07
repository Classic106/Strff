const colorTitleNumbers = (title) => {
  return title.replace(
    /(\d+\.\d+)|\d+/g,
    (val) => `<span class="gold">${val}</span>`
  );
};

export { colorTitleNumbers };
