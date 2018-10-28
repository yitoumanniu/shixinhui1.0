import Vue from 'vue'
import Vuex from 'vuex' 
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userinfo: {
            username: '',
            desc: '',
            email: '',
            avatar: '',
            nickname: ''
        }
    },
    mutations: {
        CHANGE_USERINFO(state, userinfo) {
            state.userinfo = userinfo       //将取得数据放入vuex中的方法
        }
    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => sessionStorage.getItem(key),
                // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
                setItem: (key, value) =>
                    sessionStorage.setItem(key, value),
                removeItem: key => sessionStorage.removeItem(key),
            },
        }),
    ],

})

export default store
