<template>
  <div class="listing-container">
    <!-- Property Name -->
    <h1 class="property-name">{{ propertyName }}</h1>

    <!-- Rating and Utilities -->
    <el-row :gutter="20" class="info-row">
      <el-col :span="12">
        <h2>Rating</h2>
        <!-- Displaying rating using Element UI star rating component -->
        <el-rate v-model="rating" disabled></el-rate>
        <span>{{ rating }}</span>

      </el-col>
      <el-col :span="12">
        <h2>Utilities</h2>
        <el-tag v-for="utility in utilities" :key="utility">{{ utility }}</el-tag>
      </el-col>
    </el-row>

    <!-- Location -->
    <el-row :gutter="20" class="info-row">
      <el-col :span="24">
        <h2>Location</h2>
        <p>{{ address }}</p>
      </el-col>
    </el-row>

    <!-- Scatterplot -->
    <div class="scatterplot-section">
      <!-- Placeholder for now -->
      <div class="scatterplot">Scatterplot goes here</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      propertyName: "West 26",
      address: "1234 Vue St, Element City, 00000",
      utilities: ["gym", "pool", "parking"],
      rating: 4.5,  // Rating out of 5
      // ... any other required data for the scatterplot
    };
  },
  // methods, computed, etc. if needed
};
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
