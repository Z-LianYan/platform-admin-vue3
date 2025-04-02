<template>
  <!-- <el-upload
    ref="qiniu_upload"
    drag
    :action="upload_qiniu_url"
    :on-success="handleAddUploadSuccess"
    :on-error="handleUploadError"
    :auto-upload="true"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-progress="handleProgress"
    :data="qiniuData"
    :show-file-list="true"
    :limit="imageLimit"
    :multiple="true"
    :file-list="fileList"
    list-type="picture-card"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog :append-to-body="true" :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="" />
  </el-dialog> -->

  <el-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    :action="upload_qiniu_host"
    list-type="picture-card"
    :data="qiniuData"
    :auto-upload="true"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :on-success="handleAddUploadSuccess"
    :on-progress="handleProgress"
    :on-error="handleUploadError"
    :on-exceed="handleExceed"
    :limit="limit"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import * as qiniu from 'qiniu-js'
import dayjs from 'dayjs'

import { ElNotification, ElMessage, type UploadProps, type UploadUserFile } from 'element-plus'
const dialogImageUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)
const qiniuData = reactive<any>({
  key: '',
  token: '',
})

const upload_qiniu_host = ref<string>() //上传七牛url
const static_visit_host = ref<string>()

const useApp = useAppStore()
const fileList = computed<any[]>(() => props.modelValue)

onMounted(async () => {
  const qiniuToken: any = await useApp.getQiniuToken()
  qiniuData.token = qiniuToken.upload_token
  static_visit_host.value = qiniuToken.static_visit_host
  let qiniu_result = await qiniu.getUploadUrl(
    {
      useCdnDomain: true,
      region: qiniu.region.z2,
    },
    qiniuToken.upload_token,
  )
  upload_qiniu_host.value = qiniu_result
})

defineOptions({
  name: 'QiniuUpload',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})

const emit = defineEmits(['update:modelValue']) // 声明要触发的事件
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => {
      return []
    },
  },
  quality: {
    //图片压缩质量
    type: Number,
    default: 0.5,
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  maxWidth: {
    //压缩图片的最大宽度值
    type: Number,
    default: 720,
  },
  maxHeight: {
    //压缩图片的最大高度值
    type: Number,
    default: 720,
  },
  uploadPrefix: {
    type: String,
    default: '',
  },
  limit: {
    type: Number,
    default: 1,
  },
  compress: {
    type: Boolean,
    default: true,
  },
})
function emitInput(fileList: any[]) {
  let value = []
  for (let i = 0; i < fileList.length; i++) {
    value.push(fileList[i].url)
  }
  emit('update:modelValue', value)
}
function handleRemove(file: any, fileList: any) {
  //文件列表移除文件时的钩子
  emitInput(fileList)
}

function handlePreview(file: any) {
  //点击文件列表中已上传的文件时的钩子
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const uploadRef = ref()
async function beforeUpload(rawFile: any) {
  qiniuData.key =
    props.uploadPrefix +
    dayjs().format('YYYYMMDD') +
    '/' +
    dayjs().format('HHmmssSSS') +
    parseInt(String(Math.random() * 1000000)) +
    rawFile.type.replace('image/', '.')

  if (props.compress) {
    const compress_res: any = await qiniu.compressImage(rawFile, {
      quality: props.quality,
      maxWidth: props.maxWidth,
    })
    const newFile = new File([compress_res.dist], rawFile.name, {
      type: compress_res.dist.type,
      lastModified: Date.now(),
    })
    return newFile
  } else {
    return rawFile
  }
}
function handleProgress(event: any, file: any, fileList: any) {
  console.log('文件上传时的钩子', event, file, fileList)
}
function handleAddUploadSuccess(res: any, file: any, fileList: any) {
  console.log('成功======》〉》', res, file, fileList)
  const url = static_visit_host.value + '/' + res.key
  props.modelValue.push({ url })
}
function handleUploadError(err: any, file: any, fileList: any) {
  console.log('文件上传失败时的钩子', err, file, fileList)
}

function handleExceed(files: any, fileList: any) {
  ElMessage({
    message: `只能上传 ${props.limit} 张图片`,
    type: 'error',
  })
}
</script>

<style scoped lang="scss"></style>
