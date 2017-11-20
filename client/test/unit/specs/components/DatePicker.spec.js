import Vue from 'vue';
import DatePicker from '@/components/DatePicker';

describe('Unit | Component | DatePicker.vue', () => {
  let component;
  const Constructor = Vue.extend(DatePicker);
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers(new Date(2017, 9, 4).getTime());
    component = new Constructor().$mount();
  });

  afterEach(() => {
    clock.restore();
  });

  it('should be named "DatePicker"', () => {
    // when
    expect(component.$options.name).to.equal('DatePicker');
  });

  describe('$data', () => {
    // TODO find a better solution to write this assertion
    it('should have date property set to today', () => {
      expect(component.$data.date - new Date(2017, 9, 4)).to.equal(0);
    });
  });

  describe('watch #date', () => {
    it('should emit selected event with selectedDate name', () => {
      // given
      const spy = sinon.spy();
      component.$emit = spy;

      // when
      component.date = 'Mon, 20 Nov 2017 12:26:58 GMT ';

      // then
      return Vue.nextTick().then(() => {
        expect(spy).to.have.been.calledWith('selected', 'Mon, 20 Nov 2017 12:26:58 GMT ');
      });
    });
  });
});
