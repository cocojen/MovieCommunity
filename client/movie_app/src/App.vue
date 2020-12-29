<template>
  <div>
      <div>
        <Menu/>
      </div>
    <spinner :loading="true"></spinner>
  </div>
</template>

<script>
import Menu from '@/views/Menu'
import Spinner from './components/Spinner.vue';


export default {
  name: 'App',

  components: {
    Menu,
    Spinner,
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