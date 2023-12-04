<template>
  <div class="listing-container" v-if="housing">
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- Property Name -->
        <div>
          <h1 class="property-name">{{ housing.Apt }}</h1>
        </div>

        <!-- Location -->
        <div>
          <h2>Location</h2>
          <p>{{ housing.Address }}</p>
        </div>

        <!-- Rating -->
        <div>
          <h2>Rating</h2>
          <div class="rating-container">
            <el-rate v-model="housing.FiveStartRating" disabled></el-rate>
            <span class="rating-text">{{ housing.FiveStartRating }}</span>
          </div>
        </div>

        <!-- Utilities -->
        <div>
          <h2>Utilities</h2>
          <el-tag v-for="item in filteredAmenitiesList" :key="item">{{ item }}</el-tag>
        </div>
      </el-col>

      <!-- Carousel Column -->
      <el-col :span="12">
        <swiper :options="swiperOptions" ref="mySwiper">
          <swiper-slide v-for="(image, index) in housing.Photos" :key="index">
            <img :src="image" :alt="`Image ${index + 1}`" />
          </swiper-slide>
          <div class="swiper-pagination" :class="{ shown: housing.Photos?.length > 1 }"></div>
          <div class="swiper-button-next" :class="{ shown: housing.Photos?.length > 1 }"></div>
          <div class="swiper-button-prev" :class="{ shown: housing.Photos?.length > 1 }"></div>
        </swiper>
      </el-col>
    </el-row>

    <!-- Rental Price Container -->
    <el-tabs v-model="activeName" type="card" class="price-tabs" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="(label, index) in currentYearRange"
        :key="index"
        :label="label"
        :name="label"
      >
        <div v-if="typeof apexGraphValues[label] === 'string'">{{ apexGraphValues[label] }}</div>
        <div v-else>
          <apexchart
            width="800"
            type="bar"
            :options="apexGraphValues[label].options"
            :series="apexGraphValues[label].series"
          ></apexchart>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div v-else style="text-align: center">Uh oh, something went wrong.</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, nextTick } from 'vue'
import { reqHousingDetail } from '@/api/property'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { TabsPaneContext } from 'element-plus'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const route = useRoute()
const housingId = route.params.housingId
const housing = ref({})

const mySwiper = ref(null)
const amenitiesList = ref(['Parking included', 'Furnished', 'Gym', 'Pool'])
const activeName = ref('2022-2023') // Active tab

onMounted(async () => {
  // fetch housing detail information
  const res = await reqHousingDetail(housingId)
  housing.value = res[0]
  console.log(housing.value.Rent)
  console.log(apexGraphValues)
  // for image swiper
  nextTick(() => {
    if (mySwiper.value && mySwiper.value.swiper) {
      mySwiper.value.swiper.update()
    }
  })
})

const filteredAmenitiesList = computed(() => {
  if (!housing.value || !housing.value.Amenities) return []
  return amenitiesList.value.filter((_, index) => housing.value.Amenities[index])
})

const currentYearRange = computed(() => {
  if (!housing.value || !housing.value.Rent) return []
  return Object.keys(housing.value.Rent)
})

const apexGraphValues = computed(() => {
  if (!housing.value || !housing.value.Rent) return {}
  let transformedData = {}
  Object.keys(housing.value.Rent).forEach((year) => {
    transformedData[year] = {}

    for (let row = 0; row < housing.value.Rent[year].length; row++) {
      for (let col = 0; col < housing.value.Rent[year][row]?.length; col++) {
        const key = `${row}b${col}b`
        if (housing.value.Rent[year][row][col] !== null)
          transformedData[year][key] = housing.value.Rent[year][row][col][0]
      }
    }
  })

  let resultGraph = {}
  Object.keys(housing.value.Rent).map((year) => {
    resultGraph[year] = {}
    const categories = Object.keys(transformedData[year])
    const data = categories.map((key) => transformedData[year][key])
    if (categories.length === 0) {
      resultGraph[year] = 'Working on gathering more data here 👩🏻‍💻'
    } else {
      resultGraph[year] = {
        options: {
          chart: {
            id: 'Rental price for ' + { year }
          },
          xaxis: {
            categories: categories
          }
        },
        series: [
          {
            name: 'rental price',
            data: data
          }
        ]
      }
    }
  })
  return resultGraph
})

const swiperOptions = computed(() => {
  return {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: housing.value.Photos?.length > 1, // Loop only if more than one image
    // Add your other swiper options here
    navigation:
      housing.value.Photos?.length > 1
        ? {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        : false,
    pagination:
      housing.value.Photos?.length > 1
        ? {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
          }
        : false,
    autoplay:
      housing.value.Photos?.length > 1
        ? {
            delay: 2500,
            disableOnInteractio3n: false
          }
        : false
  }
})

// const rentalPriceGraphs = computer(() =>{
//   return housing.Rent.map(())
// })

const handleTabClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style scoped>
.listing-container {
  margin-left: 50px;
  padding: 20px;
  text-align: left; /* Center content */
}

.property-name {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.info-row {
  margin-bottom: 30px; /* Add spacing between rows */
}

/* Set a background color */
body {
  background-color: #f0f2f5;
}

.swiper {
  width: 100%;
  height: auto;
  /* Adjust based on your design needs */
}

.swiper-slide {
  text-align: center;
  /* Center the image if it doesn't cover the whole slide */
  background: #f9f9f9;
  /* A light background in case the image is transparent or has borders */
}

.price-tabs {
  padding-top: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

img {
  max-width: 600px;
  height: auto;
  /* Maintain aspect ratio */
  display: inline-block;
  /* Center the image in the slide */
}
</style>
