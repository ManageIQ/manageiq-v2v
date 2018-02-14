import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';

class MappingWizardClustersStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTargetCluster: null, // eslint-disable-line react/no-unused-state
      selectedSourceClusters: [], // eslint-disable-line react/no-unused-state
      mappings: [], // eslint-disable-line react/no-unused-state
      selectedMapping: null // eslint-disable-line react/no-unused-state
    };
  }

  componentDidMount() {
    const {
      fetchSourceClustersUrl,
      fetchSourceClustersAction,
      fetchTargetClustersUrl,
      fetchTargetClustersAction
    } = this.props;

    fetchSourceClustersAction(fetchSourceClustersUrl);
    fetchTargetClustersAction(fetchTargetClustersUrl);
  }

  render() {
    const {
      isFetchingSourceClusters,
      sourceClusters,
      isFetchingTargetClusters,
      targetClusters
    } = this.props;

    if (!isFetchingSourceClusters && !isFetchingTargetClusters) {
      return (
        <div>
          <p>Source Clusters</p>
          {sourceClusters.map(cluster => (
            <div key={cluster.id}>
              <span>
                <b>Name</b>: {cluster.name} &nbsp;
              </span>
              <span>
                <b>ID</b>: {cluster.id} &nbsp;
              </span>
            </div>
          ))}
          <br />
          <p>Target Clusters</p>
          {targetClusters.map(cluster => (
            <div key={cluster.id}>
              <span>
                <b>Name</b>: {cluster.name} &nbsp;
              </span>
              <span>
                <b>ID</b>: {cluster.id} &nbsp;
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }
}

MappingWizardClustersStep.propTypes = {
  fetchSourceClustersUrl: PropTypes.string,
  fetchSourceClustersAction: PropTypes.func,
  fetchTargetClustersUrl: PropTypes.string,
  fetchTargetClustersAction: PropTypes.func,
  sourceClusters: PropTypes.arrayOf(PropTypes.object),
  targetClusters: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceClusters: PropTypes.bool,
  isFetchingTargetClusters: PropTypes.bool
};
MappingWizardClustersStep.defaultProps = {
  fetchSourceClustersUrl: '',
  fetchSourceClustersAction: noop,
  fetchTargetClustersUrl: '',
  fetchTargetClustersAction: noop,
  isFetchingSourceClusters: true,
  isFetchingTargetClusters: true
};

export default MappingWizardClustersStep;
