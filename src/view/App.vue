<template>
      <div class="row cover">
            <div id="sidbar" class="col-2 ">
                <div class="div-header text-center">Privacy Guard</div>
                <ul>
                    <li>   
                        <router-link to="/">
                            <img src="./../../public/dashboard.png" />
                            <p  class="color-047488">Dashboar</p>
                    </router-link> 
                        
                    </li>
                    <li>
                        <router-link to="/about">
                            <img src="./../../public/about.png" />
                        <p class="color-047488">About us </p>
                        </router-link >
                    </li>
                    <li>
                        <router-link to="/change-profile">
                            <img src="./../../public/change.png" />
                        <p  class="color-047488">Chnage profile</p>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="col-9 ">
    <router-view />
    </div>
    </div>
  </template>

<style scoped>


#sidbar {
    display: inline-block;
    background: #f1f1f1;
}

#sidbar .div-header {
    font-family: 'Orbitron', sans-serif;
}

/* display: inline; */


#sidbar li {
    list-style: none;
    padding: 8px;

}

#sidbar ul {
    padding: 0px;
    text-align: left;
}

.color-047488 {
    color: #047488;
}

#sidbar img {
    width: 23px;
}

#sidbar p {
    padding-left: 6px;
    display: inline-block;
    margin: 2px;
}

#sidbar li:hover {
    color: #047488;
}

.app {
    display: inline-block;
}

.div-header {
    padding: 10px 0;
    border-bottom: 1px solid gray;
}

.cover {
    height: 892px;

}
</style>