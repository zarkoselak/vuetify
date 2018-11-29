import Vue from 'vue'
import ThemeService, { ServiceInstance } from '@/components/Vuetify/services/ThemeService'
import { test } from '@/test'

test('Vuetify.theme', ({ mount }) => {
  const theme = new (ThemeService({}))().theme

  it('should watch theme', async () => {
    const vm = new Vue()
    const el = document.getElementById('vuetify-theme-stylesheet')

    expect(el.outerHTML).toMatchSnapshot()
    vm.$vuetify.theme.primary = '#000'
    await vm.$nextTick()
    expect(el.outerHTML).toMatchSnapshot()
  })

  it('should generate theme using css variables', async () => {
    const vm = new ServiceInstance({
      vuetify: {
        theme,
        options: { customProperties: true }
      }
    })

    await vm.$nextTick()
    expect(vm.style).toMatchSnapshot()
  })

  it('should set a CSP nonce', async () => {
    // Delete the old stylesheet first
    let el = document.getElementById('vuetify-theme-stylesheet')
    el && el.parentNode.removeChild(el)

    const vm = new ServiceInstance({
      vuetify: {
        theme,
        options: { cspNonce: 'asdfghjkl' }
      }
    })

    el = document.getElementById('vuetify-theme-stylesheet')
    expect(el).toBeTruthy()
    expect(el.getAttribute('nonce')).toBe('asdfghjkl')
  })
})
