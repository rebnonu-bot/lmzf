import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomTabBar from '@/components/CustomTabBar.vue'

// Mock uni API
vi.mock('@dcloudio/uni-app', () => ({
  onShow: vi.fn(),
  onHide: vi.fn(),
  onLaunch: vi.fn(),
}))

global.uni = {
  switchTab: vi.fn(),
  navigateTo: vi.fn(),
  hideTabBar: vi.fn(),
} as any

describe('CustomTabBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    const wrapper = mount(CustomTabBar, {
      props: {
        active: 'home',
      },
    })
    expect(wrapper.find('.custom-tab-bar').exists()).toBe(true)
    expect(wrapper.findAll('.tab-item').length).toBe(2)
    expect(wrapper.find('.scan-wrapper').exists()).toBe(true)
  })

  it('should highlight home tab when active is home', () => {
    const wrapper = mount(CustomTabBar, {
      props: {
        active: 'home',
      },
    })
    
    const homeTab = wrapper.findAll('.tab-item')[0]
    expect(homeTab.classes()).toContain('active')
  })

  it('should highlight my tab when active is my', () => {
    const wrapper = mount(CustomTabBar, {
      props: {
        active: 'my',
      },
    })
    
    const myTab = wrapper.findAll('.tab-item')[1]
    expect(myTab.classes()).toContain('active')
  })

  it('should call switchTab when clicking tab', async () => {
    const wrapper = mount(CustomTabBar, {
      props: {
        active: 'home',
      },
    })
    
    const myTab = wrapper.findAll('.tab-item')[1]
    await myTab.trigger('tap')
    
    expect(uni.switchTab).toHaveBeenCalledWith({
      url: '/pages/my/index',
    })
  })

  it('should call navigateTo when clicking scan button', async () => {
    const wrapper = mount(CustomTabBar, {
      props: {
        active: 'home',
      },
    })
    
    const scanButton = wrapper.find('.scan-wrapper')
    await scanButton.trigger('tap')
    
    expect(uni.navigateTo).toHaveBeenCalledWith({
      url: '/pages/scan/index',
    })
  })

  it('should update localActive when prop changes', async () => {
    const wrapper = mount(CustomTabBar, {
      props: {
        active: 'home',
      },
    })
    
    expect(wrapper.vm.localActive).toBe('home')
    
    await wrapper.setProps({ active: 'my' })
    expect(wrapper.vm.localActive).toBe('my')
  })
})
