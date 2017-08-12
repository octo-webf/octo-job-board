import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import JobCard from '@/components/JobCard';
import interestsApi from '@/api/interests';
import authenticationService from '@/services/authentication';

Vue.use(VueAnalytics, {
  id: `${process.env.ANALYTICS_ID}`,
});

describe('Unit | Component | JobCard.vue', () => {
  let component;
  const job = {
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
      },
      duration: '10 mois',
      locations: 'OCTO',
      business_contact: {
        nickname: 'ABC',
      },
      mission_director: {
        nickname: 'XYZ',
      },
    },
  };

  const consultant = {
    name: 'Samurai Jack',
    email: 'sjack@octo.com',
  };
  const accessToken = 'abcd-1234';

  beforeEach(() => {
    // given
    sinon.stub(authenticationService, 'isAuthenticated').returns(true);
    sinon.stub(authenticationService, 'getAuthenticatedUser').returns(consultant);
    sinon.stub(authenticationService, 'getAccessToken').returns(accessToken);
    sinon.stub(interestsApi, 'sendInterest').resolves();

    // when
    const Constructor = Vue.extend(JobCard);
    component = new Constructor({
      propsData: {
        job
      }
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

  describe('$data', () => {
    it('should have isClicked property set to false', () => {
      expect(component.$data.isClicked).to.be.false;
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

    it('should display the client name', () => {
      expect(component.$el.querySelector('.job__customer').textContent.trim()).to.equal('La Poste - Courrier');
    });

    it('should display the staffing_needed_from', () => {
      expect(component.$el.querySelector('.job__start-date').textContent.trim()).to.equal('1 juillet 2017');
    });

    it('should display the locations', () => {
      expect(component.$el.querySelector('.job__locations').textContent.trim()).to.equal('OCTO');
    });

    it('should have enabled button', () => {
      expect(component.$el.querySelector('.job__apply-button').disabled).to.be.false;
    });
  });

  describe('clicking on button "I am interested in"', () => {
    it('should disable button', () => {
      // when
      component.$el.querySelector('button.job__apply-button').click();

      // then
      Vue.nextTick().then(() => {
        expect(component.$el.querySelector('.job__apply-button').disabled).to.be.true;
      });
    });
  });

  describe('method #trackEvent', () => {
    const expectedCallParams = {
      eventCategory: 'Job List',
      eventAction: 'click',
      eventLabel: 'I am interested',
      eventValue: null,
    };

    beforeEach(() => {
      sinon.stub(component.$ga, 'event').returns(true);
    });

    afterEach(() => {
      component.$ga.event.restore();
    });

    it('should check analytics', () => {
      // when
      component.trackEvent();

      // then
      expect(component.$ga.event).to.have.been.calledWith(expectedCallParams);
    });

    it('on click on button job__apply-button', () => Vue.nextTick().then(() => {
      // when
      component.$el.querySelector('button.job__apply-button').click();

      // then
      expect(component.$ga.event).to.have.been.calledWith(expectedCallParams);
    }));
  });

  describe('method #sendInterest', () => {
    it('should call the API with good params', () => {
      // when
      component.sendInterest();

      // then
      expect(interestsApi.sendInterest).to.have.been.calledWithExactly(job, consultant, accessToken);
    });

    it('should send interests on click on job__apply-button', () => Vue.nextTick().then(() => {
      // Given
      const myButton = component.$el.querySelector('button.job__apply-button');

      // When
      myButton.click();

      // Then
      expect(interestsApi.sendInterest).to.have.been.calledWithExactly(job, consultant, accessToken);
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
      expect(staffingNeededSince).to.contain('juillet 2017');
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
      expect(statusClass).to.equal('job__status job__status--mission_accepted');
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
});
