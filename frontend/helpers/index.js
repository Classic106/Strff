const colorTitleNumbers = (title) => {
  return title.replace(
    /(\d+\.\d+)|\d+/g,
    (val) => `<span class="gold">${val}</span>`
  );
};

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export { colorTitleNumbers, shuffleArray };
