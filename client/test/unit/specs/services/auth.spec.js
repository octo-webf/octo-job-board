import auth, { LOCALSTORAGE_KEY } from '@/services/auth';

describe('Unit | Services | Auth', () => {

	beforeEach(() => {

		window.localStorage.clear();

	});

	describe('setToken', () => {

		it('should persist the token on localStorage', () => {

			// given
			auth.setToken(LOCALSTORAGE_KEY);

			expect(window.localStorage[LOCALSTORAGE_KEY]).to.be.equal(LOCALSTORAGE_KEY);

		});

	});

	describe('getToken', () => {

		it('should get the token from localStorage', () => {

			// given
			window.localStorage.setItem(LOCALSTORAGE_KEY, LOCALSTORAGE_KEY);

			expect(auth.getToken()).to.be.equal(LOCALSTORAGE_KEY);

		});

	});

	describe('removeToken', () => {

		it('should remove the token from localStorage', () => {

			// given
			window.localStorage.setItem(LOCALSTORAGE_KEY, LOCALSTORAGE_KEY);

			auth.removeToken();

			expect(window.localStorage[LOCALSTORAGE_KEY]).to.be.undefined();

		});

	});

});

console.log(window.localStorage);
