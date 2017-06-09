<template>
  <div>
    <div class="job-list">{{ jobs }}
      <ul>
        <li class="job-card" v-for="job in jobs">
        </li>
      </ul>
    </div>
    <main class="page__body">
      <div class="page__container">

        <div class="job-results-panel">

          <section class="job-results job-results--delivery">
            <h1 class="job-results__title">Missions de delivery (13)</h1>
            <ul class="job-results__list">
              <li class="job-results__item">
                <article class="job">
                  <header class="job__header">
                    <h2 class="job__title">Tech Lead Senior Tech Lead Senior</h2>
                    <span class="job__status job__status--lead"></span>
                  </header>
                  <a class="job__content" href="https://octopod.octo.com/projects/2146904867">
                    <p><span class="job__mission">DELIVERY ANEF [avril→juin 17]</span></p>
                    <p class="job__client-wrapper">pour <span class="job__client">BNP Paribas BDDF</span></p>
                    <p>dès <span class="job__start-date">juin 2017</span> sur <span class="job__duration">9 mois</span></p>
                    <p>à <span class="job__location">Saint-Quentin-en-Yvelines</span></p>
                  </a>
                  <footer class="job__footer">
                    <button class="job__apply-button">Je suis intéressé</button>
                    <a class="job__alert-link" href="mailto:job-board@octo.com">Signaler un problème</a>
                  </footer>
                </article>
              </li>
              <li class="job-results__item">
                <article class="job">
                  <header class="job__header">
                    <h2 class="job__title">Coaching Agile</h2>
                    <span class="job__status job__status--proposal-in-progress"></span>
                  </header>
                  <a class="job__content" href="https://octopod.octo.com/projects/2146904867">
                    <p><span class="job__mission">Track &amp; Trace PoC BPCE</span></p>
                    <p class="job__client-wrapper">pour <span class="job__client">La Poste - Courrier</span></p>
                    <p>dès <span class="job__start-date">juin 2017</span> sur <span class="job__duration">9 mois</span></p>
                    <p>à <span class="job__location">SQY et OCTO</span></p>
                  </a>
                  <footer class="job__footer">
                    <button class="job__apply-button">Je suis intéressé</button>
                    <a class="job__alert-link" href="mailto:job-board@octo.com">Signaler un problème</a>
                  </footer>
                </article>
              </li>
              <li class="job-results__item">
                <article class="job">
                  <header class="job__header">
                    <h2 class="job__title">Dév Senior / TL</h2>
                    <span class="job__status job__status--lead"></span>
                  </header>
                  <a class="job__content" href="https://octopod.octo.com/projects/2146904867">
                    <p><span class="job__mission">FC PRODUIT T3 2017</span></p>
                    <p class="job__client-wrapper">pour <span class="job__client">DINSIC</span></p>
                    <p>dès <span class="job__start-date">juillet 2017</span> sur <span class="job__duration">6 mois</span></p>
                    <p>à <span class="job__location">Saint-Quentin-en-Yvelines</span></p>
                  </a>
                  <footer class="job__footer">
                    <button class="job__apply-button">Je suis intéressé</button>
                    <a class="job__alert-link" href="mailto:job-board@octo.com">Signaler un problème</a>
                  </footer>
                </article>
              </li>
              <li class="job-results__item">
                <article class="job">
                  <header class="job__header">
                    <h2 class="job__title">Dév Senior / TL</h2>
                    <span class="job__status job__status--proposal-sent"></span>
                  </header>
                  <a class="job__content" href="https://octopod.octo.com/projects/2146904867">
                    <p><span class="job__mission">LE DRÔNE</span></p>
                    <p class="job__client-wrapper">pour <span class="job__client">DINSIC</span></p>
                    <p>dès <span class="job__start-date">juin 2017</span> sur <span class="job__duration">9 mois</span></p>
                    <p>à <span class="job__location">39-43 quai André Citroën 75015 Paris</span></p>
                  </a>
                  <footer class="job__footer">
                    <button class="job__apply-button">Je suis intéressé</button>
                    <a class="job__alert-link" href="mailto:job-board@octo.com">Signaler un problème</a>
                  </footer>
                </article>
              </li>
              <li class="job-results__item">
                <article class="job">
                  <header class="job__header">
                    <h2 class="job__title">Dev WF Confirmé 2</h2>
                    <span class="job__status job__status--mission-signed"></span>
                  </header>
                  <a class="job__content" href="https://octopod.octo.com/projects/2146904867">
                    <p><span class="job__mission">Accompagnement Connexis Cash</span></p>
                    <p class="job__client-wrapper">pour <span class="job__client">BNP Paribas CIB - Cash Management</span></p>
                    <p>dès <span class="job__start-date">juin 2017</span> sur <span class="job__duration">3 mois</span></p>
                    <p>à <span class="job__location">N/A</span></p>
                  </a>
                  <footer class="job__footer">
                    <button class="job__apply-button">Je suis intéressé</button>
                    <a class="job__alert-link" href="mailto:job-board@octo.com">Signaler un problème</a>
                  </footer>
                </article>
              </li>
              <li class="job-results__item">
                <article class="job">
                  <header class="job__header">
                    <h2 class="job__title">Développeur</h2>
                    <span class="job__status job__status--mission-accepted"></span>
                  </header>
                  <a class="job__content" href="https://octopod.octo.com/projects/2146904867">
                    <p><span class="job__mission">Développement LPS</span></p>
                    <p class="job__client-wrapper">pour <span class="job__client">Lyreco</span></p>
                    <p>dès <span class="job__start-date">avril 2017</span> sur <span class="job__duration">Trois mois</span></p>
                    <p>à <span class="job__location">Valenciennes</span></p>
                  </a>
                  <footer class="job__footer">
                    <button class="job__apply-button">Je suis intéressé</button>
                    <a class="job__alert-link" href="mailto:job-board@octo.com">Signaler un problème</a>
                  </footer>
                </article>
              </li>
            </ul>
          </section>

          <section class="job-results job-results--consulting">
            <h1 class="job-results__title">Missions de conseil (4)</h1>
            <ul class="job-results__list">
              <li class="job-results__item">
                <article class="job">
                  <header class="job__header">
                    <h2 class="job__title">Tech Lead Senior Tech Lead Senior</h2>
                    <span class="job__status job__status--lead"></span>
                  </header>
                  <a class="job__content" href="https://octopod.octo.com/projects/2146904867">
                    <p class="job__mission">DELIVERY ANEF [avril→juin 17]</p>
                    <p class="job__client">BNP Paribas BDDF</p>
                    <p><span class="job__start-date">juin 2017</span> – <span class="job__duration">9 mois</span></p>
                    <p>Lieu : <span class="job__location">Paris, 15ème</span></p>
                    <p>Contact : <span class="job__contact">MAX</span></p>
                  </a>
                  <footer class="job__footer">
                    <button class="job__apply-button">Je suis intéressé</button>
                    <a class="job__alert-link" href="mailto:job-board@octo.com">Signaler une erreur</a>
                  </footer>
                </article>
              </li>
              <li class="job-results__item">
                <article class="job">
                  <header class="job__header">
                    <h2 class="job__title">Data engineer</h2>
                    <span class="job__status job__status--mission-signed"></span>
                  </header>
                  <a class="job__content" href="https://octopod.octo.com/projects/2146904867">
                    <p class="job__mission">DELIVERY ANEF [avril→juin 17]</p>
                    <p class="job__client">BNP Paribas BDDF</p>
                    <p><span class="job__start-date">juin 2017</span> – <span class="job__duration">9 mois</span></p>
                    <p>Lieu : <span class="job__location">OCTO</span></p>
                    <p>Contact : <span class="job__contact">NCA</span></p>
                  </a>
                  <footer class="job__footer">
                    <button class="job__apply-button">Je suis intéressé</button>
                    <a class="job__alert-link" href="mailto:job-board@octo.com">Signaler une erreur</a>
                  </footer>
                </article>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
  	name: 'job-list',
  	data() {

  		return {
  			jobs: [],
  		};

  	},
  	created() {

  		this.getJobs().then((response) => {

  			this.jobs = response.data;
  
		});

	},
  	methods: {
  		getJobs() {

  			return this.$http.get('http://localhost:3000/api/activities');

		},
  	},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page__container {
    min-width: 1080px;
    max-width: 1080px;
    margin: 0 auto;
  }

  /* App header
  /* ------------------- */

  .page__header {
    height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6;
  }

  .page__header--container {
    display: flex;
    justify-content: space-between;
  }

  .logo-link {
    text-decoration: none;
    font-size: 26px;
    font-weight: 900;
    display: inline-block;
    padding: 15px 0;
  }

  .logo-link__job {
    color: #07c;
  }

  .logo-link__board {
    color: #F48024;
  }

  .logout-link {
    color: #9199a1;
    display: inline-block;
    padding: 17px 0;
    line-height: 28px;
    text-decoration: none;
  }

  .logout-link:hover {
    text-decoration: underline;
  }

  .page__body {
    display: flex;
    width: 100%;
    padding: 20px 0;
  }

  /* Job results
  /* ------------------- */

  .job-results {
    margin-bottom: 60px;
  }

  .job-results__title {
    font-weight: 300;
    font-size: 24px;
    margin: 0 0 15px;
  }

  .job-results__list {
    padding: 0;
    margin: -5px; /* set to cancel job-results__item#margin */
    display: flex;
    flex-wrap: wrap;
  }

  .job-results__item {
    list-style-type: none;
    padding: 0;
    margin: 5px;
  }

  /* Job
  /* ------------------- */

  .job {
    min-width: 260px;
    max-width: 260px;
    background: #ffffff;
    border-radius: 4px!important;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
    border: 1px solid rgba(0,0,0,.09);
    display: flex;
    flex-direction: column;
    color: #535a60;
  }

  .job__header {
    border-bottom: 1px solid #e6e6e6;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }

  .job__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 17px;
    color: #07c;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  .job__status {
    display: inline-block;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    margin-left: 5px;
  }

  .job__status--lead {
    background: orange;
  }

  .job__status--mission-signed {
    background: green;
  }

  .job__status--proposal-in-progress {
    background: #0000FF;
  }

  .job__status--proposal-sent {
    background: #6699FF;
  }

  .job__status--mission-accepted {
    background-color: #33CC00;
  }

  .job__content {
    font-size: 15px;
    padding: 15px;
    height: 130px;
    text-decoration: none;
    display: block;
    color: #000;
  }

  .job__content > p {
    margin-top: 0;
  }

  .job__mission {
    color: #71a5cb;
  }

  .job__client-wrapper {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .job__client {
    color: #9199a1;
  }

  .job__start-date {
    color: #f98c71;
  }

  .job__duration {
    color: #5fba7d;
    font-weight: 700;
  }

  .job__location {
    color: #07c;
  }

  .job__footer {
    text-align: center;
    padding: 15px;
    border-top: 1px solid #e6e6e6;
  }

  .job__apply-button {
    text-transform: uppercase;
    color: #F57C00;
    background: #ffffff;
    border: 1px solid #F48024;
    cursor: pointer;
    padding: 15px 30px;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 10px;
  }

  .job__apply-button:hover {
    background: #FFE0B2;
  }

  .job__alert-link {
    text-decoration: none;
    font-size: 12px;
    color: #9199a1;
  }

  .job__alert-link:hover {
    text-decoration: underline;
  }
</style>
