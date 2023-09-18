<script setup lang="ts">
import navbar from '@/Nav.vue'
//import tableData from '@/DataTable.vue'
import RentDataSurvey from '@/RentDataSurvey.vue'
import HousingDetails from '@/HousingDetails.vue'

const housingData = [
  {
    id: 1,
    name: 'Skyloft Apartments',
    address: '123 UT Street',
    city: 'Austin',
    state: 'TX',
    price: 1500,
    roomType: '2BHK',
    amenities: ['Gym', 'Pool', 'Free Wi-Fi']
  }
]
</script>

<template>
  <navbar />
  <HousingDetails :housingData="housingData" />
</template>

<style scoped></style>
