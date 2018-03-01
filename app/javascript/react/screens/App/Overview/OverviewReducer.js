import Immutable from 'seamless-immutable';

import {
  SHOW_MAPPING_WIZARD,
  HIDE_MAPPING_WIZARD,
  MAPPING_WIZARD_EXITED,
  SHOW_PLAN_WIZARD,
  HIDE_PLAN_WIZARD,
  PLAN_WIZARD_EXITED,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  CONTINUE_TO_PLAN
} from './OverviewConstants';

const initialState = Immutable({
  mappingWizardVisible: false,
  hideMappingWizard: true,
  planWizardVisible: false,
  hidePlanWizard: true,
  planWizardId: null,
  transformationMappings: [],
  isRejectedTransformationMappings: false,
  isFetchingTransformationMappings: false,
  isContinuingToPlan: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MAPPING_WIZARD:
      return Immutable.merge(state, {
        mappingWizardVisible: true,
        hideMappingWizard: false
      });
    case HIDE_MAPPING_WIZARD:
      return state.set('hideMappingWizard', true);
    case MAPPING_WIZARD_EXITED:
      return state.set('mappingWizardVisible', false);
    case SHOW_PLAN_WIZARD:
      return Immutable.merge(state, {
        planWizardVisible: true,
        hidePlanWizard: false,
        planWizardId: action.payload.id || null
      });
    case HIDE_PLAN_WIZARD:
      return state.set('hidePlanWizard', true).set('planWizardId', null);
    case PLAN_WIZARD_EXITED:
      return state.set('planWizardVisible', false);

    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_PENDING`:
      return state.set('isFetchingTransformationMappings', true);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_FULFILLED`:
      if (action.payload.data && action.payload.data.resources) {
        return state
          .set('transformationMappings', action.payload.data.resources)
          .set('isRejectedTransformationMappings', false)
          .set('isFetchingTransformationMappings', false)
          .set('isContinuingToPlan', false);
      }
      return state
        .set('sourceClusters', [])
        .set('isFetchingTransformationMappings', false)
        .set('isRejectedTransformationMappings', false);
    case `${FETCH_V2V_TRANSFORMATION_MAPPINGS}_REJECTED`:
      return state
        .set('errorSourceClusters', action.payload)
        .set('isRejectedTransformationMappings', true)
        .set('isFetchingTransformationMappings', false);
    case CONTINUE_TO_PLAN:
      return state
        .set('isContinuingToPlan', true)
        .set('planWizardId', action.payload.id);
    default:
      return state;
  }
};
