<script setup>
import { $AccountApi } from '@/api'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['refresh'])
defineExpose({ openDialog })

const accountRef = ref()
const dialogFlag = ref(false)
const accountForm = ref({
  id: undefined,
  phone: undefined,
  status: 1,
  remark: undefined,
  contact: undefined,
  merchantName: undefined
})

function closeDialog() {
  dialogFlag.value = false
}

async function openDialog(aid) {
  if (aid) {
    const res = await $AccountApi.getAccountInfo(aid)
    accountForm.value = res.data
  } else {
    accountForm.value = { status: 1 }
  }
  dialogFlag.value = true
}

async function onSubmit() {
  if (accountForm.value.id) {
    await $AccountApi.modifyAccount(accountForm.value)
    ElMessage.success('修改成功')
    emit('refresh')
    closeDialog()
  } else {
    await $AccountApi.createAccount(accountForm.value)
    ElMessage.success('添加成功')
    emit('refresh')
    closeDialog()
  }
}
</script>

<template>
  <el-dialog
    v-model="dialogFlag"
    title="账户信息"
    width="450"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="closeDialog"
  >
    <el-form :model="accountForm" ref="accountRef" label-width="80px">
      <el-form-item prop="phone" label="手机号">
        <el-input v-model="accountForm.phone" placeholder="请输入手机号" maxlength="20" />
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-radio-group v-model="accountForm.status">
          <el-radio :value="1">启用</el-radio>
          <el-radio :value="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input v-model="accountForm.remark" placeholder="请输入备注" style="width: 240px" :rows="2" type="textarea" />
      </el-form-item>
      <el-form-item prop="contact" label="联系人">
        <el-input v-model="accountForm.contact" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item prop="merchantName" label="商户">
        <el-input v-model="accountForm.merchantName" placeholder="请输入商户名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>
