import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, EmptyState, Button } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import BreadcrumbPageSwitcher from '../common/BreadcrumbPageSwitcher';

const AnalyticsContainer = ({ showEmptyState, children }) =>
  showEmptyState ? (
    <div className="row cards-pf" style={{ overflow: 'auto', overflowX: 'hidden', paddingBottom: 50, height: '100%' }}>
      {children}
    </div>
  ) : (
    children
  );

AnalyticsContainer.propTypes = {
  showEmptyState: PropTypes.bool,
  children: PropTypes.node
};

const Analytics = ({ showEmptyState = true }) => (
  <React.Fragment>
    <Toolbar>
      <Breadcrumb.Item active>{__('Compute')}</Breadcrumb.Item>
      <Breadcrumb.Item active>{__('Migration')}</Breadcrumb.Item>
      <Breadcrumb.Item active>
        <strong>{__('Migration Analytics')}</strong>
      </Breadcrumb.Item>
      <BreadcrumbPageSwitcher activeHref="#/analytics" />
    </Toolbar>
    <AnalyticsContainer showEmptyState={showEmptyState}>
      {showEmptyState && (
        <EmptyState className="full-page-empty">
          <EmptyState.Icon type="pf" name="search" />
          <EmptyState.Title>
            {__('Examine your virtual environment using Red Hat Migration Analytics')}
          </EmptyState.Title>
          <EmptyState.Info>
            {__('Get a summarized report of your virtualization providers in CloudForms and collect a detailed inventory that can be further analyzed using the Migration Analytics application on cloud.redhat.com.') /* prettier-ignore */}
          </EmptyState.Info>
          <EmptyState.Action>
            <Button bsStyle="primary" bsSize="large" onClick={() => alert('TODO: modal here')}>
              {__('Get started')}
            </Button>
          </EmptyState.Action>
        </EmptyState>
      )}
      <h6 className="manifest-version">{__('Manifest version: x.y.z 2019-06-10') /* TODO make this real */}</h6>
    </AnalyticsContainer>
  </React.Fragment>
);

Analytics.propTypes = {
  showEmptyState: PropTypes.bool
};

export default Analytics;
