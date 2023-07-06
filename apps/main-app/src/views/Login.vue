<script setup lang="ts">
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>

<template>
  <div class="login-box">
    <div class="logo">
      <img src="../assets/logo.png" alt="logo">
    </div>
    <div class="login-container">
      <a-card style="width: 500px" title="ADui Admin">
        <a-form
            :model="formState"
            name="normal_login"
            class="login-form"
            hideRequiredMark
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
          <a-form-item
              label="Username"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon"/>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
              label="Password"
              name="password"
              :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon"/>
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">Forgot password</a>
          </a-form-item>

          <a-form-item>
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
              Log in
            </a-button>
            Or
            <a href="">register now!</a>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.login-box {
  width: 100%;
  height: 100vh;
  display: flex;

  .logo {
    flex: 2;
    background-color: #041527;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      width: 100%;

      &:hover {
        animation: rotate 2s linear 0s infinite alternate;
      }
    }
  }

  .login-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .ant-card {
    }
  }
}
</style>
