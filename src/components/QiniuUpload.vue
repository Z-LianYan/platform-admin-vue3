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
    v-model:file-list="fileList"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
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
import type { UploadProps, UploadUserFile } from 'element-plus'
const dialogImageUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)
const qiniuData = reactive<any>({
  key: '',
  token: '',
})
const beforeUploadNum = ref<number>(0)
const uploadSuccessNum = ref<number>(0)

const upload_qiniu_url = ref<string>() //上传七牛url
const upload_qiniu_addr = ref<string>()

const useApp = useAppStore()

const fileList = reactive<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-1.png',
    url: '/images/plant-1.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-2.png',
    url: '/images/plant-2.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'figure-1.png',
    url: '/images/figure-1.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'figure-2.png',
    url: '/images/figure-2.png',
  },
])
onMounted(async () => {
  const qiniuToken: any = await useApp.getQiniuToken()
  console.log('qiniuToken===>>', qiniuToken.upload_token)
  qiniuData.token = qiniuToken.upload_token
})

defineOptions({
  name: 'QiniuUpload',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})
const props = defineProps({
  // iconClass: {
  //   type: String,
  //   required: false,
  //   default: '',
  // },
  value: Array,
  quality: {
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
    type: Number,
    default: 720,
  },
  uploadPrefix: {
    type: String,
    default: '',
  },
  imageLimit: {
    type: Number,
    default: 2,
  },
  compress: {
    type: Boolean,
    default: true,
  },
})

function handleRemove(file: any, fileList: any) {
  // this.emitInput(fileList);
}

function handlePreview(file: any) {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

async function beforeUpload(file: any) {
  console.log('beforeUpload---上传前', file)
  beforeUploadNum.value += 1
  return new Promise((resolve, reject) => {
    resolve(false)
    if (props.compress) {
      // qiniu
      //   .compressImage(file, {
      //     quality: this.quality,
      //     maxWidth: this.maxWidth, //720,
      //   })
      //   .then((compress_res) => {
      //     // this.$store.dispatch("sourceManager/getUploadQiNiuToken").then(res => {
      //     // this.qiniuData.token = res.upload_token;
      //     this.qiniuData.key =
      //       this.uploadPrefix +
      //       dayjs().format('YYYYMMDDHHmmss') +
      //       parseInt(Math.random() * 1000000) +
      //       file.type.replace('image/', '.')
      //     // this.upload_qiniu_addr = res.static_host;
      //     resolve(compress_res.dist)
      //     // });
      //   })
    } else {
      // this.qiniuData.key =
      //   this.uploadPrefix +
      //   dayjs().format('YYYYMMDDHHmmss') +
      //   parseInt(Math.random() * 1000000) +
      //   file.type.replace('image/', '.')
      // resolve(file)
    }
  })
}
function handleProgress(event: any, file: any, fileList: any) {
  // console.log('文件上传时的钩子',event, file, fileList);
}
function handleAddUploadSuccess(res: any, file: any, fileList: any) {
  uploadSuccessNum.value += 1
  // console.log("上传成功呢", res, file, fileList, this.uploadNum);
  // var url = upload_qiniu_addr.value + res.key;
  // this.fileList.push({ url: url });
  // if(this.beforeUploadNum == this.uploadSuccessNum){
  //   this.emitInput(this.fileList,'clearNum');
  // }
}
function handleUploadError(err: any, file: any, fileList: any) {
  // console.log("文件上传失败时的钩子", err, file, fileList);
  beforeUploadNum.value -= 1
}

function clearFiles() {
  // console.log("哈哈哈哈", this.$refs.qiniu_upload);
  // this.$refs.qiniu_upload.clearFiles();
}
function handleExceed(files: any, fileList: any) {
  // this.$message.warning(
  //   `当前限制选择 ${this.imageLimit} 个图片，本次选择了 ${
  //     files.length
  //   } 个图片，共选择了 ${files.length + fileList.length} 个文件`
  // );
}
</script>

<style scoped lang="scss">
// .qiniu-upload-image-box {
.el-upload-list--picture-card .el-upload-list__item {
  width: 80px;
  height: 80px;
}
.el-upload--picture-card {
  width: 80px;
  height: 80px;
  line-height: 80px;
  .el-upload-dragger {
    width: 80px;
    height: 80px;
  }
}
// }
</style>
