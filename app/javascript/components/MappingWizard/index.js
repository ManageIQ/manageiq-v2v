import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { noop, selectKeys } from '../../common/helpers';
import * as MappingWizardActions from '../../redux/actions/mappingWizard';
import ModalWizard from '../ModalWizard';
import MappingWizardBody from './MappingWizardBody';

class MappingWizardContainer extends React.Component {
  componentDidMount() {
    const { url, fetchSourceClusters } = this.props;

    fetchSourceClusters(url);
  }

  render() {
    const { sourceClusters } = this.props;
    const loaded = sourceClusters && sourceClusters.length > 0;
    const modalProps = selectKeys(this.props, [
      'showWizard',
      'onHide',
      'onExited'
    ]);

    console.log('Source Clusters:', sourceClusters);
    console.log('Loaded:', loaded);

    return (
      <ModalWizard.StateProvider numSteps={5}>
        <ModalWizard
          {...modalProps}
          title={<FormattedMessage id="mappingWizard.title" />}
        >
          <MappingWizardBody loaded={loaded} />
        </ModalWizard>
      </ModalWizard.StateProvider>
    );
  }
}
MappingWizardContainer.propTypes = {
  onHide: PropTypes.func,
  onExited: PropTypes.func,
  showWizard: PropTypes.bool,
  url: PropTypes.string,
  fetchSourceClusters: PropTypes.func,
  sourceClusters: PropTypes.arrayOf(PropTypes.object)
};
MappingWizardContainer.defaultProps = {
  url: '',
  fetchSourceClusters: noop,
  sourceClusters: []
};

const mapStateToProps = (state, ownProps) => ({
  ...state.mappingWizard,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, MappingWizardActions, mergeProps)(
  MappingWizardContainer
);
