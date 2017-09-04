import Vue from 'vue';
import CountryFilters from '@/components/CountryFilters';

describe('Unit | Component | CountryFilters.vue', () => {
  let component;
  const Constructor = Vue.extend(CountryFilters);

  beforeEach(() => {
    component = new Constructor().$mount();
  });

  it('should be named "CountryFilters"', () => {
    // when
    expect(component.$options.name).to.equal('CountryFilters');
  });

  describe('$data', () => {
    it('should have onlyOneCountry property set to anyCountry', () => {
      expect(component.$data.onlyOneCountry).to.equal('anyCountry');
    });
  });

  describe('watch #onlyOneCountry', () => {
    it('should emit selectCountryFilter event with selectedCountry name', () => {
      // given
      const spy = sinon.spy();
      component.$emit = spy;

      // when
      component.onlyOneCountry = 'France';

      // then
      return Vue.nextTick().then(() => {
        expect(spy).to.have.been.calledWith('selectCountryFilter', 'France')
      });
    });
  });
});
