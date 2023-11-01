<template>
  <div>
    <navbar />
    <div class="map">
      <Map :data="tableData"></Map>
    </div>
    <div class="table">
      <div class="filters">
        <el-input v-model="aptName" placeholder="Search by Apt Name" />
        <h3>Filters:</h3>
        <div>price range: {{ aptRange }}</div>
        <div class="slider">
          <div style="padding-right: 17px">$0</div>
          <!-- todo: make the slider stop displaying tooltip -->
          <el-slider v-model="aptPrice" range size="small" :max="3000" step="100" :show-tooltip="false" />
          <div style="padding-left: 17px">$3,000+</div>
        </div>
        <el-select v-model="numBeds" class="m-2" placeholder="# Bedrooms" size="large">
          <el-option
            v-for="item in bedOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="numBaths" class="m-2" placeholder="# Bathrooms" size="large">
          <el-option
            v-for="item in bathOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button>Apply Filters</el-button>
      </div>
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
import { onMounted, ref, computed } from 'vue' 

const tableData = ref([])
onMounted(async () => {
  const res = await reqProperty()
  tableData.value = res
})
const aptName = ref('')
const aptPrice = ref([0, 3000])
//todo: fix!!!
let aptRange = computed(() => {
  if (aptPrice.value[0] === 0 && aptPrice.value[1] === 3000) {
    return 'Any';
  } else if (aptPrice.value[0] === 0) {
    return 'Less than ' + aptPrice.value[1].toString();
  } else if (aptPrice.value[1] === 3000) {
    return 'More than ' + aptPrice.value[0].toString();
  } else {
    return 'Between $' + aptPrice.value[0].toString() + ' and $' + aptPrice.value[1].toString();
  }
});
//todo: fix!!!
let upperBound = () => {
  if (aptPrice.value[1] == 3000) {
    return false
  }
  return true
}
const numBeds = ref('')
const bedOptions = [
  {
    value: '1',
    label: '1 Bed'
  },
  {
    value: '2',
    label: '2 Beds'
  },
  {
    value: '3',
    label: '3 Beds'
  },
  {
    value: '4',
    label: '4 Beds'
  },
  {
    value: '5',
    label: '5+ Beds'
  }
]

const numBaths = ref('')
const bathOptions = [
  {
    value: '1',
    label: '1 Bath'
  },
  {
    value: '2',
    label: '2 Baths'
  },
  {
    value: '3',
    label: '3 Baths'
  },
  {
    value: '4',
    label: '4 Baths'
  },
  {
    value: '5',
    label: '5+ Baths'
  }
]

//todo: write logic
let filteredData = () => {
  //return tableData filtered by tableFilters
}
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
.filters {
  padding: 20px;
}
.slider {
  width: 50%;
  display: flex;
}
</style>
