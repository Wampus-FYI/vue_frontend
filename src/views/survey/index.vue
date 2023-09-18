<template>
  <div class="survey-container">
    <h1>UT Rent Data Survey</h1>
    <p>
      Take part in our anonymous survey to help improve housing for other UT students! We are making
      an anonymous database of rent prices for students to reference while shopping for housing at
      UT. Your input will only take one minute of your time and will help us improve our services.
      If you have formerly lived at multiple apartment buildings, we would appreciate that you
      submit this form multiple times for us to increase our data collection.
    </p>

    <form @submit.prevent="submitForm">
      <div>
        <label>Which apartment building do you/have you lived in? (ie: Skyloft) </label>
        <input v-model="formData.buildingName" required />
      </div>

      <div>
        <label>What school year did you live there? </label>
        <select v-model="formData.schoolYear" required>
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
        <input v-model="formData.monthlyRent" required />
      </div>

      <div>
        <label>How many bedrooms were in your apartment? </label>
        <input v-model="formData.bedrooms" required />
      </div>

      <div>
        <label>Was your apartment double occupant? </label>
        <input type="radio" v-model="formData.doubleOccupant" value="Yes" /> Yes
        <input type="radio" v-model="formData.doubleOccupant" value="No" /> No
      </div>

      <div>
        <label>How many bathrooms were in your apartment? </label>
        <input v-model="formData.bathrooms" required />
      </div>

      <div>
        <label>Please select the below that applied to your apartment</label>
        <input type="checkbox" v-model="formData.includesParking" /> Includes a parking lot
        <input type="checkbox" v-model="formData.isUnfurnished" /> Unfurnished
        <input type="checkbox" v-model="formData.noWindow" /> No window
        <input type="checkbox" v-model="formData.noGym" /> No gym
        <input type="checkbox" v-model="formData.noPool" /> No pool
      </div>

      <div>
        <label
          >On a scale of 1 (horrible) to 5 (great), how was your overall experience at the building?
        </label>
        <input type="range" v-model.number="formData.experience" min="1" max="5" required />
        {{ formData.experience }}
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const formData = {
  buildingName: '',
  schoolYear: '',
  monthlyRent: '',
  bedrooms: '',
  doubleOccupant: '',
  bathrooms: '',
  includesParking: false,
  isUnfurnished: false,
  noWindow: false,
  noGym: false,
  noPool: false,
  experience: 3
}

function submitForm(){
  console.log('the submitted data is' + formData)
  // You can handle form submission logic here, for instance sending the data to a backend.
}
</script>

<style scoped>
.survey-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.survey-container h3 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.survey-container label {
  display: block;
  margin-top: 10px;
  font-weight: 500;
}

.survey-container input[type='text'],
.survey-container select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.survey-container input[type='radio'],
.survey-container input[type='checkbox'] {
  margin-right: 5px;
}

.survey-container .question {
  margin-bottom: 30px;
}

.survey-container button[type='submit'] {
  margin-top: 20px;
  /* Adjust this value to increase or decrease the space */
  padding: 10px 20px;
  /* Adding some padding for better visual appearance */
  background-color: #007bff;
  /* Blue color for the button */
  color: #fff;
  /* White text color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* Hand cursor on hover */
  transition: background-color 0.2s;
  /* Smooth color transition */
}

.survey-container button[type='submit']:hover {
  background-color: #0056b3;
  /* Darker blue on hover */
}

.survey-container select {
  width: 29%;
  /* Ensure it takes the full width */
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 2px;
  background-color: #fff;
  height: 15.2px;
  /* Ensuring a consistent height */
}
</style>
