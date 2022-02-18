/**
 * This is your JavaScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module.
 */

import { registerSettings } from './settings.js';
import { preloadTemplates } from './preloadTemplates.js';
import { MoralCodeViewer } from './MoralCodeViewer.js';
import * as api from './api.js';

// Initialize module
Hooks.once('init', () => {
  console.log('moral-code | Initializing moral-code');

  // Preload Handlebars templates
  preloadTemplates();

  //register custom Handlebars helpers
  registerCustomHelpers();
});

// Setup module
Hooks.once('setup', () => {
  // Do anything after initialization but before ready

  //set up the API here
  game.modules.get('moral-code').api = api.api;
  Hooks.callAll('moralCodeReady', game.modules.get('moral-code').api);

  // Register custom module settings
  registerSettings();
});

// Add any additional hooks if necessary
Hooks.on('getActorSheetHeaderButtons', onGetActorSheetHeaderButtons);

/**
 *
 * @param {ActorSheet} sheet
 * @param {Array<HeaderButton>} buttons
 */
function onGetActorSheetHeaderButtons(sheet, buttons) {
  if (!sheet.actor.isOwner) return;
  buttons.unshift({
    label: 'MC.MoralCode',
    class: 'open-moral-code',
    icon: 'fas fa-compass',
    onclick: () => {
      new MoralCodeViewer(sheet.actor).render(true);
    },
  });
}

function registerCustomHelpers() {
  //reading you 5 by 5
  Handlebars.registerHelper('radioCheck', function (value, test) {
    if (value === undefined || value === null) return '';
    return value == test ? 'checked' : '';
  });
}
