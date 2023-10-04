<template>
  <div>
    <navbar />
    <div class="splitScreen">
      <div class="map">
        <Map></Map>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 50%" class="table">
          <el-table-column prop="date" label="Date" width="150" />
          <el-table-column label="Delivery Info">
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column label="Address Info">
              <el-table-column prop="state" label="State" width="120" />
              <el-table-column prop="city" label="City" width="120" />
              <el-table-column prop="address" label="Address" />
              <el-table-column prop="zip" label="Zip" width="120" />
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import navbar from '../../components/Nav.vue'
import Map from '../../components/Map.vue'

interface Address {
  date: string
  name: string
  state: string
  city: string
  address: string
  zip: string
}
const tableData: Address[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  }
]
</script>

<style>
.splitScreen {
  display: flex;
}
.map {
  flex: 1;
}
.table {
  flex: 1;
  justify-content: center;
  padding: 20px;
}
</style>
