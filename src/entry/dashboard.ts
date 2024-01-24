
import { createApp } from "vue"
import DashboardViewComponent from "../view/DashboardView.vue"


window.addEventListener("load", () => {

    //append app
    const contentDetectorWrapper = document.createElement("div")
    contentDetectorWrapper.id="dashboard-wrapper-container"
    document.body.appendChild(contentDetectorWrapper)

    const contentDetectorHandlerApp = createApp(DashboardViewComponent)
    contentDetectorHandlerApp.mount("#dashboard-wrapper-container") 

})






