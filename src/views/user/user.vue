<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  UserServiceProxy,
  GetUsersInput,
  type UserListDto
} from "@/shared/service-proxies/service-proxies";
import dayjs from "dayjs";
import { useBaseTable } from "@/mixins/baseTableMixin";

const tableData = ref<UserListDto[]>([]);
const service = new UserServiceProxy();

// 获取数据的方法
const fetchData = async () => {
  try {
    const input = new GetUsersInput();
    input.skipCount = (pagination.currentPage - 1) * pagination.pageSize;
    input.maxResultCount = pagination.pageSize;

    const res = await service.getPaged(input);

    if (res.data.columns) {
      columns.value = transformColumns(res.data.columns);
    }
    tableData.value = res.data.datas?.items || [];
    pagination.total = res.data.datas?.totalCount || 0;
  } catch (error) {
    console.error("数据加载失败:", error);
  }
};

// 初始化基类，传入数据获取函数
const { columns, pagination, transformColumns, handlePageChange } =
  useBaseTable(fetchData);

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <pure-table
      row-key="id"
      stripe
      border
      showOverflowTooltip
      :data="tableData"
      :columns="columns"
      :pagination="pagination"
      @page-change="handlePageChange"
    >
      <template #email="{ row }">
        <el-tag>{{ row.email }}</el-tag>
      </template>
      <template #creationTime="{ row }">
        {{ dayjs(row.creationTime as any).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </pure-table>
  </div>
</template>
