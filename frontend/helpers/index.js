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

export { colorTitleNumbers, shuffleArray, prevCurrNextProduct };
