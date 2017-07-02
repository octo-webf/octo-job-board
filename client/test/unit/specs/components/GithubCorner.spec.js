import Vue from 'vue';
import GithubCorner from '@/components/GithubCorner';

describe('Unit | Component | GithubCorner.vue', () => {
	let component;

	beforeEach(() => {
    // given
		const Constructor = Vue.extend(GithubCorner);

    // when
		component = new Constructor().$mount();
	});

	describe('rendering', () => {
		it('should display a link to GitHub repository', () => {
			expect(component.$el.querySelector('.github-corner__link')).to.exist;
		});

		it('should redirect to "https://github.com/octo-web-front-end-tribe/octo-job-board"', () => {
			const link = component.$el.querySelector('.github-corner__link');
			expect(link.getAttribute('href')).to.equal('https://github.com/octo-web-front-end-tribe/octo-job-board');
		});

		it('should load content in a new tab', () => {
			const link = component.$el.querySelector('.github-corner__link');
			expect(link.getAttribute('target')).to.equal('_blank');
		});
	});
});
