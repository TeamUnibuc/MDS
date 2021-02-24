<template>
  <div class="about">
    <h1 v-on:click="testFunction">This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: "About", 
  methods: {
    testFunction: function(/* event */) {
      console.log(process.env.VUE_APP_API_URL);
    }
  }
};
</script>
