const {expect} = require('../../../test-helper');
const interestEmailTemplate = require('../../../../src/infrastructure/mailing/interest-email-template');

describe('Unit | Class | interest-email-template', () => {

  describe('#compile', () => {

    it('should compute the good rendering', () => {
      // given
      const model = {
        interestedConsultant: {
          name: 'Samurai Jack',
          email: 'sjack@octo.com',
        },
        businessContactNickname: 'XYZ',
        missionDirectorNickname: 'ZYX',
        octopodLink: 'https://octopod.octo.com/projects/2146904867',
        activityName: 'Développeur Front',
        missionName: 'Oodrive - Liste d\'initié'
      };

      // when
      const compiled = interestEmailTemplate.compile(model);

      // then
      const expected = '<h3><a href="mailto:sjack@octo.com">Samurai Jack</a> est intéressé·e par la mission <strong>Oodrive - Liste d\'initié</strong> en tant que <strong>Développeur Front</strong>.</h3>\n      <p>Voir la <a href="https://octopod.octo.com/projects/2146904867">page mission</a></p>\n      <p>Contacter le Contact commercial : <a href="https://askbob.octo.com/users/xyz">XYZ</a></p>\n      <p>Contacter le Directeur de mission : <a href="https://askbob.octo.com/users/zyx">ZYX</a></p>';
      expect(compiled.trim()).to.equal(expected);
    });
  });
});
