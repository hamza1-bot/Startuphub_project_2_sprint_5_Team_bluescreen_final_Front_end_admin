import axios from "axios";


const base_url='http://localhost:8010/StartupHub/api/'


export const userService={
    loginApi,
    user_list_api,
    blockUnblockUser,
    post_list_api,
    deletePost,
    getDashboardData,
    removeUser,
    getOtherUserProfileData,
    editProfileByAdmin,
    changePassword,
    viewProfile,
    editProfile,
    forgotPassword
}


function loginApi(payload) { 
    return axios.post(base_url + 'adminLogin/', payload);
}

function user_list_api(){
    return axios.post(base_url +'getUsers/', {});
}

function blockUnblockUser(payload) { 
    return axios.post(base_url + 'blockUnblockUser/', payload);
}

function post_list_api(){
    return axios.post(base_url +'getPosts/', {});
}

function deletePost(payload) { 
    return axios.post(base_url + 'deletePost/', payload);
}

function getDashboardData() { 
    return axios.post(base_url + 'dashboardData/', {});
}

function removeUser(payload) { 
    return axios.post(base_url + 'removeUser/', payload);
}

// api call to get other user profile data
function getOtherUserProfileData(payload) {
    return axios.post(base_url + 'otherUserProfile/', payload);
}

function viewProfile(payload) {
    return axios.post(base_url + 'viewProfile/', payload);
}

function editProfileByAdmin(payload) {
    return axios.post(base_url + 'editProfileByAdmin/', payload);
}

function changePassword(payload) {
    return axios.put(base_url + 'changePassword/', payload);
}

function editProfile(payload) {
    return axios.post(base_url + 'editProfile/', payload);
}

// api call to send request for forgot password
function forgotPassword(formData) {
    return axios.post(base_url + 'forgotPassword/', formData);
}