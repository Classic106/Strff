<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <p>{{ minDate.toLocaleString("en-us", { weekday: "long" }) }}</p>
    <h1>{{ minDate.getDate() }}</h1>
    <h2>
      {{ months[minDate.getMonth()] }} {{ minDate.getFullYear() }}
    </h2>
    <DatePicker
      :min-date="minDate"
      :max-date="maxDate"
      :attributes="attributes"
      v-model="date"
      title-position="left"
      :first-day-of-week="2"
      class="col mt-3 mx-2"
    />
  </div>
</template>

<script>
export default {
  name: "AppointmentSecondStep",
  data: () => {
    const minDate = new Date();
    const maxDate = new Date(
      minDate.getFullYear(),
      minDate.getMonth() + 2,
      minDate.getDate()
    );
    const dates = [];
    let date = minDate;
    do {
      const d = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );
      dates.push(d);
      date = d;
    } while (date < maxDate);
    return {
      date: null,
      minDate,
      maxDate,
      attributes: [
        {
          key: "today",
          dot: true,
          dates: new Date(),
        },
        {
          highlight: {
            color: "blue",
            fillMode: "light",
          },
          dates: [minDate, ...dates],
        },
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
};
</script>

<style scoped>
</style>