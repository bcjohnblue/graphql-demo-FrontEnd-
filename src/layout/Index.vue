<template>
  <div>
    <el-header height="50px">
      <el-button type="text" @click="">登出</el-button>
    </el-header>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
export default class Layout extends Vue { }
</script>

<style lang="scss" scoped>
.el-header {
  background-color: rgba(lightblue, 0.5);
  padding: 0px;

  display: flex;
  justify-content: flex-end;

  button {
    height: 50px;
    padding: 12px;
    border-radius: 0px;
    color: Navy;

    &:hover {
      background-color: rgba(PowderBlue, 1);
    }
  }
}
</style>
