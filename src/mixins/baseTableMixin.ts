// src/mixins/BaseTableMixin.ts
import { ref, reactive } from "vue";
import type { PaginationProps } from "element-plus";
import type { ColumnDto } from "@/shared/service-proxies/service-proxies";

export interface TableColumn {
  label: string;
  prop: string;
  slot?: string;
  [key: string]: any;
}

export const useBaseTable = (fetchDataCallback: () => Promise<void>) => {
  // 列配置
  const columns = ref<TableColumn[]>([]);

  // 分页配置
  const pagination = reactive<PaginationProps>({
    pageSize: 20,
    currentPage: 1,
    pageSizes: [1, 20, 40, 60, 50, 100],
    total: 0,
    // align: "right1",
    background: true,
    size: "default"
  } as any);

  /**
   * 转换列数据格式
   * @param columnsData 从API获取的列数据
   * @returns 转换后的列配置
   */
  const transformColumns = (columnsData: ColumnDto[]): TableColumn[] => {
    return columnsData.map((col: ColumnDto) => ({
      // label: col.label,
      // prop: col.prop,
      // slot: col.slot,
      ...col // 保留其他可能存在的属性
    }));
  };

  /**
   * 处理分页变化
   * @param newPagination 新的分页参数
   */
  const handlePageChange = (newPagination: PaginationProps) => {
    // 更新分页参数
    Object.assign(pagination, newPagination);
    fetchDataCallback();
  };

  return {
    columns,
    pagination,
    transformColumns,
    handlePageChange
  };
};
