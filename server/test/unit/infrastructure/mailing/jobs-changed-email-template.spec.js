const { expect } = require('../../../test-helper');
const jobsChangedEmailTemplate = require('../../../../src/infrastructure/mailing/jobs-changed-email-template');

describe('Unit | Infrastructure | Mailing | jobs-changed-email-template', () => {
  describe('#compile', () => {
    const addedJob1 = { project: { name: 'p1' }, activity: { title: 'a1' } };
    const addedJob2 = { project: { name: 'p2' }, activity: { title: 'a2' } };
    const addedJob3 = { project: { name: 'p3' }, activity: { title: 'a3' } };

    const removedJobA = { project: { name: 'p4' }, activity: { title: 'a4' } };
    const removedJobB = { project: { name: 'p5' }, activity: { title: 'a5' } };

    it('should compute the good rendering', () => {
      // given
      const model = {
        addedJobs: [addedJob1, addedJob2, addedJob3],
        removedJobs: [removedJobA, removedJobB],
      };

      // when
      const compiled = jobsChangedEmailTemplate.compile(model);

      // then
      const expected = '<p>Bonjour,</p>' +
        '<p>Il y a du nouveau du côté du <a href="https://jobs.octo.com">Job Board</a>.</p>' +
        '<p>3 nouvelle(s) mission(s) à staffer :' +
        '<ul>' +
        '<li><bold>a1</bold> pour le projet p1</li>' +
        '<li><bold>a2</bold> pour le projet p2</li>' +
        '<li><bold>a3</bold> pour le projet p3</li>' +
        '</ul></p>' +
        '<p>2 mission(s) retirée(s) :' +
        '<ul>' +
        '<li><bold>a4</bold> pour le projet p4</li>' +
        '<li><bold>a5</bold> pour le projet p5</li>' +
        '</ul>' +
        '</p>' +
        '<p>Pour ne plus recevoir de nouvelles du Job Board, il est possible de <a href="https://jobs.octo.com/#/unsubscribe">se désabonner du Job Board</a>.</p>';
      expect(compiled.trim()).to.equal(expected);
    });

    it('should not display added jobs section when there is no added job', () => {
      // given
      const model = {
        addedJobs: null,
        removedJobs: [removedJobA, removedJobB],
      };

      // when
      const compiled = jobsChangedEmailTemplate.compile(model);

      // then
      const expected = '<p>Bonjour,</p>' +
        '<p>Il y a du nouveau du côté du <a href="https://jobs.octo.com">Job Board</a>.</p>' +
        '<p>2 mission(s) retirée(s) :' +
        '<ul>' +
        '<li><bold>a4</bold> pour le projet p4</li>' +
        '<li><bold>a5</bold> pour le projet p5</li>' +
        '</ul>' +
        '</p>' +
        '<p>Pour ne plus recevoir de nouvelles du Job Board, il est possible de <a href="https://jobs.octo.com/#/unsubscribe">se désabonner du Job Board</a>.</p>';
      expect(compiled.trim()).to.equal(expected);
    });

    it('should not display removed jobs section when there is no removed job', () => {
      // given
      const model = {
        addedJobs: [addedJob1, addedJob2, addedJob3],
        removedJobs: null,
      };

      // when
      const compiled = jobsChangedEmailTemplate.compile(model);

      // then
      const expected = '<p>Bonjour,</p>' +
        '<p>Il y a du nouveau du côté du <a href="https://jobs.octo.com">Job Board</a>.</p>' +
        '<p>3 nouvelle(s) mission(s) à staffer :' +
        '<ul>' +
        '<li><bold>a1</bold> pour le projet p1</li>' +
        '<li><bold>a2</bold> pour le projet p2</li>' +
        '<li><bold>a3</bold> pour le projet p3</li>' +
        '</ul>' +
        '</p>' +
        '<p>Pour ne plus recevoir de nouvelles du Job Board, il est possible de <a href="https://jobs.octo.com/#/unsubscribe">se désabonner du Job Board</a>.</p>';
      expect(compiled.trim()).to.equal(expected);
    });
  });
});
