<template>
  <div id="login_main">
    <h1>登入</h1>
    <el-card class="login-box">
      <!-- card body -->
      <div>
        <el-form
          :model="form.data"
          :rules="form.rules"
          :ref="form.attrs.ref"
          v-bind="form.attrs"
        >
          <el-form-item prop="Account">
            <el-input
              v-model="form.data.Account"
              placeholder="請輸入帳號"
              style="width: 80%;"
            ></el-input>
          </el-form-item>
          <el-form-item prop="Password">
            <el-input
              v-model="form.data.Password"
              placeholder="請輸入密碼"
              style="width: 80%;"
              type="password"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="login-button"
            :loading="btn.loading"
            @click="loginClick"
            >登入</el-button
          >
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
interface Form {
  data: { Account: string, Password: string };
  attrs: {};
  rules: { Account: object[], Password: object[] };
}

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  public btn: {} = {
    loading: false
  };

  public form: Form = {
    data: {
      Account: '',
      Password: ''
    },
    attrs: {
      labelWidth: '100px',
      labelPosition: 'top',
      ref: 'loginForm'
    },
    rules: {
      Account: [
        {
          required: true,
          message: '請輸入帳號',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 50,
          message: '帳號長度必須在6~50字元',
          trigger: 'blur'
        }
      ],
      Password: [
        {
          required: true,
          message: '請輸入密碼',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 16,
          message: '密碼長度必須在6~16字元',
          trigger: 'blur'
        }
      ]
    }
  };

  public setForm() {
    // this.form = {};
  }

  public loginClick() {

  }
}
</script>

<style lang="scss" scoped>
$input_width: 80%;

#login_main {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 500px;

  h1 {
    font-size: 1.67em;
    letter-spacing: 0.36em;
    color: Navy;
    margin-bottom: 30px;
  }

  .login-box {
    width: 480px;
    height: 400px;
    // padding: 30px;
    padding-top: 60px;
    margin-left: -12px;
    box-sizing: border-box;
    background-color: #d6ebf2;

    /deep/ .el-form-item {
      margin-top: 32px;

      .el-input {
        width: $input_width;
      }

      .el-form-item__error {
        left: calc((100% - #{$input_width}) / 2);
      }
    }
  }
}
</style>
