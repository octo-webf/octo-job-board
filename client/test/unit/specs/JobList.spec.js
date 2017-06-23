import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import JobList from '@/components/JobList';
import authentication from '@/services/authentication';
import jobsApi from '@/api/jobs';
import axios from 'axios';

Vue.use(VueAnalytics, {
	id: `${process.env.ANALYTICS_ID}`,
});

describe('JobList.vue', () => {

	let component;
	let jobs;

	beforeEach(() => {

    // given
		jobs = {
			id: 2,
			activity: {
				title: 'Tech Lead',
			},
			project: {
				id: 123456,
				status: 'proposal-in-progress',
				name: 'Delivery PUBLICIS / TITAN',
				customer: {
					name: 'La Poste - Courrier',
				},
				start_date: 'juillet 2017',
				duration: '10 mois',
				location: 'OCTO',
				business_contact: {
					nickname: 'ABC',
				},
				mission_director: {
					nickname: 'XYZ',
				},
			},
		};
		sinon.stub(axios, 'post');
		sinon.stub(authentication, 'isAuthenticated').returns(true);
		sinon.stub(jobsApi, 'fetchAll').resolves([jobs]);

		const Constructor = Vue.extend(JobList);

    // when
		component = new Constructor().$mount();

	});

	afterEach(() => {

		axios.post.restore();
		authentication.isAuthenticated.restore();
		jobsApi.fetchAll.restore();

	});

	it('should verify that user is authenticated', () => {

		expect(authentication.isAuthenticated).to.have.been.called;

	});

	describe('#trackEvent', () => {

		it('should check analytics', () => {

      // given

			authentication.isAuthenticated.returns(true);
			sinon.stub(component.$ga, 'event');
			component.$ga.event.returns(true);

      // when
			component.trackEvent();

      // then
			expect(component.$ga.event).to.have.been.calledWith(
				{
					eventCategory: 'Job List',
					eventAction: 'click',
					eventLabel: 'I am interested',
					eventValue: null,
				});

      // after
			component.$ga.event.restore();

		});

		it('on click on button job__apply-button', () => Vue.nextTick().then(() => {

      // given

			authentication.isAuthenticated.returns(true);
			axios.post.resolves(true);
			sinon.stub(component.$ga, 'event');
			component.$ga.event.returns(true);

      // when
			component.$el.querySelector('button.job__apply-button').click();

      // then
			expect(component.$ga.event).to.have.been.calledWith(
				{
					eventCategory: 'Job List',
					eventAction: 'click',
					eventLabel: 'I am interested',
					eventValue: null,
				});

      // after
			component.$ga.event.restore();

		}));

	});

	it('should render as many jobs as received from the API', () => Vue.nextTick().then(() => {

		const jobCards = component.$el.querySelectorAll('.job-card');
		expect(jobCards.length).to.equal(1);

	}));

	it('should render the details of a job', () => Vue.nextTick().then(() => {

		const firstJobCard = component.$el.querySelectorAll('.job-card')[0];
		expect(firstJobCard.querySelector('.job__title').textContent).to.equal('Tech Lead');
		expect(firstJobCard.querySelector('.job__mission').textContent).to.equal('Delivery PUBLICIS / TITAN');
		expect(firstJobCard.querySelector('.job__client').textContent).to.equal('La Poste - Courrier');
		expect(firstJobCard.querySelector('.job__start-date').textContent).to.equal('juillet 2017');
		expect(firstJobCard.querySelector('.job__duration').textContent).to.equal('10 mois');
		expect(firstJobCard.querySelector('.job__location').textContent).to.equal('OCTO');
		expect(firstJobCard.querySelector('.job__content').getAttribute('href')).to.equal('https://octopod.octo.com/projects/123456');

	}));

	it('should render the appropriate status class', () => Vue.nextTick().then(() => {

		const firstJobCard = component.$el.querySelectorAll('.job-card')[0];
		expect(firstJobCard.querySelector('.job__status').getAttribute('class')).to.contain('job__status--proposal-in-progress');

	}));

	it('should add number of available jobs', () => Vue.nextTick().then(() => {

		expect(component.$el.querySelector('.job-results__title').textContent.trim()).to.equal('Missions (1)');

	}));

	describe('.sendInterest()', () => {

		let expectedUrl;
		let expectedBody;
		beforeEach(() => {

			expectedUrl = 'http://localhost:3000/api/interests';
			expectedBody = {
				interestedJobForm: {
					interestedNickname: 'PTR',
					businessContactNickname: 'ABC',
					missionDirectorNickname: 'XYZ',
					octopodLink: 'https://octopod.octo.com/projects/123456',
					activityName: 'Tech Lead',
					missionName: 'Delivery PUBLICIS / TITAN',
				},
			};

		});

		it('should call the API with good params', () => {

      // given
			const stubbedResponse = {
				status: 200,
				data: {
					foo: 'bar',
				},
			};
			axios.post.resolves(stubbedResponse);

      // when
			const promise = component.sendInterest(jobs);

      // then
			return promise.then(() => {

				expect(axios.post).to.have.been.calledWith(expectedUrl, expectedBody);

			});

		});

		it('should POST on click', () => Vue.nextTick().then(() => {

      // Given
			const stubbedResponse = {
				status: 200,
				data: {
					foo: 'bar',
				},
			};
			axios.post.resolves(stubbedResponse);
			const myButton = component.$el.querySelector('button');

      // When
			myButton.click();

      // Then
			expect(axios.post).to.have.been.calledWith(expectedUrl, expectedBody);

		}));

	});

});

