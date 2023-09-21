<script setup lang="ts">
import tableData from '@/Data.vue'
import PropertyMap from '@/PropertyMap.vue'
</script>

<template>
  <div class="split-screen">
    <tableData class="property-list-container" />
    <PropertyMap class="property-map-container" />
  </div>
</template>

<style>
.split-screen {
  display: flex;
}

.property-list-container {
  flex: 1;
  padding: 20px;
}

.property-map-container {
  flex: 2;
}
</style>
