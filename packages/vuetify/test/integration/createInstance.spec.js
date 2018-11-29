import Vue from 'vue'
import Vuetify from '@/components/Vuetify'

describe('Vuetify instance', () => {
  // TODO: actually test something
  test('create instance', () => {
    Vue.use(Vuetify)
    const vuetify = new Vuetify()
    const vm = new Vue({
      vuetify
    })
    expect(vm.$vuetify).toBeDefined()
  })
})
