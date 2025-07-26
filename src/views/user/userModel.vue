<script setup lang="ts">
import { ref, watch } from "vue";
import { $t, transformI18n } from "@/plugins/i18n";
import { useUser } from "./utils/hook";
import { formRules } from "./utils/rule";
// 声明 props 类型
export interface userFromProps {
  id?: string | undefined;
  isAdd?: boolean;
}
const ruleFormRef = ref();
function getRef() {
  return ruleFormRef.value;
}
defineExpose({ getRef });

const { getUserInfo, loading, entity } = useUser();

const props = withDefaults(defineProps<userFromProps>(), {
  id: "",
  isAdd: false
});

// 当props.id变化时重新获取数据
watch(
  () => props.id,
  newId => {
    if (newId) {
      getUserInfo(newId);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="!loading">
    <el-form
      ref="ruleFormRef"
      :model="entity"
      :rules="formRules"
      class="w-[400px]!"
      label-width="100px"
    >
      <el-form-item :label="transformI18n($t('user.userModel.userName'))">
        <el-input
          v-model="entity.userName"
          class="w-[220px]!"
          :placeholder="transformI18n($t('placeholder'))"
          :disabled="!props.isAdd"
        />
      </el-form-item>
      <el-form-item :label="transformI18n($t('user.userModel.fullName'))">
        <el-input
          v-model="entity.fullName"
          class="w-[220px]!"
          :placeholder="transformI18n($t('placeholder'))"
          :disabled="!props.isAdd"
        />
      </el-form-item>
      <el-form-item :label="transformI18n($t('user.userModel.email'))">
        <el-input
          v-model="entity.email"
          class="w-[220px]!"
          :placeholder="transformI18n($t('placeholder'))"
          :disabled="!props.isAdd"
        />
      </el-form-item>

      <el-form-item
        :label="transformI18n($t('user.userModel.phoneNumber'))"
        prop="phoneNumber"
      >
        <el-input
          v-model="entity.phoneNumber"
          class="w-[220px]!"
          :placeholder="transformI18n($t('placeholder'))"
          :disabled="!props.isAdd"
        />
      </el-form-item>
      <el-form-item :label="transformI18n($t('user.userModel.isActive'))">
        <el-switch
          v-model="entity.isActive"
          :active-value="true"
          :inactive-value="false"
          :disabled="!props.isAdd"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
