<template>
  <div class="login-container">
    <!-- 顶部 -->
    <div class="absolute-lt flex-x-end p-3 w-full">
      <el-switch
        v-model="isDark"
        inline-prompt
        active-icon="Moon"
        inactive-icon="Sunny"
        @change="toggleTheme"
      />
      <lang-select class="ml-2 cursor-pointer" />
    </div>
    <!-- 登录表单 -->
    <el-card class="!border-none !bg-transparent !rounded-4% w-100 <sm:w-85">
      <div class="text-center relative">
        <h2>{{ showSystemName() }}</h2>
        <el-tag class="ml-2 absolute-rt">{{ defaultSettings.version }}</el-tag>
      </div>

      <el-form ref="loginFormRef" :model="loginData" :rules="loginRules" class="login-form">
        <!-- 用户名 -->
        <el-form-item prop="phone">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="user" class="mx-2" />
            <el-input
              type="tel"
              maxlength="11"
              ref="phone"
              v-model="loginData.phone"
              :placeholder="$t('login.phone')"
              name="phone"
              size="large"
              class="h-[48px]"
            />
          </div>
        </el-form-item>

        <!-- 密码 -->
        <el-tooltip :visible="isCapslock" :content="$t('login.capsLock')" placement="right">
          <el-form-item prop="password">
            <div class="flex-y-center w-full">
              <svg-icon icon-class="lock" class="mx-2" />
              <el-input
                v-model="loginData.password"
                :placeholder="$t('login.password')"
                type="password"
                name="password"
                @keyup="checkCapslock"
                @keyup.enter="handleLogin"
                size="large"
                class="h-[48px] pr-2"
                show-password
              />
            </div>
          </el-form-item>
        </el-tooltip>

        <!-- 验证码 -->
        <el-form-item prop="captchaCode">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="captcha" class="mx-2" />
            <el-input
              v-model="loginData.captchaCode"
              auto-complete="off"
              size="large"
              class="flex-1"
              :placeholder="$t('login.captchaCode')"
              @keyup.enter="handleLogin"
              maxlength="4"
            />

            <el-image
              @click="getCaptcha"
              :src="captchaBase64"
              class="rounded-tr-md rounded-br-md cursor-pointer h-[48px]"
            />
          </div>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-button
          :loading="loading"
          type="primary"
          size="large"
          class="w-full"
          @click.prevent="handleLogin"
          >{{ $t('login.login') }}
        </el-button>

        <!-- 账号密码提示 -->
        <!-- <div class="mt-10 text-sm">
          <span>{{ $t('login.phone') }}: admin</span>
          <span class="ml-4"> {{ $t('login.password') }}: 123456</span>
        </div> -->
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const value1 = ref(true)
import { useSettingsStore, useAdminStore, usePermissionStore } from '@/store'
import type { LoginData } from '@/api/auth/model'
import type { FormInstance } from 'element-plus'
import { useRoute } from 'vue-router'
import type { LocationQuery, LocationQueryValue } from 'vue-router'
import router from '@/router'
import defaultSettings from '@/settings'
import { ThemeEnum } from '@/enums/ThemeEnum'
import type { RouteRecordRaw } from 'vue-router'
const settingsStore = useSettingsStore()
const adminStore = useAdminStore()

// Internationalization
const { t, te } = useI18n()

// Reactive states
const isDark = ref(settingsStore.theme === ThemeEnum.DARK)
const icpVisible = ref(true)
const loading = ref(false) // 按钮loading
const isCapslock = ref(false) // 是否大写锁定
const captchaBase64 = ref() // 验证码图片Base64字符串
const loginFormRef = ref<FormInstance>() // 登录表单ref
const { height } = useWindowSize()

const loginData = ref<LoginData>({
  phone: '13536681616',
  password: '123456',
  captchaKey: '',
  captchaCode: '',
})

const loginRules = computed(() => {
  return {
    phone: [
      {
        required: true,
        trigger: 'blur',
        message: t('login.message.phone.required'),
      },
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        message: t('login.message.password.required'),
      },
      {
        min: 6,
        message: t('login.message.password.min'),
        trigger: 'blur',
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: 'blur',
        message: t('login.message.captchaCode.required'),
      },
    ],
  }
})
function showSystemName() {
  // 判断是否存在国际化配置，如果没有原生返回
  const hasKey = te('common.system_name')
  if (hasKey) {
    const translatedTitle = t('common.system_name')
    return translatedTitle
  }
  return defaultSettings.title || ''
}
/** 获取验证码 */
function getCaptcha() {
  adminStore.getCaptcha().then((response: any) => {
    loginData.value.captchaKey = response.data.captchaKey
    captchaBase64.value = response.data.captchaBase64
  })
}
const permissionStore = usePermissionStore()

/** 登录 */
const route = useRoute()
function handleLogin() {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      adminStore
        .login(loginData.value)
        .then(async (data) => {
          nextTick(async () => {
            const query: LocationQuery = route.query
            const redirect = (query.redirect as LocationQueryValue) ?? '/'
            const otherQueryParams = Object.keys(query).reduce((acc: any, cur: string) => {
              if (cur !== 'redirect') {
                acc[cur] = query[cur]
              }
              return acc
            }, {})
            router.push({ path: redirect, query: otherQueryParams })
          })
        })
        .catch(() => {
          getCaptcha()
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}

/** 主题切换 */
const toggleTheme = () => {
  const newTheme = settingsStore.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
  settingsStore.changeTheme(newTheme)
}

/** 根据屏幕宽度切换设备模式 */
watchEffect(() => {
  if (height.value < 600) {
    icpVisible.value = false
  } else {
    icpVisible.value = true
  }
})

/** 检查输入大小写 */
function checkCapslock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState('CapsLock')
  }
}

onMounted(() => {
  getCaptcha()
})
</script>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;
.abc {
  background: red;
}
html.dark .login-container {
  background: url('@/assets/images/login-bg-dark.jpg') no-repeat center right;
}

.login-container {
  overflow-y: auto;
  background: url('@/assets/images/login-bg.jpg') no-repeat center right;

  @apply wh-full flex-center;

  .login-form {
    padding: 30px 10px;
  }
}

.el-form-item {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}
</style>
