<template>
  <div class="page page__design">
    <main class="page__body">
      <div class="page__container">
        <div class="job">
          <div class="jpb__header">
            <div class="job__status">Signé</div>
            <div class="job__menu">
              <icon name="ellipsis-h"></icon>
            </div>
          </div>
          <div class="job__primary">
            <h2 class="job__title">Dev Confirmé Back #2 Lorem ipsum</h2>
          </div>
          <hr class="job__separator">
          <div class="job__secondary">
            <div class="job__meta-title">Mission</div>
            <h3 class="job__mission">Refonte Explorimmo</h3>
            <h4 class="job__client">Le Figaro Classifieds (filliale versée dans l'immo)</h4>
          </div>
          <div class="job__tertiary">
            <div class="job__meta">
              <div class="job__meta-title">Type</div>
              <div class="job__meta-value job__type">Delivery</div>
            </div>
            <div class="job__meta">
              <div class="job__meta-title">Date</div>
              <div class="job__meta-value job__date">2 Oct. 2017</div>
            </div>
            <div class="job__meta">
              <div class="job__meta-title">Lieu(x)</div>
              <div class="job__meta-value job__location">Paris 9e, Belgique?</div>
            </div>
          </div>
          <div class="job__footer">
            <button class="job__interest-button">Je suis intéressé•e</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

  import 'vue-awesome/icons/ellipsis-h';

  export default {

    name: 'DesignPage',

  };
</script>

<style scoped>
  .page__body {
    display: flex;
    width: 100%;
    padding: 20px 0;
    margin-top: 60px;
    justify-content: center;
  }

  .job {
    display: flex;
    flex-direction: column;
    width: 290px;
    background: #fff;
    padding: 0;
    border: none;
    border-radius: .28571429rem;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    transition: box-shadow .1s ease, transform .1s ease, -webkit-transform .1s ease;
  }

  .jpb__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 0 10px;
  }

  .job__status {
    text-transform: uppercase;
    font-weight: 600;
    background: green;
    color: white;
    font-size: 0.8rem;
    padding: 5px;
    width: 100px;
  }

  .job__menu {
    margin-right: 10px;
    padding: 0 5px;
    border: 2px solid #333;
    border-radius: 5px;
  }

  .job__menu > .fa-icon {
    vertical-align: middle;
  }

  .job__primary {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .job__title {
    font-size: 1.2rem;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .job__separator {
    width: 40px;
    border: 2px solid;
  }

  .job__secondary {
    padding: 10px;
    height: 110px;
  }

  .job__mission {
    margin: 10px 0;
    font-size: 1rem;
  }

  .job__client {
    margin: 10px 0;
    font-size: 1rem;
    font-weight: 400;
  }

  .job__tertiary {
    display: flex;
    flex-direction: row;
    border-top: 1px solid rgba(0, 0, 0, .05) !important;
  }

  .job__meta {
    border-left: 1px solid rgba(0, 0, 0, .05) !important;
    border-right: 1px solid rgba(0, 0, 0, .05) !important;
    padding: 10px;
    width: 100%;
  }

  .job__meta:first-child {
    border-left: none;
  }

  .job__meta:last-child {
    border-right: none;
  }

  .job__meta-title {
    text-transform: uppercase;
    font-size: 0.7rem;
    color: #999;
  }

  .job__meta-value {
    height: 50px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    text-overflow: ellipsis;
  }

  .job__footer {
    height: 58px;
    max-height: 58px;
  }

  .job__interest-button {
    border-style: none;
    border-radius: 0 0 5px 5px;
    height: 100%;
    width: 100%;
    font-size: 1rem;
    cursor: pointer;
  }


</style>
