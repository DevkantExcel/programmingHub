<template>
  <div class="panel-body">
    <!-- <p class="btn-float-right">
      View Mode:
      <select class="form-control" v-model="selectedMode" @change="getUser">
        <option value="https://devapi.programminghub.io/v2/api/payment" selected>Dev</option>
        <option value="https://api.programminghub.io/v2/api/payment">Prod</option>
      </select>
    </p>-->
    <!-- <ball-triangle-path-loader  color="#000000" size="20px"></ball-triangle-path-loader> -->
    <h4 v-if="showUsers.Message">Message: {{ showUsers.Message }}</h4>
    <h1 class="logo-desc">Programming Hub</h1>

    <!-- modal add QUery -->
    <div class="container">
      <!-- Modal -->
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Add Query</h4>
            </div>
            <div class="modal-body">
              <!-- form -->
              <form class="customWidthhundred" @submit.prevent>
                <table class="customWidthhundred">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <label for="email">Email:</label>
                      </td>
                      <td>
                        <input
                          v-model="email"
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Enter email"
                          name="email"
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="type">Type:</label>
                      </td>
                      <td>
                        <select v-model="addQuerySel" class="customColorSelect">
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="comments">Comments:</label>
                      </td>
                      <td>
                        <textarea v-model="textarea" class="form-control" rows="5" id="comment"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <button
                          type="submit"
                          class="btn btn-default"
                          @click="addData"
                          data-dismiss="modal"
                        >Submit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal add Query -->
    <!-- modal comments -->
    <div class="container">
      <!-- Modal -->
      <div class="modal fade" id="myModal1" role="dialog" v-if="showmodal">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Comments</h4>
            </div>
            <div class="modal-body">
              <!-- Reason: {{ showReason }} <br/>
              Message: {{ showMessage }}-->
              Comment:
              <textarea v-model="userInfo.comments"></textarea>
              <br>
              <!-- Status: {{userInfo.status}} -->
              Status:
              <label class="switch">
                <input v-model="userInfo.status" type="checkbox">
                <span class="slider round"></span>
              </label>
              <button
                data-dismiss="modal"
                class="btn btn-primary btn-float-right"
                @click="viewComment(userInfo)"
              >Update</button>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- loader -->
    <div v-if="loader">
      <ball-triangle-path-loader color="#000000" size="20px"></ball-triangle-path-loader>
    </div>
    <!-- loader ends -->
    <!--END modal comments -->
    <table v-show="!loader" class="table table-hover">
      <thead>
        <tr>
          <th colspan="6" class="customBg">
            <button
              type="button"
              class="btn btn-float-right"
              data-toggle="modal"
              data-target="#myModal"
            >Add Query</button>
          </th>
        </tr>
        <tr>
          <th>Promocode</th>
          <th>Email</th>
          <th>Type</th>
          <th>Last Updated</th>
          <th>Status</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(info, index) in showUsers.data" :key="index">
          <td>{{info.promocode}}</td>
          <td>{{info.email_id}}</td>
          <td>{{info.type}}</td>
          <td>
            <span>{{info.updatedAt | moment("Do MMM YYYY")}}</span>
          </td>
          <td>
            <!-- <toggle-button :value="info.status" :sync="true" :labels="true"/> -->
            {{ info.status==null? false: info.status }}
          </td>
          <td>
            <button
              type="button"
              @click="showModal(info)"
              class="btn btn-primary btn-sm"
              data-toggle="modal"
              data-target="#myModal1"
            >View Comments</button>
            <!-- <button type="button" class="btn btn-primary btn-sm">View Comments</button> -->
          </td>
        </tr>
      </tbody>
    </table>
    <!--start pagination -->
    <!-- <div>
    <h6>Default</h6>
    <b-pagination size="md" :total-rows="100" v-model="currentPage" :per-page="10">
    </b-pagination>
    <br>
    <div>currentPage: {{currentPage}}</div>
    </div>-->
    <!--end pagination -->
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import ToggleButton from "vue-js-toggle-button";
import Paginate from "vuejs-paginate";

import "vue-loaders/dist/vue-loaders.css";
import * as VueLoaders from "vue-loaders";
Vue.use(VueLoaders);

Vue.component("paginate", Paginate);
Vue.use(ToggleButton);
export default {
  name: "tabulardata",
  data() {
    return {
      data: "",
      showmodal: false,
      userInfo: null,
      comments: null,
      currentPage: 3,
      selectedMode: "https://devapi.programminghub.io/v2/api/payment"
    };
  },
  computed: {
    ...mapGetters({
      showData: "showData",
      showMessage: "showMessage",
      showReason: "showReason",
      showUsers: "showUsers",
      loader: "showLoader"
    }),
    email: {
      set: function(val) {
        this.$store.commit("updateEmail", val);
      },
      get: function() {
        return this.showData.email;
      }
    },
    checkbox: {
      set: function(val) {
        this.$store.commit("updateCheckbox", val);
      },
      get: function() {
        return this.showData.checkbox;
      }
    },
    textarea: {
      set: function(val) {
        this.$store.commit("updateTextarea", val);
      },
      get: function() {
        return this.showData.textarea;
      }
    },
    selected: {
      set: function(val) {
        this.$store.commit("updateSelected", val);
      },
      get: function() {
        return this.showData.selected;
      }
    },
    message: {
      set: function(val) {
        this.$store.commit("updateMessage", val);
      },
      get: function() {
        return this.showData.message;
      }
    },
    reason: {
      set: function(val) {
        this.$store.commit("updateReason", val);
      },
      get: function() {
        return this.showData.reason;
      }
    },
    addQuerySel: {
      set: function(val) {
        this.$store.commit("updateAddQuerySel", val);
      },
      get: function() {
        return this.showData.addQuerySel;
      }
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    ...mapActions(["addUserData", "viewComments", "getUserData"]),
    getUser: function() {
      this.getUserData({
        mode: this.selectedMode
      });
    },
    addData: async function() {
      try {
        var response = await this.addUserData({
          mode: this.selectedMode,
          email: this.email,
          type: this.selected,
          comments: this.textarea
        });
        if (response) {
          this.getUser();
        }
        this.data = "";
        this.email = "";
        this.checkbox = "";
        this.textarea = "";
        this.selected = "";
      } catch (err) {
        // eslint-disable-next-line
        console.log(err, "err");
      }
    },
    viewComment: async function(info) {
      try {
        var response = await this.viewComments({
          mode: this.selectedMode,
          _id: info._id,
          comment: info.comments,
          status: info.status
        });
        if (response) {
          this.getUser();
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log(err, "err");
      }
    },
    showModal: function(info) {
      this.showmodal = true;
      this.userInfo = info;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-desc {
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 0.6px;
  text-align: center;
  color: #494949;
  padding: 14px 0px 14px 18px;
}
.customAlignLeft {
  text-align: left;
}
.btn-float-right {
  float: right;
}
.customBg {
  background: #ffffff;
  color: black;
}
.customWidthhundred {
  width: 100%;
  line-height: 0;
}
.customColorSelect {
  color: #353434;
}
/* Rounded sliders */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Rounded slider end */
/*pagination*/
.pagination {
  float: left;
}
.page-item {
  float: left;
}
/* table style */
.table-fill {
  background: white;
  border-radius: 3px;
  border-collapse: collapse;
  height: 320px;
  margin: auto;
  max-width: 600px;
  padding: 5px;
  width: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  animation: float 5s infinite;
}

th {
  color: #d5dde5;
  background: #1b1e24;
  border-bottom: 4px solid #9ea7af;
  border-right: 1px solid #343a45;
  font-size: 23px;
  font-weight: 100;
  padding: 24px;
  text-align: left;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
}

th:first-child {
  border-top-left-radius: 3px;
}

th:last-child {
  border-top-right-radius: 3px;
  border-right: none;
}

tr {
  border-top: 1px solid #c1c3d1;
  border-bottom: 1px solid #c1c3d1;
  color: #666b85;
  font-size: 16px;
  font-weight: normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
}

tr:hover td {
  background: #4e5066;
  color: #ffffff;
  border-top: 1px solid #22262e;
}

tr:first-child {
  border-top: none;
}

tr:last-child {
  border-bottom: none;
}

tr:nth-child(odd) td {
  background: #ebebeb;
}

tr:nth-child(odd):hover td {
  background: #4e5066;
}

tr:last-child td:first-child {
  border-bottom-left-radius: 3px;
}

tr:last-child td:last-child {
  border-bottom-right-radius: 3px;
}

td {
  background: #ffffff;
  padding: 20px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 18px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #c1c3d1;
}

td:last-child {
  border-right: 0px;
}

th.text-left {
  text-align: left;
}

th.text-center {
  text-align: center;
}

th.text-right {
  text-align: right;
}

td.text-left {
  text-align: left;
}

td.text-center {
  text-align: center;
}

td.text-right {
  text-align: right;
}
</style>
