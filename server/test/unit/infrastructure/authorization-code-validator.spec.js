const { expect } = require('../../test-helper');
const AuthorizationCodeValidator = require('../../../src/infrastructure/authorization-code-validator');

describe('Unit | Infrastructure | authorization code validator', () => {
  describe('#verifyApplicationCode', () => {
    it('should return a resolved promise when application code is valid', (done) => {
      // given
      const applicationCode = 'valid-application-code';

      // when
      AuthorizationCodeValidator.verifyApplicationCode(applicationCode).then(done);
    });

    it('should return a rejected promise when application code is not in authorized_codes file', (done) => {
      // given
      const applicationCode = 'invalid-code';

      // when
      AuthorizationCodeValidator.verifyApplicationCode(applicationCode)
        .catch((err) => {
          expect(err).to.equal('Authorization code not found.');
          done();
        });
    });
  });
});
