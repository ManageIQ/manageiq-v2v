import React from 'react';
import { shallow } from 'enzyme';

import NetworksStepForm from '../NetworksStepForm';
import { uniqueNetworks } from '../../../MappingWizardNetworksStepSelectors';

import { clustersMappingWithTreeViewAttrs, targetNetworkWithTreeViewAttrs, networkGroupingForRep } from '../helpers';

import {
  sourceNetworks,
  targetNetworks,
  sourceCluster,
  networkGrouping,
  clustersMapping,
  targetCluster
} from '../networksStepForm.fixtures';

let props = {
  isFetchingSourceNetworks: false,
  isFetchingTargetNetworks: false,
  selectedCluster: sourceCluster,
  selectedClusterMapping: clustersMapping
};

let input;
beforeEach(() => {
  input = { onChange: jest.fn(), value: [] };
});

describe('#addNetworkMapping', () => {
  describe('maps a network grouping to the selected target network', () => {
    describe('when a mapping does not exist for the target network', () => {
      xit('and there is no mapping for the target cluster', () => {
        const [targetNetworkToMap] = targetNetworks;
        const wrapper = shallow(
          <NetworksStepForm
            {...props}
            input={input}
            groupedSourceNetworks={uniqueNetworks(networkGrouping)}
            groupedTargetNetworks={uniqueNetworks([targetNetworkToMap])}
          />
        );
        const [networkGroupRep] = networkGrouping;

        wrapper
          .find('DualPaneMapperListItem')
          .at(0)
          .prop('handleClick')(networkGroupRep);
        wrapper
          .find('DualPaneMapperListItem')
          .at(1)
          .prop('handleClick')(targetNetworkToMap);
        wrapper.find('DualPaneMapper').prop('handleButtonClick')();

        expect(input.onChange).toHaveBeenLastCalledWith([
          {
            ...clustersMappingWithTreeViewAttrs(props.selectedClusterMapping),
            nodes: [
              {
                ...targetNetworkWithTreeViewAttrs(targetNetworkToMap),
                nodes: networkGroupingForRep(networkGroupRep, uniqueNetworks(networkGrouping), props.selectedCluster)
              }
            ]
          }
        ]);
      });

      test('and there already exists a mapping for the target cluster', () => {
        const [mappedTargetNetwork, , targetNetworkToMap] = targetNetworks;
        const [, , mappedSourceNetwork] = sourceNetworks;
        const srcNetworks = [...networkGrouping, mappedSourceNetwork];
        const groupedNetworks = uniqueNetworks(srcNetworks);
        const networksStepMapping = {
          ...clustersMappingWithTreeViewAttrs(clustersMapping),
          nodes: [
            {
              ...targetNetworkWithTreeViewAttrs(mappedTargetNetwork),
              nodes: networkGroupingForRep(mappedSourceNetwork, groupedNetworks, props.selectedCluster)
            }
          ]
        };
        input = {
          ...input,
          value: [networksStepMapping]
        };
        const wrapper = shallow(
          <NetworksStepForm
            {...props}
            input={input}
            groupedSourceNetworks={uniqueNetworks(srcNetworks)}
            groupedTargetNetworks={uniqueNetworks(targetNetworks)}
          />
        );
        const [networkGroupRep] = networkGrouping;

        wrapper
          .find('DualPaneMapperListItem')
          .at(0)
          .prop('handleClick')(networkGroupRep);
        wrapper
          .find('DualPaneMapperListItem')
          .at(2)
          .prop('handleClick')(targetNetworkToMap);
        wrapper.find('DualPaneMapper').prop('handleButtonClick')();

        expect(input.onChange).toHaveBeenLastCalledWith([
          {
            ...networksStepMapping,
            nodes: [
              ...networksStepMapping.nodes,
              {
                ...targetNetworkWithTreeViewAttrs(targetNetworkToMap),
                nodes: networkGroupingForRep(networkGroupRep, groupedNetworks, props.selectedCluster)
              }
            ]
          }
        ]);
      });
    });

    xit('when a mapping exists for the target network', () => {
      const [mappedTargetNetwork] = targetNetworks;
      const [, , mappedSourceNetwork] = sourceNetworks;
      const srcNetworks = [...networkGrouping, mappedSourceNetwork];
      const groupedNetworks = uniqueNetworks(srcNetworks);
      const networksStepMapping = {
        ...clustersMappingWithTreeViewAttrs(clustersMapping),
        nodes: [
          {
            ...targetNetworkWithTreeViewAttrs(mappedTargetNetwork),
            nodes: networkGroupingForRep(mappedSourceNetwork, groupedNetworks, sourceCluster)
          }
        ]
      };
      input = {
        ...input,
        value: [networksStepMapping]
      };

      const wrapper = shallow(
        <NetworksStepForm
          {...props}
          input={input}
          groupedSourceNetworks={uniqueNetworks(srcNetworks)}
          groupedTargetNetworks={uniqueNetworks([mappedTargetNetwork])}
        />
      );
      const [networkGroupRep] = networkGrouping;

      wrapper
        .find('DualPaneMapperListItem')
        .at(0)
        .prop('handleClick')(networkGroupRep);
      wrapper
        .find('DualPaneMapperListItem')
        .at(1)
        .prop('handleClick')(mappedTargetNetwork);
      wrapper.find('DualPaneMapper').prop('handleButtonClick')();

      expect(input.onChange).toHaveBeenLastCalledWith([
        {
          ...networksStepMapping,
          nodes: [
            {
              ...targetNetworkWithTreeViewAttrs(mappedTargetNetwork),
              nodes: [
                ...networksStepMapping.nodes[0].nodes,
                ...networkGroupingForRep(networkGroupRep, groupedNetworks, props.selectedCluster)
              ]
            }
          ]
        }
      ]);
    });
  });
});

describe('#removeNode', () => {
  const [targetNetworkOne, targetNetworkTwo] = targetNetworks;

  const sourceNetworkOne = sourceNetworks.slice(0, 1);
  const sourceNetworkTwo = sourceNetworks.slice(1, 2);

  const groupedSourceNetworks = uniqueNetworks([...sourceNetworkOne, ...sourceNetworkTwo]);
  const groupedTargetNetworks = uniqueNetworks([targetNetworkOne, targetNetworkTwo]);
  props = {
    ...props,
    groupedSourceNetworks,
    groupedTargetNetworks
  };
  describe('when removing a target network', () => {
    const nodeToRemove = {
      ...targetNetworkOne,
      nodes: sourceNetworkOne
    };
    const nodeShouldRemain = {
      ...targetNetworkTwo,
      nodes: sourceNetworkTwo
    };
    test('it also removes all of the mapped source networks', () => {
      const networksStepMapping = {
        ...targetCluster,
        nodes: [nodeToRemove, nodeShouldRemain]
      };
      input = {
        ...input,
        value: [networksStepMapping]
      };
      const wrapper = shallow(<NetworksStepForm {...props} input={input} />);

      wrapper.find('MappingWizardTreeView').prop('selectNode')(nodeToRemove);
      wrapper.find('MappingWizardTreeView').prop('removeNode')();

      expect(input.onChange).toHaveBeenLastCalledWith([
        {
          ...targetCluster,
          nodes: [nodeShouldRemain]
        }
      ]);
    });

    test('it removes the entire networks step mapping if no target networks remain', () => {
      const networksStepMapping = {
        ...targetCluster,
        nodes: [nodeToRemove]
      };
      input = {
        ...input,
        value: [networksStepMapping]
      };
      const wrapper = shallow(<NetworksStepForm {...props} input={input} />);

      wrapper.find('MappingWizardTreeView').prop('selectNode')(nodeToRemove);
      wrapper.find('MappingWizardTreeView').prop('removeNode')();

      expect(input.onChange).toHaveBeenLastCalledWith([]);
    });
  });

  describe('when removing a source network', () => {
    const [groupRepresentative] = sourceNetworkOne;

    test('it removes the entire source network grouping', () => {
      const networksStepMapping = {
        ...targetCluster,
        nodes: [
          {
            ...targetNetworkOne,
            nodes: [...sourceNetworkOne, ...sourceNetworkTwo]
          }
        ]
      };
      input = {
        ...input,
        value: [networksStepMapping]
      };
      const wrapper = shallow(<NetworksStepForm {...props} input={input} />);

      wrapper.find('MappingWizardTreeView').prop('selectNode')(groupRepresentative);
      wrapper.find('MappingWizardTreeView').prop('removeNode')();

      expect(input.onChange).toHaveBeenLastCalledWith([
        {
          ...targetCluster,
          nodes: [
            {
              ...targetNetworkOne,
              nodes: sourceNetworkTwo
            }
          ]
        }
      ]);
    });

    test('it removes the entire networks mapping if no source networks remain', () => {
      const mappingToRemove = {
        ...targetNetworkOne,
        nodes: sourceNetworkOne
      };
      const mappingShouldRemain = {
        ...targetNetworkTwo,
        nodes: sourceNetworkTwo
      };
      const networksStepMapping = {
        ...targetCluster,
        nodes: [mappingToRemove, mappingShouldRemain]
      };
      input = {
        ...input,
        value: [networksStepMapping]
      };
      const wrapper = shallow(<NetworksStepForm input={input} />);

      wrapper.find('MappingWizardTreeView').prop('selectNode')(groupRepresentative);
      wrapper.find('MappingWizardTreeView').prop('removeNode')();

      expect(input.onChange).toHaveBeenLastCalledWith([
        {
          ...targetCluster,
          nodes: [mappingShouldRemain]
        }
      ]);
    });
  });
});
