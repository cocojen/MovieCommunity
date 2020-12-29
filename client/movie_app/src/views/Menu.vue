<template>
  <div>
     <header id="menu">
      <div class="logo menu-title" ><router-link to="/" class="menu-title">Oh, Young Me!</router-link></div>
    <nav>
      <ul class="side link">
        <div v-if="this.$store.state.loggedInUserData.isLoggedIn">
          <div class="logo"><router-link to="/mypage" class="navbar"><i class="menu-icon fas fa-user"></i> My Review</router-link></div>
          <div class="logo"><router-link to="/register_movie" class="navbar"><i class="menu-icon fas fa-upload"></i>Register Movie</router-link></div>
          <div class="logo"><router-link to="/recommend" class="navbar"><i class="menu-icon far fa-check-circle"></i>Recommend</router-link></div>
          <div class="logo"><router-link @click.native="logout" to="/" class='menu-icon link navbar'><i class="fas fa-sign-out-alt"></i> Logout </router-link></div>
        </div>

        <div v-else>
          <div class="logo"><router-link to="/accounts/login" class="navbar"><i class="menu-icon fas fa-sign-in-alt"></i>Login</router-link></div>
          <div class="logo"><router-link to="/accounts/signup" class="navbar"><i class="menu-icon fas fa-user-plus"></i>Register</router-link></div>
        </div>
      </ul>
      <search-bar></search-bar>
    </nav>
</header>
<div id="main"><div id="menubar">
<div id="menu-icon" class="">
<span class="first"></span><span class="second"></span><span class="third"></span>
</div>
</div>  
<section id="content">

<router-view/>
</section>
</div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
export default {
  components: { SearchBar },
  methods: {
    logout: function() {
      console.log('logout')
      localStorage.removeItem('jwt')
      this.$store.dispatch('FETCH_USER_DATA')
      this.$router.push({name: 'Login'})
    },
  }
}
</script>

<style>
.menu-icon {
  margin-right: 4%;
}
.menu-title {
  font-weight: bold;
  font-family: 'Cormorant Garamond', serif;
  color:firebrick;
}

.navbar {
  font-family: 'Ubuntu', sans-serif;
  color: #444;

}


*,*:before,*:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}
body{font-family:arial;font-size:15px}
a{text-decoration:none;color:rgb(27, 24, 24)}
#menu{
  box-shadow: 3px 3px 5px lightgray;
  margin-top: 1%;
  position:fixed;
  left:0;
  top:0;
  bottom:0;
  width:220px;
  background:white;
  overflow:auto
  }
#content{padding:20px 30px}
#menubar{display:none;}
.logo{width:100%;padding:20px 0;text-align:center}
.logo a{font-size:21px;}
.side{}
.side li{position:relative;list-style:none;display:block}
.side li a{font:bold 14px arial;text-align:center;letter-spacing:1px;line-height:50px;color:#146422;display:block;text-shadow:none}
.side li a:hover,.side li a.active{color:#fff;background:#00BFC7}
@media only screen and (min-width:581px){
#menu{margin-left:0!important}
#main{margin-left:220px!important}
}
@media only screen and (max-width:580px){
#menu-icon{position:absolute;left:0;top:50%;margin-top:-10px;margin-left:10px;cursor:pointer;}
#menu-icon.active{margin-top:-12px;}
#menu-icon span{border:2px solid #4FDBE9;width:26px;margin-bottom:4px;display:block;-webkit-transition:transform .2s;transition:transform .2s}
#menu-icon.active .first{transform:rotate(45deg);-webkit-transform:rotate(45deg);margin-top:10px}
#menu-icon.active .second{transform:rotate(135deg);-webkit-transform:rotate(135deg);position:relative;top:-8px;}
#menu-icon.active .third{display:none}
#content{padding:60px 20px 30px}
#menubar{width:100%;height:50px;background:#444;color:rgb(7, 6, 6);padding:15px;position:fixed; display:block;}
#menu{margin-left:-220px;}
#main{margin-left:0}
}
</style>