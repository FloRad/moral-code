/**
 * Looks at an actor and constructs the summary text for their moral code
 * @param {Actor} actor The actor to look at
 */
export function getMoralCodeSummary(actor) {
  const code = actor.getFlag('moral-code', 'code');
  if (!code) return null;
  const listItems = [];
  for (const [key, value] of Object.entries(code)) {
    const leaning = getLeaning(key, value);
    const strength = getLeaningStrength(value);
    const text = game.i18n.format(strength, { action: game.i18n.localize(`MC.${leaning}.Hint`) });
    listItems.push(`<li>${game.i18n.localize(`MC.${leaning}.${leaning}`)}: ${text}</li>`);
  }
  ChatMessage.create({
    content: `<ul>${listItems.join('\n')}</ul>`,
    speaker: { actor: actor },
    type: CONST.CHAT_MESSAGE_TYPES.OTHER,
  });
}

/**
 * Get the strength of the moral leaning based on it's value
 * @param {number} value The value of the moral
 * @returns {string} the translation key for the prefix
 */
function getLeaningStrength(value) {
  let strength = '';
  switch (value) {
    case 1:
    case 4:
      strength = 'MC.AlmostAlways';
      break;
    case 2:
    case 3:
      strength = 'MC.Usually';
      break;
    default:
      break;
  }
  return strength;
}

/**
 *  Gets the general moral leaning of an actor
 * @param {string} key
 * @param {number} value
 */
function getLeaning(key, value) {
  const leanings = key.split('-');
  let leaning = '';
  if (value.between(1, 2)) {
    leaning = leanings[0];
  } else if (value.between(3, 4)) {
    leaning = leanings[1];
  }
  return leaning.capitalize();
}
