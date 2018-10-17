import React from 'react';
import { shallow } from 'enzyme';

import { srcClusters, tgtClusters } from '../clustersStepForm.fixtures';
import { targetClusterWithExtendedData, sourceClusterWithExtendedData } from '../helpers';

import ClustersStepForm from '../ClustersStepForm';

let onChange;
let props;
beforeEach(() => {
  props = { isFetchingSourceClusters: false, isFetchingTargetClusters: false };
  onChange = jest.fn();
});

describe('#addMapping', () => {
  test('adds a mapping', () => {
    const input = { value: [], onChange };
    const [sourceClusterToMap] = srcClusters;
    const [targetClusterToMap] = tgtClusters;
    const wrapper = shallow(
      <ClustersStepForm
        {...props}
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
        {...props}
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
