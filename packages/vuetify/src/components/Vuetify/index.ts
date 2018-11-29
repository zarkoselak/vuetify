import _Vue from 'vue'

import application from './mixins/application'
import breakpoint from './mixins/breakpoint'
import IconsService from './services/IconsService'
import OptionsService from './services/OptionsService'
import ThemeService from './services/ThemeService'
import genLang from './mixins/lang'
import goTo from './util/goTo'

// Utils
import { consoleWarn, consoleError } from '../../util/console'

// Types
import { VueConstructor } from 'vue/types'
import { Vuetify as VuetifyPlugin, VuetifyUseOptions } from 'vuetify/types'

const Vuetify = (function Vuetify (args: VuetifyUseOptions = {}) {
  const lang = genLang(args.lang)

  const $vuetify = new _Vue({
    vuetify: true,
    mixins: [
      breakpoint,
      IconsService(args),
      OptionsService(args),
      ThemeService(args)
    ],
    data: {
      application,
      dark: false,
      lang,
      rtl: args.rtl
    },
    methods: {
      goTo,
      t: lang.t.bind(lang)
    }
  })

  const services = $vuetify.$options.mounted as Function[] | undefined
  services && services.forEach(service => service($vuetify))

  return $vuetify
}) as unknown as VuetifyPlugin

Vuetify.version = __VUETIFY_VERSION__

Vuetify.install = function install (Vue: VueConstructor, args: VuetifyUseOptions = {}) {
  if ((this as any).installed) return
  ;(this as any).installed = true

  if (_Vue !== Vue) {
    consoleError('Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you\'re seeing "$attrs is readonly", it\'s caused by this')
  }

  checkVueVersion(Vue)

  if (args.directives) {
    for (const name in args.directives) {
      Vue.directive(name, args.directives[name])
    }
  }

  (function registerComponents (components: VuetifyUseOptions['components']) {
    if (components) {
      for (const key in components) {
        const component = components[key]
        if (component && !registerComponents(component.$_vuetify_subcomponents)) {
          Vue.component(key, component as typeof Vue)
        }
      }
      return true
    }
    return false
  })(args.components)

  Vue.mixin({
    beforeCreate () {
      const options = this.$options

      if (options.vuetify === true) {
        // noop, prevents an infinite loop
        // when we create our own vue instance
      } else if (options.vuetify) {
        (options.vuetify.$parent as any) = this
        this.$vuetify = options.vuetify
      } else if (options.parent && options.parent.$vuetify) {
        this.$vuetify = options.parent.$vuetify
      } else {
        Vue.prototype.$vuetify = new Vuetify(args)
      }
    }
  })
}

export default Vuetify

export function checkVueVersion (Vue: VueConstructor, requiredVue?: string) {
  const vueDep = requiredVue || __REQUIRED_VUE__

  const required = vueDep.split('.', 3).map(v => v.replace(/\D/g, '')).map(Number)
  const actual = Vue.version.split('.', 3).map(n => parseInt(n, 10))

  // Simple semver caret range comparison
  const passes =
    actual[0] === required[0] && // major matches
    (actual[1] > required[1] || // minor is greater
      (actual[1] === required[1] && actual[2] >= required[2]) // or minor is eq and patch is >=
    )

  if (!passes) {
    consoleWarn(`Vuetify requires Vue version ${vueDep}`)
  }
}
