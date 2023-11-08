<template>
  <div v-if="housing">
    <div class="listing-container">
      <!-- Property Name -->
      <h1 class="property-name">{{ housing.name }}</h1>

      <!-- Rating and Utilities -->
      <el-row :gutter="20" class="info-row">
        <el-col :span="12">
          <h2>Rating</h2>
          <!-- Displaying rating using Element UI star rating component -->
          <el-rate v-model="rating" disabled></el-rate>
          <span>{{ housing.rating }}</span>
        </el-col>
        <el-col :span="12">
          <h2>Amenities</h2>
          <el-tag v-for="item in filteredAmenitiesList" :key="item">{{ item }}</el-tag>
        </el-col>
      </el-row>

      <!-- Location -->
      <el-row :gutter="20" class="info-row">
        <el-col :span="24">
          <h2>Location</h2>
          <p>{{ housing.address }}</p>
        </el-col>
      </el-row>

      <!-- Scatterplot -->
      <div class="scatterplot-section">
        <!-- Placeholder for now -->
        <div class="scatterplot">Scatterplot goes here</div>
      </div>
    </div>
  </div>
  <div v-else>Housing Details not found</div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { reqHousingDetail } from '@/api/property'
import { useRoute } from 'vue-router'

const route = useRoute()
const housingId = route.params.housingId
const housing = ref(null)
const amenitiesList = ref(['Parking included', 'Furnished', 'Gym', 'Pool'])
onMounted(async () => {
  const res = await reqHousingDetail(housingId)
  housing.value = res
})
console.log(housing.value)
const filteredAmenitiesList = computed(() => {
  if (!housing.value) return []
  return amenitiesList.value.filter((_, index) => housing.value.amenities[index])
})
</script>

<style scoped>
.listing-container {
  padding: 20px;
  text-align: center; /* Center content */
}

.property-name {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.info-row {
  margin-bottom: 30px; /* Add spacing between rows */
}

h2 {
  font-size: 24px;
  font-weight: normal; /* To differentiate from the main title */
  margin-bottom: 10px;
  color: #333; /* Darker color for better contrast */
}

.scatterplot-section {
  margin-top: 40px;
}

.scatterplot {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
}
</style>
