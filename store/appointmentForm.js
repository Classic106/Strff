export const state = () => ({
  appointmentId: null,
  appointmentDate: null,
  user: null,
});

export const mutations = {
  setAppointment(state, appointmentId) {
    state.appointmentId = appointmentId;
  },
  setAppointmentDate(state, appointmentDate) {
    state.appointmentDate = appointmentDate;
  },
  setUserData(state, user) {
    state.user = user;
  },
  clearAll(state) {
    Object.assign(state, {
      appointmentId: null,
      appointmentDate: null,
      user: null,
    });
  },
};

export const getters = {
  getForm(state) {
    return state;
  },
  getAppointment(state) {
    return state.appointmentId;
  },
  getAppointmentDate(state) {
    return state.appointmentDate;
  },
};
