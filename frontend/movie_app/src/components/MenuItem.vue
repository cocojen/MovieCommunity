<template>
  <div>
      <span v-if="item.showIfLoggined === this.LoggedInUserData.isLoggedIn">
        <v-list-item>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
          <router-link :to="item.url" class='link'> {{item.title}}</router-link>
        </v-list-item>
      </span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'


export default {
  name: 'MenuItem',
  props: {
    item: Object
  },
  
  computed: {
    ...mapGetters(['LoggedInUserData'])
  },

  methods: {
  },
}
</script>

<style>

</style>