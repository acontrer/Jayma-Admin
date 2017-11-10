<template>
        <div id='kibana' class="" >
        <iframe :src="url" height="1100" width="100%"></iframe>
      </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
import config from '../../config/appconfig.js';
export default {
  name: 'hello',

  data() {
      return {
        url:config.url_dialogo
      }
  },

  methods: {
    
    },
  created() {

  }
}




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
