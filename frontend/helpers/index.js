const colorTitleNumbers = (title, tagClass = "gold") => {
  if (tagClass === "gold") {
    return title.replace(
      /(\d+\.\d+)|\d+/g,
      (val) => `<span class="gold">${val}</span>`
    );
  } else {
    return title.replace(
      /(\d+\.\d+)|\d+/g,
      (val) => `<span class="${tagClass}">${val}</span>`
    );
  }
};

function shuffleArray(array) {
  if (!array || !array.length) {
    return [];
  }

  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export { colorTitleNumbers, shuffleArray };
