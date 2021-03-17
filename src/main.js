import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vuelidate from 'vuelidate';
import VueRouter from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import SignupPage from './components/SignupPage.vue';
import BattleField from './components/BattleField.vue';
import DungeonsPage from './components/DungeonsPage.vue';
import CharacterInfoPage from './components/CharacterInfoPage.vue';
import InventoryPage from './components/InventoryPage.vue';
import VueResource from 'vue-resource';
import { baseUrl } from './models/apiConfig';
import { routeConfig } from './models/routeConfig';
import { loggedInGuard } from './shared/guards/loggedInGuard';
import DefaultLayout from './layouts/DefaultLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
import { store } from './shared/store/rootStore';
import { uppercase } from './shared/filters/uppercase';

Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = baseUrl;
Vue.component('default-layout', DefaultLayout);
Vue.component('main-layout', MainLayout);
Vue.filter('uppercase', uppercase)

const routes = [
  {
    ...routeConfig.signup,
    component: SignupPage,
    meta: {
      music: 'menu'
    }
  },
  {
    ...routeConfig.login,
    component: LoginPage,
    meta: {
      music: 'menu'
    }
  },
  {
    ...routeConfig.character.index,
    component: CharacterInfoPage,
    meta: {
      layout: 'main-layout',
      music: 'inventory'
    }
  },
  {
    ...routeConfig.character.inventory,
    component: InventoryPage,
    meta: {
      layout: 'main-layout',
      music: 'inventory'
    }
  },
  {
    ...routeConfig.dungeons.index,
    component: DungeonsPage,
    meta: {
      layout: 'main-layout',
      music: 'inventory'
    }
  },
  {
    ...routeConfig.dungeons.battle,
    component: BattleField,
    music: 'battle'
  },
  {
    path: '/',
    redirect: routeConfig.login.path
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach(loggedInGuard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
