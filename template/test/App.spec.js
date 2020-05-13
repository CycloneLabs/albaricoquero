import { mount } from '@vue/test-utils';
import App       from 'index/App.vue';

describe('App', () => {
  it('is Vue instance', () => {
    const wrapper = mount(App);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
