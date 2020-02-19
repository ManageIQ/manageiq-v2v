import React from 'react';
import { shallow } from 'enzyme';

import ClustersStepForm from '../ClustersStepForm';
import { srcClusters, tgtClusters } from '../clustersStepForm.fixtures';
import { targetClusterWithExtendedData, sourceClusterWithExtendedData } from '../helpers';
import { RHV, OPENSTACK } from '../../../../../MappingWizardConstants';

let onChange;
let baseProps;
beforeEach(() => {
  baseProps = { isFetchingSourceClusters: false, isFetchingTargetClusters: false };
  onChange = jest.fn();
});

describe('#addMapping', () => {
  test('adds a mapping', () => {
    const input = { value: [], onChange };
    const [sourceClusterToMap] = srcClusters;
    const [targetClusterToMap] = tgtClusters;
    const wrapper = shallow(
      <ClustersStepForm
        {...baseProps}
        input={input}
        sourceClusters={[sourceClusterToMap]}
        targetClusters={[targetClusterToMap]}
      />
    );

    wrapper
      .find('DualPaneMapperListItem')
      .at(0)
      .prop('handleClick')(sourceClusterToMap);
    wrapper
      .find('DualPaneMapperListItem')
      .at(1)
      .prop('handleClick')(targetClusterToMap);
    wrapper.find('DualPaneMapper').prop('handleButtonClick')();

    expect(input.onChange).toHaveBeenLastCalledWith([
      {
        ...targetClusterWithExtendedData(targetClusterToMap),
        nodes: [sourceClusterWithExtendedData(sourceClusterToMap)]
      }
    ]);

    expect(wrapper.state('selectedTargetCluster')).toBe(null);
    expect(wrapper.state('selectedSourceClusters')).toEqual([]);
  });

  test('adds to an existing mapping', () => {
    const [sourceClusterToMap, mappedSourceCluster] = srcClusters;
    const [targetClusterToAddTo] = tgtClusters;
    const clustersStepMappings = [
      {
        ...targetClusterWithExtendedData(targetClusterToAddTo),
        nodes: [sourceClusterWithExtendedData(mappedSourceCluster)]
      }
    ];
    const input = {
      value: clustersStepMappings,
      onChange
    };
    const wrapper = shallow(
      <ClustersStepForm
        {...baseProps}
        input={input}
        sourceClusters={[sourceClusterToMap, mappedSourceCluster]}
        targetClusters={[targetClusterToAddTo]}
      />
    );

    wrapper
      .find('DualPaneMapperListItem')
      .at(0)
      .prop('handleClick')(sourceClusterToMap);
    wrapper
      .find('DualPaneMapperListItem')
      .at(1)
      .prop('handleClick')(targetClusterToAddTo);
    wrapper.find('DualPaneMapper').prop('handleButtonClick')();

    expect(input.onChange).toHaveBeenLastCalledWith([
      {
        ...targetClusterWithExtendedData(targetClusterToAddTo),
        nodes: [sourceClusterWithExtendedData(mappedSourceCluster), sourceClusterWithExtendedData(sourceClusterToMap)]
      }
    ]);

    expect(wrapper.state('selectedTargetCluster')).toBe(null);
    expect(wrapper.state('selectedSourceClusters')).toEqual([]);
  });
});

describe('RHV conversion hosts', () => {
  const props = {
    ...baseProps,
    input: { value: [], onChange },
    sourceClusters: [],
    targetClusters: [
      { id: 'cluster1', name: 'target cluster', ems_id: 'ems1', ext_management_system: { name: 'RHV' } }
    ],
    targetProvider: RHV
  };

  test('displays a warning icon if the target cluster does not have a configured conversion host', () => {
    const wrapper = shallow(<ClustersStepForm {...props} rhvConversionHosts={[]} />);
    const listItem = wrapper.find('DualPaneMapperListItem');
    expect(listItem.prop('warningMessage')).toBeTruthy();
  });

  test('does not display a warning icon if the target cluster has a configured conversion host', () => {
    const rhvConversionHosts = [{ resource: { ems_cluster_id: 'cluster1' } }];
    const wrapper = shallow(<ClustersStepForm {...props} rhvConversionHosts={rhvConversionHosts} />);
    const listItem = wrapper.find('DualPaneMapperListItem');
    expect(listItem.prop('warningMessage')).toBeFalsy();
  });
});

describe('OSP conversion hosts', () => {
  const props = {
    ...baseProps,
    input: { value: [], onChange },
    sourceClusters: [],
    targetClusters: [
      { id: 'project1', name: 'target project', ems_id: 'ems1', ext_management_system: { name: 'OSP' } }
    ],
    targetProvider: OPENSTACK
  };

  test('displays a warning icon if the target provider does not have a configured conversion host', () => {
    const wrapper = shallow(<ClustersStepForm {...props} ospConversionHosts={[]} />);
    const listItem = wrapper.find('DualPaneMapperListItem');
    expect(listItem.prop('warningMessage')).toBeTruthy();
  });

  test('does not display a warning icon if there is a configured conversion host anywhere in the target provider', () => {
    const ospConversionHosts = [{ resource: { ems_id: 'ems1', ems_cluster_id: 'project2' } }];
    const wrapper = shallow(<ClustersStepForm {...props} ospConversionHosts={ospConversionHosts} />);
    const listItem = wrapper.find('DualPaneMapperListItem');
    expect(listItem.prop('warningMessage')).toBeFalsy();
  });
});
