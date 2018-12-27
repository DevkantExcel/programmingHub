<template>
  <div id="app">
    <div class="topnav" id="myTopnav">
      <!-- <a href="#home" class="active">Home</a> -->
      <button class="openbtn" @click="openNav()">☰</button>
      <a>
        <select class="form-control" v-model="selectedMode" @change="getUser">
          <option value="https://devapi.programminghub.io/v2/api/payment" selected>Dev</option>
          <option value="https://api.programminghub.io/v2/api/payment">Prod</option>
        </select>
      </a>
      <a>View Mode :</a>
      <a href="javascript:void(0);" class="icon" onclick="myFunction()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    <div id="mySidebar" class="sidebar">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()">×</a>
      <a href="javascript:void(0)" @click="closeNav()">
        <router-link to="/">Promocode</router-link>
      </a>
      <a href="javascript:void(0)" @click="closeNav()">
        <router-link to="/tab2">Pro users</router-link>
      </a>
      <!-- <router-link to="/" @click="closeNav()">Tab1</router-link> -->
      <!-- <router-link to="/tab2" @click="closeNav()">Tab2</router-link> -->
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import tabulardata from "./components/tabulardata.vue";
import { mapActions } from "vuex";

export default {
  name: "app",
  components: {
    // tabulardata
  },
  data() {
    return {
      selectedMode: "https://devapi.programminghub.io/v2/api/payment"
    };
  },
  methods: {
    ...mapActions(["getUserData"]),
    getUser: function() {
      this.getUserData({
        mode: this.selectedMode
      });
    },
    openNav: function() {
      document.getElementById("mySidebar").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
    },

    closeNav: function() {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidebar a:hover {
  color: #f1f1f1;
}

.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

.openbtn {
  font-size: 34px;
  cursor: pointer;
  background-color: #111;
  color: white;
  /* padding: 10px 15px; */
  border: none;
  float: left;
  top: 0;
}

.openbtn:hover {
  background-color: #444;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
  float: left;
  top: 0;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}
/* top nav bar */
.topnav {
  overflow: hidden;
  background-color: #333;
  height: 50px;
  width: auto;
}

.topnav a {
  float: right;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 7px 10px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  /* background-color: #ddd; */
  /* color: black; */
}

.active {
  background-color: #4caf50;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
