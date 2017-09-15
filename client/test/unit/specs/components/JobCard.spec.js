import moment from 'moment';
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import JobCard from '@/components/JobCard';
import interestsApi from '@/api/interests';
import authenticationService from '@/services/authentication';
import Icon from 'vue-awesome/components/Icon';

import 'vue-awesome/icons';

moment.locale('fr');

Vue.use(VueAnalytics, {
  id: `${process.env.ANALYTICS_ID}`,
});

Vue.component('icon', Icon);

describe('Unit | Component | JobCard.vue', () => {
  let component;
  let job;

  const consultant = {
    name: 'Samurai Jack',
    email: 'sjack@octo.com',
  };
  const accessToken = 'abcd-1234';

  beforeEach(() => {
    // given
    job = {
      id: 2,
      activity: {
        title: 'Tech Lead',
        staffing_needed_from: '2017-07-01',
      },
      project: {
        id: 123456,
        status: 'proposal_in_progress',
        name: 'Refonte du SI',
        customer: {
          name: 'La Poste - Courrier',
          sector: {
            name: 'FR - La Poste',
          },
        },
        duration: '10 mois',
        locations: 'OCTO',
        business_contact: {
          nickname: 'ABC',
        },
        mission_director: {
          nickname: 'XYZ',
        },
        reference: 'F2017-1234',
      },
    };
    sinon.stub(authenticationService, 'isAuthenticated').returns(true);
    sinon.stub(authenticationService, 'getAuthenticatedUser').returns(consultant);
    sinon.stub(authenticationService, 'getAccessToken').returns(accessToken);
    sinon.stub(interestsApi, 'sendInterest').resolves();

    // when
    const Constructor = Vue.extend(JobCard);
    component = new Constructor({
      propsData: {
        job,
      },
    }).$mount();
  });

  afterEach(() => {
    authenticationService.isAuthenticated.restore();
    authenticationService.getAuthenticatedUser.restore();
    authenticationService.getAccessToken.restore();
    interestsApi.sendInterest.restore();
  });

  describe('name', () => {
    it('should be named "JobCard"', () => {
      expect(component.$options.name).to.equal('JobCard');
    });
  });

  describe('rendering', () => {
    it('should display the appropriate project status', () => {
      expect(component.$el.querySelector('.job__status').getAttribute('class')).to.contain('job__status--proposal_in_progress');
    });

    it('should display the activity title', () => {
      expect(component.$el.querySelector('.job__title').textContent.trim()).to.equal('Tech Lead');
    });

    it('should display the mission name', () => {
      expect(component.$el.querySelector('.job__mission').textContent.trim()).to.equal('Refonte du SI');
    });

    it('should display the project reference', () => {
      expect(component.$el.querySelector('.job__reference').textContent.trim()).to.equal('#F2017-1234');
    });

    it('should display the client name', () => {
      expect(component.$el.querySelector('.job__customer').textContent.trim()).to.equal('La Poste - Courrier');
    });

    it('should display the staffing_needed_from', () => {
      expect(component.$el.querySelector('.job__start-date').textContent.trim()).to.equal('01/07/17');
    });

    it('should display the locations', () => {
      expect(component.$el.querySelector('.job__locations').textContent.trim()).to.equal('OCTO');
    });

    it('should display the business contact', () => {
      expect(component.$el.querySelector('.job__business-contact').textContent.trim()).to.equal('ABC');
    });

    it('should display the mission director when it exists', () => {
      expect(component.$el.querySelector('.job__mission-director').textContent.trim()).to.equal('XYZ');
    });

    it('should not display the mission director when it does not exist', () => {
      // given
      job.project.mission_director = null;

      // when
      return Vue.nextTick(() => {
        expect(component.$el.querySelector('.job__mission-director')).to.not.exist;
      });
    });
  });

  describe('#displayFeedbackModal', () => {
    beforeEach(() => {
      sinon.stub(component, '$emit');
    });

    afterEach(() => {
      component.$emit.restore();
    });

    it('should emit interest on click on interest button', () => Vue.nextTick().then(() => {
      // when
      component.$el.querySelector('button.job__apply-button').click();

      // then
      expect(component.$emit).to.have.been.calledWith('interest', job);
    }));
  });

  describe('computed property #mission', () => {
    it('should not shorten short mission name', () => {
      // Given
      job.project.name = 'Name shorter than 50 characters';

      // When
      const missionName = component.mission;

      // Then
      expect(missionName).to.equal('Name shorter than 50 characters');
    });

    it('should shorten long mission name to 50 characters', () => {
      // Given
      job.project.name = 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017';

      // When
      const missionName = component.mission;

      // Then
      expect(missionName).to.equal('SCLOU - Cloud computing : enjeux, architecture et');
    });
  });

  describe('computed property #staffingNeededSince', () => {
    it('should format the mission staffing_needed_from date (ex : "2017-07-01" => "Juillet 2017")', () => {
      // Given
      job.activity.staffing_needed_from = '2017-07-01';

      // When
      const staffingNeededSince = component.staffingNeededSince;

      // Then
      expect(staffingNeededSince).to.equal('01/07/17');
    });
  });

  describe('computed property #octopodUrl', () => {
    it('should format the link to Octopod project page', () => {
      // Given
      job.project.id = 12357;

      // When
      const octopodUrl = component.octopodUrl;

      // Then
      expect(octopodUrl).to.equal('https://octopod.octo.com/projects/12357');
    });
  });

  describe('computed property #statusClass', () => {
    it('should return job__status--"project status" class when api status is correct', () => {
      // Given
      job.project.status = 'mission_accepted';

      // When
      const statusClass = component.statusClass;

      // Then
      expect(statusClass).to.equal('job__status--mission_accepted');
    });

    it('should return empty string when api status is undefined', () => {
      // Given
      job.project.status = null;

      // When
      const statusClass = component.statusClass;

      // Then
      expect(statusClass).to.equal('');
    });
  });

  describe('computed property #status', () => {
    it('should return status is propale when api status is null', () => {
      // Given
      job.project.status = null;

      // When
      const status = component.status;

      // Then
      expect(status).to.equal('propale');
    });

    it('should return status is signé when api status is mission_accepted', () => {
      // Given
      job.project.status = 'mission_accepted';

      // When
      const status = component.status;

      // Then
      expect(status).to.equal('signé');
    });

    it('should return status is signé when api status is mission_signed', () => {
      // Given
      job.project.status = 'mission_signed';

      // When
      const status = component.status;

      // Then
      expect(status).to.equal('signé');
    });

    it('should return status is propale when api status is proposal_in_progress', () => {
      // Given
      job.project.status = 'proposal_in_progress';

      // When
      const status = component.status;

      // Then
      expect(status).to.equal('propale');
    });

    it('should return status is propale when api status is proposal_sent', () => {
      // Given
      job.project.status = 'proposal_sent';

      // When
      const status = component.status;

      // Then
      expect(status).to.equal('propale');
    });

    it('should return status is propale when api status is lead', () => {
      // Given
      job.project.status = 'lead';

      // When
      const status = component.status;

      // Then
      expect(status).to.equal('propale');
    });
  });

  describe('computed property #countryFlagClass', () => {
    it('should return the correct Australia flag class', () => {
      // Given
      job.project.customer.sector.name = 'Australia';

      // When
      const countrySrc = component.countryFlagClass;

      // Then
      expect(countrySrc).to.equal('flag-icon-au');
    });

    it('should return the correct Morocco flag class', () => {
      // Given
      job.project.customer.sector.name = 'Maroc';

      // When
      const countrySrc = component.countryFlagClass;

      // Then
      expect(countrySrc).to.equal('flag-icon-ma');
    });

    it('should return the correct flag class', () => {
      // Given
      job.project.customer.sector.name = 'Suisse';

      // When
      const countrySrc = component.countryFlagClass;

      // Then
      expect(countrySrc).to.equal('flag-icon-ch');
    });

    it('should return the default France flag class', () => {
      // Given
      job.project.customer.sector.name = 'FR - Distribution';

      // When
      const countrySrc = component.countryFlagClass;

      // Then
      expect(countrySrc).to.equal('flag-icon-fr');
    });
  });

  describe('computed property #showCountryLogo', () => {
    it('should return true if the job is in Australia', () => {
      // Given
      job.project.customer.sector.name = 'Australia';

      // When
      const showCountryLogo = component.showCountryLogo;

      // Then
      expect(showCountryLogo).to.be.true;
    });

    it('should return true if the job is in Morocco', () => {
      // Given
      job.project.customer.sector.name = 'Maroc';

      // When
      const showCountryLogo = component.showCountryLogo;

      // Then
      expect(showCountryLogo).to.be.true;
    });

    it('should return true if the job is in Switzerland', () => {
      // Given
      job.project.customer.sector.name = 'Suisse';

      // When
      const showCountryLogo = component.showCountryLogo;

      // Then
      expect(showCountryLogo).to.be.true;
    });

    it('should return false if the job is in France', () => {
      // Given
      job.project.customer.sector.name = 'FR - Assurances';

      // When
      const showCountryLogo = component.showCountryLogo;

      // Then
      expect(showCountryLogo).to.be.false;
    });
  });

  describe('computed property #jobFlagClass', () => {
    it('should return empty if the job is in France', () => {
      // Given
      job.project.customer.sector.name = 'FR - La Poste';

      // When
      const jobFlagClass = component.jobFlagClass;

      // Then
      expect(jobFlagClass).to.equal('');
    });

    it('should return job__title--with-flags class if the job is overseas and the title is short enough', () => {
      // Given
      job.project.customer.sector.name = 'Australia';
      job.activity.title = 'Dev React'; // 9 chars

      // When
      const jobFlagClass = component.jobFlagClass;

      // Then
      expect(jobFlagClass).to.equal('job__title--with-flags');
    });

    it('should return empty if the job is overseas but the title is too long', () => {
      // Given
      job.project.customer.sector.name = 'Australia';
      job.activity.title = 'Senior Spark/Hive Architect'; // 27 chars

      // When
      const jobFlagClass = component.jobFlagClass;

      // Then
      expect(jobFlagClass).to.equal('');
    });
  });
});
