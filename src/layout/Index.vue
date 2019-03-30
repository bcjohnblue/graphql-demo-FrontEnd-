<template>
  <div>
    <el-header height="50px">
      <el-button type="text" @click="goto('product')">商品</el-button>
      <el-button type="text" @click="goto('cart')">購物車</el-button>
      <el-button type="text" @click="goto('register')">註冊</el-button>
      <el-button type="text" @click="logoutClick">登出</el-button>
    </el-header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {
  public goto(routeName: string): void {
    this.$router.push({ name: routeName });
  }

  public logoutClick(): void {
    this.$store.dispatch('logout')
    // this.$router.push({ name: 'login' })
  }
}
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
