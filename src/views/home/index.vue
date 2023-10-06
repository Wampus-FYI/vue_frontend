<template>
  <div>
    <navbar />
    <div class="map">
      <Map></Map>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" class="table">
        <el-table-column prop="name" label="Name" width="150" />
        <el-table-column prop="rating" label="Rating" width="150" />
        <el-table-column prop="rent" label="Rent" width="150" />
        <el-table-column prop="address" label="Address" width="150" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqProperty } from '@/api/property'
import navbar from '../../components/Nav.vue'
import Map from '../../components/Map.vue'
import Property from '@/api/type'
import { onMounted, ref } from 'vue';

const tableData = ref([])
onMounted(async() => {
  const res = await reqProperty()
  tableData.value = JSON.parse(res)
  console.log("inside "+tableData.value)
})

console.log("table "+tableData.value)
</script>

<style>
.map {
  flex: 1;
  width: 50%;
  height: 100vh;
  float: left;
}
.table {
  flex: 2;
  width: 50%;
  height: 100vh;
  float: left;
}
</style>
