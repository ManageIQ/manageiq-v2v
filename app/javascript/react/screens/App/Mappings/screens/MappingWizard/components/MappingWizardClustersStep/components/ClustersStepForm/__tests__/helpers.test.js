import {
  targetClusterWithExtendedData,
  sourceClusterWithExtendedData,
  updateMapping,
  createNewMapping,
  providerHasSshKeyPair,
  everyConversionHostHasPrivateKey
} from '../helpers';

import { srcClusters, tgtClusters } from '../clustersStepForm.fixtures';

test('targetClusterWithExtendedData adds attrs for displaying in TreeView', () => {
  const [targetCluster] = tgtClusters;

  expect(targetClusterWithExtendedData(targetCluster)).toMatchSnapshot();
});

test('sourceClusterWithExtendedData adds attrs for displaying in TreeView', () => {
  const [sourceCluster] = srcClusters;

  expect(sourceClusterWithExtendedData(sourceCluster)).toMatchSnapshot();
});

describe('updateMapping', () => {
  test('adds source clusters to mapping if target cluster id matches', () => {
    const [mappedTargetCluster] = tgtClusters;
    const [mappedSourceCluster, sourceClusterToAdd] = srcClusters;
    const clustersStepMapping = {
      ...mappedTargetCluster,
      nodes: [mappedSourceCluster]
    };

    expect(updateMapping(clustersStepMapping, mappedTargetCluster, [sourceClusterToAdd])).toMatchSnapshot();
  });

  test('does not add source clusters if target cluster id does not match', () => {
    const [mappedTargetCluster, targetClusterToAddTo] = tgtClusters;
    const [mappedSourceCluster, sourceClusterShouldNotBeAdded] = srcClusters;
    const clustersStepMapping = {
      ...mappedTargetCluster,
      nodes: [mappedSourceCluster]
    };

    expect(updateMapping(clustersStepMapping, targetClusterToAddTo, [sourceClusterShouldNotBeAdded])).toMatchSnapshot();
  });
});

test('createNewMapping constructs a clusters step mapping', () => {
  const [targetCluster] = tgtClusters;
  const [sourceCluster] = srcClusters;

  expect(createNewMapping(targetCluster, [sourceCluster])).toMatchSnapshot();
});

describe('providerHasSshKeyPair', () => {
  test('is correct in the true case', () => {
    const target = { ems_id: '1' };
    const providers = [
      {
        id: '1',
        authentications: [{ authtype: 'ssh_keypair' }]
      }
    ];
    expect(providerHasSshKeyPair(target, providers)).toBeTruthy();
  });

  test('is correct in the false case', () => {
    const target = { ems_id: '1' };
    const providers = [
      {
        id: '1',
        authentications: []
      }
    ];
    expect(providerHasSshKeyPair(target, providers)).toBeFalsy();
  });
});

describe('everyConversionHostHasPrivateKey', () => {
  test('is correct in the true case', () => {
    const conversionHosts = [
      {
        mock: 'hostWithRightAuthentication',
        authentications: [{ type: 'AuthPrivateKey', authtype: 'v2v' }]
      },
      {
        mock: 'hostWithRightAndWrongAuthentications',
        authentications: [{ type: 'foo', authtype: 'bar' }, { type: 'AuthPrivateKey', authtype: 'v2v' }]
      }
    ];
    expect(everyConversionHostHasPrivateKey(conversionHosts)).toBeTruthy();
  });

  test('is correct in the false case', () => {
    const conversionHosts = [
      {
        mock: 'hostWithoutAuthentications'
      },
      {
        mock: 'hostWithWrongAuthentication',
        authentications: [{ type: 'foo', authtype: 'bar' }]
      },
      {
        mock: 'hostWithRightAuthentication',
        authentications: [{ type: 'foo', authtype: 'bar' }, { type: 'AuthPrivateKey', authtype: 'v2v' }]
      }
    ];
    expect(everyConversionHostHasPrivateKey(conversionHosts)).toBeFalsy();
  });
});
