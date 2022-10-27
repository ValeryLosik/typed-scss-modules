// Respectfully taken from css-loader sources to have the same implementations of camelCase transformer,
// previous `change-case.camelCase` produces different result in next cases:
// classname-1-v + change-case.camelCase => classname1v
// classname-1-v + css-loader => classname1V
// @see https://github.com/webpack-contrib/css-loader/blob/master/src/utils.js#L143

const preserveCamelCase = (string: string) => {
  let result = string;
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;

  for (let i = 0; i < result.length; i++) {
    const character = result[i];

    if (isLastCharLower && /[\p{Lu}]/u.test(character)) {
      result = `${result.slice(0, i)}-${result.slice(i)}`;
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i += 1;
    } else if (
      isLastCharUpper &&
      isLastLastCharUpper &&
      /[\p{Ll}]/u.test(character)
    ) {
      result = `${result.slice(0, i - 1)}-${result.slice(i - 1)}`;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower =
        character.toLowerCase() === character &&
        character.toUpperCase() !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper =
        character.toUpperCase() === character &&
        character.toLowerCase() !== character;
    }
  }

  return result;
};

export function camelCase(input: string) {
  let result = input.trim();

  if (result.length === 0) {
    return "";
  }

  if (result.length === 1) {
    return result.toLowerCase();
  }

  const hasUpperCase = result !== result.toLowerCase();

  if (hasUpperCase) {
    result = preserveCamelCase(result);
  }

  return result
    .replace(/^[_.\- ]+/, "")
    .toLowerCase()
    .replace(/[_.\- ]+([\p{Alpha}\p{N}_]|$)/gu, (_, p1) => p1.toUpperCase())
    .replace(/\d+([\p{Alpha}\p{N}_]|$)/gu, (m) => m.toUpperCase());
}
