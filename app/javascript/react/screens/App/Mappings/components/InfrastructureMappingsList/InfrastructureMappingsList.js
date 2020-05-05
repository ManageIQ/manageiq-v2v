import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import { Button, Icon, ListView, Grid, Toolbar, OverlayTrigger, Popover } from 'patternfly-react';

import { formatDateTime } from '../../../../../../components/dates/MomentDate';
import ShowWizardEmptyState from '../../../common/ShowWizardEmptyState/ShowWizardEmptyState';
import DeleteInfrastructureMappingConfirmationModal from '../DeleteInfrastructureMappingConfirmationModal/DeleteInfrastructureMappingConfirmationModal';
import MappingSource from './components/MappingSource';
import MappingTarget from './components/MappingTarget';
import { mapInfrastructureMappings, getHeaderText } from './helpers';
import ListViewToolbar from '../../../common/ListViewToolbar/ListViewToolbar';
import { INFRA_MAPPINGS_FILTER_TYPES, INFRA_MAPPINGS_SORT_FIELDS } from './InfrastructureMappingsListConstants';

class InfrastructureMappingsList extends React.Component {
  state = { transformationMappingsMutable: [] };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.transformationMappings === prevState.transformationMappings) {
      return null;
    }
    const mutableMappings = Immutable.asMutable(nextProps.transformationMappings, { deep: true });

    mutableMappings.forEach((mapping, i) => {
      const existing = prevState.transformationMappingsMutable.find(m => m.id === mapping.id);
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

  clusterName = cluster =>
    cluster.v_parent_datacenter
      ? `${cluster.ext_management_system.name} \\ ${cluster.v_parent_datacenter} \\ ${cluster.name}`
      : `${cluster.ext_management_system.name} \\ ${cluster.name}`;

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

  renderEmptyState = () => (
    <ShowWizardEmptyState
      showWizardAction={this.props.createInfraMappingClick}
      description={__('Create an infrastructure mapping to later be used by a migration plan')}
      buttonText={__('Create Infrastructure Mapping')}
      className="white-bg"
    />
  );

  renderHeadingWithLink = () => (
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
            this.props.createInfraMappingClick();
          }}
        >
          <Icon type="pf" name="add-circle-o" />
          {` `}
          {__('Create Infrastructure Mapping')}
        </a>
      </div>
    </div>
  );

  renderMappingErrorsPopoverIcon = (mapping, resourceType) => (
    <OverlayTrigger
      rootClose
      trigger="click"
      placement="top"
      overlay={
        <Popover id={`error-popover-${mapping.name}-${resourceType}`} style={{ width: 400 }}>
          {__('Missing elements may indicate a change in your provider configuration. If you change the source or target provider, delete this mapping and create a new one.') /* prettier-ignore */}
        </Popover>
      }
    >
      <Icon type="pf" name="error-circle-o" />
    </OverlayTrigger>
  );

  render() {
    const {
      clusters,
      networks,
      datastores,
      cloudTenants,
      cloudNetworks,
      cloudVolumeTypes,
      error,
      inProgressRequestsTransformationMappings,
      showDeleteConfirmationModalAction,
      setMappingToDeleteAction,
      showDeleteConfirmationModal,
      hideDeleteConfirmationModalAction,
      mappingToDelete,
      yesToDeleteInfrastructureMappingAction,
      notStartedTransformationPlans,
      finishedWithErrorTransformationPlans,
      showMappingWizardEditModeAction
    } = this.props;

    const { transformationMappingsMutable } = this.state;

    return (
      <React.Fragment>
        <ListViewToolbar
          filterTypes={INFRA_MAPPINGS_FILTER_TYPES}
          sortFields={INFRA_MAPPINGS_SORT_FIELDS}
          listItems={transformationMappingsMutable}
        >
          {({
            filteredSortedPaginatedListItems,
            renderFilterControls,
            renderSortControls,
            renderActiveFilters,
            renderPaginationRow
          }) =>
            error ? (
              <ShowWizardEmptyState
                title={__('Error loading mappings.')}
                iconType="pf"
                iconName="error-circle-o"
                className="white-bg"
                description={
                  <React.Fragment>
                    <span>{__('There was an error loading Infrastructure Mappings.')}</span>
                    <br />
                    <span>{__('Please refresh and try again.')}</span>
                  </React.Fragment>
                }
              />
            ) : transformationMappingsMutable.length > 0 ? (
              <React.Fragment>
                <Grid.Row>
                  <Toolbar>
                    {renderFilterControls()}
                    {renderSortControls()}
                    {!error && (
                      <Toolbar.RightContent>
                        <a
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            this.props.createInfraMappingClick();
                          }}
                        >
                          <Icon type="pf" name="add-circle-o" />
                          {` `}
                          {__('Create Infrastructure Mapping')}
                        </a>
                      </Toolbar.RightContent>
                    )}
                    {renderActiveFilters(filteredSortedPaginatedListItems)}
                  </Toolbar>
                </Grid.Row>
                <div className="main-body-content">
                  <ListView style={{ marginTop: 10 }} className="infra-mappings-list-view" id="infrastructure_mappings">
                    {filteredSortedPaginatedListItems.items.map(mapping => {
                      const associatedPlansCount = mapping.service_templates && mapping.service_templates.length;

                      const { targetClusters, targetDatastores, targetNetworks } = mapInfrastructureMappings(
                        mapping.transformation_mapping_items,
                        clusters,
                        datastores,
                        networks,
                        cloudTenants,
                        cloudNetworks,
                        cloudVolumeTypes
                      );
                      const headerText = getHeaderText(mapping.transformation_mapping_items);

                      let sourceClusterCount = 0;
                      let targetClusterCount = 0;

                      if (targetClusters) {
                        Object.keys(targetClusters).forEach(key => {
                          targetClusterCount += 1;
                          sourceClusterCount += targetClusters[key].sourceClusters.length;
                        });
                      }

                      let sourceDatastoreCount = 0;
                      let targetDatastoreCount = 0;
                      if (targetDatastores) {
                        Object.keys(targetDatastores).forEach(key => {
                          targetDatastoreCount += 1;
                          sourceDatastoreCount += targetDatastores[key].sources.length;
                        });
                      }

                      let sourceLanCount = 0;
                      let targetLanCount = 0;
                      if (targetNetworks) {
                        Object.keys(targetNetworks).forEach(key => {
                          targetLanCount += 1;
                          sourceLanCount += targetNetworks[key].sources.length;
                        });
                      }

                      return (
                        <ListView.Item
                          key={mapping.id}
                          heading={mapping.name}
                          description={
                            <EllipsisWithTooltip id={mapping.description}>
                              <small>{mapping.description}</small>
                            </EllipsisWithTooltip>
                          }
                          stacked
                          compoundExpand
                          compoundExpanded={mapping.expanded}
                          onCloseCompoundExpand={() => this.closeExpand(mapping)}
                          additionalInfo={[
                            <ListView.InfoItem key={0} id="networks">
                              {targetNetworks === null ? (
                                <div className="list-view-pf-expand">
                                  {this.renderMappingErrorsPopoverIcon(mapping, 'networks')}
                                  {__('Networks missing')}
                                </div>
                              ) : (
                                <ListView.Expand
                                  expanded={mapping.expanded && mapping.expandType === 0}
                                  toggleExpanded={() => {
                                    this.toggleExpand(mapping, 0);
                                  }}
                                >
                                  <Icon type="pf" name="network" />
                                  <div className="mappings-expand-label-group">
                                    <div className="mappings-expand-label">
                                      {sprintf(
                                        n__('%d Source Network', '%d Source Networks', sourceLanCount),
                                        sourceLanCount
                                      )}
                                    </div>
                                    <div className="mappings-expand-label">
                                      {sprintf(
                                        n__('%d Target Network', '%d Target Networks', targetLanCount),
                                        targetLanCount
                                      )}
                                    </div>
                                  </div>
                                </ListView.Expand>
                              )}
                            </ListView.InfoItem>,
                            <ListView.InfoItem key={1} id="datastores">
                              {targetDatastores === null ? (
                                <div className="list-view-pf-expand">
                                  {this.renderMappingErrorsPopoverIcon(mapping, 'datastores')}
                                  {__('Datastores missing')}
                                </div>
                              ) : (
                                <ListView.Expand
                                  expanded={mapping.expanded && mapping.expandType === 1}
                                  toggleExpanded={() => {
                                    this.toggleExpand(mapping, 1);
                                  }}
                                >
                                  <Icon type="fa" name="database" />
                                  <div className="mappings-expand-label-group">
                                    <div className="mappings-expand-label">
                                      {sprintf(
                                        n__('%d Source Datastore', '%d Source Datastores', sourceDatastoreCount),
                                        sourceDatastoreCount
                                      )}
                                    </div>
                                    <div className="mappings-expand-label">
                                      {sprintf(
                                        n__('%d Target Datastore', '%d Target Datastores', targetDatastoreCount),
                                        targetDatastoreCount
                                      )}
                                    </div>
                                  </div>
                                </ListView.Expand>
                              )}
                            </ListView.InfoItem>,
                            <ListView.InfoItem key={2} id="clusters">
                              {targetClusters === null ? (
                                <div className="list-view-pf-expand">
                                  {this.renderMappingErrorsPopoverIcon(mapping, 'clusters')}
                                  {__('Clusters missing')}
                                </div>
                              ) : (
                                <ListView.Expand
                                  expanded={mapping.expanded && mapping.expandType === 2}
                                  toggleExpanded={() => {
                                    this.toggleExpand(mapping, 2);
                                  }}
                                >
                                  <Icon type="pf" name="cluster" />
                                  <div className="mappings-expand-label-group">
                                    <div className="mappings-expand-label">
                                      {sprintf(
                                        n__('%d Source Cluster', '%d Source Clusters', sourceClusterCount),
                                        sourceClusterCount
                                      )}
                                    </div>
                                    <div className="mappings-expand-label">
                                      {sprintf(
                                        n__('%d Target Cluster', '%d Target Clusters', targetClusterCount),
                                        targetClusterCount
                                      )}
                                    </div>
                                  </div>
                                </ListView.Expand>
                              )}
                            </ListView.InfoItem>,
                            associatedPlansCount ? (
                              <ListView.InfoItem key={3} id="associated-plans">
                                <ListView.Expand
                                  expanded={mapping.expanded && mapping.expandType === 3}
                                  toggleExpanded={() => {
                                    this.toggleExpand(mapping, 3);
                                  }}
                                >
                                  <Icon type="pf" name="catalog" />
                                  {sprintf(
                                    n__('%d Associated Plan', '%d Associated Plans', associatedPlansCount),
                                    associatedPlansCount
                                  )}
                                </ListView.Expand>
                              </ListView.InfoItem>
                            ) : null
                          ]}
                          actions={
                            <div>
                              <Button
                                bsStyle="link"
                                disabled={
                                  !!associatedPlansCount || !targetClusters || !targetDatastores || !targetNetworks
                                }
                                onClick={e => {
                                  e.stopPropagation();
                                  showMappingWizardEditModeAction(mapping);
                                }}
                              >
                                <Icon type="pf" name="edit" />
                              </Button>
                              {inProgressRequestsTransformationMappings.find(
                                inProgressRequestsTransformationMapping =>
                                  inProgressRequestsTransformationMapping === mapping.id
                              ) ? (
                                <Button bsStyle="link" disabled>
                                  <Icon type="pf" className="delete-infra-mapping-icon-disabled" name="delete" />
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
                              )}
                            </div>
                          }
                        >
                          <Grid.Row>
                            <Grid.Col sm={12}>
                              {mapping.expandType === 0 && (
                                <React.Fragment>
                                  <Grid.Row className="infra-mapping-header-row">
                                    <Grid.Col xs={6}>
                                      <b>{headerText.sourceNetworks}</b>
                                    </Grid.Col>
                                    <Grid.Col xs={6}>
                                      <b>{headerText.targetNetworks}</b>
                                    </Grid.Col>
                                  </Grid.Row>

                                  {Object.keys(targetNetworks).map(key => {
                                    const mappedTarget = targetNetworks[key];
                                    return (
                                      <Grid.Row key={key} className="infra-mapping-networks-row">
                                        <Grid.Col xs={6}>
                                          <MappingSource>
                                            {mappedTarget.sources.map(source => (
                                              <div key={source.sourceNetwork.id}>
                                                {this.clusterName(source.sourceCluster)}
                                                {` \\ ${source.sourceNetwork.name} `}
                                              </div>
                                            ))}
                                          </MappingSource>
                                        </Grid.Col>
                                        <Grid.Col xs={6}>
                                          <MappingTarget>
                                            {this.clusterName(mappedTarget.target.targetCluster)}
                                            {` \\ ${mappedTarget.target.targetNetwork.name} `}
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
                                      <b>{headerText.sourceDatastores}</b>
                                    </Grid.Col>
                                    <Grid.Col xs={6}>
                                      <b>{headerText.targetDatastores}</b>
                                    </Grid.Col>
                                  </Grid.Row>

                                  {Object.keys(targetDatastores).map(key => {
                                    const mappedTarget = targetDatastores[key];
                                    return (
                                      <Grid.Row key={key} className="infra-mapping-datastores-row">
                                        <Grid.Col xs={6}>
                                          <MappingSource>
                                            {mappedTarget.sources.map(source => (
                                              <div key={source.sourceDatastore.id}>
                                                {this.clusterName(source.sourceCluster)}
                                                {` \\ ${source.sourceDatastore.name} `}
                                              </div>
                                            ))}
                                          </MappingSource>
                                        </Grid.Col>
                                        <Grid.Col xs={6}>
                                          <MappingTarget>
                                            {this.clusterName(mappedTarget.target.targetCluster)}
                                            {` \\ ${mappedTarget.target.targetDatastore.name} `}
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
                                      <b>{headerText.sourceClusters}</b>
                                    </Grid.Col>
                                    <Grid.Col xs={6}>
                                      <b>{headerText.targetClusters}</b>
                                    </Grid.Col>
                                  </Grid.Row>

                                  {Object.keys(targetClusters).map(key => {
                                    const target = targetClusters[key];
                                    return (
                                      <Grid.Row key={key} className="infra-mapping-clusters-row">
                                        <Grid.Col xs={6}>
                                          <MappingSource>
                                            {target.sourceClusters.map(source => (
                                              <div key={source.id}>{this.clusterName(source)}</div>
                                            ))}
                                          </MappingSource>
                                        </Grid.Col>
                                        <Grid.Col xs={6}>
                                          <MappingTarget>{this.clusterName(target.targetCluster)}</MappingTarget>
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
                                      <b>{__('Created:')}</b>
                                      {` `}
                                      {formatDateTime(mapping.created_at)}
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
                                        ? mapping.service_templates.map((plan, id) => (
                                            <div key={id}>
                                              <span>{plan.name}</span>
                                              {` `}
                                              {` `}
                                            </div>
                                          ))
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
                  {renderPaginationRow(filteredSortedPaginatedListItems)}
                </div>
              </React.Fragment>
            ) : (
              this.renderEmptyState()
            )
          }
        </ListViewToolbar>
        <DeleteInfrastructureMappingConfirmationModal
          showDeleteConfirmationModal={showDeleteConfirmationModal}
          hideDeleteConfirmationModalAction={hideDeleteConfirmationModalAction}
          mappingToDelete={mappingToDelete}
          yesToDeleteInfrastructureMappingAction={yesToDeleteInfrastructureMappingAction}
          notStartedTransformationPlans={notStartedTransformationPlans}
          finishedWithErrorTransformationPlans={finishedWithErrorTransformationPlans}
        />
      </React.Fragment>
    );
  }
}

InfrastructureMappingsList.propTypes = {
  clusters: PropTypes.array,
  datastores: PropTypes.array,
  networks: PropTypes.array,
  cloudTenants: PropTypes.array,
  cloudVolumeTypes: PropTypes.array,
  cloudNetworks: PropTypes.array,
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
  finishedWithErrorTransformationPlans: PropTypes.array,
  showMappingWizardEditModeAction: PropTypes.func
};

export default InfrastructureMappingsList;
