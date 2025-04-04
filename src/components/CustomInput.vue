<template>
  <div
    class="editable-input-container"
    :style="{ height: height + 'px', width: isEditing ? width + 'px' : 'auto' }"
  >
    <!-- 显示模式 -->
    <div v-if="!isEditing" class="display-content" @click="activateEditMode">
      {{ displayText || placeholder }}
      <el-icon v-if="displayText"><EditPen /></el-icon>
    </div>

    <!-- 编辑模式 -->
    <div v-else class="edit-wrapper">
      <input
        ref="inputEl"
        v-model="editingValue"
        type="text"
        class="edit-input"
        placeholder="输入内容"
        @keyup.enter="confirmEdit"
        @keyup.esc="cancelEdit"
        @blur="handleBlur"
      />
      <div class="action-buttons">
        <el-icon @mousedown.prevent="confirmEdit" class="btn confirm" :size="height - 10"
          ><Select
        /></el-icon>
        <el-icon class="btn cancel" @mousedown.prevent="cancelEdit" :size="height - 10"
          ><CloseBold
        /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: '点击编辑',
  },
  height: {
    type: Number,
    default: 30,
  },
  width: {
    type: Number,
    default: 200,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isEditing = ref(false)
const editingValue = ref('')
const inputEl = ref(null)
const displayText = ref(props.modelValue)

// 激活编辑模式
const activateEditMode = () => {
  isEditing.value = true
  editingValue.value = displayText.value
  nextTick(() => {
    inputEl.value.focus()
  })
}

// 确认编辑
const confirmEdit = () => {
  if (editingValue.value !== displayText.value) {
    displayText.value = editingValue.value
    emit('update:modelValue', editingValue.value)
    emit('change', editingValue.value)
  }
  isEditing.value = false
}

// 取消编辑
const cancelEdit = () => {
  editingValue.value = displayText.value
  isEditing.value = false
}

// 处理失焦事件
const handleBlur = (e) => {
  // 检查是否点击了操作按钮
  if (!e.relatedTarget || !e.relatedTarget.closest('.action-buttons')) {
    cancelEdit()
  }
}
</script>

<style scoped>
.editable-input-container {
  position: relative;
  display: inline-block;
  min-width: 120px;
}

.display-content {
  /* padding: 6px 12px; */
  /* border: 1px solid #e4e7ed; */
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.2s;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}

.display-content:hover {
  border-color: #409eff;
}

.edit-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  width: 100%;
}

.edit-input {
  /* padding: 6px 12px; */
  border: 1px solid #409eff;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  /* width: 200px; */
  height: 100%;
  width: 100%;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  /* padding: 4px 8px; */
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.btn:hover {
  transform: scale(1.1);
}
.confirm {
  color: #67c23a;
  gap: 10px;
}
.confirm:hover {
  color: #67c23a;
}
.cancel {
  color: #f56c6c;
}
.cancel:hover {
  color: #f56c6c;
}
</style>
