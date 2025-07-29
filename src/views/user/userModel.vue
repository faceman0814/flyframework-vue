<script setup lang="ts">
import { ref, watch } from "vue";
import { $t, transformI18n } from "@/plugins/i18n";
import { useUser } from "./utils/hook";
import { formRules } from "./utils/rule";
import { UserDto } from "@/shared/service-proxies/service-proxies";
// 声明 props 类型
export interface userFromProps {
  isEdit?: boolean;
  entity: UserDto;
}
const ruleFormRef = ref();
function getRef() {
  return ruleFormRef.value;
}
defineExpose({ getRef });

const { loading } = useUser();

const props = withDefaults(defineProps<userFromProps>(), {
  isEdit: false,
  entity: null // 默认空对象
});
const entity = ref(props.entity);
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
          :disabled="!props.isEdit"
        />
      </el-form-item>
      <el-form-item :label="transformI18n($t('user.userModel.fullName'))">
        <el-input
          v-model="entity.fullName"
          class="w-[220px]!"
          :placeholder="transformI18n($t('placeholder'))"
          :disabled="!props.isEdit"
        />
      </el-form-item>
      <el-form-item :label="transformI18n($t('user.userModel.email'))">
        <el-input
          v-model="entity.email"
          class="w-[220px]!"
          :placeholder="transformI18n($t('placeholder'))"
          :disabled="!props.isEdit"
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
          :disabled="!props.isEdit"
        />
      </el-form-item>
      <el-form-item :label="transformI18n($t('user.userModel.isActive'))">
        <el-switch
          v-model="entity.isActive"
          :active-value="true"
          :inactive-value="false"
          :disabled="!props.isEdit"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
