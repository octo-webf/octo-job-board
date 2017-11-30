import Vue from 'vue';
import MissionTypePicker from '@/components/MissionTypePicker';

describe('Unit | Component | MissionTypePicker.vue', () => {
  let component;
  const Constructor = Vue.extend(MissionTypePicker);

  beforeEach(() => {
    component = new Constructor().$mount();
  });

  it('should be named "MissionTypePicker"', () => {
    expect(component.$options.name).to.equal('MissionTypePicker');
  });

  describe('$data', () => {
    it('should have displayedMissionType property set by default to delivery and consulting', () => {
      expect(component.$data.displayedMissionType).to.deep.equal(['Delivery', 'Consulting']);
    });
  });

  describe('watch #displayedMissionType', () => {
    it('should emit selected event with selected name', () => {
      // given
      const spy = sinon.spy();
      component.$emit = spy;

      // when
      component.displayedMissionType = ['Delivery', 'Training'];

      // then
      return Vue.nextTick().then(() => {
        expect(spy).to.have.been.calledWith('selected', ['Delivery', 'Training']);
      });
    });
  });
});
