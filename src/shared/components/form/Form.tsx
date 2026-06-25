import styles from "./css/styles.module.css";
import Button from "../button/Button";
import DropDown from "../dropDown/DropDown";
import Input from "../Input/Input";
import React from "react";
import { numberSeparate } from "@/utils/utils";

export interface FormData {
  [key: string]: string | number | boolean | string[];
}

export interface IFormContent {
  id: number | string;
  label: string;
  options?: any[];
  name: string;
  type: "dropDown" | "input";
  maxLength?: number;
  valueKey?: string;
  labelKey?: string;
  needSearch?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isSeparator?: boolean;
}
interface IProps {
  title?: string;
  onSubmit?: () => void;
  onSecondarySubmit?: () => void;
  submitText?: string;
  secondBtnText?: string;
  secondaryBtnIcon?: React.ReactNode;
  content?: IFormContent[];
  formData: FormData;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleByKey?: (value: any, keys: string) => void;
  handleChangeNumber?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  errors?: any;
  disableSubmit?: boolean;
  borderLess?: boolean;
}

const Form: React.FC<IProps> = ({
  title,
  submitText,
  onSecondarySubmit,
  onSubmit,
  secondBtnText,
  secondaryBtnIcon,
  content,
  formData,
  handleChange,
  handleByKey,
  loading,
  errors,
  disableSubmit,
  borderLess,
  handleChangeNumber,
}) => {
  return (
    <div className={!borderLess ? styles.form : styles.formBorderLess}>
      {title && <div className={styles.formTitle}>{title}</div>}
      <div className={styles.formContent}>
        {content?.map((inp) =>
          inp?.type === "dropDown" ? (
            <DropDown
              key={inp.id}
              label={inp.label}
              options={inp?.options || []}
              selected={formData[inp.name] as string | number}
              onChange={(value) => handleByKey?.(value, inp?.name)}
              error={errors?.[inp?.name]}
              labelKey={inp?.labelKey}
              valueKey={inp?.valueKey}
              needSearch={inp?.needSearch}
              isLoading={inp?.isLoading}
              disabled={inp?.disabled}
              placeholder={inp?.placeholder ?? inp?.label}
            />
          ) : (
            <Input
              name={inp?.name}
              label={inp?.label}
              key={inp.id}
              maxLength={inp.maxLength}
              placeholder={inp?.placeholder || inp.label}
              value={
                inp?.isSeparator
                  ? numberSeparate(formData[inp?.name] as any)
                  : (formData[inp?.name] as string | number)
              }
              onChange={inp?.isSeparator ? handleChangeNumber : handleChange}
              error={errors?.[inp?.name]}
            />
          )
        )}
      </div>
      {(onSecondarySubmit || onSubmit) && (
        <div className={styles.formActions}>
          {onSecondarySubmit && (
            <Button
              text={secondBtnText || "بازنشانی"}
              color="secondary"
              handleClick={onSecondarySubmit}
              width={8}
              height={2.5}
              icon={secondaryBtnIcon}
              iconSize={19.2}
            />
          )}
          {onSubmit && (
            <Button
              text={submitText || "تایید"}
              color="primary"
              handleClick={onSubmit}
              width={8}
              height={2.5}
              isLoading={loading}
              disable={disableSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
