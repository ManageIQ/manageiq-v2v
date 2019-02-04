import { hasRsaKey } from '../providersHelpers';

describe('hasRsaKey', () => {
  test('returns false if the provider is missing the authentications attribute', () => {
    const provider = { name: 'provider' };
    const result = hasRsaKey(provider);

    expect(result).toBe(false);
  });

  test('returns true if the provider has an authentication of type ssh_keypair', () => {
    const provider = { authentications: [{ authtype: 'ssh_keypair' }] };
    const result = hasRsaKey(provider);

    expect(result).toBe(true);
  });
});
