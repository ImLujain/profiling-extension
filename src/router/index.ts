import { createWebHashHistory, createRouter } from "vue-router";
import ProfileViewComponent from "../view/ProfileView.vue"
import DashboardViewComponent from "../view/DashboardView.vue"
import aboutViewComponent from "../view/AboutView.vue"

const Home = DashboardViewComponent
const changeProfile = ProfileViewComponent
const about = aboutViewComponent


const routes = [
  {
    path: "/",
    name: "Home",
    component: DashboardViewComponent,
  },
  {
    path: "/about",
    name: "About",
    component: about,
  },

  {
    path: "/change-profile",
    name: "changeProfile",
    component: changeProfile,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  

});

export default router;