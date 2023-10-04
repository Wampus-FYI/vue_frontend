<template>
  <div v-if="housing" class="housing-details">
    <h1>{{ housing.name }}</h1>
    <p>{{ housing.address }}</p>
    <p>{{ housing.city }}, {{ housing.state }}</p>
    <p>Price: ${{ housing.price }}/month</p>
    <p>Room Type: {{ housing.roomType }}</p>
    <div>
      <h3>Amenities:</h3>
      <ul>
        <li v-for="(amenity, index) in housing.amenities" :key="index">{{ amenity }}</li>
      </ul>
    </div>
    <button @click="goBack">Back to Listings</button>
  </div>

  <h2 v-else>Housing not found</h2>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps(['housingData'])
const housing = props.housingData[0] //return this.housingData.find(h => h.id === parseInt(this.id, 10));
const data = ref('') //id: this.$route.params.id

function goBack() {
  //this.$router.go(-1);
}
</script>

<style scoped>
.housing-details {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin-bottom: 10px;
}

button {
  background-color: #ccc;
  border: none;
  border-radius: 3px;
  color: #333;
  cursor: pointer;
  font-size: 18px;
  margin: 20px 0;
  padding: 10px 20px;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #999;
}
</style>
