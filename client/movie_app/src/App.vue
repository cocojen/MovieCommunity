<template>
  <div>
      <div>
        <Menu/>
      </div>
           
  </div>
</template>

<script>
import Menu from '@/views/Menu'


export default {
  name: 'App',

  components: {
    Menu,
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
#app {
  font-family: 'Montserrat','Noto Sans Kr', sans-serif;
}
.appBack {
  margin: 0px !important;
  padding: 0px !important;
}

</style>