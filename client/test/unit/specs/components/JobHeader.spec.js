import Vue from 'vue';
import JobHeader from '@/components/JobHeader';

describe('Unit | Component | JobHeader.vue', () => {
  let component;
  const Constructor = Vue.extend(JobHeader);

  it('should be named "JobHeader"', () => {
    // when
    component = new Constructor().$mount();
    expect(component.$options.name).to.equal('JobHeader');
  });

  describe('render', () => {
    it('should have a date picker', () => {
      const datePicker = component.$el.querySelectorAll('.date-picker');
      expect(datePicker.length).to.equal(1);
    });

    it('should have a country picker', () => {
      const countryPicker = component.$el.querySelectorAll('.country-picker');
      expect(countryPicker.length).to.equal(1);
    });

    it('should have a status picker', () => {
      const statusPicker = component.$el.querySelectorAll('.status-picker');
      expect(statusPicker.length).to.equal(1);
    });

    it('should have a duration picker', () => {
      const durationPicker = component.$el.querySelectorAll('.duration-picker');
      expect(durationPicker.length).to.equal(1);
    });

    it('should have a missionType picker', () => {
      const missionTypePicker = component.$el.querySelectorAll('.mission-type-picker');
      expect(missionTypePicker.length).to.equal(1);
    });
  });

  describe('onSelectedAvailabilityDate', () => {
    afterEach(() => {
      component.$emit.restore();
    });

    it('should emit selected event with selectedDate name', () => {
      // given
      sinon.stub(component, '$emit');
      const date = new Date();

      // when
      component.onSelectedAvailabilityDate(date);

      // then
      return Vue.nextTick().then(() => {
        expect(component.$emit).to.have.been.calledWith('selectedDate', date);
      });
    });
  });

  describe('onSelectedCountry', () => {
    afterEach(() => {
      component.$emit.restore();
    });

    it('should emit selected event with selectedCountry name', () => {
      // given
      sinon.stub(component, '$emit');

      // when
      component.onSelectedCountry('France');

      // then
      return Vue.nextTick().then(() => {
        expect(component.$emit).to.have.been.calledWith('selectedCountry', 'France');
      });
    });
  });

  describe('onSelectedStatus', () => {
    afterEach(() => {
      component.$emit.restore();
    });

    it('should emit selected event with selectedStatus name', () => {
      // given
      sinon.stub(component, '$emit');

      // when
      component.onSelectedStatus('proposals');

      // then
      return Vue.nextTick().then(() => {
        expect(component.$emit).to.have.been.calledWith('selectedStatus', 'proposals');
      });
    });
  });

  describe('onSelectedDuration', () => {
    afterEach(() => {
      component.$emit.restore();
    });

    it('should emit selected event with selectedDuration name', () => {
      // given
      sinon.stub(component, '$emit');

      // when
      component.onSelectedDuration('shortDuration');

      // then
      return Vue.nextTick().then(() => {
        expect(component.$emit).to.have.been.calledWith('selectedDuration', 'shortDuration');
      });
    });
  });

  describe('onSelectedMissionType', () => {
    afterEach(() => {
      component.$emit.restore();
    });

    it('should emit selected event with selectedMissionType name', () => {
      // given
      sinon.stub(component, '$emit');

      // when
      component.onSelectedMissionType(['Delivery']);

      // then
      return Vue.nextTick().then(() => {
        expect(component.$emit).to.have.been.calledWith('selectedMissionType', ['Delivery']);
      });
    });
  });
});
