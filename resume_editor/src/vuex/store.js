import Vuex from 'vuex'
import Vue from 'vue'
import AV from 'leancloud-storage'

Vue.use(Vuex)

const APP_ID = 'mvEzkoDQA3TSp6uTIbz81Mk0-gzGzoHsz'
const APP_KEY = 'hV7aJ6xx0vtOh9FIvc3e8eei'

AV.init({
  appId: APP_ID, 
  appKey: APP_KEY
})

const store = new Vuex.Store({
  state: {
    profile: {
      personalInformation: {
        name: '',
        birthday: '',
        sex: '',
        currentStatus: '',
        workingYears: '',
        liveCity: '',
        expectCity: '',
        expectPosition: ''
      },
      work: [{
        time: '',
        company: '',
        project: ''
      },
      {
        time: '',
        company: '',
        project: ''
      }],
      education: [{
        time: '',
        school: '',
        situation: ''
      },
      {
        time: '',
        school: '',
        situation: ''
      }],
      hobbies: [{
        hobby: ''
      },
      {
        hobby: ''
      }],
      prize: [{
        name: '',
        desription: ''
      },
      {
        name: '',
        description: ''
      }],
      contact: {
        phone: '',
        email: ''
      }
    }
  },
  getters: {
    // 过滤数据
    getProfile(state) {
      let newObj = {}
      let profile = state.profile

      let isEmptyObj = obj => {
        let isEmptyObj = true

        for (let value of Object.values(obj)) {
          if (value) {
            isEmptyObj = false
            break
          }
        }

        return isEmptyObj
      }

      let filterData = (key, value) => {
        if (Array.isArray(value)) {
          newObj[key] = value.filter(item => !isEmptyObj(item))
        }else {
          newObj[key] = value
        }
      }

      for (let [key,value] of Object.entries(profile)) {
        filterData(key, value)
      }

      return newObj
    }
  },
  mutations: {
    // 添加项
    ADD_ITEM(state, payload) {
      switch (payload) {
        case 1:
        state.profile.work.push({
          time: '',
          company: '',
          project: ''
        })
        break

        case 2:
        state.profile.education.push({
          time: '', 
          school: '',
          situation: ''
        })
        break

        case 3:
        state.profile.hobbies.push({hobby: ''})
        break

        case 4:
        state.profile.prize.push({name: '', description: ''})
        break

        default: 
        return
      }
    },
    // 移除项
    REMOVE_ITEM(state, payload) {
      let {i1, i2} = payload
      let removeItem = (obj, index) => {
        if (obj.length === 1) {
          return
        }
        obj.splice(index, 1)
      }

      switch (i1) {
        case 1:
        removeItem(state.profile.work, i2)
        break

        case 2:
        removeItem(state.profile.education, i2)
        break

        case 3:
        removeItem(state.profile.hobbies, i2)
        break

        case 4:
        removeItem(state.profile.prize, i2)
        break

        default:
        return
      }
    },
    // 改变数据
    CHANGE_PROFILE(state, payload) {
      state.profile = payload
    }
  }
})

export default store