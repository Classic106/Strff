const configCalendar = () => {
  const minDate = new Date();
  const maxDate = new Date(
    minDate.getFullYear(),
    minDate.getMonth() + 2,
    minDate.getDate()
  );
  const dates = [];
  let date = minDate;
  do {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    dates.push(d);
    date = d;
  } while (date < maxDate);
  return {
    minDate,
    maxDate,
    attributes: [
      {
        dates: [minDate, ...dates],
      },
    ],
  };
};

export { configCalendar };
