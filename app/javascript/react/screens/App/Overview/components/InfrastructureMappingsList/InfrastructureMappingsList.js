import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { Button, Icon, ListView, Grid } from 'patternfly-react';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';
import { simplePluralize } from '../../../../../../common/helpers';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';
import DeleteInfrastructureMappingConfirmationModal from '../../components/DeleteInfrastructureMappingConfirmationModal/DeleteInfrastructureMappingConfirmationModal';
import MappingSource from './components/MappingSource';
import MappingTarget from './components/MappingTarget';
import { mapInfrastructureMappings } from './helpers';

class InfrastructureMappingsList extends React.Component {
  state = { transformationMappingsMutable: [] };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.transformationMappings === prevState.transformationMappings) {
      return null;
    }
    const mutableMappings = Immutable.asMutable(
      nextProps.transformationMappings,
      { deep: true }
    );

    mutableMappings.forEach((mapping, i) => {
      const existing = prevState.transformationMappingsMutable.find(
        m => m.id === mapping.id
      );
      if (existing) {
        mapping.expanded = existing.expanded || false;
        mapping.expandType = existing.expandType || null;
      }
    });
    return {
      transformationMappings: nextProps.transformationMappings,
      transformationMappingsMutable: mutableMappings
    };
  }

  sourceCount = (mapping, sourceType) =>
    [
      ...new Set(
        mapping
          .filter(item => item.source_type.toLowerCase() === sourceType)
          .map(item => item.source_id)
      )
    ].length;

  destinationCount = (mapping, destinationType) =>
    [
      ...new Set(
        mapping
          .filter(
            item => item.destination_type.toLowerCase() === destinationType
          )
          .map(item => item.destination_id)
      )
    ].length;

  clusterName = cluster =>
    `${cluster.v_parent_datacenter} \\ ${cluster.ext_management_system.name} ${
      cluster.name
    }`;

  toggleExpand = (mapping, key) => {
    if (key === mapping.expandType) {
      mapping.expanded = !mapping.expanded;
    } else {
      mapping.expanded = true;
      mapping.expandType = key;
    }
    this.setState({
      transformationMappingsMutable: this.state.transformationMappingsMutable
    });
  };
  closeExpand = mapping => {
    mapping.expanded = false;
    this.setState({
      transformationMappingsMutable: this.state.transformationMappingsMutable
    });
  };

  render() {
    const {
      clusters,
      networks,
      datastores,
      error,
      createInfraMappingClick,
      inProgressRequestsTransformationMappings,
      showDeleteConfirmationModalAction,
      setMappingToDeleteAction,
      showDeleteConfirmationModal,
      hideDeleteConfirmationModalAction,
      mappingToDelete,
      yesToDeleteInfrastructureMappingAction,
      notStartedTransformationPlans,
      finishedWithErrorTransformationPlans
    } = this.props;

    const { transformationMappingsMutable } = this.state;

    return (
      <React.Fragment>
        <Grid.Col
          xs={12}
          style={{
            paddingBottom: 100,
            height: '100%'
          }}
        >
          {transformationMappingsMutable.length > 0 ? (
            <React.Fragment>
              <div className="heading-with-link-container">
                <div className="pull-left">
                  <h3>{__('Infrastructure Mappings')}</h3>
                </div>
                <div className="pull-right">
                  {/** todo: create IconLink in patternfly-react * */}
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      createInfraMappingClick();
                    }}
                  >
                    <Icon type="pf" name="add-circle-o" />
                    {` `}
                    {__('Create Infrastructure Mapping')}
                  </a>
                </div>
              </div>

              {error ? (
                <OverviewEmptyState
                  title={__('Error loading mappings.')}
                  iconType="pf"
                  iconName="error-circle-o"
                  description={
                    <React.Fragment>
                      <span>
                        {__(
                          'There was an error loading Infrastructure Mappings.'
                        )}
                      </span>
                      <br />
                      <span>{__('Please refresh and try again.')}</span>
                    </React.Fragment>
                  }
                />
              ) : (
                <ListView
                  style={{ marginTop: 10 }}
                  className="infra-mappings-list-view"
                  id="infrastructure_mappings"
                >
                  {transformationMappingsMutable.map(mapping => {
                    const sourceClusterCount = this.sourceCount(
                      mapping.transformation_mapping_items,
                      'emscluster'
                    );
                    const targetClusterCount = this.destinationCount(
                      mapping.transformation_mapping_items,
                      'emscluster'
                    );
                    const sourceDatastoreCount = this.sourceCount(
                      mapping.transformation_mapping_items,
                      'storage'
                    );
                    const targetDatastoreCount = this.destinationCount(
                      mapping.transformation_mapping_items,
                      'storage'
                    );
                    const sourceLanCount = this.sourceCount(
                      mapping.transformation_mapping_items,
                      'lan'
                    );
                    const targetLanCount = this.destinationCount(
                      mapping.transformation_mapping_items,
                      'lan'
                    );
                    const associatedPlansCount =
                      mapping.service_templates &&
                      mapping.service_templates.length;

                    const {
                      targetClusters,
                      targetDatastores,
                      targetNetworks
                    } = mapInfrastructureMappings(
                      mapping.transformation_mapping_items,
                      clusters,
                      datastores,
                      networks
                    );

                    return (
                      <ListView.Item
                        key={mapping.id}
                        heading={mapping.name}
                        description={
                          <small>
                            {__('Completed: ')}
                            {formatDateTime(mapping.created_at)}
                          </small>
                        }
                        stacked
                        compoundExpand
                        compoundExpanded={mapping.expanded}
                        onCloseCompoundExpand={() => this.closeExpand(mapping)}
                        additionalInfo={[
                          <ListView.InfoItem key={0}>
                            <ListView.Expand
                              expanded={
                                mapping.expanded && mapping.expandType === 0
                              }
                              toggleExpanded={() => {
                                this.toggleExpand(mapping, 0);
                              }}
                            >
                              <Icon type="pf" name="network" />
                              <div className="mappings-expand-label-group">
                                <div className="mappings-expand-label">
                                  <strong>{sourceLanCount}</strong>
                                  {` `}
                                  {simplePluralize(
                                    sourceLanCount,
                                    __('Source Network'),
                                    __('Source Networks')
                                  )}
                                </div>
                                <div className="mappings-expand-label">
                                  <strong>{targetLanCount}</strong>
                                  {` `}
                                  {simplePluralize(
                                    targetLanCount,
                                    __('Target Network'),
                                    __('Target Networks')
                                  )}
                                </div>
                              </div>
                            </ListView.Expand>
                          </ListView.InfoItem>,
                          <ListView.InfoItem key={1}>
                            <ListView.Expand
                              expanded={
                                mapping.expanded && mapping.expandType === 1
                              }
                              toggleExpanded={() => {
                                this.toggleExpand(mapping, 1);
                              }}
                            >
                              <Icon type="fa" name="database" />
                              <div className="mappings-expand-label-group">
                                <div className="mappings-expand-label">
                                  <strong>{sourceDatastoreCount}</strong>
                                  {` `}
                                  {simplePluralize(
                                    sourceDatastoreCount,
                                    __('Source Datastore'),
                                    __('Source Datastores')
                                  )}
                                </div>
                                <div className="mappings-expand-label">
                                  <strong>{targetDatastoreCount}</strong>
                                  {` `}
                                  {simplePluralize(
                                    targetDatastoreCount,
                                    __('Target Datastore'),
                                    __('Target Datastores')
                                  )}
                                </div>
                              </div>
                            </ListView.Expand>
                          </ListView.InfoItem>,
                          <ListView.InfoItem key={2}>
                            <ListView.Expand
                              expanded={
                                mapping.expanded && mapping.expandType === 2
                              }
                              toggleExpanded={() => {
                                this.toggleExpand(mapping, 2);
                              }}
                            >
                              <Icon type="pf" name="cluster" />
                              <div className="mappings-expand-label-group">
                                <div className="mappings-expand-label">
                                  <strong>{sourceClusterCount}</strong>
                                  {` `}
                                  {simplePluralize(
                                    sourceClusterCount,
                                    __('Source Cluster'),
                                    __('Source Clusters')
                                  )}
                                </div>
                                <div className="mappings-expand-label">
                                  <strong>{targetClusterCount}</strong>
                                  {` `}
                                  {simplePluralize(
                                    targetClusterCount,
                                    __('Target Cluster'),
                                    __('Target Clusters')
                                  )}
                                </div>
                              </div>
                            </ListView.Expand>
                          </ListView.InfoItem>,
                          associatedPlansCount ? (
                            <ListView.InfoItem key={3}>
                              <ListView.Expand
                                expanded={
                                  mapping.expanded && mapping.expandType === 3
                                }
                                toggleExpanded={() => {
                                  this.toggleExpand(mapping, 3);
                                }}
                              >
                                <Icon type="pf" name="catalog" />
                                <strong>{associatedPlansCount}</strong>
                                {` `}
                                {simplePluralize(
                                  associatedPlansCount,
                                  __('Associated Plan'),
                                  __('Associated Plans')
                                )}
                              </ListView.Expand>
                            </ListView.InfoItem>
                          ) : null
                        ]}
                        actions={
                          inProgressRequestsTransformationMappings.find(
                            inProgressRequestsTransformationMapping =>
                              inProgressRequestsTransformationMapping ===
                              mapping.id
                          ) ? (
                            <Button bsStyle="link" disabled>
                              <Icon
                                type="pf"
                                className="delete-infra-mapping-icon-disabled"
                                name="delete"
                              />
                            </Button>
                          ) : (
                            <Button
                              bsStyle="link"
                              onClick={e => {
                                e.stopPropagation();
                                setMappingToDeleteAction(mapping);
                                showDeleteConfirmationModalAction();
                              }}
                            >
                              <Icon type="pf" name="delete" />
                            </Button>
                          )
                        }
                      >
                        <Grid.Row>
                          <Grid.Col sm={12}>
                            {mapping.expandType === 0 && (
                              <React.Fragment>
                                <Grid.Row className="infra-mapping-header-row">
                                  <Grid.Col xs={6}>
                                    <b>{__('Source Networks')}</b>
                                  </Grid.Col>
                                  <Grid.Col xs={6}>
                                    <b>{__('Target Networks')}</b>
                                  </Grid.Col>
                                </Grid.Row>

                                {Object.keys(targetNetworks).map(key => {
                                  const mappedTarget = targetNetworks[key];
                                  return (
                                    <Grid.Row
                                      key={key}
                                      className="infra-mapping-networks-row"
                                    >
                                      <Grid.Col xs={6}>
                                        <MappingSource>
                                          {mappedTarget.sources.map(source => (
                                            <div key={source.sourceNetwork.id}>
                                              {this.clusterName(
                                                source.sourceCluster
                                              )}
                                              {` \\ ${
                                                source.sourceNetwork.name
                                              } `}
                                            </div>
                                          ))}
                                        </MappingSource>
                                      </Grid.Col>
                                      <Grid.Col xs={6}>
                                        <MappingTarget>
                                          {this.clusterName(
                                            mappedTarget.target.targetCluster
                                          )}
                                          {` \\ ${
                                            mappedTarget.target.targetNetwork
                                              .name
                                          } `}
                                        </MappingTarget>
                                      </Grid.Col>
                                    </Grid.Row>
                                  );
                                })}
                              </React.Fragment>
                            )}
                            {mapping.expandType === 1 && (
                              <React.Fragment>
                                <Grid.Row className="infra-mapping-header-row">
                                  <Grid.Col xs={6}>
                                    <b>{__('Source Datastores')}</b>
                                  </Grid.Col>
                                  <Grid.Col xs={6}>
                                    <b>{__('Target Datastores')}</b>
                                  </Grid.Col>
                                </Grid.Row>

                                {Object.keys(targetDatastores).map(key => {
                                  const mappedTarget = targetDatastores[key];
                                  return (
                                    <Grid.Row
                                      key={key}
                                      className="infra-mapping-datastores-row"
                                    >
                                      <Grid.Col xs={6}>
                                        <MappingSource>
                                          {mappedTarget.sources.map(source => (
                                            <div
                                              key={source.sourceDatastore.id}
                                            >
                                              {this.clusterName(
                                                source.sourceCluster
                                              )}
                                              {` \\ ${
                                                source.sourceDatastore.name
                                              } `}
                                            </div>
                                          ))}
                                        </MappingSource>
                                      </Grid.Col>
                                      <Grid.Col xs={6}>
                                        <MappingTarget>
                                          {this.clusterName(
                                            mappedTarget.target.targetCluster
                                          )}
                                          {` \\ ${
                                            mappedTarget.target.targetDatastore
                                              .name
                                          } `}
                                        </MappingTarget>
                                      </Grid.Col>
                                    </Grid.Row>
                                  );
                                })}
                              </React.Fragment>
                            )}
                            {mapping.expandType === 2 && (
                              <React.Fragment>
                                <Grid.Row className="infra-mapping-header-row">
                                  <Grid.Col xs={6}>
                                    <b>{__('Source Clusters')}</b>
                                  </Grid.Col>
                                  <Grid.Col xs={6}>
                                    <b>{__('Target Clusters')}</b>
                                  </Grid.Col>
                                </Grid.Row>

                                {Object.keys(targetClusters).map(key => {
                                  const target = targetClusters[key];
                                  return (
                                    <Grid.Row
                                      key={key}
                                      className="infra-mapping-clusters-row"
                                    >
                                      <Grid.Col xs={6}>
                                        <MappingSource>
                                          {target.sourceClusters.map(source => (
                                            <div key={source.id}>
                                              {this.clusterName(source)}
                                            </div>
                                          ))}
                                        </MappingSource>
                                      </Grid.Col>
                                      <Grid.Col xs={6}>
                                        <MappingTarget>
                                          {this.clusterName(
                                            target.targetCluster
                                          )}
                                        </MappingTarget>
                                      </Grid.Col>
                                    </Grid.Row>
                                  );
                                })}
                              </React.Fragment>
                            )}
                            {mapping.expandType === 3 && (
                              <React.Fragment>
                                <Grid.Row>
                                  <Grid.Col xs={12}>
                                    <b>
                                      {__('Infrastructure Mapping Description')}
                                    </b>
                                  </Grid.Col>
                                </Grid.Row>
                                <Grid.Row>
                                  <Grid.Col xs={12}>
                                    {mapping.description}
                                  </Grid.Col>
                                </Grid.Row>
                                <br />
                                <Grid.Row>
                                  <Grid.Col xs={12}>
                                    <b>{__('Associated Plans')}</b>
                                  </Grid.Col>
                                </Grid.Row>
                                <Grid.Row className="infra-mapping-associated-plans-row">
                                  <Grid.Col xs={12}>
                                    {' '}
                                    {associatedPlansCount > 0
                                      ? mapping.service_templates.map(
                                          (plan, id) => (
                                            <div key={id}>
                                              <span>{plan.name}</span>
                                              {` `}
                                              {` `}
                                            </div>
                                          )
                                        )
                                      : null}
                                  </Grid.Col>
                                </Grid.Row>
                              </React.Fragment>
                            )}
                          </Grid.Col>
                        </Grid.Row>
                      </ListView.Item>
                    );
                  })}
                </ListView>
              )}
            </React.Fragment>
          ) : (
            <OverviewEmptyState
              showWizardAction={createInfraMappingClick}
              description={__(
                'Create an infrastructure mapping to later be used by a migration plan.'
              )}
              buttonText={__('Create Infrastructure Mapping')}
            />
          )}
        </Grid.Col>
        <DeleteInfrastructureMappingConfirmationModal
          showDeleteConfirmationModal={showDeleteConfirmationModal}
          hideDeleteConfirmationModalAction={hideDeleteConfirmationModalAction}
          mappingToDelete={mappingToDelete}
          yesToDeleteInfrastructureMappingAction={
            yesToDeleteInfrastructureMappingAction
          }
          notStartedTransformationPlans={notStartedTransformationPlans}
          finishedWithErrorTransformationPlans={
            finishedWithErrorTransformationPlans
          }
        />
      </React.Fragment>
    );
  }
}

InfrastructureMappingsList.propTypes = {
  clusters: PropTypes.array,
  datastores: PropTypes.array,
  networks: PropTypes.array,
  transformationMappings: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  error: PropTypes.bool,
  createInfraMappingClick: PropTypes.func,
  inProgressRequestsTransformationMappings: PropTypes.array,
  showDeleteConfirmationModalAction: PropTypes.func,
  setMappingToDeleteAction: PropTypes.func,
  showDeleteConfirmationModal: PropTypes.bool,
  hideDeleteConfirmationModalAction: PropTypes.func,
  mappingToDelete: PropTypes.object,
  yesToDeleteInfrastructureMappingAction: PropTypes.func,
  notStartedTransformationPlans: PropTypes.array,
  finishedWithErrorTransformationPlans: PropTypes.array
};

export default InfrastructureMappingsList;
