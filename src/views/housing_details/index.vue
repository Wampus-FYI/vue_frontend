<template>
  <div class="listing-container" v-if="housing">
    <!-- Property Name -->
    <h1 class="property-name">{{ housing.Apt }}</h1>

    <!-- Rating and Utilities -->
    <el-row :gutter="20" class="info-row">
      <el-col :span="12">
        <h2>Rating</h2>
        <div class="rating-container">
          <el-rate v-model="housing.FiveStartRating" disabled></el-rate>
          <span class="rating-text">{{ housing.FiveStartRating }}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <h2>Utilities</h2>
        <el-tag v-for="item in filteredAmenitiesList" :key="item">{{ item }}</el-tag>
      </el-col>
    </el-row>

    <!-- Location and Carousel -->
    <el-row :gutter="20" class="info-row">
      <el-col :span="12">
        <h2>Location</h2>
        <p>{{ housing.Address }}</p>
      </el-col>
      <el-col :span="12">
        <!-- Carousel -->
        <swiper :options="swiperOptions" ref="mySwiper">
          <swiper-slide v-for="(image, index) in images" :key="index">
            <img :src="image" :alt="`Image ${index + 1}`">
          </swiper-slide>
          <!-- Add these if you're using navigation arrows and pagination -->
          <div class="swiper-pagination" :class="{ 'shown': images.length > 1 }"></div>
          <div class="swiper-button-next" :class="{ 'shown': images.length > 1 }"></div>
          <div class="swiper-button-prev" :class="{ 'shown': images.length > 1 }"></div>
        </swiper>
      </el-col>
    </el-row>

    <el-tabs v-model="currentYearRange" @tab-click="handleTabClick">
      <el-tab-pane v-for="(data, yearRange) in yearRangeData" :key="yearRange" :label="yearRange" :name="yearRange">
        <!-- You don't need to put anything inside the pane -->
      </el-tab-pane>
    </el-tabs>

    <div class="scatterplot">
      <scatter-plot :key="currentYearRange" ref="scatterChart" :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </div>
</template>




<script>
import ScatterPlot from '../../components/Scatterplot.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { onMounted, ref, computed } from 'vue'
import { reqHousingDetail } from '@/api/property'
import { useRoute } from 'vue-router'


export default {


  components: {
    ScatterPlot,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      // Existing data
      currentYearRange: '2023-2024', // Start with the most recent year range

      // Data for scatter plot
      chartData: {
        datasets: [
          {
            label: '',
            data: [
              { x: 0, y: 0 },
              { x: 4, y: 0 },
              { x: 0, y: 4 },
              { x: 4, y: 4 }
            ],
            pointRadius: 0, // No point visible
            borderWidth: 0, // No border
            backgroundColor: 'rgba(0,0,0,0)' // Invisible
          },
          {
            label: 'Median Rent Price',
            backgroundColor: 'red',
            data: [] // Initial empty array, will be populated in created lifecycle hook
          }
        ]
      },
      chartOptions: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Number of Bedrooms'
            },
            ticks: {
              stepSize: 1, // Only show whole numbers
              min: 0, // Minimum value
              max: 4, // Maximum value
              precision: 0, // No decimals
              suggestedMin: 0,

            }
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Number of Bathrooms'
            },
            ticks: {
              stepSize: 1, // Only show whole numbers
              Minimum: 0,
              Maximum: 4,
              precision: 0 // No decimals
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                // Assuming rent price is stored in the 'r' property of the data point
                const rentPrice = context.raw.r;
                if (rentPrice === 0) {
                  return null; // Return null so that no tooltip is shown for dummy points
                }
                const label = context.dataset.label || '';
                return `${label}: $${rentPrice}`;
              }
            }
          }


        }
      },
      yearRangeData: {
        '2023-2024': [],
        '2022-2023': [], // Dataset for the year range 2022-2023
        '2021-2022': [], // Dataset for the year range 2021-2022
        '2020-2021': [],
        '2019-2020': [],
        '2019 and before': [],
        // Add more year ranges as needed
      },
      images: [
        '/26West.jpg',
        '/26West3.jpeg',
        // Add more image paths
      ],


    };
  },
  computed: {
    // Computed property to handle carousel loop configuration
    swiperOptions() {
      return {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: this.images.length > 1, // Loop only if more than one image
        // Add your other swiper options here
        navigation: this.images.length > 1 ? {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        } : false,
        pagination: this.images.length > 1 ? {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        } : false,
        autoplay: this.images.length > 1 ? {
          delay: 2500,
          disableOnInteraction: false,
        } : false,
      };
    }
  },

  methods: {
    async fetchHousingDetailAndData() {
      const res = await reqHousingDetail(this.housingId);
      this.housing = res[0];
      this.fetchYearRangeData();
    },
    handleTabClick(tab) {
      this.currentYearRange = tab.name;
      // Wait for Vue to finish updates, then update the chart
      this.$nextTick(() => {
        this.updateChartData(this.currentYearRange);
      });
    },
    updateChartData(yearRange) {
      // Direct mutation might not be enough for Chart.js to detect changes
      // Instead, replace the dataset with a new one
      const newDataset = {
        ...this.chartData.datasets[1],
        data: this.yearRangeData[yearRange]
      };
      this.chartData = {
        ...this.chartData,
        datasets: [
          this.chartData.datasets[0], // Keep the padding dataset
          newDataset // Your updated dataset for the selected year range
        ]
      };


      // If you're using Chart.js 2.x, you might need to call update() directly
      // If you're using Chart.js 3.x, the reactivity system should pick up the changes
      this.$nextTick(() => {
        this.$refs.scatterChart.chartInstance.update();
      });
    },
    fetchYearRangeData() {
      // Assuming housing is already populated with the data
      const years = Object.keys(this.housing.Rent);
      years.forEach(year => {
        this.yearRangeData[year] = this.getScatterDataForYear(year);
      });
    },
    getScatterDataForYear(yearRange) {
      const yearData = this.housing.Rent[yearRange];
      const scatterData = [];

      if (!yearData) return scatterData;

      // Loop through the beds
      for (let beds = 0; beds < yearData.length; beds++) {
        const bathArray = yearData[beds];

        if (!bathArray) continue;

        // Loop through the baths
        for (let baths = 0; baths < bathArray.length; baths++) {
          const price = bathArray[baths];
          if (price !== null) {
            scatterData.push({ x: beds, y: baths, r: price });
          }
        }
      }
      return scatterData;
    }
  },
  setup() {
    const route = useRoute();
    const housingId = ref(route.params.housingId); // Convert to ref since it's reactive
    const housing = ref(null);
    const amenitiesList = ref(['Parking included', 'Furnished', 'Gym', 'Pool']);

    onMounted(async () => {
      // Fetch the housing detail after the component is mounted
      
        const res = await reqHousingDetail(housingId.value);
        housing.value = res[0]; // Set the reactive housing data
      
    });

    // Use computed to define a reactive property based on housing ref
    const filteredAmenitiesList = computed(() => {
      if (!housing.value) return [];
      return amenitiesList.value.filter((_, index) => housing.value.Amenities[index]);
    });
    return {
      housingId,
      housing,
      filteredAmenitiesList,
      // ... any other refs, reactive states, or methods
    };
  },
  created() {
    // When the component is created, populate the chart data
    //console.log(this.$refs.scatterChart);
  },
  mounted() {
    this.fetchHousingDetailAndData();
    this.$nextTick(() => {
      if (this.$refs.mySwiper && this.$refs.mySwiper.swiper) {
        this.$refs.mySwiper.swiper.update();
      }
    });
  }



};
</script>





<style scoped>
/* Set a background for the whole page that contrasts well with your content */
body {
  background-color: #f0f2f5;
  font-family: 'Open Sans', sans-serif;
  /* Example font */
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

img {
  max-width: 30%;
  height: auto;
  /* Maintain aspect ratio */
  display: inline-block;
  /* Center the image in the slide */
}



/* Show the navigation and pagination only when there are multiple images */
/* Initial state is hidden */
.swiper-button-next,
.swiper-button-prev,
.swiper-pagination {
  display: none;
}

/* The .shown class will be applied conditionally to make elements visible */
.swiper-button-next.shown,
.swiper-button-prev.shown,
.swiper-pagination.shown {
  display: block;
}


.listing-container {
  max-width: 1200px;
  /* Maximum width of the content */
  margin: 0 auto;
  /* Center the container */
  padding: 20px;
  background-color: #ffffff;
  /* Light background for the container */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Subtle shadow for depth */
  border-radius: 8px;
  /* Rounded corners */
}

.property-name {
  font-size: 48px;
  /* Larger font size for the title */
  font-weight: bold;
  margin-top: 20px;
  /* More space at the top */
  margin-bottom: 20px;
  /* More space at   the bottom */
  padding-bottom: 10px;
  /* Padding for the divider */
  border-bottom: 1px solid #eaecef;
  /* Thin divider */
}


.info-row {
  border-bottom: 1px solid #eaecef;
  /* Light border for separation */
  padding-bottom: 20px;
}

h2 {
  color: #2c3e50;
  /* Same dark blue color for consistency */
  font-size: 18px;
  /* Smaller font size for subtlety */
  font-weight: 600;
  /* Semi-bold for headings */
}

.rating-container {
  display: flex;
  align-items: center;
  /* This will vertically center the children */
}

.rating-text {
  font-size: 25px;
  /* Larger font size for the rating number */
  font-weight: bold;
  display: inline-block;
  /* Aligns text with stars */
  margin-left: 10px;
  /* Spacing between stars and text */
}

.el-rate {
  --el-rate-icon-size: 30px;
  /* Adjusting star size */
}



.el-tag {
  margin: 0 5px;
  /* Spacing between tags */
  background-color: #eaecef;
  /* Light background for tags */
  border: none;
  border-radius: 16px;
  /* Rounded tags */
  color: #2c3e50;
  /* Dark text for readability */
}

.el-tabs__item {
  color: #7f8c8d;
  /* Subtle color for unselected tabs */
}

.el-tabs__item.is-active {
  color: #2c3e50;
  /* Dark color for the active tab */
  border-color: #2c3e50;
  /* Border to match the text */
}

.scatterplot {
  padding: 30px;
  background-color: #ffffff;
  /* White background for focus */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* More pronounced shadow for the chart */
  border-radius: 8px;
  /* Consistent rounded corners */
}

/* Additional media queries for responsiveness */
@media (max-width: 768px) {
  .listing-container {
    padding: 10px;
  }

  .scatterplot {
    width: 100%;
    padding: 15px;
  }

  .info-row,
  .rating-container,
  .el-tabs__item {
    font-size: 14px;
    /* Smaller font size on mobile */
  }
}
</style>
