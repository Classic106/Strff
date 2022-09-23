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

function prevCurrNextProduct(selectedProduct, products) {
  const { length } = products;
  const index = products.findIndex((item) => item.id === selectedProduct.id);

  const result = {
    selectedProduct,
    nextProduct: null,
    previousProduct: null,
  };

  if (index < length) {
    result.nextProduct = products[index + 1];
  }

  if (index > 0) {
    result.previousProduct = products[index - 1];
  }
  return result;
}

function getSeason(date = new Date()) {
  const month = (date.getMonth() + 1).toString();
  let season = "";

  switch (month) {
    case "12":
    case "1":
    case "2":
      season = "Winter";
      break;
    case "3":
    case "4":
    case "5":
      season = "Spring";
      break;
    case "6":
    case "7":
    case "8":
      season = "Summer";
      break;
    case "9":
    case "10":
    case "11":
      season = "Autumn";
      break;
  }
  return season;
}

export { colorTitleNumbers, shuffleArray, prevCurrNextProduct, getSeason };
