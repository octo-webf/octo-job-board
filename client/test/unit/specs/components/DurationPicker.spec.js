import Vue from 'vue';
import DurationPicker from '@/components/DurationPicker';

describe('Unit | Component | DurationPicker.vue', () => {
  let component;
  const Constructor = Vue.extend(DurationPicker);

  beforeEach(() => {
    component = new Constructor().$mount();
  });

  it('should be named "DurationPicker"', () => {
    expect(component.$options.name).to.equal('DurationPicker');
  });

  describe('$data', () => {
    it('should have displayedDuration property set by default to anyDuration', () => {
      expect(component.$data.displayedDuration).to.equal('anyDuration');
    });
  });

  describe('watch #displayedDuration', () => {
    it('should emit selected event with selected name', () => {
      // given
      const spy = sinon.spy();
      component.$emit = spy;

      // when
      component.displayedDuration = 'shortDuration';

      // then
      return Vue.nextTick().then(() => {
        expect(spy).to.have.been.calledWith('selected', 'shortDuration');
      });
    });
  });
});
