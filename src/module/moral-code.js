/**
 * This is your JavaScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: FloRad
 * Content License: Heck if I know. Should be Fair Use I guess
 * Software License: Apache License 2.0
 */

import { registerSettings } from './settings.js';
import { preloadTemplates } from './preloadTemplates.js';
import { MoralCodeViewer } from './MoralCodeViewer.js';
import * as api from './api.js';

// Initialize module
Hooks.once('init', () => {
  console.log('moral-code', '|', 'Initializing moral-code');

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

/**
 * Hooks
 */
Hooks.on('getActorSheetHeaderButtons', onGetActorSheetHeaderButtons);
Hooks.on('devModeReady', onDevModeReady);

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

function onDevModeReady({ registerPackageDebugFlag }) {
  registerPackageDebugFlag('moral-code');
}

function registerCustomHelpers() {
  //reading you 5 by 5
  Handlebars.registerHelper('radioCheck', function (value, test) {
    if (value === undefined || value === null) return '';
    return value == test ? 'checked' : '';
  });
}
