import React from 'react';
import PropTypes from 'prop-types';
import * as MappingWizardActions from '../../redux/actions/mappingWizard';
import { connect } from 'react-redux';
import { Button, Icon, Modal, Wizard } from 'patternfly-react';
import { bindMethods, noop } from '../../common/helpers';

const mockLoadingContents = () => (
  <div className="blank-slate-pf">
    <div className="spinner spinner-lg blank-slate-pf-icon" />
    <h3 className="blank-slate-pf-main-action">Loading Wizard</h3>
    <p className="blank-slate-pf-secondary-action">
      Lorem ipsum dolor sit amet, porta at suspendisse ac, ut wisi vivamus,
      lorem sociosqu eget nunc amet.{' '}
    </p>
  </div>
);

class MappingWizardContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { url, controller, fetchSourceClusters } = this.props;

    fetchSourceClusters(url, controller);
  }
  render() {
    const { showWizard, onHide, sourceClusters } = this.props;

    console.log(sourceClusters);

    return (
      <Modal
        show={showWizard}
        onHide={onHide}
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
              <Wizard.Main>{mockLoadingContents()}</Wizard.Main>
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
  showWizard: PropTypes.bool
};
// todo: inject these on mount instead
MappingWizardContainer.defaultProps = {
  url: '/api/sourceClusters',
  controller: 'sourceClustersController'
};

const mapStateToProps = (state, ownProps) => ({
  ...state.mappingWizard,
  ...ownProps
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps, dispatchProps);

export default connect(mapStateToProps, MappingWizardActions, mergeProps)(
  MappingWizardContainer
);
