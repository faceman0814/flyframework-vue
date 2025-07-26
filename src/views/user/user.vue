<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import dayjs from "dayjs";

import { $t, transformI18n } from "@/plugins/i18n";
import { useUser } from "./utils/hook";
// const treeRef = ref();
// const formRef = ref();
const tableRef = ref();

const {
  columns,
  pagination,
  handlePageChange,
  tableData,
  fetchData,
  openDialog
} = useUser(tableRef);

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
          @click="openDialog(row, 'operation.query', false)"
        >
          {{ transformI18n($t("operation.query")) }}
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click="openDialog(row, 'operation.query', true)"
          >{{ transformI18n($t("operation.edit")) }}</el-button
        >
      </template>
      <template #email="{ row }">
        <el-tag>{{ row.email }}</el-tag>
      </template>
      <template #creationTime="{ row }">
        {{ dayjs(row.creationTime as any).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #isActive="{ row }">
        <el-switch
          v-model="row.isActive"
          :active-value="true"
          :inactive-value="false"
        />
      </template>
    </pure-table>
  </div>
</template>
