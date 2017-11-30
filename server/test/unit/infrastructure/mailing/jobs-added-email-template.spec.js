const { expect } = require('../../../test-helper');
const jobsChangedEmailTemplate = require('../../../../src/infrastructure/mailing/jobs-added-email-template');

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

    it('should compute the good rendering', () => {
      // given
      const model = {
        addedJobs: [addedJob1, addedJob2, addedJob3],
      };

      // when
      const compiled = jobsChangedEmailTemplate.compile(model);

      // then
      const expected = '<p>Bonjour,</p>' +
        '<p>Il y a du nouveau du côté du <a href="https://jobs.octo.com">Job Board</a>.</p>' +
        '<p>3 nouvelle(s) mission(s) à staffer :' +
        '<ul>' +
        '<li>job_title_1 pour le projet project_name_1 pour le client customer_name_1 à partir du 10/01/2018</li>' +
        '<li>job_title_2 pour le projet project_name_2 pour le client customer_name_2 à partir du 20/02/2018</li>' +
        '<li>job_title_3 pour le projet project_name_3 pour le client customer_name_3 à partir du 30/03/2018</li>' +
        '</ul></p>' +
        '<p>Pour ne plus recevoir de nouvelles du Job Board, il est possible de <a href="https://jobs.octo.com/#/unsubscribe">se désabonner du Job Board</a>.</p>';
      expect(compiled.trim()).to.equal(expected);
    });
  });
});
