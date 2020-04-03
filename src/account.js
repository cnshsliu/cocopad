'use strict'
const Account = {
    url: "http://localhost:5008/account/",

    register: function (payload) {
        payload.email = payload.name;

    },
    signin: function () {

    },
    logout: function () {

    },

};

export default Account;