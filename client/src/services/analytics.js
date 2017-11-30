export default {

  trackEvent(component, eventCategory, eventAction, eventLabel) {
    component.$ga.event({
      eventCategory,
      eventAction,
      eventLabel,
    });
  },
};
