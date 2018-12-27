<template>
  <div>
    <h1>Pro Users</h1>
    <!-- ================ MODAL ADD ========================-->
    <div class="container">
      <!-- <h2>Modal Example</h2> -->
      <!-- Trigger the modal with a button -->
      <!-- <button
        type="button"
        class="btn btn-info btn-lg float-left"
        data-toggle="modal"
        data-target="#myModal"
      >Add User</button>-->
      <!-- Modal -->
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Add Pro Users</h4>
            </div>
            <div class="modal-body">
              <!-- <p>Some text in the modal.</p> -->
              <!-- ============ modal form ========= -->
              <form class="customWidthhundred" @submit.prevent="submitPromo">
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
                        <label for="email">Promocode:</label>
                      </td>
                      <td>
                        <input type="text" ref="promocode">
                        <!-- <input
                          v-model="email"
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Enter email"
                          name="email"
                        >-->
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="type">Code Type:</label>
                      </td>
                      <td>
                        <!-- <input type="text" name id> -->
                        <select v-model="addQuerySel" class="customColorSelect">
                          <option value="onetime">ONETIME</option>
                          <option value="weekly">BULK</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="comments">Expiry Time:</label>
                      </td>
                      <td>
                        <!-- <input type="text" name id> -->
                        <datetime
                          type="datetime"
                          :min-datetime="today"
                          v-model="datetime13"
                          format="yyyy-MM-dd HH:mm:ss"
                        ></datetime>
                        <!-- <textarea v-model="textarea" class="form-control" rows="5" id="comment"></textarea> -->
                        <!-- <input type="datetime-local"> -->
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label for="comments">Email:</label>
                      </td>
                      <td>
                        <input type="email" ref="email">
                        <!-- <textarea v-model="textarea" class="form-control" rows="5" id="comment"></textarea> -->
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <button type="submit" class="btn btn-default" data-dismiss="modal">SUBMIT</button>
                        <!-- <button
                          type="submit"
                          class="btn btn-default"
                          @click="addData"
                          data-dismiss="modal"
                        >Submit</button>-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              <!-- ============ modal form ends========= -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          <!-- Modal content ends-->
        </div>
      </div>
    </div>
    <!--================= MODAL ADD ENDS =====================-->
    <!-- ==========================
    ==============TABLE
    ============================-->
    <table class="table table-hover">
      <thead>
        <tr>
          <th colspan="6" class="customBg">
            <button
              type="button"
              class="btn btn-float-right"
              data-toggle="modal"
              data-target="#myModal"
            >Add Users</button>
            <!-- <button
              type="button"
              class="btn btn-info btn-lg"
              data-toggle="modal"
              data-target="#myModal"
            >Add User</button>-->
          </th>
        </tr>
        <tr>
          <th>Code_type</th>
          <th>Email</th>
          <th>Expire Time</th>
          <th>Promocode</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(info, index) in fetchCretingListData" :key="index">
          <td>{{info.code_type}}</td>
          <td>{{info.email_id}}</td>
          <td>{{info.expiry_time}}</td>
          <td>{{info.promo_code}}</td>
          <td>{{info.user_id}}</td>
          <!-- <td>
            <span>{{info.updatedAt | moment("Do MMM YYYY")}}</span>
          </td>-->
          <!-- <td> -->
          <!-- <toggle-button :value="info.status" :sync="true" :labels="true"/> -->
          <!-- {{ info.status==null? false: info.status }} -->
          <!-- </td> -->
          <!-- <td>
            <button
              type="button"
              @click="showModal(info)"
              class="btn btn-primary btn-sm"
              data-toggle="modal"
              data-target="#myModal1"
          >View Comments</button>-->
          <!-- <button type="button" class="btn btn-primary btn-sm">View Comments</button> -->
          <!-- </td> -->
        </tr>
      </tbody>
    </table>
    <!-- Table ends -->
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "tabulardata2",
  components: {
    datetime: Datetime
  },
  data() {
    return {
      addQuerySel: "ONETIME",
      datetime13: "",
      today: new Date().toISOString().slice(0, 10)
    };
  },
  mounted() {
    this.creatingList_();
  },
  computed: {
    ...mapGetters({
      showData: "showData"
    }),
    devapi: {
      get: function() {
        return this.showData.dev;
      }
    },
    fetchCretingListData: {
      get: function() {
        return this.showData.ListData;
      }
    }
  },
  methods: {
    ...mapActions(["addPromoData", "creatingList"]),
    submitPromo_____: function() {
      const promo = this.$refs.promocode.value;
      const email = this.$refs.email.value;
      // console.log(this.datetime13.toLocaleString().slice(0,10)+' '+this.datetime13.toLocaleString().slice(11, 19))
      // console.log(this.datetime13.toLocaleString().slice(11, 19))
      // console.log(promo)
    },
    submitPromo: async function() {
      const promo = this.$refs.promocode.value;
      const email = this.$refs.email.value;
      var response = await this.addPromoData({
        promo_code: promo,
        code_type: this.addQuerySel,
        expiry_time:
          this.datetime13.toLocaleString().slice(0, 10) +
          " " +
          this.datetime13.toLocaleString().slice(11, 19),
        email: email
      });
    },
    creatingList_: async function() {
      var response = await this.creatingList({
        mode: this.devapi
      });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.customWidthhundred {
  width: 100%;
  /* line-height: 0; */
}
.btn-float-right {
  float: right;
  color: #1b1e24;
}
.customBg {
  background: #ffffff;
  color: black;
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
  color: #9ea7af;
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
