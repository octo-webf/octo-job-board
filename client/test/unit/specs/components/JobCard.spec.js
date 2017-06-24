import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import JobCard from '@/components/JobCard';
import axios from 'axios';

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
			start_date: 'juillet 2017',
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

	beforeEach(() => {

    // given
		const Constructor = Vue.extend(JobCard);

    // when
		component = new Constructor({
			data: {
				job,
			},
		}).$mount();

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
      expect(component.$el.querySelector('.job__client').textContent.trim()).to.equal('La Poste - Courrier');
    });

    it('should display the start date', () => {
      expect(component.$el.querySelector('.job__start-date').textContent.trim()).to.equal('juillet 2017');
    });

    it('should display the duration', () => {
      expect(component.$el.querySelector('.job__duration').textContent.trim()).to.equal('10 mois');
    });

    it('should display the locations', () => {
      expect(component.$el.querySelector('.job__locations').textContent.trim()).to.equal('OCTO');
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

		const expectedUrl = 'http://localhost:3000/api/interests';
		const expectedBody = {
			interestedJobForm: {
				interestedNickname: 'PTR',
				businessContactNickname: 'ABC',
				missionDirectorNickname: 'XYZ',
				octopodLink: 'https://octopod.octo.com/projects/123456',
				activityName: 'Tech Lead',
				missionName: 'Refonte du SI',
			},
		};
		const stubbedResponse = {
			status: 200,
			data: {
				foo: 'bar',
			},
		};

		beforeEach(() => {

			sinon.stub(axios, 'post').resolves(stubbedResponse);

		});

		afterEach(() => {

			axios.post.restore();

		});

		it('should call the API with good params', () => {

      // when
			const promise = component.sendInterest();

      // then
			return promise.then(() => {

				expect(axios.post).to.have.been.calledWith(expectedUrl, expectedBody);

			});

		});

		it('should POST on click', () => Vue.nextTick().then(() => {

      // given
			const myButton = component.$el.querySelector('button');

      // when
			myButton.click();

      // then
			expect(axios.post).to.have.been.calledWith(expectedUrl, expectedBody);

		}));

	});

	describe('computed property #shortenMissionName', () => {

		it('should not shorten short mission name', () => {

      // Given
			job.project.name = 'Name shorter than 50 characters';

      // When
			const trimedMissionName = component.shortenMissionName;

      // Then
			expect(trimedMissionName).to.equal('Name shorter than 50 characters');

		});

		it('should shorten long mission name to 50 characters', () => {

      // Given
			job.project.name = 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017';

      // When
			const trimedMissionName = component.shortenMissionName;

      // Then
			expect(trimedMissionName).to.equal('SCLOU - Cloud computing : enjeux, architecture et');

		});

	});

});

