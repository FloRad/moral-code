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

// Initialize module
Hooks.once('init', () => {
  console.log('moral-code | Initializing moral-code');

  game.moral = {
    MoralCodeViewer,
  };

  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  preloadTemplates();

  // Register custom sheets (if any)
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
  buttons.unshift({
    label: 'MC.ViewerTitle',
    class: 'open-moral-code',
    icon: 'fas fa-compass',
    onclick: () => {
      new MoralCodeViewer(sheet.actor).render(true);
    },
  });
}