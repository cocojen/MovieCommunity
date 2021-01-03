<template>
  <div>
      <div>
        <Menu/>
      </div>
    <spinner :loading="loadingStatus"></spinner>
  </div>
</template>

<script>
import Menu from '@/views/Menu'
import Spinner from './components/Spinner.vue';
import bus from './utils/bus'

export default {
  name: 'App',

  components: {
    Menu,
    Spinner,
  },

  data: function() {
    return {
      loadingStatus: false,
    }
  },

  methods: {
    startSpinner() {
      this.loadingStatus = true
    },
    endSpinner() {
      this.loadingStatus = false
    },
  },
  
  created: function() {
    bus.$on('start:spinner', this.startSpinner)
    bus.$on('end:spinner', this.endSpinner)
  },

  beforeDestroy() {
    bus.$off('start:spinner', this.startSpinner)
    bus.$off('end:spinner', this.endSpinner)
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