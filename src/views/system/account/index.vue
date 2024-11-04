<script setup>
import { $AccountApi } from '@/api'
import AppContainer from '@/components/container'
import PaginationTable from '@/components/pagination-table'
import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
import AccountInfo from './account-info'

const dialogRef = ref()
const queryRef = ref()
const queryForm = ref({
  pageNo: 1,
  pageSize: 10,
  merchantName: undefined,
})

const tableData = ref([])
const loading = ref(false)
const pageInfo = ref({
  total: 0,
  current: undefined,
  pages: undefined,
})

function getRecords() {
  loading.value = true
  $AccountApi.getAccountList(queryForm.value).then((res) => {
    tableData.value = res.data.records
    pageInfo.value.total = res.data.total
    pageInfo.value.pageNo = res.data.pageNo
    pageInfo.value.pageSize = res.data.pageSize
    loading.value = false
  })
}

function handleQuery() {
  queryForm.value.pageNo = 1
  getRecords()
}

function handleReset() {
  queryRef.value.resetFields()
}

function handleAdd() {
  dialogRef.value.openDialog(null)
}

function handleEdit(aid) {
  dialogRef.value.openDialog(aid)
}

function handleRemove(aid) {
  ElMessageBox.confirm('确认删除账户?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      $AccountApi.removeAccount(aid).then(() => {
        ElMessage.success('删除成功')
        getRecords()
      })
    })
    .catch(() => {})
}

getRecords()
</script>

<template>
  <AppContainer>
    <template #action>
      <el-button type="primary" @click="handleAdd">
        <template #icon>
          <i-bi:person-plus />
        </template>
        新增商户
      </el-button>
    </template>
    <template #default>
      <el-form :inline="true" :model="queryForm" ref="queryRef">
        <el-form-item label="商户名称" prop="merchantName">
          <el-input
            v-model="queryForm.merchantName"
            placeholder="请输入商户名称"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            <template #icon>
              <i-bi:search />
            </template>
            查询
          </el-button>
          <el-button @click="handleReset">
            <template #icon>
              <i-bi:arrow-repeat />
            </template>
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <PaginationTable
        :tableData="tableData"
        :loading="loading"
        :pageInfo="pageInfo"
      >
        <el-table-column prop="id" label="账户ID" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status == 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="contact" label="联系人" />
        <el-table-column prop="merchantName" label="商户名称" />
        <el-table-column prop="isAdmin" label="管理员">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.isAdmin === 1">是</el-tag>
            <el-tag type="info" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="200">
          <template #default="scope">
            {{
              scope.row.createdAt
                ? dayjs(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
                : undefined
            }}
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" width="200">
          <template #default="scope">
            {{
              scope.row.updatedAt
                ? dayjs(scope.row.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                : undefined
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template #default="scope">
            <el-tooltip content="修改" placement="top" v-if="scope.row.id != 1">
              <el-button link type="primary" @click="handleEdit(scope.row.id)">
                <template #icon>
                  <i-bi:highlighter />
                </template>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" v-if="scope.row.id != 1">
              <el-button
                link
                type="primary"
                @click="handleRemove(scope.row.id)"
              >
                <template #icon>
                  <i-bi:trash />
                </template>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </PaginationTable>
      <AccountInfo ref="dialogRef" @refresh="getRecords" />
    </template>
  </AppContainer>
</template>
