export const MAX_LENGTH_NAMES = 24;
export const MAX_LENGTH_DESCRIPTIONS = 128;

const maxLengthIs = `Maximum length is %s characters.`;
const requiredMaxLengthIs = `Required. ${maxLengthIs}`;
const youHaveReachedMax = `You have reached the maximum length of %s characters.`;

export const validation = {
  name: {
    help: sprintf(__(maxLengthIs), MAX_LENGTH_NAMES),
    requiredMessage: sprintf(__(requiredMaxLengthIs), MAX_LENGTH_NAMES),
    maxLength: MAX_LENGTH_NAMES,
    maxLengthWarning: sprintf(__(youHaveReachedMax), MAX_LENGTH_NAMES)
  },
  description: {
    help: sprintf(__(maxLengthIs), MAX_LENGTH_DESCRIPTIONS),
    maxLength: MAX_LENGTH_DESCRIPTIONS,
    maxLengthWarning: sprintf(__(youHaveReachedMax), MAX_LENGTH_DESCRIPTIONS)
  }
};
