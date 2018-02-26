import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods } from 'patternfly-react';
import { connect } from 'react-redux';

class ModalWizardStateProvider extends React.Component {
  constructor() {
    super();
    this.state = { activeStepIndex: 0 };
    bindMethods(this, ['prevStep', 'nextStep', 'goToStep']);
  }

  prevStep() {
    const { activeStepIndex } = this.state;
    this.setState({ activeStepIndex: Math.max(activeStepIndex - 1, 0) });
  }

  nextStep() {
    const { numSteps, children, form } = this.props;
    const { activeStepIndex } = this.state;

    if (
      children.props.title === 'Infrastructure Mapping Wizard' &&
      activeStepIndex === 3
    ) {
      const clustersUrlRegEx = /\/api\/clusters\/\d{1,}/;
      const clusterTransformationMappings = form.mappingWizardClustersStep.values.clusterMappings.reduce(
        (clusterTransformationsArray, targetClusterWithSourceClusters) => {
          const destination = targetClusterWithSourceClusters.href.match(
            clustersUrlRegEx
          )[0];
          const transformations = targetClusterWithSourceClusters.nodes.reduce(
            (clusterTransformations, sourceCluster) => {
              return clusterTransformations.concat({
                source: sourceCluster.href.match(clustersUrlRegEx)[0],
                destination
              });
            },
            []
          );
          return clusterTransformationsArray.concat(transformations);
        },
        []
      );

      const datastoresUrlRegEx = /\/api\/data_stores\/\d{1,}/;
      const datastoreTransformationMappings = form.mappingWizardDatastoresStep.values.datastoresMappings.reduce(
        (
          datastoreTransformationsPerTargetCluster,
          targetClusterWithDatastoreMappings
        ) => {
          const datastoreTransformationsForTargetCluster = targetClusterWithDatastoreMappings.nodes.reduce(
            (
              datastoreTransformationsPerDatastoreMapping,
              targetDatastoreWithSourceDatastores
            ) => {
              const datastoreTransformations = targetDatastoreWithSourceDatastores.nodes.reduce(
                (transformations, sourceDatastore) => {
                  return transformations.concat({
                    source: sourceDatastore.href.match(datastoresUrlRegEx)[0],
                    destination: targetDatastoreWithSourceDatastores.href.match(
                      datastoresUrlRegEx
                    )[0]
                  });
                },
                []
              );
              return datastoreTransformationsPerDatastoreMapping.concat(
                datastoreTransformations
              );
            },
            []
          );
          return datastoreTransformationsPerTargetCluster.concat(
            datastoreTransformationsForTargetCluster
          );
        },
        []
      );

      const networksUrlRegEx = /\/api\/lans\/\d{1,}/;
      const networkTransformationMappings = form.mappingWizardNetworksStep.values.networksMappings.reduce(
        (
          networkTransformationsPerTargetCluster,
          targetClusterWithNetworkMappings
        ) => {
          const networkTransformationsForTargetCluster = targetClusterWithNetworkMappings.nodes.reduce(
            (
              networkTransformationsPerNetworkMapping,
              targetNetworkWithSourceNetworks
            ) => {
              const networkTransformations = targetNetworkWithSourceNetworks.nodes.reduce(
                (transformations, sourceNetwork) => {
                  return transformations.concat({
                    source: sourceNetwork.href.match(networksUrlRegEx)[0],
                    destination: targetNetworkWithSourceNetworks.href.match(
                      networksUrlRegEx
                    )[0]
                  });
                },
                []
              );
              return networkTransformationsPerNetworkMapping.concat(
                networkTransformations
              );
            },
            []
          );
          return networkTransformationsPerTargetCluster.concat(
            networkTransformationsForTargetCluster
          );
        },
        []
      );

      const transformationsBody = {
        name: 'new transformations mapping',
        description: 'clusters to clusters',
        state: 'draft',
        transformation_mapping_items: [
          ...clusterTransformationMappings,
          ...datastoreTransformationMappings,
          ...networkTransformationMappings
        ]
      };

      console.log(JSON.stringify(transformationsBody));
    }

    this.setState({
      activeStepIndex: Math.min(activeStepIndex + 1, numSteps - 1)
    });
  }

  goToStep(activeStepIndex) {
    this.setState({ activeStepIndex });
  }

  render() {
    const { numSteps, children } = this.props;
    const { activeStepIndex } = this.state;
    const activeStep = (activeStepIndex + 1).toString();
    return (
      <React.Fragment>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            numSteps,
            activeStepIndex,
            activeStep,
            onBack: this.prevStep,
            onNext: this.nextStep,
            goToStep: this.goToStep
          })
        )}
      </React.Fragment>
    );
  }
}

ModalWizardStateProvider.propTypes = {
  numSteps: PropTypes.number,
  children: PropTypes.node
};

ModalWizardStateProvider.defaultProps = {
  numSteps: 1,
  children: null
};

const mapStateToProps = ({ form }) => ({ form });

export default connect(mapStateToProps)(ModalWizardStateProvider);
