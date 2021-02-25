<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
  <div>
    <p>
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  data() {
    return {
      message: ''
    }
  },
  components: {
    HelloWorld
  },
  async mounted() {
    console.log("Got here!")
    const response = await fetch('/api/', {
      method: 'GET',headers: {'Content-Type': 'application/json'},
    })
    const realDeal = await response.json()
    this.message = realDeal["OK"]
  }
});
</script>
