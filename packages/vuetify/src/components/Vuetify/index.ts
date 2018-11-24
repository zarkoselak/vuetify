import OurVue, { PluginFunction } from 'vue'

import application from './mixins/application'
import breakpoint from './mixins/breakpoint'
import theme from './mixins/theme'
import icons from './mixins/icons'
import options from './mixins/options'
import genLang from './mixins/lang'
import goTo from './util/goTo'

// Utils
import { consoleWarn, consoleError } from '../../util/console'

// Types
import { VueConstructor } from 'vue/types'
import { Vuetify as VuetifyPlugin, VuetifyUseOptions } from 'vuetify/types'

interface VuetifySomething {
  new (Vue: VueConstructor, args?: VuetifyUseOptions): InstanceType<typeof OurVue>
  install: PluginFunction<VuetifyUseOptions>
  version: string
}

const Vuetify = (function Vuetify (Vue: VueConstructor, args: VuetifyUseOptions = {}) {
  const lang = genLang(args.lang)

  return new Vue({
    vuetify: true,
    mixins: [
      breakpoint
    ],
    data: {
      application,
      dark: false,
      icons: icons(args.iconfont, args.icons),
      lang,
      options: options(args.options),
      rtl: args.rtl,
      theme: theme(args.theme)
    },
    methods: {
      goTo,
      t: lang.t.bind(lang)
    }
  })
}) as unknown as VuetifySomething

Vuetify.version = __VUETIFY_VERSION__

Vuetify.install = function install (Vue: VueConstructor, args: VuetifyUseOptions = {}) {
  if ((this as any).installed) return
  ;(this as any).installed = true

  if (OurVue !== Vue) {
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
        // noop
      } else if (options.vuetify) {
        options.vuetify.rootInstance = this

        Vue.util.defineReactive(this, '$vuetify', options.vuetify.framework)
      } else if (options.parent && options.parent.$vuetify) {
        this.$vuetify = options.parent.$vuetify
      } else {
        const vuetify = new Vuetify(Vue, args)
        Vue.prototype.$vuetify = vuetify
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
