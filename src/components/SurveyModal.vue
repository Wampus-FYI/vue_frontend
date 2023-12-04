<template>
  <div class="survey-container">
    <h1>UT Rent Data Survey</h1>
    <p>
      Take part in our anonymous survey to help improve housing for other UT students! We are making
      an anonymous database of rent prices for students to reference while shopping for housing at
      UT. <strong>Your input will only take one minute of your time</strong> and will help us
      improve our services. If you have formerly lived at multiple apartment buildings, we would
      appreciate that you submit this form multiple times for us to increase our data collection.
    </p>

    <form @submit.prevent="submitForm">
      <div>
        <label>Which apartment building do you/have you lived in? </label>
        <select v-model="formData.Apt" name="aptBuilding" required>
          <option value="">-- Select Building --</option>
          <option v-for="building in apartmentBuildings" :key="building" :value="building">
            {{ building }}
          </option>
        </select>
      </div>

      <div>
        <label>What school year did you live there? </label>
        <select v-model="formData.Year" name="schoolYear" required>
          <option value="">-- Select Year --</option>
          <option>2023-2024</option>
          <option>2022-2023</option>
          <option>2021-2022</option>
          <option>2020-2021</option>
          <option>2019-2020</option>
          <option>2019 or before</option>
        </select>
      </div>

      <div>
        <label>What was your monthly rent amount? </label>
        <input v-model="formData.Rent" required />
      </div>

      <div>
        <label>How many bedrooms were in your apartment? </label>
        <input v-model="formData.NumBedrooms" required />
      </div>

      <div>
        <label>Was your apartment double occupant? </label>
        <input type="radio" v-model="formData.DoubleOcc" value="Yes" /> Yes
        <input type="radio" v-model="formData.DoubleOcc" value="No" /> No
      </div>

      <div>
        <label>How many bathrooms were in your apartment? </label>
        <input v-model="formData.NumBathrooms" required />
      </div>

      <div>
        <label>Please select the below that applied to your apartment</label>
        <input type="checkbox" v-model="amenities.includesParking" /> Includes a parking lot
        <input type="checkbox" v-model="amenities.isUnfurnished" /> Unfurnished
        <input type="checkbox" v-model="amenities.noWindow" /> No window
        <input type="checkbox" v-model="amenities.noGym" /> No gym
        <input type="checkbox" v-model="amenities.noPool" /> No pool
      </div>

      <div class="experience-slider">
        <label>
          On a scale of 1 (horrible) to 5 (great), how was your overall experience at the building?
        </label>
        <div class="slider-container">
          <input type="range" v-model.number="formData.FiveStartRating" min="1" max="5" required />
          <span>{{ formData.FiveStartRating }}</span>
        </div>
      </div>

      <div class="submit-button-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const formData = ref({
  Apt: '',
  DoubleOcc: '',
  FiveStartRating: 3,
  NumBathrooms: '',
  NumBedrooms: '',
  Rent: '',
  Amenities:[],
  Year: ''
})

const amenities = ref({
  includesParking: false,
  isUnfurnished: false,
  noWindow: false,
  noGym: false,
  noPool: false,
})

const apartmentBuildings = [
  '2215',
  '2400 Nueces',
  '2505 San Gabriel St',
  '26 West',
  '900 W 23rd',
  'Axis West Campus',
  'Baccarat Apartments',
  'Block on 23rd',
  'Block on 25th East',
  'Block on 28th',
  'Block on Pearl South',
  'Block on Rio',
  'Buckingham Apartments',
  'Buena Vista Condos',
  'Callaway',
  'Cortland Southpark Terraces',
  'Crest at Pearl',
  'Croix',
  'GrandMarc',
  'Hilltop',
  'Inspire',
  'Ion',
  'Lark',
  'Legacy on Rio',
  'Littlefield House Apartments',
  'Longhorn at 25th',
  'Moon Court',
  'Moontower',
  'Nine at Rio',
  'Oak Park Apartments',
  'Pearl Street Co-Op',
  'Quarters Cameron House',
  'Quarters Grayson House',
  'Quarters Nueces House',
  'Quarters Sterling House',
  'Regents on 24th',
  'Regents on 26th',
  'Rio West',
  'River Oaks',
  'Sabina',
  'Sandpiper Apartments',
  'Signature 1909',
  'Skyloft',
  'Spencer View',
  'Texan 26',
  'Texan Pearl',
  'The Corner',
  'The G',
  'The Galileo on 25th',
  'The Nine at Rio',
  'The Standard',
  'Torre',
  'Vanderbilt Condominiums',
  'Villas on Nueces',
  'Villas on Rio',
  'Villas on San Gabriel',
  'Waterloo',
  'Yugo Austin Nueces',
  'Yugo on Rio'
]

function submitForm() {
  formData.value.Amenities = [
    amenities.value.includesParking, 
   !amenities.value.isUnfurnished,
   !amenities.value.noGym,
   !amenities.value.noPool
]
  console.log(formData.value)
  // You can handle form submission logic here, for instance sending the data to a backend.
}
</script>

<style scoped>
.survey-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f6f9fc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.survey-container h1 {
  color: #333;
  margin-bottom: 20px;
}

.survey-container p {
  color: #666;
  line-height: 1.6;
}

.survey-container strong {
  font-weight: 600;
  color: #007bff;
}

.survey-container label {
  display: block;
  margin-top: 20px;
  font-weight: 500;
  color: #444;
}

.survey-container input,
.survey-container select {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  background: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  max-height: 100px; /* Adjust this value based on your preference */
  overflow-y: auto;
}

.survey-container select[name='schoolYear'],
.survey-container select[name='aptBuilding'] {
  width: 31%; /* Adjust as necessary */
}

.survey-container div {
  margin-bottom: 30px; /* Adjust as necessary */
}

.survey-container input:focus,
.survey-container select:focus {
  border-color: #007bff;
}

.survey-container input[type='radio'],
.survey-container input[type='checkbox'] {
  margin-right: 8px;
  transition: transform 0.1s;
}

.survey-container input[type='radio']:hover,
.survey-container input[type='checkbox']:hover {
  transform: scale(1.1);
}

.survey-container button[type='submit'] {
  padding: 12px 25px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.1s;
}

.survey-container button[type='submit']:hover {
  background-color: #0056b3;
}

.survey-container button[type='submit']:active {
  transform: scale(0.98);
}

.experience-slider {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.slider-container {
  display: flex;
  align-items: center; /* This ensures the slider and the text are vertically aligned */
}

.slider-container span {
  margin-left: 15px; /* Adjust this value for spacing between the slider and the text */
}

/* ... other styles ... */

.submit-button-container {
  display: flex;
  justify-content: flex-end; /* This will push the button to the right */
}
</style>
