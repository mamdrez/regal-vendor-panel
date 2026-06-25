export const convertDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    month: date.toLocaleString("default", { month: "short" }),
    day: date.getDate(),
    weekDay: date.toLocaleString("default", { weekday: "long" }),
  };
};

