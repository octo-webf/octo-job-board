import authentication, { ACCESS_TOKEN_STORAGE_KEY, AUTHENTICATED_USER_STORAGE_KEY } from '@/services/authentication';
import api from '@/api/auth';

describe('Unit | Services | Auth', () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	afterEach(() => {
		window.localStorage.clear();
	});

	describe('method #authenticate', () => {
		let promise;

		const googleUser = {

			getBasicProfile() {
				return {
					getName() {
						return 'Samurai Jack';
					},

					getEmail() {
						return 'sjack@octo.com';
					},
				};
			},

			getAuthResponse() {
				return {
					id_token: 'some-google-it_token',
				};
			},
		};

		const apiResponse = { access_token: 'jwt-access-token' };

		beforeEach(() => {
			sinon.stub(api, 'verifyIdTokenAndGetAccessToken').resolves(apiResponse);
		});

		afterEach(() => {
			api.verifyIdTokenAndGetAccessToken.restore();
		});

		it('should exist', () => {
			expect(authentication.authenticate).to.exist;
		});

		it('should return a promise', (done) => {
      // when
			promise = authentication.authenticate(googleUser);

      // then
			promise.then(done);
		});

		it('should always remove the (eventually) persisted acces_token in the local storage', () => {
      // given
			window.localStorage.setItem(authentication.accessTokenKey, 'an-old-access_token');

      // when
			promise = authentication.authenticate(googleUser);

      // then
			return promise.catch(() => {
				expect(window.localStorage.getItem(authentication.accessTokenKey)).to.equal(apiResponse.access_token);
			});
		});

		it('should call "auth" API adapter with good params', () => promise.then(() => {
      // when
			promise = authentication.authenticate(googleUser);

      // then
			return promise.then(() => {
				expect(api.verifyIdTokenAndGetAccessToken).to.have.been.calledWith('some-google-it_token');
			});
		}));

		it('should store the access_token returned by the API into the local storage', () => promise.then(() => {
      // when
			promise = authentication.authenticate(googleUser);

      // then
			return promise.then(() => {
				expect(window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)).to.equal(apiResponse.access_token);
			});
		}));

		it('should persist google user information into the local storage', () => {
      // given
			const expectedPersistedAuthenticatedUser = {
				name: 'Samurai Jack',
				email: 'sjack@octo.com',
			};

      // when
			promise = authentication.authenticate(googleUser);

      // then
			return promise.then(() => {
				const authenticatedUser = JSON.parse(window.localStorage.getItem(AUTHENTICATED_USER_STORAGE_KEY));
				expect(authenticatedUser).to.deep.equal(expectedPersistedAuthenticatedUser);
			});
		});
	});

  describe('method #disconnect', () => {

    let auth2 = {
      signOut() {
        return Promise.resolve();
      }
    };

    beforeEach(() => {
      window.gapi = {
        auth2: {
          getAuthInstance() {
            return auth2;
          }
        }
      };
      sinon.stub(auth2, 'signOut').resolves();
    });

    afterEach(() => {
      auth2.signOut.restore();
      delete window.gapi;
    });

    it('should exist', () => {
      expect(authentication.disconnect).to.exist.and.to.be.a.function;
    });

    it('should return a promise', (done) => {
      authentication.disconnect().then(done);
    });

    it('should remove access_token from local storage', () => {
      // given
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, 'some-token');

      // when
      const promise = authentication.disconnect();

      // then
      return promise.then(() => {
        expect(window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)).to.be.null;
      });
    });

    it('should remove authenticated_user from local storage', () => {
      // given
      window.localStorage.setItem(AUTHENTICATED_USER_STORAGE_KEY, JSON.stringify({}));

      // when
      const promise = authentication.disconnect();

      // then
      return promise.then(() => {
        expect(window.localStorage.getItem(AUTHENTICATED_USER_STORAGE_KEY)).to.be.null;
      });
    });

    it('should execute Google Sign-in API #signOut method', () => {
      // given

      // when
      const promise = authentication.disconnect();

      // then
      return promise.then(() => {
        expect(auth2.signOut).to.have.been.called;
      });
    });

  });

	describe('method #isAuthenticated', () => {
		it('should exist', () => {
			expect(authentication.isAuthenticated).to.exist.and.to.be.a.function;
		});

		it('should return "true" if there is an entry for key "access_key" in the local storage', () => {
      // given
			window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, 'some_access_token');

      // when
			const isAuthenticated = authentication.isAuthenticated();

      // then
			expect(isAuthenticated).to.equal(true);
		});

		it('should return "false" if there is an entry for key "access_key" in the local storage', () => {
      // given
			window.localStorage.clear();

      // when
			const isAuthenticated = authentication.isAuthenticated();

      // then
			expect(isAuthenticated).to.equal(false);
		});
	});

	describe('method #getAuthenticatedUser', () => {
		it('should exist', () => {
			expect(authentication.getAuthenticatedUser).to.exist.and.to.be.a.function;
		});

		it('should return the authenticated user (as parsed JS Object) if exists', () => {
      // given
			const authenticatedUser = {
				name: 'Samurai Jack',
				email: 'sjack@octo.com',
			};
			window.localStorage.setItem(AUTHENTICATED_USER_STORAGE_KEY, JSON.stringify(authenticatedUser));

      // when
			const user = authentication.getAuthenticatedUser();

      // then
			expect(user).to.deep.equal(authenticatedUser);
		});

		it('should return null if there is no authenticated user', () => {
      // given
			window.localStorage.clear();

      // when
			const user = authentication.getAuthenticatedUser();

      // then
			expect(user).to.be.null;
		});
	});
});
