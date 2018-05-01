export const MAX_LENGTH_NAMES = 24;
export const MAX_LENGTH_DESCRIPTIONS = 128;

export const validation = {
  name: {
    help: sprintf(__(`Maximum length is %s characters.`), MAX_LENGTH_NAMES),
    requiredMessage: sprintf(
      __(`Required. Maximum length is %s characters.`),
      MAX_LENGTH_NAMES
    ),
    maxLength: MAX_LENGTH_NAMES,
    maxLengthWarning: sprintf(
      __(`You have reached the maximum length of %s characters.`),
      MAX_LENGTH_NAMES
    )
  },
  description: {
    help: sprintf(
      __(`Maximum length is %s characters.`),
      MAX_LENGTH_DESCRIPTIONS
    ),
    maxLength: MAX_LENGTH_DESCRIPTIONS,
    maxLengthWarning: sprintf(
      __(`You have reached the maximum length of %s characters.`),
      MAX_LENGTH_DESCRIPTIONS
    )
  }
};
