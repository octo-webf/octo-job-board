import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import JobList from '@/components/JobList';
import authentication from '@/services/authentication';
import jobsApi from '@/api/jobs';
import interestsApi from '@/api/interests';

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
				name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
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
		sinon.stub(authentication, 'isAuthenticated').returns(true);
		sinon.stub(jobsApi, 'fetchAll').resolves([jobs]);
		sinon.stub(interestsApi, 'sendInterest');

		const Constructor = Vue.extend(JobList);

    // when
		component = new Constructor().$mount();

	});

	afterEach(() => {

		authentication.isAuthenticated.restore();
		jobsApi.fetchAll.restore();
		interestsApi.sendInterest.restore();

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

	describe('#getJobs', () => {

		it('should verify that user is authenticated', () => {

			expect(authentication.isAuthenticated).to.have.been.called;

		});

		it('should render as many jobs as received from the API', () => Vue.nextTick().then(() => {

			const jobCards = component.$el.querySelectorAll('.job-card');
			expect(jobCards.length).to.equal(1);

		}));

		it('should render the details of a job', () => Vue.nextTick().then(() => {

			const firstJobCard = component.$el.querySelectorAll('.job-card')[0];
			expect(firstJobCard.querySelector('.job__title').textContent).to.equal('Tech Lead');
			expect(firstJobCard.querySelector('.job__mission').textContent).to.equal('SCLOU - Cloud computing : enjeux, architecture et');
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

	});

	describe('#sendInterest', () => {

		it('should call the API with good params', () => {

      // when
			component.sendInterest(jobs);

      // then
			expect(interestsApi.sendInterest).to.have.been.calledWith(jobs, undefined);


		});

		it('should send interests on click on job__apply-button', () => Vue.nextTick().then(() => {

      // Given
			const myButton = component.$el.querySelector('button.job__apply-button');

      // When
			myButton.click();

      // Then
			expect(interestsApi.sendInterest).to.have.been.calledWith(jobs, undefined);

		}));

	});

	describe('#shortenMissionName', () => {

		it('should not shorten short mission name', () => {

      // Given
			const missionName = 'SCLOU - Cloud computing';

      // When
			const trimedMissionName = component.shortenMissionName(missionName);

      // Then
			expect(trimedMissionName).to.equal('SCLOU - Cloud computing');

		});

		it('should shorten long mission name to 50 characters', () => {

      // Given
			const missionName = 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017';

      // When
			const trimedMissionName = component.shortenMissionName(missionName);

      // Then
			expect(trimedMissionName).to.equal('SCLOU - Cloud computing : enjeux, architecture et');

		});

	});

});

