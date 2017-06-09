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
		expect(Vue.http.get).to.have.been.calledWith('http://localhost:3000/api/activities');

	});

	it('should render as many jobs as received from the API', () => {

    // given
		jobsApiStub.resolves({
			data: [{}, {}, {}],
		});
		const Constructor = Vue.extend(JobList);

    // when
		const vm = new Constructor().$mount();

    // then
		const jobCards = vm.$el.querySelectorAll('.job-card');
		expect(jobCards.length).to.equal(3);

	});

	it('should render the details of a job', () => {

    // given
		jobsApiStub.resolves({
			data: [{
				id: 2,
				title: 'Tech Lead',
				status: 'proposal-in-progress',
				octopod_link: 'https://link.to.octopod.octo.com/projects/123456',
				project_name: 'Delivery PUBLICIS / TITAN',
				customer_name: 'La Poste - Courrier',
				start_date: 'juillet 2017',
				duration: '10 mois',
				location: 'OCTO',
				contacts: ['WBO', 'CDR'],
			}],
		});
		const Constructor = Vue.extend(JobList);

    // when
		const vm = new Constructor().$mount();

    // then
		const firstJobCard = vm.$el.querySelectorAll('.job-card')[0];
		expect(firstJobCard.querySelector('.job__title').textContent).to.equal('Tech Lead');
		expect(firstJobCard.querySelector('.job__mission').textContent).to.equal('Delivery PUBLICIS / TITAN');
		expect(firstJobCard.querySelector('.job__client').textContent).to.equal('La Poste - Courrier');
		expect(firstJobCard.querySelector('.job__start-date').textContent).to.equal('juillet 2017');
		expect(firstJobCard.querySelector('.job__duration').textContent).to.equal('10 mois');
		expect(firstJobCard.querySelector('.job__location').textContent).to.equal('OCTO');
		expect(firstJobCard.querySelector('.job__content').getAttribute('href')).to.equal('https://link.to.octopod.octo.com/projects/123456');

	});

	it('should render the appropriate status class', () => {

    // given
		jobsApiStub.resolves({
			data: [{
				status: 'proposal-in-progress',
			}],
		});
		const Constructor = Vue.extend(JobList);

    // when
		const vm = new Constructor().$mount();

    // then
		const firstJobCard = vm.$el.querySelectorAll('.job-card')[0];
		expect(firstJobCard.querySelector('.job__status').getAttribute('class')).to.contain('job__status--proposal-in-progress');

	});

	it('should add number of available jobs', () => {

    // given
		jobsApiStub.resolves({
			data: [{}, {}, {}, {}],
		});
		const Constructor = Vue.extend(JobList);

    // when
		const vm = new Constructor().$mount();

    // then
		expect(vm.$el.querySelector('.job-results__title').textContent).to.contain('4');

	});

});

