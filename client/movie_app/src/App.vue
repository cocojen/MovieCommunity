<template>
  <div id="app" class="position">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: function() {
    return {
    }
  },
  
  created: function() {
  },
};
</script>

<style scoped>
.position {
  margin: auto;
  margin-top: 5%;
  width: 50%;
  height: 50%;
  top: 30%;
  padding: 10px;
}

#app {
  font-family: 'Montserrat','Noto Sans Kr', sans-serif;
}
.appBack {
  margin: 0px !important;
  padding: 0px !important;
}

</style>