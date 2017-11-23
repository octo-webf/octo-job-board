import Vue from 'vue';
import VueModal from 'vue-js-modal';
import InterestModal from '@/components/InterestModal';
import interestsApi from '@/api/interests';
import authenticationService from '@/services/authentication';
import notificationService from '@/services/notification';

Vue.use(VueModal);

describe('Unit | Component | InterestModal.vue', () => {
  let component;
  const job = {
    id: 2,
    activity: {
      title: 'Tech Lead',
      staffing_needed_from: '2017-07-01',
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
  const Constructor = Vue.extend(InterestModal);

  beforeEach(() => {
    // given
    sinon.stub(authenticationService, 'isAuthenticated').returns(true);
    sinon.stub(authenticationService, 'getAuthenticatedUser').returns(consultant);

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
    it('should contain the informations about the job', () => {
      // when
      component.$modal.show('interest-modal');

      // then
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

  describe('#submitInterest', () => {
    beforeEach(() => {
      sinon.stub(interestsApi, 'sendInterest');
      sinon.stub(authenticationService, 'getAccessToken').returns('some-access-token');
      sinon.stub(notificationService, 'successCenterToast').returns(true);
    });

    afterEach(() => {
      interestsApi.sendInterest.restore();
      authenticationService.getAccessToken.restore();
      notificationService.successCenterToast.restore();
    });

    describe('general cases', () => {
      beforeEach(() => {
        interestsApi.sendInterest.resolves();
      });

      it('should set isClicked to true to disable button', () => {
        // given
        component.$data.isClicked = 'already set isClicked';

        // when
        component.submitInterest();

        // then
        expect(component.$data.isClicked).to.equal(true);
      });

      it('should remove error', () => {
        // given
        component.$data.error = 'Existing error';

        // when
        component.submitInterest();

        // then
        expect(component.$data.error).to.equal(null);
      });

      it('should trackEvent', () => {
        // given
        sinon.stub(component, 'trackEvent');

        // when
        component.submitInterest();

        // then
        expect(component.trackEvent).to.have.been.calledWith();
      });

      it('should call the API with job, consultant and access token', () => {
        // when
        component.submitInterest();

        // then
        expect(interestsApi.sendInterest).to.have.been.calledWith(job, consultant, 'some-access-token');
      });
    });

    describe('on success sending interest', () => {
      beforeEach(() => {
        interestsApi.sendInterest.resolves();
      });

      it('should close the modal', () => {
        // given
        sinon.stub(component, 'closeModal');

        // when
        component.submitInterest();

        // then
        Vue.nextTick().then(() => {
          expect(component.closeModal).to.have.been.called;
        });
      });

      it('should displaySuccessNotification', () => {
        // given
        sinon.stub(component, 'displaySuccessNotification');

        // when
        component.submitInterest();

        // then
        Vue.nextTick().then(() => {
          expect(component.displaySuccessNotification).to.have.been.called;
        });
      });
    });

    describe('on error sending interest', () => {
      beforeEach(() => {
        interestsApi.sendInterest.rejects();
      });

      it('should display an error message', () => {
        // given
        component.$data.error = null;

        // when
        component.submitInterest();

        // then
        Vue.nextTick().then(() => {
          expect(component.$data.error).to.equal('Une erreur est survenue durant l\'envoi de ton intérêt');
        });
      });
    });
  });

  describe('#trackEvent', () => {
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
  });

  describe('#closeModal', () => {
    it('should close modal', () => {
      // given
      component.$modal.show('interest-modal');

      // when
      component.closeModal();

      // then
      return Vue.nextTick().then(() => {
        expect(component.$el.querySelector('.interest-modal')).not.to.exist;
      });
    });
  });

  describe('#displaySuccessNotification', () => {
    it('should call notification service to display success center toast', () => {
      // given
      sinon.stub(notificationService, 'successCenterToast');

      // when
      component.displaySuccessNotification();

      // then
      const message = 'Merci de ton intérêt pour la mission. Ta demande a été transmise à l\'équipe Job Board.';
      expect(notificationService.successCenterToast).to.have.been.calledWithExactly(component, message);

      // after
      notificationService.successCenterToast.restore();
    });
  });

  describe('on click on "send" button', () => {
    beforeEach(() => {
      sinon.stub(component, 'trackEvent');
      sinon.stub(component, '_sendInterest').resolves();
    });

    it('should send interest and track event', (done) => {
      // Given
      component.$modal.show('interest-modal');

      // Vue.nextTick().then(() => {
      setTimeout(() => {
        const myButton = component.$el.querySelector('.interest-modal__action--send');

        // When
        myButton.click();

        // Then
        Vue.nextTick().then(() => {
          expect(component.trackEvent).to.have.been.calledWith();
          expect(component._sendInterest).to.have.been.calledWith();
          done();
        });
      }, 100);
    });
  });

  describe('computed props', () => {
    describe('#businessContactNickname', () => {
      it('should get businessContactNickname', () => {
        // When
        const businessContactNickname = component.businessContactNickname;

        // Then
        expect(businessContactNickname).to.equal('ABC');
      });

      it('should be empty when interestingJob is undefined', () => {
        // Given
        component = new Constructor({
          propsData: {
            interestingJob: undefined,
          },
        }).$mount();

        // When
        const businessContactNickname = component.businessContactNickname;

        // Then
        expect(businessContactNickname).to.equal('');
      });
    });

    describe('#customerName', () => {
      it('should get customerName', () => {
        // When
        const customerName = component.customerName;

        // Then
        expect(customerName).to.equal('La Poste - Courrier');
      });

      it('should be empty when interestingJob is undefined', () => {
        // Given
        component = new Constructor({
          propsData: {
            interestingJob: undefined,
          },
        }).$mount();

        // When
        const customerName = component.customerName;

        // Then
        expect(customerName).to.equal('');
      });
    });

    describe('#jobTitle', () => {
      it('should get jobTitle', () => {
        // When
        const jobTitle = component.jobTitle;

        // Then
        expect(jobTitle).to.equal('Tech Lead');
      });

      it('should be empty when interestingJob is undefined', () => {
        // Given
        component = new Constructor({
          propsData: {
            interestingJob: undefined,
          },
        }).$mount();

        // When
        const jobTitle = component.jobTitle;

        // Then
        expect(jobTitle).to.equal('');
      });
    });

    describe('#mission', () => {
      it('should get jobTitle', () => {
        // Given
        job.activity.title = 'Dév. Senior';

        // When
        const jobTitle = component.jobTitle;

        // Then
        expect(jobTitle).to.equal('Dév. Senior');
      });

      it('should not shorten mission name when it is shorter than 50 characters', () => {
        // Given
        job.project.name = 'Name shorter than 50 characters';

        // When
        const missionName = component.mission;

        // Then
        expect(missionName).to.equal('Name shorter than 50 characters');
      });

      it('should shorten mission name to 50 characters when it is longer than 50 characters', () => {
        // Given
        job.project.name = 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017';

        // When
        const missionName = component.mission;

        // Then
        expect(missionName).to.equal('SCLOU - Cloud computing : enjeux, architecture et');
      });

      it('should be empty when interestingJob is undefined', () => {
        // Given
        component = new Constructor({
          propsData: {
            interestingJob: undefined,
          },
        }).$mount();

        // When
        const mission = component.mission;

        // Then
        expect(mission).to.equal('');
      });
    });

    describe('#missionDirectorNickname', () => {
      it('should get missionDirectorNickname', () => {
        // When
        const missionDirectorNickname = component.missionDirectorNickname;

        // Then
        expect(missionDirectorNickname).to.equal('XYZ');
      });

      it('should be empty when interestingJob is undefined', () => {
        // Given
        component = new Constructor({
          propsData: {
            interestingJob: undefined,
          },
        }).$mount();

        // When
        const missionDirectorNickname = component.missionDirectorNickname;

        // Then
        expect(missionDirectorNickname).to.equal('');
      });
    });

    describe('#octopodUrl', () => {
      it('should format the link to Octopod project page', () => {
        // Given
        job.project.id = 12357;

        // When
        const octopodUrl = component.octopodUrl;

        // Then
        expect(octopodUrl).to.equal('https://octopod.octo.com/projects/12357');
      });

      it('should be empty when interestingJob is undefined', () => {
        // Given
        component = new Constructor({
          propsData: {
            interestingJob: undefined,
          },
        }).$mount();

        // When
        const octopodUrl = component.octopodUrl;

        // Then
        expect(octopodUrl).to.equal('');
      });
    });

    describe('#staffingNeededSince', () => {
      it('should format the mission staffing_needed_from date (ex : "2017-07-01" => "Juillet 2017")', () => {
        // When
        const staffingNeededSince = component.staffingNeededSince;

        // Then
        expect(staffingNeededSince).to.contain('juillet 2017');
      });

      it('should be empty when interestingJob is undefined', () => {
        // Given
        component = new Constructor({
          propsData: {
            interestingJob: undefined,
          },
        }).$mount();

        // When
        const staffingNeededSince = component.staffingNeededSince;

        // Then
        expect(staffingNeededSince).to.equal('');
      });
    });
  });
});
