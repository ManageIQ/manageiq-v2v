import { getProviderIds } from '../helpers';

describe('getProviderIds', () => {
  test('returns an array with unique ems IDs', () => {
    const clusters = [
      {
        ems_id: '1'
      },
      {
        ems_id: '2'
      },
      {
        ems_id: '1'
      }
    ];

    expect(getProviderIds(clusters)).toMatchSnapshot();
  });
});
