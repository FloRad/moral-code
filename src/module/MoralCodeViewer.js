export class MoralCodeViewer extends FormApplication {
  constructor(object, options = {}) {
    super(object, options);
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: 'modules/moral-code/templates/viewer.hbs',
      classes: ['moral-code'],
      width: 700,
      height: 700,
      resizable: false,
      closeOnSubmit: false,
    });
  }

  get id() {
    return this.actor.uuid + '-moral-code';
  }

  get title() {
    return game.i18n.format('MC.ViewerTitle', { actor: this.actor.name });
  }

  get actor() {
    return this.object;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('footer .randomize').on('click', this.randomizeMoralCode.bind(this));
    html.find('footer .reset').on('click', this.resetMoralCode.bind(this));
  }

  async getData() {
    const data = super.getData();
    data.code = this.actor.getFlag('moral-code', 'code');
    return data;
  }

  /**
   * @param {Event} event The initial triggering submission event
   * @param {object} formData The object of validated form data with which to update the object
   */
  async _updateObject(_event, formData) {
    await this.actor.setFlag('moral-code', 'code', formData);
  }

  async randomizeMoralCode() {
    const code = {
      'selfish-selfless': await this.randomMoral(),
      'practical-idealistic': await this.randomMoral(),
      'responsible-capricious': await this.randomMoral(),
      'lawful-anarchic': await this.randomMoral(),
      'tolerant-intolerant': await this.randomMoral(),
      'progressive-traditional': await this.randomMoral(),
    };
    console.log(code);
    await this.actor.setFlag('moral-code', 'code', code);
    return this.render(true);
  }

  /**
   * @returns {number} a random value for a moral code secton
   */
  async randomMoral() {
    const formula = '1d4';
    const roll = await new Roll(formula).evaluate({ async: true });
    return roll.total;
  }

  async resetMoralCode() {
    await this.actor.unsetFlag('moral-code', 'code');
    return this.render(true);
  }
}
