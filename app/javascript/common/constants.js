export const MAX_LENGTH_NAMES = 24;
export const MAX_LENGTH_DESCRIPTIONS = 128;

export const validation = {
  name: {
    help: __(`Maximum length is ${MAX_LENGTH_NAMES} characters.`),
    requiredMessage: __(
      `Required. Maximum length is ${MAX_LENGTH_NAMES} characters`
    ),
    maxLength: MAX_LENGTH_NAMES,
    maxLengthWarning: __(
      `You have reached the maximum length of ${MAX_LENGTH_NAMES} characters.`
    )
  },
  description: {
    help: __(`Maximum length is ${MAX_LENGTH_DESCRIPTIONS} characters.`),
    maxLength: MAX_LENGTH_DESCRIPTIONS,
    maxLengthWarning: __(
      `You have reached the maximum length of ${MAX_LENGTH_DESCRIPTIONS} characters.`
    )
  }
};
