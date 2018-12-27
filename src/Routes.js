import Vue from 'vue';
import Router from 'vue-router';
import Tab1 from '../src/components/tabulardata.vue'
import tabulardata2 from '../src/components/tabularData2.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: 'Tab1',
      component: Tab1,
    },
    {
      path: '/tab2',
      name: 'tabulardata2',
      component: tabulardata2,
    },


  ],
});