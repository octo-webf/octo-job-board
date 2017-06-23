import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import JobList from '@/components/JobList';
import authentication from '@/services/authentication';
import jobsApi from '@/api/jobs';

Vue.use(VueAnalytics, {
	id: `${process.env.ANALYTICS_ID}`,
});

describe('JobList.vue', () => {

	let component;

	beforeEach(() => {

    // given
		sinon.stub(authentication, 'isAuthenticated').returns(true);
		sinon.stub(jobsApi, 'fetchAll').resolves([{
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
		}]);

		const Constructor = Vue.extend(JobList);

    // when
		component = new Constructor().$mount();

	});

	afterEach(() => {

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

    // skip en attente du fetchActivities
		it.skip('on click on button job__apply-button', () => {

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

		});

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

});

