import DatePicker from "react-multi-date-picker";
import styles from "./css/styles.module.css";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface IProps {
  value: any;
  onChange: (value: any) => void;
  label?: string;
  placeholder?: string;
}
const FromToDatePicker: React.FC<IProps> = ({ label, value, onChange }) => {
  const [selectedRange, setSelectedRange] = useState<any>([]);

  const handleDateChange = (newValues: any) => {
    setSelectedRange(newValues);
    const [fromDate, toDate] = newValues;
    onChange?.({
      from: new Date(fromDate).toISOString(),
      to: new Date(toDate)?.toISOString(),
    });
  };

  useEffect(() => {
    setSelectedRange([
      new Date(value?.from)?.getTime(),
      new Date(value?.to)?.getTime(),
    ]);
  }, [value]);

  return (
    <div className={styles.formToDatePicker}>
      <span>{label}</span>
      <DatePicker
        value={selectedRange}
        onChange={handleDateChange}
        range
        dateSeparator=" تا "
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        className={`${styles.datePicker} "rmdp-mobile"`}
        containerClassName={styles.datePickerContainer}
        placeholder="فیلتر زمانی"
      />
    </div>
  );
};

export default FromToDatePicker;
