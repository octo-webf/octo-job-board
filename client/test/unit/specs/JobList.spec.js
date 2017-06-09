import Vue from 'vue';
import JobList from '@/components/JobList';
import VueResource from 'vue-resource';

Vue.use(VueResource);

describe('JobList.vue', () => {

	let jobsApiStub;

	beforeEach(() => {

		jobsApiStub = sinon.stub(Vue.http, 'get').returnsPromise();

	});

	afterEach(() => {

		Vue.http.get.restore();

	});

	it('should get job data from API', () => {

    // given
		const Constructor = Vue.extend(JobList);
		const vm = new Constructor().$mount();

    // when
		vm.getJobs();

    // then
		expect(Vue.http.get).to.have.been.calledWith('/api/activities');

	});
	it('should render job list in the view', () => {

    // given
		jobsApiStub.resolves({
			data: 'toto',
		});
		const Constructor = Vue.extend(JobList);
		const vm = new Constructor().$mount();
		const el = vm.$el.querySelector('.job-list');

    // when

    // then
		expect(el.textContent).to.contain('toto');

	});

	it('should render as many jobs as received from the API', () => {

    // given
		jobsApiStub.resolves({
			data: [{}, {}, {}],
		});
		const Constructor = Vue.extend(JobList);
		const vm = new Constructor().$mount();
		const el = vm.$el.querySelectorAll('.job-card');

    // when

    // then
		expect(el.length).to.equal(3);

	});

});

