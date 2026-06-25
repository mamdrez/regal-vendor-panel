export type NestedAccessor = string | string[];

export interface TableColumn {
  header: string;
  accessor: NestedAccessor;
  type?: string;
  render?: (
    value: any,
    item: Record<string, any>,
    index: number,
  ) => React.ReactNode;
  column?: boolean;
}

export interface TableProps {
  title: string;
  headerIcon?: React.ReactNode;
  headerBtn?: React.ReactNode;
  columns: TableColumn[];
  data: Record<string, any>[];
  buttonRenderer?: (item: Record<string, any>) => React.ReactNode;
  onRowClick?: (item: any) => void;
  onPageChange?: (value: number) => void;
  paginationInfo?: {
    currentPage: number;
    totalPage: number;
    totalCount: number;
    data?: any;
  };
  loading?: boolean;
  gapSize?: number;
  textAlign?: "left" | "center" | "right";
  mode?: "view" | "edit";
  onReorder?: (newData: any[]) => void;
  emptyMessage?: string;
}
