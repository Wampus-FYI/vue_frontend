<template>
  <div id="map-container">
    <l-map :zoom="zoom" :center="center" :use-global-leaflet="false">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker v-for="apt in data" :key="apt.Apt" :lat-lng="apt.Coordinates">
        <l-popup>{{ apt.Apt }}</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'

const zoom = 15
const center = [30.287936, -97.74464]
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const props = defineProps({
  data: Array
})
</script>

<style>
#map-container {
  height: 500px;
  width: 100%;
}
</style>
