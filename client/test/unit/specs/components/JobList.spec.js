import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import JobList from '@/components/JobList';
import authentication from '@/services/authentication';
import jobsApi from '@/api/jobs';

Vue.use(VueAnalytics, {
	id: `${process.env.ANALYTICS_ID}`,
});

describe('Unit | Component | JobList.vue', () => {
	let component;
	let jobs;

	beforeEach(() => {
    // given
		jobs = [{
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
				start_date: '2017-07-01',
				duration: '10 mois',
				location: 'OCTO',
				business_contact: {
					nickname: 'ABC',
				},
				mission_director: {
					nickname: 'XYZ',
				},
			},
		}];
		sinon.stub(authentication, 'isAuthenticated').returns(true);
		sinon.stub(jobsApi, 'fetchAll').resolves(jobs);

		const Constructor = Vue.extend(JobList);

    // when
		component = new Constructor().$mount();
	});

	afterEach(() => {
		authentication.isAuthenticated.restore();
		jobsApi.fetchAll.restore();
	});

	describe('method #getJobs', () => {
		it('should verify that user is authenticated', () => {
			expect(authentication.isAuthenticated).to.have.been.called;
		});

		it('should render as many jobs as received from the API', () => Vue.nextTick().then(() => {
			const jobCards = component.$el.querySelectorAll('.job-card');
			expect(jobCards.length).to.equal(1);
		}));

		it('should add number of available jobs', () => Vue.nextTick().then(() => {
			expect(component.$el.querySelector('.job-results__title').textContent.trim()).to.equal('Missions à staffer (1)');
		}));
	});
});

