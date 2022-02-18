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
import { api } from './api.js';

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
  game.modules.get('moral-code').api = api;
  Hooks.callAll('moralCodeReady', { registerTheme: api.registerTheme, registerSheet: api.registerSheet });

  // Register custom module settings
  registerSettings();
});

/**
 * Hooks
 */
Hooks.on('renderActorSheet', onRenderActorSheet);
Hooks.on('getActorSheetHeaderButtons', onGetActorSheetHeaderButtons);
Hooks.on('devModeReady', onDevModeReady);

function onDevModeReady({ registerPackageDebugFlag }) {
  registerPackageDebugFlag('moral-code');
}

/**
 * Add the Moral Code button to any registered actor sheet
 * @param {ActorSheet} sheet
 * @param {JQuery<HTMLElement>} html
 * @param {*} data
 */
function onRenderActorSheet(sheet, html, _data) {
  const sheetRegistration = api.getSheetRegistration(sheet.constructor.name);

  //return early if the sheet isn't registered
  if (!sheetRegistration) return;

  //create the button element and add the relevant information such as class and click listener
  const button = document.createElement('button');
  button.type = 'button';
  button.innerText = game.i18n.localize('MC.MoralCode');
  button.title = game.i18n.format('MC.ViewerTitle', { actor: sheet.actor.name });
  button.classList.add(...sheetRegistration.classes);
  button.addEventListener('click', () => new MoralCodeViewer(sheet.actor).render(true));

  //add the button to the sheet
  if (sheetRegistration.insert) {
    if (sheetRegistration.prepend) {
      $(sheetRegistration.target).prepend(button);
    } else {
      $(sheetRegistration.target).append(button);
    }
  }
  html.find(sheetRegistration.target).replaceWith(button);
}

/**
 * Add the Moral Code viewer Header button to the actor sheet header buttons, but only if the actorsheet isn't already registered
 * @param {ActorSheet} sheet
 * @param {Array<HeaderButton>} buttons
 */
function onGetActorSheetHeaderButtons(sheet, buttons) {
  const sheetRegistered = !!api.getSheetData(sheet.constructor.name);
  //return early if the sheet is properly registered since we don't need the header button
  if (sheetRegistered) return;
  // only add the header button if the user is an owner (GMs are always owners)
  if (sheet.actor.isOwner) {
    buttons.unshift({
      label: 'MC.MoralCode',
      class: 'open-moral-code',
      icon: 'fas fa-compass',
      onclick: () => {
        new MoralCodeViewer(sheet.actor).render(true);
      },
    });
  }
}

function registerCustomHelpers() {
  //reading you 5 by 5
  Handlebars.registerHelper('radioCheck', function (value, test) {
    if (value === undefined || value === null) return '';
    return value == test ? 'checked' : '';
  });
}
