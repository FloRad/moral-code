export class MoralCodeViewer extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: game.i18n.localize('MC.ViewerTitle'),
      template: 'modules/moral-code/templates/viewer.hbs',
      classes: ['moral-code'],
      width: 500,
      height: 600,
      resizable: false,
    });
  }

  get actor() {
    return this.object;
  }

  activateListeners(html) {
    super.activateListeners(html);
  }

  /**
   *
   * @param {Event} event The initial triggering submission event
   * @param {object} formData The object of validated form data with which to update the object
   */
  async _updateObject(_event, formData) {
    console.log(formData);
  }
}
