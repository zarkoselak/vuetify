import Vue from 'vue'
import Vuetify from '@/components/Vuetify'

describe('Vuetify instance', () => {
  describe('create instance', () => {
    const vuetify = new Vuetify()
    const vm = new Vue({
      vuetify
    })
    expect(vm.$vuetify).toBeDefined()
  })
})
