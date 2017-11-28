import Vue from 'vue';
import StatusPicker from '@/components/StatusPicker';

describe('Unit | Component | StatusPicker.vue', () => {
  let component;
  const Constructor = Vue.extend(StatusPicker);

  beforeEach(() => {
    component = new Constructor().$mount();
  });

  it('should be named "StatusPicker"', () => {
    expect(component.$options.name).to.equal('StatusPicker');
  });

  describe('$data', () => {
    it('should have displayedStatus property set by default to anyStatus', () => {
      expect(component.$data.displayedStatus).to.equal('anyStatus');
    });
  });

  describe('watch #displayedStatus', () => {
    it('should emit selected event with selected name', () => {
      // given
      const spy = sinon.spy();
      component.$emit = spy;

      // when
      component.displayedStatus = 'propales';

      // then
      return Vue.nextTick().then(() => {
        expect(spy).to.have.been.calledWith('selected', 'propales');
      });
    });
  });
});
