import './stylus/app.styl'
import VuetifyComponent from './components/Vuetify'
import * as components from './components'
import directives from './directives'
import { VueConstructor } from 'vue'
import { VuetifyUseOptions } from 'vuetify/types'

export default function Vuetify (Vue: VueConstructor, args: VuetifyUseOptions = {}) {
  return new VuetifyComponent(Vue, args)
}

Vuetify.install = function install (Vue: VueConstructor, args: VuetifyUseOptions = {}) {
  Vue.use(VuetifyComponent, {
    components,
    directives,
    ...args
  })
}

Vuetify.version = __VUETIFY_VERSION__

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuetify)
}
