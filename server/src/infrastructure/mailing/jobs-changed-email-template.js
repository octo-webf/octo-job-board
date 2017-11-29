const { isEmpty } = require('lodash');
const moment = require('moment');

module.exports = {
  compile(model) {
    const { addedJobs, removedJobs } = model;

    let template = '<p>Bonjour,</p>';
    template += '<p>Il y a du nouveau du côté du <a href="https://jobs.octo.com">Job Board</a>.</p>';
    if (!isEmpty(addedJobs)) {
      template += '<p>';
      template += `${addedJobs.length} nouvelle(s) mission(s) à staffer :`;
      template += '<ul>';
      addedJobs.forEach((job) => {
        const formatedDate = moment(job.activity.staffing_needed_from).format('DD/MM/YYYY');
        template += `<li>${job.activity.title} pour le projet ${job.project.name} pour le client ${job.project.customer.name} à partir du ${formatedDate}</li>`;
      });
      template += '</ul>';
      template += '</p>';
    }
    if (!isEmpty(removedJobs)) {
      template += '<p>';
      template += `${removedJobs.length} mission(s) retirée(s) :`;
      template += '<ul>';
      removedJobs.forEach((job) => {
        template += `<li>${job.activity.title} pour le projet ${job.project.name}</li>`;
      });
      template += '</ul>';
      template += '</p>';
    }
    template += '<p>Pour ne plus recevoir de nouvelles du Job Board, il est possible de <a href="https://jobs.octo.com/#/unsubscribe">se désabonner du Job Board</a>.</p>';
    return template;
  },
};
