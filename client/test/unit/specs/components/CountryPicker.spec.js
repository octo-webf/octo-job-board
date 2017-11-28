import Vue from 'vue';
import CountryPicker from '@/components/CountryPicker';

describe('Unit | Component | CountryPicker.vue', () => {
  let component;
  const Constructor = Vue.extend(CountryPicker);

  beforeEach(() => {
    component = new Constructor().$mount();
  });

  it('should be named "CountryPicker"', () => {
    expect(component.$options.name).to.equal('CountryPicker');
  });

  describe('$data', () => {
    it('should have onlyOneCountry property set by default to anyCountry', () => {
      expect(component.$data.onlyOneCountry).to.equal('anyCountry');
    });
  });

  describe('watch #onlyOneCountry', () => {
    it('should emit selected event with selected name', () => {
      // given
      const spy = sinon.spy();
      component.$emit = spy;

      // when
      component.onlyOneCountry = 'France';

      // then
      return Vue.nextTick().then(() => {
        expect(spy).to.have.been.calledWith('selected', 'France');
      });
    });
  });
});
