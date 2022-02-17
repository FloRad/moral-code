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

// Import JavaScript modules
import { registerSettings } from './settings.js';
import { preloadTemplates } from './preloadTemplates.js';
import { MoralCodeViewer } from './MoralCodeViewer.js';
import { getMoralCodeSummary } from './utils.js';

// Initialize module
Hooks.once('init', () => {
  console.log('moral-code | Initializing moral-code');

  // Assign custom classes and constants here
  game['moral-code'] = {
    getMoralCodeSummary,
    MoralCodeViewer,
  };

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  preloadTemplates();

  //register custom Handlebars helpers
  registerCustomHelpers();
});

// Setup module
Hooks.once('setup', () => {
  // Do anything after initialization but before
  // ready
});

// When ready
Hooks.once('ready', () => {
  // Do anything once the module is ready
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
  Handlebars.registerHelper('radioCheck', function (value, test) {
    if (value === undefined || value === null) return '';
    return value == test ? 'checked' : '';
  });
}
