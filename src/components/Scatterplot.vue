<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { ref, onMounted } from 'vue';

// Register the components of Chart.js that you are going to use.
Chart.register(...registerables);

export default {
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const canvasRef = ref(null);

    // Use the onMounted lifecycle hook to instantiate the chart.
    onMounted(() => {
      // Ensure you check if canvasRef.value is not null here
      const chartInstance = new Chart(canvasRef.value, {
        type: 'scatter',
        data: props.chartData,
        options: props.chartOptions,
      });

      // Optional: You may want to expose some chart methods to parent via emit or return
      // return {chartInstance}; // If you need to expose the instance to your template or parent component
    });

    // Expose the ref to your template
    return {
      canvas: canvasRef
    };
  }
};
</script>
