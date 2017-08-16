module.exports = {
  compile(model) {
    return `
      <h3><a href="mailto:${model.interestedConsultant.email}">${model.interestedConsultant.name}</a> est intéressé·e par la mission <strong>${model.missionName}</strong> en tant que <strong>${model.activityName}</strong>.</h3>
      <p>Voir la <a href="${model.octopodLink}">page mission</a></p>
      <p>Contacter le Contact commercial : <a href="https://askbob.octo.com/users/${model.businessContactNickname.toLowerCase()}">${model.businessContactNickname}</a></p>
      <p>Contacter le Directeur de mission : <a href="https://askbob.octo.com/users/${model.missionDirectorNickname.toLowerCase()}">${model.missionDirectorNickname}</a></p>
    `;
  },
};
