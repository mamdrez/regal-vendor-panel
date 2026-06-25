import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import styles from "./css/styles.module.css";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
// @ts-ignore
import moment from "moment-jalaali";

// Utility functions for date conversion
const serverDateToDateObject = (serverDate: string): DateObject | null => {
  if (!serverDate) return null;

  try {
    const gregorianMoment = moment(serverDate, "YYYY-MM-DD HH:mm:ss").locale(
      "en"
    );
    return new DateObject({
      date: gregorianMoment.toDate(),
      calendar: persian,
      locale: persian_fa,
    });
  } catch (error) {
    console.error("Error converting server date to DateObject:", error);
    return null;
  }
};

const dateObjectToServerDate = (dateObject: DateObject): string => {
  const gregorianDate = dateObject.toDate();
  return moment(gregorianDate).locale("en").format("YYYY-MM-DD HH:mm:ss");
};

interface IProps {
  value: any;
  onChange: (value: any) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  showTimePicker?: boolean;
}

const SingleDatePicker: React.FC<IProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  showTimePicker = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);

  const handleDateChange = (newValue: DateObject | null) => {
    setSelectedDate(newValue);

    if (newValue) {
      const serverFormattedDate = dateObjectToServerDate(newValue);
      onChange?.(serverFormattedDate);
    } else {
      onChange?.(null);
    }
  };

  useEffect(() => {
    const dateObject = serverDateToDateObject(value);
    setSelectedDate(dateObject);
  }, [value]);

  return (
    <div className={styles.formToDatePicker}>
      <span>{label}</span>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        className={`${styles.datePicker} "rmdp-mobile"`}
        containerClassName={`${styles.datePickerContainer} ${
          error ? styles.datePickerContainerError : ""
        }`}
        placeholder={placeholder || "انتخاب تاریخ"}
        plugins={showTimePicker ? [<TimePicker hideSeconds={false} />] : []}
        format={showTimePicker ? "YYYY/MM/DD HH:mm:ss" : "YYYY/MM/DD"}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default SingleDatePicker;
