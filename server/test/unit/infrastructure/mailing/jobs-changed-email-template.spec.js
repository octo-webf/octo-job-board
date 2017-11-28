const { expect } = require('../../../test-helper');
const jobsChangedEmailTemplate = require('../../../../src/infrastructure/mailing/jobs-changed-email-template');

describe('Unit | Infrastructure | Mailing | jobs-changed-email-template', () => {
  describe('#compile', () => {
    const addedJob1 = {
      project: { name: 'project_name_1', customer: { name: 'customer_name_1' } },
      activity: { title: 'job_title_1', staffing_needed_from: '2018-01-10' },
    };
    const addedJob2 = {
      project: { name: 'project_name_2', customer: { name: 'customer_name_2' } },
      activity: { title: 'job_title_2', staffing_needed_from: '2018-02-20' },
    };
    const addedJob3 = {
      project: { name: 'project_name_3', customer: { name: 'customer_name_3' } },
      activity: { title: 'job_title_3', staffing_needed_from: '2018-03-30' },
    };

    const removedJobA = { project: { name: 'project_name_4' }, activity: { title: 'job_title_4' } };
    const removedJobB = { project: { name: 'project_name_5' }, activity: { title: 'job_title_5' } };

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
        '<li><bold>job_title_1</bold> pour le projet project_name_1 pour le client customer_name_1 à partir du 10/01/2018</li>' +
        '<li><bold>job_title_2</bold> pour le projet project_name_2 pour le client customer_name_2 à partir du 20/02/2018</li>' +
        '<li><bold>job_title_3</bold> pour le projet project_name_3 pour le client customer_name_3 à partir du 30/03/2018</li>' +
        '</ul></p>' +
        '<p>2 mission(s) retirée(s) :' +
        '<ul>' +
        '<li><bold>job_title_4</bold> pour le projet project_name_4</li>' +
        '<li><bold>job_title_5</bold> pour le projet project_name_5</li>' +
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
        '<li><bold>job_title_4</bold> pour le projet project_name_4</li>' +
        '<li><bold>job_title_5</bold> pour le projet project_name_5</li>' +
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
        '<li><bold>job_title_1</bold> pour le projet project_name_1 pour le client customer_name_1 à partir du 10/01/2018</li>' +
        '<li><bold>job_title_2</bold> pour le projet project_name_2 pour le client customer_name_2 à partir du 20/02/2018</li>' +
        '<li><bold>job_title_3</bold> pour le projet project_name_3 pour le client customer_name_3 à partir du 30/03/2018</li>' +
        '</ul>' +
        '</p>' +
        '<p>Pour ne plus recevoir de nouvelles du Job Board, il est possible de <a href="https://jobs.octo.com/#/unsubscribe">se désabonner du Job Board</a>.</p>';
      expect(compiled.trim()).to.equal(expected);
    });
  });
});
