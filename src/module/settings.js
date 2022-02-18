export function registerSettings() {
  const choices = {
    classic: 'MC.Theme.Classic',
  };
  const themes = game.modules.get('moral-code')?.api?._themes ?? [];
  for (const theme of themes) {
    choices[theme.class] = theme.label;
  }
  game.settings.register('moral-code', 'theme', {
    name: 'MC.Theme.Theme',
    hint: 'MC.Theme.Hint',
    scope: 'client',
    config: true,
    type: String,
    choices: choices,
    default: 'classic',
  });
}
