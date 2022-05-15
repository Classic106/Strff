export const state = () => ({
  step: 0,
  date: null,
  isAmPm: false,
  phone: null,
  timeZone: "Europe/Sofia",
});

export const mutations = {
  setDate(state, date) {
    state.date = date;
  },
  setTimeDate(state, date) {
    state.date = date;
    state.step = 1;
  },
  setIsAmPm(state, isAmPm) {
    state.isAmPm = isAmPm;
  },
  stepMinusOne(state) {
    if (state.step === 0) {
      return;
    }
    state.step--;
  },
  setTimeZone(state, timeZone) {
    state.timeZone = timeZone;
  },
  setPhone(state, phone) {
    state.phone = phone;
  },
};

export const getters = {
  getStep(state) {
    return state.step;
  },
  getDate(state) {
    return state.date;
  },
  getIsAmPm(state) {
    return state.isAmPm;
  },
  getTimeZone(state) {
    return state.timeZone;
  },
  getPhone(state) {
    return state.phone;
  },
};
