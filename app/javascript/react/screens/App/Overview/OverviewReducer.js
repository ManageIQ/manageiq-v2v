import Immutable from 'seamless-immutable';

import {
  SHOW_MAPPING_WIZARD,
  HIDE_MAPPING_WIZARD,
  MAPPING_WIZARD_EXITED,
  SHOW_PLAN_WIZARD,
  HIDE_PLAN_WIZARD,
  PLAN_WIZARD_EXITED,
  FETCH_V2V_TRANSFORMATION_MAPPINGS,
  FETCH_V2V_MIGRATIONS_IN_PROGRESS,
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
  isContinuingToPlan: false,
  shouldReloadMappings: false,
  migrationsInProgress: [],
  isFetchingMigrationsInProgress: false,
  isRejectedMigrationsInProgress: false,
  errorMigrationsInProgress: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MAPPING_WIZARD:
      return Immutable.merge(state, {
        mappingWizardVisible: true,
        hideMappingWizard: false
      });
    case HIDE_MAPPING_WIZARD: {
      const { payload } = action;
      return state
        .set('hideMappingWizard', true)
        .set(
          'shouldReloadMappings',
          (payload && payload.shouldReloadMappings) || false
        );
    }
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
          .set('shouldReloadMappings', false)
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

    case `${FETCH_V2V_MIGRATIONS_IN_PROGRESS}_PENDING`:
      return state.set('isFetchingMigrationsInProgress', true);
    case `${FETCH_V2V_MIGRATIONS_IN_PROGRESS}_FULFILLED`:
      return state
        .set('migrationsInProgress', action.payload.data.resources)
        .set('isFetchingMigrationsInProgress', false)
        .set('isRejectedMigrationsInProgress', false)
        .set('errorMigrationsInProgress', null);
    case `${FETCH_V2V_MIGRATIONS_IN_PROGRESS}_REJECTED`:
      return state
        .set('errorMigrationsInProgress', action.payload)
        .set('isRejectedMigrationsInProgress', true)
        .set('isFetchingMigrationsInProgress', false);

    case CONTINUE_TO_PLAN:
      return state
        .set('isContinuingToPlan', true)
        .set('shouldReloadMappings', true)
        .set('planWizardId', action.payload.id);
    default:
      return state;
  }
};
