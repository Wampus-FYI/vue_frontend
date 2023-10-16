<template>
  <div>
    <navbar />
    <div class="map">
      <Map :data="tableData"></Map>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" class="table">
        <el-table-column prop="name" label="Name" width="150" />
        <el-table-column prop="rating" label="Rating" width="150" />
        <el-table-column prop="rent" label="Rent" width="150">
          <template v-slot="{ row }">
            {{ row.rent['2022-2023'][1][1] }}
            <!-- Displaying the first element for "2022-2023" category -->
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Address" width="150" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqProperty } from '@/api/property'
import navbar from '../../components/Nav.vue'
import Map from '../../components/Map.vue'
import { onMounted, ref } from 'vue'

const tableData = ref([])
onMounted(async () => {
  const res = await reqProperty()
  tableData.value = res
})
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
