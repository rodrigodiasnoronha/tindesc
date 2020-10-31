'use strict';

class LikeController {
  /**
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {View} ctx.view
   *
   */
  async store() {
    return { ok: true };
  }
}

module.exports = LikeController;
