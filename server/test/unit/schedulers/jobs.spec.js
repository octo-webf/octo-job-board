const {expect, sinon} = require('../../test-helper')
const scheduler = require('../../../src/schedulers/jobs')
const cache = require('../../../src/infrastructure/cache')

describe('Unit | Schedulers | jobs', () => {
  let clock

  describe('#run', () => {
    beforeEach(() => {
      clock = sinon.useFakeTimers()
      sinon.stub(cache, 'del')
    })

    afterEach(() => {
      clock.restore()
      cache.del.restore()
    })

    it('should call #setInterval with good params', () => {
      // given
      scheduler.run()

      // when
      clock.tick(1000 * 60 * 5)
      clock.tick(1000 * 60 * 5)
      clock.tick(1000 * 60 * 5)

      // then
      expect(cache.del).to.have.been.calledThrice
      expect(cache.del).to.always.have.been.calledWith('get_jobs')
    })
  })
})
