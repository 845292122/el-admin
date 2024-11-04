<script setup>
import AppContainer from '@/components/container'
import BaseInfo from './base-info'
import Secure from './secure'
</script>

<template>
  <AppContainer>
    <el-card>
      <el-tabs tab-position="left">
        <el-tab-pane label="基本信息">
          <BaseInfo />
        </el-tab-pane>
        <el-tab-pane label="安全设置">
          <Secure />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </AppContainer>
</template>

<style lang="scss" scoped></style>
