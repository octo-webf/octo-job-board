import Vue from 'vue';
import KindPicker from '@/components/KindPicker';

describe('Unit | Component | KindPicker.vue', () => {
  let component;
  const Constructor = Vue.extend(KindPicker);

  beforeEach(() => {
    component = new Constructor().$mount();
  });

  it('should be named "KindPicker"', () => {
    expect(component.$options.name).to.equal('KindPicker');
  });

  describe('$data', () => {
    it('should have displayedKind property set by default to anyKind', () => {
      expect(component.$data.displayedKind).to.equal('anyKind');
    });
  });

  describe('watch #displayedKind', () => {
    xit('should emit selected event with selected name', () => {
      // given
      const spy = sinon.spy();
      component.$emit = spy;

      // when
      component.displayedKind = 'fixedPrice';

      // then
      return Vue.nextTick().then(() => {
        expect(spy).to.have.been.calledWith('selected', 'fixedPrice');
      });
    });
  });
});
