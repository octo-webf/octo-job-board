import Vue from 'vue';
import JobList from '@/components/JobList';
import api from '@/api/jobs'

describe.only('JobList.vue', () => {

	let Constructor;

	beforeEach(() => {

		sinon.stub(api, 'fetchAll')
		Constructor = Vue.extend(JobList);

	});

	afterEach(() => {

    api.fetchAll.restore();

	});

	it('should get job data from API', () => {

    // when
		new Constructor().$mount();

    // then
		expect(api.fetchAll).to.have.been.calledWith('access-token');

	});

	it('should render as many jobs as received from the API', () => {

    // given
		api.fetchAll.resolves({
			data: [{}, {}, {}],
		});

    // when
		const vm = new Constructor().$mount();

    // then
		const jobCards = vm.$el.querySelectorAll('.job-card');
		expect(jobCards.length).to.equal(3);

	});

	it('should render the details of a job', () => {

    // given
    api.fetchAll.resolves({
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
    api.fetchAll.resolves({
			data: [{
				status: 'proposal-in-progress',
			}],
		});

    // when
		const vm = new Constructor().$mount();

    // then
		const firstJobCard = vm.$el.querySelectorAll('.job-card')[0];
		expect(firstJobCard.querySelector('.job__status').getAttribute('class')).to.contain('job__status--proposal-in-progress');

	});

	it('should add number of available jobs', () => {

    // given
    api.fetchAll.resolves({
			data: [{}, {}, {}, {}],
		});

    // when
		const vm = new Constructor().$mount();

    // then
		expect(vm.$el.querySelector('.job-results__title').textContent).to.contain('4');

	});

});

