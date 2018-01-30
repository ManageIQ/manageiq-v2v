import React from 'react';
import PropTypes from 'prop-types';
import * as MappingWizardActions from '../../redux/actions/mappingWizard';
import { connect } from 'react-redux';
import {
  Button,
  Icon,
  EmptyState,
  Modal,
  Spinner,
  Wizard
} from 'patternfly-react';
import { bindMethods, noop } from '../../common/helpers';

const loadingContents = () => (
  <EmptyState>
    <Spinner size="lg" className="blank-slate-pf-icon" loading />
    <EmptyState.Action>
      <h3>Loading Wizard</h3>
    </EmptyState.Action>
    <EmptyState.Action secondary>
      <p>
        Lorem ipsum dolor sit amet, porta at suspendisse ac, ut wisi vivamus,
        lorem sociosqu eget nunc amet.{' '}
      </p>
    </EmptyState.Action>
  </EmptyState>
);

class MappingWizardContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { url, fetchSourceClusters } = this.props;

    fetchSourceClusters(url);
  }
  render() {
    const { showWizard, onHide, onExited, sourceClusters } = this.props;

    console.log(sourceClusters);

    return (
      <Modal
        show={showWizard}
        onHide={onHide}
        onExited={onExited}
        dialogClassName="modal-lg wizard-pf"
      >
        <Wizard>
          <Modal.Header>
            <button
              className="close"
              onClick={onHide}
              aria-hidden="true"
              aria-label="Close"
            >
              <Icon type="pf" name="close" />
            </button>
            <Modal.Title>Infrastructure Mapping Wizard</Modal.Title>
          </Modal.Header>
          <Modal.Body className="wizard-pf-body clearfix">
            <Wizard.Row>
              <Wizard.Main>{loadingContents()}</Wizard.Main>
            </Wizard.Row>
          </Modal.Body>
          <Modal.Footer className="wizard-pf-footer">
            <Button bsStyle="default" className="btn-cancel" onClick={onHide}>
              Cancel
            </Button>
            <Button bsStyle="default" disabled>
              <Icon type="fa" name="angle-left" />Back
            </Button>
            <Button bsStyle="primary" disabled>
              Next<Icon type="fa" name="angle-right" />
            </Button>
          </Modal.Footer>
        </Wizard>
      </Modal>
    );
  }
}
MappingWizardContainer.propTyes = {
  onHide: PropTypes.func,
  onExited: PropTypes.func,
  showWizard: PropTypes.bool
};
MappingWizardContainer.defaultProps = {
  onHide: noop,
  onExited: noop
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
