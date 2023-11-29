<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="navbar"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">Wampus</el-menu-item>
      <div class="flex-grow"></div>
      <el-menu-item index="2-3" @click="showModal = true">Submit Survey</el-menu-item>
    </el-menu>

    <!-- Modal Container -->
    <div v-if="showModal" class="modal-container">
      <SurveyModal @close="showModal = false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SurveyModal from '@/components/SurveyModal.vue' // Ensure this path points to your modal component

const activeIndex = ref('1')
const showModal = ref(false) // To control the visibility of the modal

const handleSelect = (key: string, keyPath: string[]) => {
  // Original handling code here
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.modal-container {
  /* Add your modal styles here. For example: */

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
