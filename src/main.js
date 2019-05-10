// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/styles.scss'
import '~/assets/wtf-forms.scss'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/pro-solid-svg-icons";
import { faAxeBattle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueApexCharts from 'vue-apexcharts';


library.add(faUserSecret, faAxeBattle);
// library.add(faAxeBattle);



export default function (Vue, {router, head, isClient}) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component("font-awesome-icon", FontAwesomeIcon);
  Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
}