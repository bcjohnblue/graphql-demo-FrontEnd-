<template>
  <div id="login_main">
    <h1>登入</h1>
    <el-card class="login-box">
      <!-- card body -->
      <div>
        <el-form :model="form.data" :rules="form.rules" :ref="form.attrs.ref" v-bind="form.attrs">
          <el-form-item prop="email">
            <el-input v-model="form.data.email" placeholder="請輸入帳號" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.data.password"
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
          >登入</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
interface Form {
  data: {
    email: string,
    password: string
  };
  attrs: {
    [propName: string]: any;
  };
  rules: {
    email: object[],
    password: object[]
  };
}

import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  public btn: { loading: boolean } = {
    loading: false
  };

  public form: Form = {
    data: {
      email: '',
      password: ''
    },
    attrs: {
      labelWidth: '100px',
      labelPosition: 'top',
      ref: 'loginForm'
    },
    rules: {
      email: [
        {
          required: true,
          message: '請輸入帳號',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: '請輸入有效的電子郵件',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 50,
          message: '帳號長度必須在6~50字元',
          trigger: 'blur'
        }
      ],
      password: [
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

  public mounted() {
    // window.login = this;

  }

  public setForm() {
    // this.form = {};
  }

  public async loginClick() {
    try {
      const ref = this.form.attrs.ref;

      await (this.$refs[ref] as Vue & { validate: () => boolean }).validate();
      this.btn.loading = true;
      const response = await this.login();
      this.$store.dispatch('saveUserInfo', response.data.login)
      this.btn.loading = false;

      this.$router.push({ name: 'product' })
      console.log(response);
    } catch (err) {
      if (!err) return;
      console.log(err);
      this.btn.loading = false;
      this.$message.error(err.message);
    }
  }

  public login() {
    const { email, password } = this.form.data;

    return this.$apollo.mutate({
      mutation: gql`mutation ($email: String!, $password: String!) {
          login(loginInput: {email: $email, password: $password}) {
            name
            userId
            token
          }
        }`,
      variables: {
        email,
        password
      }
    });
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
