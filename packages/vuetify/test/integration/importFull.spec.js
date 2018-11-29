import Vue from 'vue'
import Vuetify from '@/'
import getAllPropertyNames from '@/test/util/getAllPropertyNames'

describe('full import', () => {
  Vue.use(Vuetify)
  const registeredComponents = getAllPropertyNames(Vue.options.components).sort()
  const registeredDirectives = getAllPropertyNames(Vue.options.directives).sort()

  // TODO: update ts-jest
  registeredComponents.splice(registeredComponents.indexOf('default'), 1)

  it('should register all subcomponents', () => {
    expect(registeredComponents).toMatchSnapshot()
  })

  it('should register all names in PascalCase', () => {
    registeredComponents.forEach(name =>
      expect(name).toMatch(/^(?:[A-Z][a-z]*)+$/)
    )
  })

  it('should register all directives', () => {
    expect(registeredDirectives).toMatchSnapshot()
  })
})
