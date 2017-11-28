import analytics from '@/services/analytics';

describe('Unit | Services | analytics', () => {
  describe('method #trackEvent', () => {
    const component = { $ga: {
      event: () => {},
    } };

    beforeEach(() => {
      sinon.stub(component.$ga, 'event').returns(true);
    });

    afterEach(() => {
      component.$ga.event.restore();
    });

    it('should call $ga event of the component', () => {
      // given
      const eventCategory = 'InterestModal';
      const eventAction = 'click';
      const eventLabel = 'Someone sends an interest';

      // when
      analytics.trackEvent(component, eventCategory, eventAction, eventLabel);

      // then
      expect(component.$ga.event).to.have.been.calledWith({
        eventCategory,
        eventAction,
        eventLabel,
      });
    });
  });
});
