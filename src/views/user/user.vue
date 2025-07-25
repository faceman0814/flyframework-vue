<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import {
  UserServiceProxy,
  GetUsersInput,
  type UserListDto
} from "@/shared/service-proxies/service-proxies";
import dayjs from "dayjs";
import { useBaseTable } from "@/mixins/baseTableMixin";
import { $t, transformI18n } from "@/plugins/i18n";
import { addDialog } from "@/components/ReDialog";
import userModel from "./userModel.vue";
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

function handleClick(row, name) {
  addDialog({
    title: transformI18n($t(name)),
    //可拖拽
    draggable: true,
    //传组件进入模态框
    contentRenderer: () => userModel,
    //传递参数
    props: {
      // 赋默认值
      entity: row
    }
  });
}
</script>

<template>
  <div>
    <pure-table
      row-key="id"
      stripe
      border
      showOverflowTooltip
      :default-sort="{ prop: 'name', order: 'ascending' }"
      :data="tableData"
      :columns="columns"
      :pagination="pagination"
      @page-change="handlePageChange"
    >
      <template #opertion="{ row }">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleClick(row, 'operation.query')"
        >
          {{ transformI18n($t("operation.query")) }}
        </el-button>
        <el-button link type="primary" size="small">{{
          transformI18n($t("operation.edit"))
        }}</el-button>
      </template>
      <template #email="{ row }">
        <el-tag>{{ row.email }}</el-tag>
      </template>
      <template #creationTime="{ row }">
        {{ dayjs(row.creationTime as any).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </pure-table>
  </div>
</template>
