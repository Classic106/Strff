const colorTitleNumbers = (title, tag = "span", tagClass = "gold") => {
  if (tagClass === "gold") {
    return title.replace(
      /(\d+\.\d+)|\d+/g,
      (val) => `<${tag} class="gold">${val}</${tag}>`
    );
  } else {
    return title.replace(
      /(\d+\.\d+)|\d+/g,
      (val) => `<${tag} class="${tagClass}">${val}</${tag}>`
    );
  }
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
