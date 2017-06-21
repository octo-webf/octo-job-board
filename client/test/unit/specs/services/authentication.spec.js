import authentication, { LOCALSTORAGE_KEY } from '@/services/authentication';

describe('Unit | Services | Auth', () => {

	beforeEach(() => {

		window.localStorage.clear();

	});

	afterEach(() => {

		window.localStorage.clear();

	});

	describe('#setToken', () => {

		it('should persist the token on localStorage', () => {

      // when
			authentication.setToken(LOCALSTORAGE_KEY);

      // then
			expect(window.localStorage[LOCALSTORAGE_KEY]).to.be.equal(LOCALSTORAGE_KEY);

		});

	});

	describe('#getToken', () => {

		it('should get the token from localStorage', () => {

      // given
			const persistedObject = JSON.stringify({ foo: 'bar' });
			window.localStorage.setItem(LOCALSTORAGE_KEY, persistedObject);

      // when
			const accessToken = authentication.getToken();

      // then
			expect(accessToken).to.deep.equal(persistedObject);

		});

	});

	describe('#removeToken', () => {

		it('should remove the token from localStorage', () => {

      // given
			window.localStorage.setItem(LOCALSTORAGE_KEY, 'some-value');

      // when
			authentication.removeToken();

      // then
			expect(window.localStorage[LOCALSTORAGE_KEY]).to.be.undefined;

		});

	});

	describe('#authenticate', () => {

		it('should exist', () => {

			expect(authentication.authenticate).to.exist;

		});

		it('should return a resolved promise', (done) => {

      // when
			const promise = authentication.authenticate();

      // then
			promise.then(done);

		});


	});

});
