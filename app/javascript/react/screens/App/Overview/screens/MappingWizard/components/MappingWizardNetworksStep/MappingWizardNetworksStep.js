import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, bindMethods } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';

// import DualPaneMapper from '../DualPaneMapper/DualPaneMapper';
// import DualPaneMapperList from '../DualPaneMapper/DualPaneMapperList';
// import DualPaneMapperCount from '../DualPaneMapper/DualPaneMapperCount';
// import DualPaneMapperListItem from '../DualPaneMapper/DualPaneMapperListItem';

class MappingWizardNetworksStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCluster: null, // dropdown selected cluster
      selectedTargetNetwork: null, // eslint-disable-line react/no-unused-state
      selectedSourceNetwork: [], // eslint-disable-line react/no-unused-state
      networkMappings: [], // eslint-disable-line react/no-unused-state
      selectedNetworkMapping: null // eslint-disable-line react/no-unused-state
    };

    bindMethods(this, ['selectSourceNetwork']);
  }

  componentDidMount() {}

  selectSourceNetwork(sourceClusterId, targetClusterId) {
    const {
      fetchNetworksUrl,
      fetchSourceNetworksAction,
      fetchTargetNetworksAction
    } = this.props;
    fetchSourceNetworksAction(fetchNetworksUrl, sourceClusterId);
    fetchTargetNetworksAction(fetchNetworksUrl, targetClusterId);
  }

  render() {
    const {
      // todo: inject the mapped clusters from MappingWizardClustersStep as props here
      clusterMappings, // eslint-disable-line no-unused-vars
      isFetchingSourceNetworks, // eslint-disable-line no-unused-vars
      isRejectedSourceNetworks, // eslint-disable-line no-unused-vars
      isFetchingTargetNetworks, // eslint-disable-line no-unused-vars
      isRejectedTargetNetworks, // eslint-disable-line no-unused-vars
      // source/target networks change depending on selection
      sourceNetworks, // eslint-disable-line no-unused-vars
      targetNetworks // eslint-disable-line no-unused-vars
    } = this.props;

    const {
      selectedCluster, // eslint-disable-line no-unused-vars
      selectedTargetNetwork, // eslint-disable-line no-unused-vars
      selectedSourceNetwork, // eslint-disable-line no-unused-vars
      networkMappings, // eslint-disable-line no-unused-vars
      selectedNetworkMapping // eslint-disable-line no-unused-vars
    } = this.state;

    // first we render the dropdown selection for each source cluster in clusterMappings,
    // then we call `selectSourceNetwork` and go get that cluster's networks on selection

    // todo: change this Button to the source cluster populated Dropdown
    return (
      <div>
        <Button onClick={() => this.selectSourceNetwork('10000000000001')}>
          Fetch Networks
        </Button>
        {sourceNetworks.length > 0 &&
          !isFetchingSourceNetworks && (
            <div>
              {' '}
              <h4>Source Networks</h4>
              {sourceNetworks.map(lan => (
                <div>
                  <span>{lan.id}</span>
                  &nbsp;
                  <span>{lan.name}</span>
                  &nbsp;
                  <span>{lan.lan_type}</span>
                  &nbsp;
                </div>
              ))}
            </div>
          )}
        {targetNetworks.length > 0 &&
          !isFetchingTargetNetworks && (
            <div>
              {' '}
              <h4>Target Networks</h4>
              {targetNetworks.map(lan => (
                <div>
                  <span>{lan.id}</span>
                  &nbsp;
                  <span>{lan.name}</span>
                  &nbsp;
                  <span>{lan.lan_type}</span>
                  &nbsp;
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

MappingWizardNetworksStep.propTypes = {
  clusterMappings: PropTypes.array,
  fetchNetworksUrl: PropTypes.string,
  fetchSourceNetworksAction: PropTypes.func,
  fetchTargetNetworksAction: PropTypes.func,
  sourceNetworks: PropTypes.arrayOf(PropTypes.object),
  targetNetworks: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceNetworks: PropTypes.bool,
  isRejectedSourceNetworks: PropTypes.bool,
  isFetchingTargetNetworks: PropTypes.bool,
  isRejectedTargetNetworks: PropTypes.bool
  // removeTargetNetwork: PropTypes.func,
  // removeSourceNetwork: PropTypes.func,
  // addTargetNetwork: PropTypes.func,
  // addSourceNetwork: PropTypes.func
};
MappingWizardNetworksStep.defaultProps = {
  clusterMappings: [],
  fetchNetworksUrl: '',
  fetchSourceNetworksAction: noop,
  fetchTargetNetworksAction: noop,
  sourceNetworks: [],
  targetNetworks: [],
  isFetchingSourceNetworks: false,
  isRejectedSourceNetworks: false,
  isFetchingTargetNetworks: false,
  isRejectedTargetNetworks: false

  // removeTargetNetwork: noop,
  // removeSourceNetwork: noop,
  // addTargetNetwork: noop,
  // addSourceNetwork: noop
};

export default reduxForm({
  form: 'mappingWizardNetworksStep',
  initialValues: { networksMappings: [] },
  destroyOnUnmount: false
})(MappingWizardNetworksStep);
