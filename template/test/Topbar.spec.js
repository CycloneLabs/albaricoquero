import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Topbar from 'component/Topbar';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Users.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Topbar, { localVue, router });
  });

  it('Has valid template name in .logo', () => {
    expect(wrapper.find('.logo').text()).to.equal('Albaricoquero');
  });
});
