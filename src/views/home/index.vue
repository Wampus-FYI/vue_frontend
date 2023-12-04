<template>
  <div>
    <navbar />
    <!-- Start of Map Element -->
    <div class="map">
      <Map :data="filteredData"></Map>
    </div>
    <div class="table">
      <!-- Start of Filter Element-->
      <div class="filters">
        <el-input v-model="aptName" placeholder="Search By Name" />
        <h3>Filters:</h3>
        <div>price range: {{ aptRange }}</div>
        <div class="slider">
          <div style="padding-right: 17px">$0</div>
          <!-- todo: make the slider stop displaying tooltip -->
          <el-slider
            v-model="aptPrice"
            range
            size="small"
            :max="3000"
            :step="100"
            :show-tooltip="false"
          />
          <div style="padding-left: 17px">$3,000+</div>
        </div>
      </div>
      <!-- Start of Table Element -->
      <el-table :data="filteredData" style="width: 100%" class="table">
        <el-table-column prop="Apt" label="Name" width="150" />
        <el-table-column prop="MedianRent" label="Median Rent" width="150" />
        <el-table-column prop="FiveStartRating" label="Rating" width="150"> </el-table-column>
        <el-table-column prop="Address" label="Address" width="150" />
        <el-table-column label="Button" width="150">
          <template v-slot="{ row }">
            <router-link :to="{ name: 'individual_listing', params: { housingId: row.Apt } }">
              <div>Go</div>
            </router-link>
          </template>
        </el-table-column>
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
let aptNames = ref([])
onMounted(async () => {
  const res = await reqProperty()
  tableData.value = res
  aptNames.value = extractNames(res)
})

const aptName = ref('')
const aptPrice = ref([0, 3000])
//todo: fix!!!
let aptRange = computed(() => {
  if (aptPrice.value[0] === 0 && aptPrice.value[1] === 3000) {
    return 'Any'
  } else if (aptPrice.value[0] === 0) {
    return 'Less than ' + aptPrice.value[1].toString()
  } else if (aptPrice.value[1] === 3000) {
    return 'More than ' + aptPrice.value[0].toString()
  } else {
    return 'Between $' + aptPrice.value[0].toString() + ' and $' + aptPrice.value[1].toString()
  }
})
//todo: fix!!!
let upperBound = () => {
  if (aptPrice.value[1] == 3000) {
    return false
  }
  return true
}

const filteredData = computed(() => {
  const minPrice = aptPrice.value[0]
  const maxPrice = aptPrice.value[1]
  let searchMatches = tableData.value
  if (aptName.value.length > 0) {
    searchMatches = tableData.value.filter((item) => {
      return item.Apt.toLowerCase().includes(aptName.value.toLowerCase())
    })
  }

  return searchMatches.filter((item) => {
    const medianRent = parseFloat(item.MedianRent)
    return medianRent >= minPrice && medianRent <= maxPrice
  })
})

function extractNames(data) {
  return data.map((item) => item.Apt)
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
