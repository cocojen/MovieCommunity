<template>    
    <v-app id="app">
      <v-app-bar 
        app 
        flat
        clipped-left 
        class="navbar d-flex justify-space-between white"
      >
        <v-app-bar-nav-icon @click="drawerState = !drawerState" class='logo'/>
        <router-link :to="'/'" class='logo' style="width:300px;">             
          <span class='logo' style='font-size:30px; padding:2%'>
            Oh, Young Me
          </span>
        </router-link>
      </v-app-bar>

      <!-- 왼쪽 네브 바 시작 -->
      <v-navigation-drawer v-model="drawerState" app clipped color="white" >
        <v-list dense class='menu'>
        <div class="welcome-message">Welcome ! {{this.$store.getters.LoggedInUserData.username}}</div>
          <!--MenuItem 컨포넌트에 for문 돌면서 아이템 하나씩 넘겨주기 -->
          <Menu-item 
           v-for="(item, idx) in items"
           :item="item"
           :key="idx"
          />
            <span v-if="this.LoggedInUserData.isLoggedIn === true">
              <v-list-item>
              <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
              <router-link @click.native="logout" to="/" class='link'> Logout </router-link>
              </v-list-item>
            </span>
          <SearchBar class='searching'/>
        </v-list>
      </v-navigation-drawer>
      <!-- 왼쪽 네브 바 끝 -->

      <v-content class="itsme">
        
        <!-- 여기가 이미지 감싸는 태그인데 마진땜에 전체 안되는 곳임 -->
        <div class="wallpaper">
          <v-row justify="center" align="center" class="mt-10">
            <v-col cols="auto">
              <!--출력되는곳 -->
              <router-view/>
            </v-col>
          </v-row>
        </div>
      </v-content>

    </v-app>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import MenuItem from '../components/MenuItem.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'Menu',
  components:{
    SearchBar,
    MenuItem,
  },

  data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-home', url: '/', showIfLoggined: true },
          { title: 'Signup', icon: 'mdi-account-plus-outline', url: '/accounts/signup', showIfLoggined: false },
          { title: 'MyPage', icon: 'mdi-account', url: '/mypage', showIfLoggined: true },
          { title: 'Login', icon: 'mdi-login', url: '/accounts/login', showIfLoggined: false },
          { title: 'Recommend', icon: 'mdi-compass-outline', url: '/recommend', showIfLoggined: true },
        ],
      }
    },
  methods: {
    logout: function() {
      localStorage.removeItem('jwt')
      this.$store.commit('fetchLoggedInUserData')
      this.$router.push({name: 'Login'})
    },
  },

  computed: {
    ...mapGetters(['LoggedInUserData']),

    drawerState: {
      get () { return this.$store.getters.drawerState },
      set (v) { return this.$store.commit('toggleDrawerState', v) }
    }
  }
}
</script>

<style scoped>
.welcome-message {
  color: orangered;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}


.logo {
  font-family: 'La Belle Aurore';
  text-decoration: none !important;
  color: grey;
}
.link{
  color: black !important;
  font-weight: 600;
  text-decoration: none !important;
}
.searching{
  margin: 10 10 10 10;
}
.navbar {
  opacity: 70%;
}
.menu {
  opacity: 70%;
}
</style>
