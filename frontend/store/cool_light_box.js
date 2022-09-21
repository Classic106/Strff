export const state = () => ({
  images: [],
  imageIndex: null,
});

export const mutations = {
  setImages(state, images) {
    state.images = images;
  },
  setImageIndex(state, imageIndex) {
    state.imageIndex = imageIndex;
  },
  clearImageIndex(state) {
    state.imageIndex = null;
  },
};

export const getters = {
  images: (state) => {
    return state.images;
  },
  imageIndex: (state) => {
    return state.imageIndex;
  },
};
