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
		name: 'Samurai Jack',
		email: 'sjack@octo.com',
	};
	const accessToken = 'abcd-1234';

	beforeEach(() => {
    // given
		sinon.stub(authenticationService, 'getAuthenticatedUser').returns(consultant);
		sinon.stub(authenticationService, 'getAccessToken').returns(accessToken);
		sinon.stub(interestsApi, 'sendInterest').resolves();

    // when
		const Constructor = Vue.extend(JobCard);
		component = new Constructor({
			data: {
				job,
				isClicked: false,
			},
		}).$mount();
	});

	afterEach(() => {
		authenticationService.getAuthenticatedUser.restore();
		authenticationService.getAccessToken.restore();
		interestsApi.sendInterest.restore();
	});

	describe('$data', () => {
		it('should have isClicked property set to false', () => {
			expect(component.$data.isClicked).to.be.false;
		});
	});

	describe('rendering', () => {
		it('should display the appropriate project status', () => {
			expect(component.$el.querySelector('.job__status').getAttribute('class')).to.contain('job__status--proposal-in-progress');
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

    // TODO: it works on local or on browser, but fails in CircleCI :-/
		it.skip('should display the start date', () => {
			expect(component.$el.querySelector('.job__start-date').textContent.trim()).to.contain('juillet 2017');
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

	describe('computed property #startDate', () => {
    // TODO: it works on local or on browser, but fails in CircleCI :-/
		it.skip('should format the mission start date (ex : "2017-07-01" => "Juillet 2017")', () => {
      // Given
			job.project.start_date = '2017-07-01';

      // When
			const startDate = component.startDate;

      // Then
			expect(startDate).to.contain('juillet 2017');
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
