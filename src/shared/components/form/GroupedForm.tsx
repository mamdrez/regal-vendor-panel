import React from "react";
import styles from "./css/styles.module.css";
import Button from "../button/Button";
import Input from "../Input/Input";
import DropDown from "../dropDown/DropDown";
import Collapsible from "../collapsible/Collapsible";
import Textarea from "../Input/Textarea";
import SingleDatePicker from "../datePicker/SingleDatePicker";
import Toggle, { ToggleSize, ToggleType } from "../toggle/Toggle";
import FileUploader from "../file/FileUploader";
import MultiSelect from "../multiSelectDropDown/MultiSelect";
import Icons from "@/shared/icons";

export interface FormData {
  [key: string]: string | number | boolean | string[];
}

type fieldTypes =
  | "dropDown"
  | "input"
  | "textarea"
  | "date"
  | "number"
  | "switch"
  | "file"
  | "multiSelect";

export interface IFormField {
  id: number | string;
  label: string;
  name: string;
  type: fieldTypes;
  options?: any[];
  maxLength?: number;
  valueKey?: string;
  labelKey?: string;
  needSearch?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  toggleType?: ToggleType;
  toggleSize?: ToggleSize;
  showTimePicker?: boolean;
  uploaderAccept?: string;
  uploaderMaxSize?: number;
  uploaderMultiple?: boolean;
  dependsOn?: string;
  clearOnDependencyChange?: boolean;
}

export interface IFormGroup {
  id: number | string;
  groupTitle?: string;
  description?: string;
  icon?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  columns?: 1 | 2 | 3 | 4;
  content: IFormField[];
}

interface IProps {
  title?: string;
  onSubmit?: () => void;
  onSecondarySubmit?: () => void;
  submitText?: string;
  secondBtnText?: string;
  groups: IFormGroup[];
  formData: FormData;
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleByKey?: (value: any, keys: string) => void;
  loading?: boolean;
  errors?: any;
  disableSubmit?: boolean;
  className?: string;
  secondaryBtnIcon?: string;
  borderLess?: boolean;
  handleChangeBoolean?: (value: boolean, key: string) => void;
}

const GroupedForm: React.FC<IProps> = ({
  title,
  submitText,
  onSecondarySubmit,
  onSubmit,
  secondBtnText,
  groups,
  formData,
  handleChange,
  handleByKey,
  loading,
  errors,
  disableSubmit,
  className,
  secondaryBtnIcon,
  borderLess,
  handleChangeBoolean,
}) => {
  const handleByKeyWithDependency = (value: any, key: string) => {
    handleByKey?.(value, key);
    groups.forEach((group) => {
      group.content.forEach((field) => {
        if (
          field.dependsOn === key &&
          field.clearOnDependencyChange !== false
        ) {
          handleByKey?.(field.type === "multiSelect" ? [] : "", field.name);
        }
      });
    });
  };
  const getGridColumns = (columns?: number) => {
    switch (columns) {
      case 1:
        return styles.gridCols1;
      case 3:
        return styles.gridCols3;
      case 4:
        return styles.gridCols4;
      default:
        return styles.gridCols2;
    }
  };

  const renderFormField = (field: IFormField) => {
    const fieldError = errors?.[field.name];
    const fullWidthClass = field.fullWidth ? styles.fullWidth : "";

    switch (field.type) {
      case "dropDown":
        return (
          <div key={field.id} className={fullWidthClass}>
            <DropDown
              key={field.id}
              label={field.label}
              options={field.options || []}
              selected={formData[field.name] as string | number}
              onChange={(value) => handleByKeyWithDependency(value, field.name)}
              error={fieldError}
              labelKey={field.labelKey}
              valueKey={field.valueKey}
              needSearch={field.needSearch}
              isLoading={field.isLoading}
              disabled={field.disabled}
              placeholder={field.placeholder || field.label}
            />
          </div>
        );

      case "multiSelect":
        return (
          <div key={field.id} className={fullWidthClass}>
            <MultiSelect
              label={field.label}
              options={field.options || []}
              onChange={(value) => handleByKey?.(value, field.name)}
              error={fieldError}
              labelKey={field.labelKey as string}
              valueKey={field.valueKey as string}
              disable={field.disabled}
              placeholder={field.placeholder || field.label}
              value={formData[field.name]}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={field.id} className={fullWidthClass}>
            <Textarea
              key={field.id}
              name={field.name.toString()}
              label={field.label}
              placeholder={field.placeholder || field.label}
              value={formData[field.name] as string | number}
              onChange={handleChange}
              maxLength={field.maxLength}
              disabled={field.disabled}
              error={fieldError}
              height={11}
            />
          </div>
        );

      case "switch":
        return (
          <div
            key={field.id}
            className={fullWidthClass}
            style={{ alignContent: "end" }}
          >
            <Toggle
              label={field.label}
              isOn={(formData[field.name] || false) as boolean}
              onToggle={(value) => handleChangeBoolean?.(value, field?.name)}
              type={field?.toggleType}
              size={field?.toggleSize}
              disable={field?.disabled}
            />
          </div>
        );

      case "file":
        return (
          <div key={field.id} className={fullWidthClass}>
            <FileUploader
              description={field?.label}
              onFilesChange={(files: File[]) =>
                handleByKey?.(files, field?.name)
              }
              accept={field?.uploaderAccept}
              maxSize={field?.uploaderMaxSize}
              multiple={field?.uploaderMultiple}
              validationError={fieldError}
              disabled={field?.disabled}
            />
          </div>
        );

      case "date":
        return (
          <div key={field.id} className={fullWidthClass}>
            <SingleDatePicker
              key={field.id}
              label={field.label}
              value={formData[field.name]}
              onChange={(value: any) => handleByKey?.(value, field?.name)}
              placeholder={field?.label}
              error={fieldError}
              showTimePicker={field?.showTimePicker}
            />
          </div>
        );

      default:
        return (
          <div key={field.id} className={fullWidthClass}>
            <Input
              key={field.id}
              name={field.name.toString()}
              label={field.label}
              type={field.type === "number" ? "number" : "text"}
              placeholder={field.placeholder || field.label}
              value={formData[field.name] as string | number}
              onChange={handleChange}
              maxLength={field.maxLength}
              disabled={field.disabled}
              error={fieldError}
            />
          </div>
        );
    }
  };

  const renderGroup = (group: IFormGroup, index: number) => {
    const gridClass = getGridColumns(group.columns);
    const isLastGroup = index === groups.length - 1;

    if (group.collapsible) {
      return (
        <>
          <Collapsible
            key={group.id}
            title={group.groupTitle}
            description={group.description}
            icon={group.icon}
            defaultOpen={group.defaultOpen}
          >
            <div className={`${styles.grid} ${gridClass}`}>
              {group.content.map(renderFormField)}
            </div>
          </Collapsible>
          {!isLastGroup && <div className={styles.divider} />}
        </>
      );
    }

    return (
      <div key={group.id} className={styles.group}>
        {group?.groupTitle && (
          <div className={styles.groupHeader}>
            <div className={styles.groupTitleRow}>
              {group.icon && (
                <div className={styles.groupIcon}>{group.icon}</div>
              )}
              <div>
                <div className={styles.groupTitle}>{group.groupTitle}</div>
                {group.description && (
                  <p className={styles.groupDescription}>{group.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className={`${styles.grid} ${gridClass}`}>
          {group.content.map(renderFormField)}
        </div>
        {!isLastGroup && <div className={styles.divider} />}
      </div>
    );
  };

  return (
    <div
      className={`${!borderLess ? styles.form : styles.formBorderLess} ${
        className || ""
      }`}
    >
      {title && (
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}

      <div className={styles.groupsWrapper}>{groups.map(renderGroup)}</div>

      {(onSecondarySubmit || onSubmit) && (
        <div className={styles.actionsWrapper}>
          <div className={styles.formActions}>
            {onSecondarySubmit && (
              <Button
                text={secondBtnText || "بازنشانی"}
                color="secondary"
                handleClick={onSecondarySubmit}
                width={8}
                height={2.5}
                icon={
                  secondaryBtnIcon && (
                    <Icons name={secondaryBtnIcon} color="#454444ff" isFill />
                  )
                }
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
        </div>
      )}
    </div>
  );
};

export default GroupedForm;
