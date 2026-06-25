import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./css/styles.module.css";
import StatusColor from "../statusColor/StatusColor";
import Pagination from "../pagination/Pagination";
import FadeInImage from "../image/image";
import TableShimmer from "./TableShimmer";
import Icons from "@/shared/icons";
import { ToastSuccess } from "@/utils/utils";
import useJalaliDate from "@/shared/hook/useJalaliDate";

import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import type { NestedAccessor, TableProps } from "./types/table";

const getNestedValue = (obj: any, accessor: NestedAccessor): any => {
  if (typeof accessor === "string") return obj[accessor];
  return accessor.reduce(
    (current, key) =>
      current && current[key] !== undefined ? current[key] : undefined,
    obj,
  );
};

const formatPrice = (value: number): string => value?.toLocaleString("fa-IR");
const formatDate = (isoDate: string) => useJalaliDate(isoDate)?.formattedDate();
const formatDateTime = (isoDate: string) =>
  useJalaliDate(isoDate)?.formattedDateTime();
const formatDateTimeFa = (isoDate: string) =>
  useJalaliDate(isoDate)?.formatFullFa();

const formatCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber?.replace(/\D/g, "");
  const formatted = cleaned?.match(/.{1,4}/g);
  return formatted ? formatted.join("   ") : cardNumber;
};

const copyToClipboard = (value: string) => {
  navigator.clipboard
    .writeText(value)
    .then(() => ToastSuccess("کپی شد"))
    .catch((err) => console.error("Failed to copy: ", err));
};

const toId = (item: any, index: number): string =>
  String(item?.id ?? item?._id ?? index);


const DragHandleIcon: React.FC<{ color?: string }> = ({ color = "#bbb" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
  >
    <circle cx="5.5" cy="4" r="1.2" fill={color} />
    <circle cx="10.5" cy="4" r="1.2" fill={color} />
    <circle cx="5.5" cy="8" r="1.2" fill={color} />
    <circle cx="10.5" cy="8" r="1.2" fill={color} />
    <circle cx="5.5" cy="12" r="1.2" fill={color} />
    <circle cx="10.5" cy="12" r="1.2" fill={color} />
  </svg>
);


interface SortableRowProps {
  id: string;
  item: any;
  index: number;
  columns: any[];
  buttonRenderer?: (item: any) => React.ReactNode;
  onRowClick?: (item: any) => void;
  gapSize: number;
  textAlign: "right" | "left" | "center";
  renderCellValue: (column: any, item: any, index: number) => React.ReactNode;
  isOverlay?: boolean;
}

const SortableRow: React.FC<SortableRowProps> = ({
  id,
  item,
  index,
  columns,
  buttonRenderer,
  onRowClick,
  gapSize,
  textAlign,
  renderCellValue,
  isOverlay = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const rowStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    borderBottomWidth: `${gapSize}px`,
    background: isOverlay ? "var(--dnd-overlay-bg, #f0f4ff)" : undefined,
    boxShadow: isOverlay ? "0 4px 20px rgba(99,102,241,0.18)" : undefined,
  };

  return (
    <tr
      ref={setNodeRef}
      style={rowStyle}
      className={styles.tableRow}
      onClick={() => !isDragging && onRowClick?.(item)}
    >
      {/* handle */}
      <td
        className={styles.tableCell}
        style={{ width: 36, textAlign: "center", cursor: "grab" }}
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
      >
        <DragHandleIcon color={isOverlay ? "#6366f1" : "#bbb"} />
      </td>

      {columns?.map((column) => (
        <td
          key={
            Array.isArray(column.accessor)
              ? column.accessor.join(".")
              : column.accessor
          }
          className={styles.tableCell}
          style={{ textAlign }}
        >
          {renderCellValue(column, item, index)}
        </td>
      ))}

      {buttonRenderer && (
        <td className={styles.tableCell}>
          <div className={styles.buttonGroup}>
            <div className={styles.buttonRenderer}>{buttonRenderer(item)}</div>
          </div>
        </td>
      )}
    </tr>
  );
};


interface SortableMobileCardProps {
  id: string;
  item: any;
  index: number;
  columns: any[];
  buttonRenderer?: (item: any) => React.ReactNode;
  onRowClick?: (item: any) => void;
  renderCellValue: (column: any, item: any, index: number) => React.ReactNode;
  isOverlay?: boolean;
}

const SortableMobileCard: React.FC<SortableMobileCardProps> = ({
  id,
  item,
  index,
  columns,
  buttonRenderer,
  onRowClick,
  renderCellValue,
  isOverlay = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const cardStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    background: isOverlay ? "var(--dnd-overlay-bg, #f0f4ff)" : undefined,
    boxShadow: isOverlay ? "0 4px 20px rgba(99,102,241,0.18)" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={cardStyle}
      className={styles.mobileCard}
      onClick={() => !isDragging && onRowClick?.(item)}
    >
      <div
        className={styles.dragHandle}
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
      >
        <DragHandleIcon color={isOverlay ? "#6366f1" : "#aaa"} />
      </div>

      {columns?.map((column) => (
        <div
          key={
            Array.isArray(column.accessor)
              ? column.accessor.join(".")
              : column.accessor
          }
          className={styles.mobileCardRow}
          style={{ flexDirection: column?.column ? "column" : "row" }}
        >
          <span
            className={styles.mobileCardLabel}
            style={{ width: column?.column ? "100%" : "initial" }}
          >
            {column.header}:
          </span>
          <span
            className={styles.mobileCardValue}
            style={{ width: column?.column ? "100%" : "initial" }}
          >
            {renderCellValue(column, item, index)}
          </span>
        </div>
      ))}

      {buttonRenderer && (
        <div className={styles.mobileCardActions}>{buttonRenderer(item)}</div>
      )}
    </div>
  );
};


const Table: React.FC<TableProps> = ({
  title,
  columns,
  data,
  buttonRenderer,
  onRowClick,
  paginationInfo,
  onPageChange,
  loading,
  gapSize = 1,
  textAlign = "right",
  headerBtn,
  headerIcon,
  mode = "view",
  onReorder,
  emptyMessage = "اطلاعاتی برای نمایش وجود ندارد.",
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [localData, setLocalData] = useState<any[]>(data ?? []);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setLocalData(data ?? []);
  }, [data]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
  );

  const ids = localData.map(toId);

  const handleDragStart = (e: DragStartEvent) =>
    setActiveId(String(e.active.id));

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    const updated = arrayMove(localData, oldIndex, newIndex);
    setLocalData(updated);
    onReorder?.(updated);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0.35" } },
    }),
  };

  const renderCellValue = (
    column: any,
    item: any,
    index: number,
  ): React.ReactNode => {
    const value = getNestedValue(item, column.accessor);
    let renderedValue: React.ReactNode = value;

    if (column?.type) {
      switch (column.type) {
        case "price":
          renderedValue = formatPrice(value);
          break;
        case "date":
          renderedValue = formatDate(value);
          break;
        case "dateTime":
          renderedValue = formatDateTime(value);
          break;
        case "dateTimeFa":
          renderedValue = formatDateTimeFa(value);
          break;
        case "badge":
          renderedValue = (
            <div
              style={{
                display: "flex",
                justifyContent: isMobile
                  ? "flex-end"
                  : textAlign === "center"
                    ? "center"
                    : "flex-start",
              }}
            >
              <StatusColor status={value} fontSize={0.75} />
            </div>
          );
          break;
        case "image":
          renderedValue =
            value === "logo-url" ? null : (
              <FadeInImage src={value} width={25} height={25} />
            );
          break;
        case "cardNo":
          renderedValue = (
            <div
              className={styles.cardNo}
              onClick={() => copyToClipboard(value)}
              style={{
                margin: isMobile
                  ? "0"
                  : textAlign === "center"
                    ? "0 auto"
                    : "0",
              }}
            >
              <span>{formatCardNumber(value)}</span>
              <Icons name="copy" color="#aaaaaaff" size={18} cursor="pointer" />
            </div>
          );
          break;
        case "copy":
          renderedValue = (
            <div
              className={styles.copy}
              onClick={() => copyToClipboard(value)}
              style={{
                margin: isMobile
                  ? "0"
                  : textAlign === "center"
                    ? "0 auto"
                    : "0",
              }}
            >
              <span>{value}</span>
              <Icons name="copy" color="#aaaaaaff" size={18} cursor="pointer" />
            </div>
          );
          break;
        default:
          renderedValue = value;
      }
    } else if (column.render) {
      renderedValue = column.render(value, item, index);
    }

    return renderedValue ?? "-";
  };

  if (loading) {
    return (
      <div className={styles.card}>
        <TableShimmer
          columns={columns}
          hasActions={!!buttonRenderer}
          paginationInfo={!!paginationInfo}
        />
      </div>
    );
  }

  const activeIndex = activeId !== null ? ids.indexOf(activeId) : -1;
  const activeItem = activeIndex !== -1 ? localData[activeIndex] : null;

  if (isMobile) {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            {headerIcon && headerIcon}
            {title}
          </h2>
          {headerBtn && headerBtn}
        </div>
        <div className={styles.mobileCardContainer}>
          {mode === "edit" ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
              <SortableContext
                items={ids}
                strategy={verticalListSortingStrategy}
              >
                {localData.map((item, index) => (
                  <SortableMobileCard
                    key={toId(item, index)}
                    id={toId(item, index)}
                    item={item}
                    index={index}
                    columns={columns}
                    buttonRenderer={buttonRenderer}
                    onRowClick={onRowClick}
                    renderCellValue={renderCellValue}
                  />
                ))}
              </SortableContext>
              <DragOverlay dropAnimation={dropAnimation}>
                {activeItem ? (
                  <SortableMobileCard
                    id={activeId!}
                    item={activeItem}
                    index={activeIndex}
                    columns={columns}
                    buttonRenderer={buttonRenderer}
                    renderCellValue={renderCellValue}
                    isOverlay
                  />
                ) : null}
              </DragOverlay>
            </DndContext>
          ) : (
            localData?.map((item, index) => (
              <div
                key={index}
                className={styles.mobileCard}
                style={{ cursor: onRowClick ? "pointer" : "initial" }}
                onClick={() => onRowClick?.(item)}
              >
                {columns?.map((column) => (
                  <div
                    key={
                      Array.isArray(column.accessor)
                        ? column.accessor.join(".")
                        : column.accessor
                    }
                    className={styles.mobileCardRow}
                    style={{ flexDirection: column?.column ? "column" : "row" }}
                  >
                    <span
                      className={styles.mobileCardLabel}
                      style={{ width: column?.column ? "100%" : "initial" }}
                    >
                      {column.header}:
                    </span>
                    <span
                      className={styles.mobileCardValue}
                      style={{ width: column?.column ? "100%" : "initial" }}
                    >
                      {renderCellValue(column, item, index)}
                    </span>
                  </div>
                ))}
                {buttonRenderer && (
                  <div className={styles.mobileCardActions}>
                    {buttonRenderer(item)}
                  </div>
                )}
              </div>
            ))
          )}
          {(!localData || localData.length === 0) && (
            <div className={styles.emptyMessage}>
              <Icons name="exclamation-circle" size={26} color="#000" />
              {emptyMessage}
            </div>
          )}
        </div>
        {paginationInfo && (
          <div className={styles.tableFooter}>
            <Pagination
              currentPage={paginationInfo?.currentPage}
              totalPage={paginationInfo?.totalPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>
          {headerIcon && headerIcon}
          {title}
        </h2>
        {headerBtn && headerBtn}
      </div>
      <div className={styles.cardContent}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              {mode === "edit" && (
                <th className={styles.tableHeaderCell} style={{ width: 36 }} />
              )}
              {columns.map((column) => (
                <th
                  key={
                    Array.isArray(column.accessor)
                      ? column.accessor.join(".")
                      : column.accessor
                  }
                  className={styles.tableHeaderCell}
                  style={{ textAlign }}
                >
                  {column.header}
                </th>
              ))}
              {buttonRenderer && <th className={styles.tableHeaderCell} />}
            </tr>
          </thead>

          {mode === "edit" ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
              <SortableContext
                items={ids}
                strategy={verticalListSortingStrategy}
              >
                <tbody>
                  {localData.map((item, index) => (
                    <SortableRow
                      key={toId(item, index)}
                      id={toId(item, index)}
                      item={item}
                      index={index}
                      columns={columns}
                      buttonRenderer={buttonRenderer}
                      onRowClick={onRowClick}
                      gapSize={gapSize}
                      textAlign={textAlign}
                      renderCellValue={renderCellValue}
                    />
                  ))}
                </tbody>
              </SortableContext>
              <DragOverlay dropAnimation={dropAnimation}>
                {activeItem ? (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <SortableRow
                        id={activeId!}
                        item={activeItem}
                        index={activeIndex}
                        columns={columns}
                        buttonRenderer={buttonRenderer}
                        gapSize={gapSize}
                        textAlign={textAlign}
                        renderCellValue={renderCellValue}
                        isOverlay
                      />
                    </tbody>
                  </table>
                ) : null}
              </DragOverlay>
            </DndContext>
          ) : (
            <tbody>
              {localData?.map((item, index) => (
                <tr
                  key={index}
                  className={styles.tableRow}
                  style={{
                    cursor: onRowClick ? "pointer" : "initial",
                    borderBottomWidth: `${gapSize}px`,
                  }}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns?.map((column) => (
                    <td
                      key={
                        Array.isArray(column.accessor)
                          ? column.accessor.join(".")
                          : column.accessor
                      }
                      className={styles.tableCell}
                      style={{ textAlign }}
                    >
                      {renderCellValue(column, item, index)}
                    </td>
                  ))}
                  {buttonRenderer && (
                    <td className={styles.tableCell}>
                      <div className={styles.buttonGroup}>
                        <div className={styles.buttonRenderer}>
                          {buttonRenderer(item)}
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {(!localData || localData.length === 0) && (
          <div className={styles.emptyMessage}>
            <Icons name="exclamation-circle" size={26} color="#000" />
            {emptyMessage}
          </div>
        )}
      </div>

      {paginationInfo && (
        <div className={styles.tableFooter}>
          <Pagination
            currentPage={paginationInfo?.currentPage}
            totalPage={paginationInfo?.totalPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
