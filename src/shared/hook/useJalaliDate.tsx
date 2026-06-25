//@ts-ignore
import moment from "moment-jalaali";

const useJalaliDate = (inputDate: string) => {
  moment.locale("fa");
  moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

  const inputMoment = moment(inputDate).utcOffset(210);

  const today = moment().utcOffset(210).startOf("day");
  const tomorrow = moment().utcOffset(210).add(1, "days").startOf("day");
  const yesterday = moment().utcOffset(210).add(-1, "days").startOf("day");
  const inputMomentDay = inputMoment.clone().startOf("day");

  const jalaaliMoment = inputMoment.format("jYYYY/jM/jD");
  const jalaaliDate = moment(jalaaliMoment, "jYYYY/jM/jD");

  let dayName: string;

  const nameTranslate = (value: string) => {
    if (value === "پنج‌شنبه") return "پنجشنبه";
    if (value === "یک‌شنبه") return "یکشنبه";
    return value;
  };

  const dateNow = () => {
    return moment().utcOffset(210).toISOString();
  };

  if (inputMomentDay.isSame(today, "day")) {
    dayName = "امروز";
  } else if (inputMomentDay.isSame(tomorrow, "day")) {
    dayName = "فردا";
  } else if (inputMomentDay.isSame(yesterday, "day")) {
    dayName = "دیروز";
  } else {
    dayName = jalaaliDate.format("dddd");
  }

  const date = () => {
    return (
      <span style={{ fontFamily: "vazir-number" }}>
        {`${dayName} ${jalaaliDate.format("jD")} ${jalaaliDate.format(
          "jMMMM"
        )} `}
      </span>
    );
  };

  const dateWithYear = () => {
    return (
      <span>
        {`${dayName} , ${jalaaliDate.format("jD")} ${jalaaliDate.format(
          "jMMMM"
        )} ${jalaaliDate.format("jYYYY")}`}
      </span>
    );
  };

  const formattedDateTime = () => {
    return (
      <>
        {`${inputMoment.format("jYYYY/jM/jD")} - ${inputMoment.format(
          "HH:mm"
        )}`}
      </>
    );
  };

  const formattedTime = () => <>{` ${inputMoment.format("HH:mm")}`}</>;
  const formattedDate = () => <>{`${jalaaliDate.format("jYYYY/jM/jD")}`}</>;

  const convertToJalali = () => {
    return moment(inputDate).utcOffset(210).format("jYYYY/jM/jD");
  };

  const convertToJalaliPeriods = (period: any) => {
    const m = moment(inputDate).utcOffset(210);
    return period.endsWith("h") ? m.format("HH:mm") : m.format("jYYYY/jM/jD");
  };

  const formatServerDate = moment(inputDate)
    .utcOffset(210)
    .locale("en")
    .format("YYYY-MM-DD HH:mm:ss");

  const formatFullFa = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <span>{inputMoment.format("jD jMMMM jYYYY")}</span>
        <span style={{ color: "#727272ff", fontSize: "0.8rem" }}>
          {inputMoment.format("ساعت HH:mm")}
        </span>
      </div>
    );
  };

  return {
    day: jalaaliDate.format("jD"),
    name: nameTranslate(dayName),
    month: jalaaliDate.format("jMMMM"),
    date: date,
    dateWithYear: dateWithYear,
    formattedDateTime,
    formattedDate,
    formattedTime,
    convertToJalali,
    convertToJalaliPeriods,
    formatServerDate,
    dateNow,
    formatFullFa,
  };
};

export default useJalaliDate;
