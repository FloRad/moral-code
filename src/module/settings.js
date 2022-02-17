export function registerSettings() {
  game.settings.register('moral-code', 'theme', {
    name: 'MC.Theme.Theme',
    hint: 'MC.Theme.Hint',
    scope: 'client',
    config: true,
    type: String,
    choices: {
      classic: 'MC.Theme.Classic',
    },
  });
}
