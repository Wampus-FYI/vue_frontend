<template>
    <div id="map-container">
        <l-map :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker v-for="home in homes" :key="home.id" :lat-lng="home.coordinates">
                <l-popup>{{ home.name }}</l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
    },
  data() {
    return {
      zoom: 12,
      center: [30.2862902, -97.889235], // Set your map's initial center
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // You can change the tile provider
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      homes: [
        {
          id: 1,
          name: 'Home 1',
          coordinates: [30.290756, -97.7462483], // Replace with actual coordinates
        },
        {
          id: 2,
          name: 'Home 2',
          coordinates: [30.2864997, -97.7462146], // Replace with actual coordinates
        },
        // Add more homes as needed
      ],
    };
  },
};
</script>

<style>
#map-container {
    height: 500px;
}
</style>