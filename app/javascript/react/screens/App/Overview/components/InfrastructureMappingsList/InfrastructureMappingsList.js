import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon, ListView, Grid } from 'patternfly-react';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';
import DeleteInfrastructureMappingConfirmationModal from '../../components/DeleteInfrastructureMappingConfirmationModal/DeleteInfrastructureMappingConfirmationModal';

function clusterCount(mapping, clusterType) {
  return [
    ...new Set(
      mapping
        .filter(item => item.destination_type.toLowerCase() === 'emscluster')
        .map(item => item[`${clusterType}`])
    )
  ].length;
}

function clusterName(clusters, clusterId) {
  return clusters.map(cluster => (
    <React.Fragment key={cluster.id}>
      {clusterId === cluster.id
        ? `${cluster.v_parent_datacenter} \\ ${cluster.name}`
        : null}
    </React.Fragment>
  ));
}

const InfrastructureMappingsList = ({
  clusters,
  transformationMappings,
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
}) => (
  <React.Fragment>
    <Grid.Col
      xs={12}
      style={{
        paddingBottom: 100,
        height: '100%'
      }}
    >
      {transformationMappings.length > 0 ? (
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
                &nbsp;{__('Create Infrastructure Mapping')}
              </a>
            </div>
          </div>

          <ListView style={{ marginTop: 10 }}>
            {transformationMappings.map(mapping => {
              const sourceClusterCount = clusterCount(
                mapping.transformation_mapping_items,
                'source_id'
              );

              const targetClusterCount = clusterCount(
                mapping.transformation_mapping_items,
                'destination_id'
              );

              const associatedPlansCount =
                mapping.service_templates && mapping.service_templates.length;

              return (
                <ListView.Item
                  key={mapping.id}
                  heading={mapping.name}
                  description={mapping.description}
                  additionalInfo={[
                    <ListView.InfoItem key={0}>
                      <Icon type="pf" name="cluster" />
                      <strong>{sourceClusterCount}</strong>&nbsp;
                      {sourceClusterCount === 1
                        ? __('Source Cluster')
                        : __('Source Clusters')}
                    </ListView.InfoItem>,

                    <ListView.InfoItem key={1}>
                      <Icon type="pf" name="cluster" />
                      <strong>{targetClusterCount}</strong>&nbsp;
                      {targetClusterCount === 1
                        ? __('Target Cluster')
                        : __('Target Clusters')}
                    </ListView.InfoItem>,
                    associatedPlansCount ? (
                      <ListView.InfoItem key={2}>
                        <Icon type="pf" name="catalog" />
                        <strong>{associatedPlansCount}</strong>&nbsp;
                        {associatedPlansCount === 1
                          ? __('Associated Plan')
                          : __('Associated Plans')}
                      </ListView.InfoItem>
                    ) : null
                  ]}
                  actions={
                    inProgressRequestsTransformationMappings.find(
                      inProgressRequestsTransformationMapping =>
                        inProgressRequestsTransformationMapping === mapping.id
                    ) ? (
                      <Icon
                        type="pf"
                        className="delete-infra-mapping-icon-disabled"
                        name="delete"
                      />
                    ) : (
                      <Icon
                        type="pf"
                        name="delete"
                        onClick={e => {
                          e.stopPropagation();
                          setMappingToDeleteAction(mapping);
                          showDeleteConfirmationModalAction();
                        }}
                      />
                    )
                  }
                >
                  <Grid.Row
                    style={{
                      paddingBottom: 14
                    }}
                  >
                    <Grid.Col sm={12}>
                      {__('Completed: ')}
                      {moment(mapping.created_at).format(
                        'MMMM Do YYYY, h:mm a'
                      )}
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Col sm={4}>
                      <b>{__('Source Clusters')}</b>
                    </Grid.Col>
                    <Grid.Col sm={4}>
                      <b>{__('Target Clusters')}</b>
                    </Grid.Col>
                    <Grid.Col sm={4}>
                      {associatedPlansCount > 0 ? (
                        <b>{__('Associated Plans')}</b>
                      ) : null}
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row />
                  {mapping.transformation_mapping_items
                    .filter(
                      item => item.source_type.toLowerCase() === 'emscluster'
                    )
                    .map((item, i) => (
                      <React.Fragment key={`${i}-${item.id}`}>
                        <Grid.Row>
                          <Grid.Col sm={4}>
                            {clusterName(clusters, item.source_id)}
                          </Grid.Col>
                          <Grid.Col sm={4}>
                            {clusterName(clusters, item.destination_id)}
                          </Grid.Col>
                          <Grid.Col sm={4}>
                            {associatedPlansCount > 0
                              ? mapping.service_templates.map((plan, id) => (
                                  <div key={id}>
                                    <span>{plan.name}</span>&nbsp;&nbsp;
                                  </div>
                                ))
                              : null}
                          </Grid.Col>
                        </Grid.Row>
                      </React.Fragment>
                    ))}
                </ListView.Item>
              );
            })}
          </ListView>
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

InfrastructureMappingsList.propTypes = {
  clusters: PropTypes.array,
  transformationMappings: PropTypes.array,
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
