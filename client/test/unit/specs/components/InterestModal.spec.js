import Vue from 'vue';
import VueModal from 'vue-js-modal';
import InterestModal from '@/components/InterestModal';
import interestsApi from '@/api/interests';
import authenticationService from '@/services/authentication';

Vue.use(VueModal);

describe('Unit | Component | InterestModal.vue', () => {
  let component;
  const job = {
    id: 2,
    activity: {
      title: 'Tech Lead',
    },
    project: {
      id: 123456,
      status: 'proposal-in-progress',
      name: 'Refonte du SI',
      customer: {
        name: 'La Poste - Courrier',
      },
      start_date: '2017-07-01',
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
    email: 'bruce.wayne@gotham.dc',
    name: 'Bruce Wayne',
  };

  beforeEach(() => {
    // given
    sinon.stub(authenticationService, 'isAuthenticated').returns(true);
    sinon.stub(authenticationService, 'getAuthenticatedUser').returns(consultant);

    const Constructor = Vue.extend(InterestModal);

    // when
    component = new Constructor({
      data: {
        isClicked: false,
      },
      propsData: {
        interestingJob: job,
      },
    }).$mount();
  });

  afterEach(() => {
    authenticationService.isAuthenticated.restore();
    authenticationService.getAuthenticatedUser.restore();
  });

  it('should be named "InterestModal"', () => {
    expect(component.$options.name).to.equal('InterestModal');
  });

  describe('rendering', () => {
    it.skip('should display the modal', () => Vue.nextTick().then(() => {
      expect(component.$el.querySelector('.interest-modal')).to.exist;
    }));

    it.skip('should contain a lot of job informations', () => {
      Vue.nextTick().then(() => {
        const modalText = component.$el.querySelector('.interest-modal__text-modal');
        expect(modalText.textContent).to.contain('Tech Lead');
        expect(modalText.textContent).to.contain('La Poste - Courrier');
        expect(modalText.textContent).to.contain('1 juillet 2017');
        expect(modalText.textContent).to.contain('ABC');
        expect(modalText.textContent).to.contain('XYZ');
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

    it.skip('should check analytics on click on "send" button', () => {
      component.$modal.show('interest-panel');

      return Vue.nextTick().then(() => {
        const myButton = component.$el.querySelector('.interest-modal__action--send');

        // When
        myButton.click();

        // then
        expect(component.$ga.event).to.have.been.calledWith(expectedCallParams);
      });
    });
  });

  describe('#sendInterest', () => {
    beforeEach(() => {
      sinon.stub(interestsApi, 'sendInterest').resolves();
      sinon.stub(authenticationService, 'getAccessToken').returns('some-access-token');
    });

    afterEach(() => {
      interestsApi.sendInterest.restore();
      authenticationService.getAccessToken.restore();
    });

    it('should call the API with good params', () => {
      // when
      component.sendInterest();

      // then
      expect(interestsApi.sendInterest).to.have.been.calledWith(job, consultant, 'some-access-token');
    });

    it.skip('should send interests on click on "send" button', () => {
      // Given
      component.$modal.show('interest-panel');

      Vue.nextTick().then(() => {
        const myButton = component.$el.querySelector('.interest-modal__action--send');

        // When
        myButton.click();

        // Then
        expect(interestsApi.sendInterest).to.have.been.calledWith(job, consultant, 'some-access-token');
      });
    });

    it.skip('should close the modal');
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

    it.skip('on click on button job__apply-button', () => Vue.nextTick().then(() => {
      // when
      component.$el.querySelector('button.job__apply-button').click();

      // then
      expect(component.$ga.event).to.have.been.calledWith(expectedCallParams);
    }));
  });

  describe('computed props', () => {
    describe('computed property #mission', () => {
      it('should get jobTitle', () => {
        // Given
        job.activity.title = 'Dév. Senior';

        // When
        const jobTitle = component.jobTitle;

        // Then
        expect(jobTitle).to.equal('Dév. Senior');
      });

      it('should get businessContactNickname', () => {
        // When
        const businessContactNickname = component.businessContactNickname;

        // Then
        expect(businessContactNickname).to.equal('ABC');
      });

      it('should get missionDirectorNickname', () => {
        // Given
        // When
        const missionDirectorNickname = component.missionDirectorNickname;

        // Then
        expect(missionDirectorNickname).to.equal('XYZ');
      });

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


      it.only('should get customerName', () => {
        // Given

        // When
        const customerName = component.customer;

        // Then
        expect(customerName).to.equal('La Poste - Courrier');
      });
    });

    describe('computed property #customerName', () => {
      it('should get customerName', () => {
        // Given

        // When
        const customerName = component.customerName;

        // Then
        expect(customerName).to.equal('La Poste - Courrier');
      });
    });

    describe('computed property #staffingNeededSince', () => {
      // TODO: it works on local or on browser, but fails in CircleCI :-/
      it.skip('should format the mission staffing_needed_from date (ex : "2017-07-01" => "Juillet 2017")', () => {
        // Given
        job.project.staffing_needed_from = '2017-07-01';

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
  });
});
