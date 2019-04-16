// Note: most of these helpers are tested indirectly in PlanWizardVMStepReducer.test.js, this file is for what isn't covered there.

import { parseVmPath } from '../helpers';

describe('parseVmPath', () => {
  it('should handle a vm with an empty path', () => {
    expect(parseVmPath({ path: '' })).toEqual({ provider: '', datacenter: '', folder: '/' });
  });

  it('should handle a vm with no path defined (invalid vm)', () => {
    expect(parseVmPath({})).toEqual({ provider: '', datacenter: '', folder: '' });
  });

  it('should handle a vm with a provider but no datacenter or folder', () => {
    expect(parseVmPath({ path: 'dummyProvider' })).toEqual({ provider: 'dummyProvider', datacenter: '', folder: '/' });
    expect(parseVmPath({ path: 'dummyProvider/' })).toEqual({ provider: 'dummyProvider', datacenter: '', folder: '/' });
  });

  it('should handle a vm with a provider and datacenter but no folder', () => {
    expect(parseVmPath({ path: 'dummyProvider/dummyDatacenter' })).toEqual({
      provider: 'dummyProvider',
      datacenter: 'dummyDatacenter',
      folder: '/'
    });
    expect(parseVmPath({ path: 'dummyProvider/dummyDatacenter/' })).toEqual({
      provider: 'dummyProvider',
      datacenter: 'dummyDatacenter',
      folder: '/'
    });
  });
  it('should handle a vm with a full path', () => {
    expect(parseVmPath({ path: 'dummyProvider/dummyDatacenter/dummyFolder' })).toEqual({
      provider: 'dummyProvider',
      datacenter: 'dummyDatacenter',
      folder: '/dummyFolder'
    });
    expect(parseVmPath({ path: 'dummyProvider/dummyDatacenter/dummyFolder/deeply/nested' })).toEqual({
      provider: 'dummyProvider',
      datacenter: 'dummyDatacenter',
      folder: '/dummyFolder/deeply/nested'
    });
  });
});
