import React from 'react';
import { shallow } from 'enzyme';

import NetworksStepForm from '../NetworksStepForm';
import { groupByUidEms } from '../../../MappingWizardNetworksStepSelectors';

import {
  clustersMappingWithTreeViewAttrs,
  targetNetworkWithTreeViewAttrs,
  networkGroupingForRep
} from '../helpers';

import {
  sourceNetworks,
  targetNetworks,
  sourceCluster,
  networkGrouping,
  clustersMapping
} from '../networksStepForm.fixtures';

describe('#addNetworkMapping', () => {
  const props = {
    isFetchingSourceNetworks: false,
    isFetchingTargetNetworks: false,
    selectedCluster: sourceCluster,
    selectedClusterMapping: clustersMapping
  };

  describe('maps a network grouping to the selected target network', () => {
    describe('when a mapping does not exist for the target network', () => {
      test('and there is no mapping for the target cluster', () => {
        const input = {
          value: [],
          onChange: jest.fn()
        };
        const [targetNetworkToMap] = targetNetworks;
        const wrapper = shallow(
          <NetworksStepForm
            {...props}
            input={input}
            groupedSourceNetworks={groupByUidEms(networkGrouping)}
            targetNetworks={[targetNetworkToMap]}
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
                nodes: networkGroupingForRep(
                  networkGroupRep,
                  groupByUidEms(networkGrouping),
                  props.selectedCluster
                )
              }
            ]
          }
        ]);
      });

      test('and there already exists a mapping for the target cluster', () => {
        const [mappedTargetNetwork, targetNetworkToMap] = targetNetworks;
        const [, , mappedSourceNetwork] = sourceNetworks;
        const srcNetworks = [...networkGrouping, mappedSourceNetwork];
        const groupedNetworks = groupByUidEms(srcNetworks);
        const networksStepMapping = {
          ...clustersMappingWithTreeViewAttrs(clustersMapping),
          nodes: [
            {
              ...targetNetworkWithTreeViewAttrs(mappedTargetNetwork),
              nodes: networkGroupingForRep(
                sourceNetworks[2],
                groupedNetworks,
                props.selectedCluster
              )
            }
          ]
        };
        const input = {
          value: [networksStepMapping],
          onChange: jest.fn()
        };
        const wrapper = shallow(
          <NetworksStepForm
            {...props}
            input={input}
            groupedSourceNetworks={groupByUidEms(srcNetworks)}
            targetNetworks={[mappedTargetNetwork, targetNetworkToMap]}
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
                nodes: networkGroupingForRep(
                  networkGroupRep,
                  groupedNetworks,
                  props.selectedCluster
                )
              }
            ]
          }
        ]);
      });
    });

    test('when a mapping exists for the target network', () => {
      const [mappedTargetNetwork] = targetNetworks;
      const [, , mappedSourceNetwork] = sourceNetworks;
      const srcNetworks = [...networkGrouping, mappedSourceNetwork];
      const groupedNetworks = groupByUidEms(srcNetworks);
      const networksStepMapping = {
        ...clustersMappingWithTreeViewAttrs(clustersMapping),
        nodes: [
          {
            ...targetNetworkWithTreeViewAttrs(mappedTargetNetwork),
            nodes: networkGroupingForRep(
              sourceNetworks[2],
              groupedNetworks,
              sourceCluster
            )
          }
        ]
      };
      const input = {
        value: [networksStepMapping],
        onChange: jest.fn()
      };

      const wrapper = shallow(
        <NetworksStepForm
          {...props}
          input={input}
          groupedSourceNetworks={groupByUidEms(srcNetworks)}
          targetNetworks={[mappedTargetNetwork]}
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
                ...networkGroupingForRep(
                  networkGroupRep,
                  groupedNetworks,
                  props.selectedCluster
                )
              ]
            }
          ]
        }
      ]);
    });
  });
});
