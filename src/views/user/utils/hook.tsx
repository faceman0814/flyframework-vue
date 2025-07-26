import {
  GetUsersInput,
  type IUserDto,
  type UserListDto,
  UserServiceProxy
} from "@/shared/service-proxies/service-proxies";
import { $t, transformI18n } from "@/plugins/i18n";
import { addDialog } from "@/components/ReDialog";
import userModel from "../userModel.vue";
import { ElLoading } from "element-plus";
import { message } from "@/utils/message";
import { type Ref, ref, h } from "vue";
import { useBaseTable } from "@/mixins/baseTableMixin";
export function useUser(tableRef?: Ref) {
  // 定义表单引用类型（根据实际组件调整）
  // type UserModelFormRef = InstanceType<typeof userModel>["getRef"];

  let loadingInstance: ReturnType<typeof ElLoading.service>;
  const entity = ref<IUserDto>();
  const formRef = ref();
  // const ruleFormRef = ref();
  // const ruleFormRef = ref<UserModelFormRef>(); // 明确类型
  const selectedNum = ref(0);
  const loading = ref(false);
  const tableData = ref<UserListDto[]>([]);
  const service = new UserServiceProxy();

  // 初始化基类，传入数据获取函数
  const { columns, pagination, transformColumns, handlePageChange } =
    useBaseTable(fetchData);

  // 获取数据的方法
  async function fetchData() {
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
  }
  /** 取消选择 */
  function onSelectionCancel() {
    selectedNum.value = 0;
    // 用于多选表格，清空用户的选择
    tableRef.value.getTableRef().clearSelection();
  }

  function openDialog(row, name, opertion) {
    addDialog({
      title: transformI18n($t(name)),
      //可拖拽
      draggable: true,
      //传组件进入模态框
      contentRenderer: () =>
        h(userModel, {
          ref: formRef
        }),
      //传递参数
      props: {
        id: row.id,
        isAdd: opertion
      },
      popconfirm: opertion ? { title: "是否确认修改当前数据" } : null,
      beforeSure: done => {
        const FormRef = formRef.value.getRef();
        FormRef.validate(valid => {
          if (valid) {
            submitForm();
            done(); // 关闭弹框
            // onSearch(); // 刷新表格数据
            // fetchData();
          }
        });
      }
    });
  }

  async function getUserInfo(id: string) {
    try {
      loading.value = true;
      loadingInstance = ElLoading.service({
        lock: true,
        text: transformI18n($t("loading")),
        background: "rgba(0, 0, 0, 0.7)"
      });
      const user = await service.getUserInfo(id);
      entity.value = { ...user.data };
    } catch (error) {
      message("获取用户详情失败:" + error, {
        customClass: "el",
        type: "error"
      });
    } finally {
      loading.value = false;
      loadingInstance?.close();
    }
  }
  async function submitForm() {
    try {
      loading.value = true;
      loadingInstance = ElLoading.service({
        lock: true,
        text: transformI18n($t("loading")),
        background: "rgba(0, 0, 0, 0.7)"
      });
      debugger;
    } catch (error) {
      message("操作失败:" + error, { type: "error" });
    } finally {
      loading.value = false;
      loadingInstance?.close();
    }
  }

  return {
    fetchData,
    pagination,
    transformColumns,
    handlePageChange,
    formRef,
    tableData,
    columns,
    onSelectionCancel,
    openDialog,
    getUserInfo,
    loading,
    entity
  };
}
