<template>
    <div>
        <div class="row cover">
            <div id="sidbar" class="col-2 ">
                <div class="div-header text-center">Detected Trackers</div>
                <ul>
                    <li> <img src="./../../public/dashboard.png" />
                        <p>Dashboar</p>
                    </li>
                    <li><img src="./../../public/about.png" />
                        <p>About us </p>
                    </li>
                    <li><img src="./../../public/change.png" />
                        <p>Chnage profile</p>
                    </li>
                </ul>
            </div>
            <div class="col-9 ">
                <!-- main container -->
                <div class="div-header  color-047488 text-left pl-3">My Profile</div>
                <!-- profile div-->
                <div id="content" class="mt-3">
                    <div class=" row col-4">
                        <label for="profileSelect">Change Profile:</label>
                        <select id="profileSelect" class="form-control">
                            <option value="allProfiles" selected>All Profiles</option>
                            <option value="profile1">Windows Desktop</option>
                            <option value="profile2">MacBook Air</option>
                            <option value="profile3">iPhone X</option>
                        </select>
                    </div>

                    <!-- The div and row that should hold both the table and chart -->
                    <hr>
                    <div class="row  text-center px-3">
                        <div class="col-6 br-1">
                            <h3>Your Current Profile </h3>
                        </div>
                        <div class="col-6">
                            <h3>Change To</h3>
                        </div>
                    </div>
                    <hr>
                    <div class="row text-center ">
                        <div class="col-6 br-1">
                            <div class="row ">
                                <div class="col-6 p-3 color-047488  font-weight-bold "> Profile name</div>
                                <div class="col-6 p-3"> iphone 12 </div>
                            </div>
                            <div class="row ">
                                <div class="col-6 p-3 color-047488  font-weight-bold"> Profile name</div>
                                <div class="col-6 p-3"> iphone 12 </div>
                            </div>
                            <div class="row ">
                                <div class="col-6 p-3 color-047488  font-weight-bold"> Profile name</div>
                                <div class="col-6 p-3"> iphone 12 </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="row ">
                                <div class="col-6 p-3 color-047488  font-weight-bold"> Profile name</div>
                                <div class="col-6 p-3"> iphone 12 </div>
                            </div>
                            <div class="row ">
                                <div class="col-6 p-3 color-047488  font-weight-bold"> Profile name</div>
                                <div class="col-6 p-3"> iphone 12 </div>
                            </div>
                            <div class="row ">
                                <div class="col-6 p-3 color-047488  font-weight-bold"> Profile name</div>
                                <div class="col-6 p-3"> iphone 12 </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
#sidbar {
    display: inline-block;
    background: #f1f1f1;
}

.br-1 {
    border-right: 1px solid #91919178;
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

