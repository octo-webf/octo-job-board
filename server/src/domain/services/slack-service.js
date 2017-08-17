const slack = require('../../infrastructure/slack');

function postFeedbackMessage(author, message) {
  const text = `:mega: *${author}* a un avis ou une question :\n>>>${message}`;
  return slack.postMessage(text);
}

module.exports = {
  postFeedbackMessage,
};
