import instancePropertiesStepReducer, { initialState } from '../PlanWizardInstancePropertiesStepReducer';
import {
  QUERY_V2V_OSP_TENANT_ATTRIBUTES,
  QUERY_V2V_OSP_BEST_FIT_FLAVOR,
  SET_V2V_BEST_FIT_FLAVORS_AND_DEFAULT_SECURITY_GROUPS,
  SET_V2V_INSTANCE_PROPERTIES_ROWS,
  PLAN_WIZARD_EXITED,
  PLAN_WIZARD_NEXT
} from '../PlanWizardInstancePropertiesStepConstants';
import {
  tenantsWithAttributes,
  bestFitFlavors,
  processedBestFitFlavors,
  instancePropertiesRows
} from '../planWizardInstancePropertiesStep.fixtures';

it('sets default state', () => {
  const action = { type: '@@INIT' };
  const state = instancePropertiesStepReducer(undefined, action);
  expect(state).toMatchSnapshot();
});

describe('querying tenants with attributes', () => {
  it('is pending', () => {
    const action = {
      type: `${QUERY_V2V_OSP_TENANT_ATTRIBUTES}_PENDING`
    };
    const prevState = initialState.set('isRejectedTenantsWithAttributes', true);
    const state = instancePropertiesStepReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${QUERY_V2V_OSP_TENANT_ATTRIBUTES}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingTenantsWithAttributes', true);
    const state = instancePropertiesStepReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${QUERY_V2V_OSP_TENANT_ATTRIBUTES}_FULFILLED`,
      payload: { data: tenantsWithAttributes }
    };
    const prevState = initialState
      .set('isRejectedTenantsWithAttributes', true)
      .set('isFetchingTenantsWithAttributes', true);
    const state = instancePropertiesStepReducer(prevState, action);
    expect(state.isRejectedTenantsWithAttributes).toBe(false);
    expect(state.isFetchingTenantsWithAttributes).toBe(false);
    expect(state.tenantsWithAttributes).toHaveLength(1);
    expect(state.tenantsWithAttributes[0].flavors).toHaveLength(5);
    expect(state.tenantsWithAttributes[0].security_groups).toHaveLength(4);
  });
});

describe('querying best fit flavors', () => {
  it('is pending', () => {
    const action = {
      type: `${QUERY_V2V_OSP_BEST_FIT_FLAVOR}_PENDING`
    };
    const prevState = initialState.set('isRejectedBestFitFlavor', true);
    const state = instancePropertiesStepReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${QUERY_V2V_OSP_BEST_FIT_FLAVOR}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingBestFitFlavor', true);
    const state = instancePropertiesStepReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is successful', () => {
    const action = {
      type: `${QUERY_V2V_OSP_BEST_FIT_FLAVOR}_FULFILLED`,
      payload: { data: bestFitFlavors }
    };
    const prevState = initialState.set('isRejectedBestFitFlavor', true).set('isFetchingBestFitFlavor', true);
    const state = instancePropertiesStepReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });
});

describe('setting best fit flavors and default security groups', () => {
  test('with all matching flavors', () => {
    const action = {
      type: SET_V2V_BEST_FIT_FLAVORS_AND_DEFAULT_SECURITY_GROUPS,
      payload: processedBestFitFlavors
    };
    const prevState = initialState
      .set('tenantsWithAttributes', tenantsWithAttributes.results)
      .set('isSettingSecurityGroupsAndBestFitFlavors', true)
      .set('instancePropertiesRows', instancePropertiesRows);
    const state = instancePropertiesStepReducer(prevState, action);
    expect(state.instancePropertiesRows[0].osp_flavor).toEqual({
      id: '42000000000005',
      name: 'conversion_host'
    });
    expect(state.instancePropertiesRows[0].osp_security_group).toEqual({
      id: '42000000000013',
      name: 'default'
    });
    expect(state.instancePropertiesRows[1].osp_flavor).toEqual({
      id: '42000000000002',
      name: 'x1.large'
    });
    expect(state.instancePropertiesRows[1].osp_security_group).toEqual({
      id: '42000000000013',
      name: 'default'
    });
  });

  test('with a fallback to memory and cpu based matching', () => {
    const action = {
      type: SET_V2V_BEST_FIT_FLAVORS_AND_DEFAULT_SECURITY_GROUPS,
      payload: {
        ...processedBestFitFlavors,
        vmBestFitFlavors: [
          processedBestFitFlavors.vmBestFitFlavors[0],
          {
            tenant_id: processedBestFitFlavors.vmBestFitFlavors[1].tenant_id,
            vm_id: processedBestFitFlavors.vmBestFitFlavors[1].vm_id
            // no flavor_id
          }
        ]
      }
    };
    const prevState = initialState
      .set('tenantsWithAttributes', tenantsWithAttributes.results)
      .set('isSettingSecurityGroupsAndBestFitFlavors', true)
      .set('instancePropertiesRows', instancePropertiesRows);
    const state = instancePropertiesStepReducer(prevState, action);
    expect(state.instancePropertiesRows[0].osp_flavor).toEqual({
      id: '42000000000005',
      name: 'conversion_host'
    });
    expect(state.instancePropertiesRows[0].osp_security_group).toEqual({
      id: '42000000000013',
      name: 'default'
    });
    expect(state.instancePropertiesRows[1].osp_flavor).toEqual({
      id: '42000000000004',
      name: 'x1.xtra-large'
    });
    expect(state.instancePropertiesRows[1].osp_security_group).toEqual({
      id: '42000000000013',
      name: 'default'
    });
  });

  test('with a plan being edited', () => {
    const action = {
      type: SET_V2V_BEST_FIT_FLAVORS_AND_DEFAULT_SECURITY_GROUPS,
      payload: {
        ...processedBestFitFlavors,
        editingPlan: {
          options: {
            config_info: {
              actions: [
                {
                  vm_id: '42000000000017',
                  pre_service: false,
                  post_service: false,
                  osp_security_group_id: '42000000000016',
                  osp_flavor_id: '42000000000002'
                },
                {
                  vm_id: '42000000000006',
                  pre_service: false,
                  post_service: false,
                  osp_security_group_id: '42000000000020',
                  osp_flavor_id: '42000000000004'
                }
              ]
            }
          }
        }
      }
    };
    const prevState = initialState
      .set('tenantsWithAttributes', tenantsWithAttributes.results)
      .set('isSettingSecurityGroupsAndBestFitFlavors', true)
      .set('instancePropertiesRows', instancePropertiesRows);
    const state = instancePropertiesStepReducer(prevState, action);
    expect(state.instancePropertiesRows[0].osp_flavor).toEqual({
      id: '42000000000002',
      name: 'x1.large'
    });
    expect(state.instancePropertiesRows[0].osp_security_group).toEqual({
      id: '42000000000016',
      name: 'appservers'
    });
    expect(state.instancePropertiesRows[1].osp_flavor).toEqual({
      id: '42000000000004',
      name: 'x1.xtra-large'
    });
    expect(state.instancePropertiesRows[1].osp_security_group).toEqual({
      id: '42000000000020',
      name: 'dbservers'
    });
  });

  test('with valid and invalid CSV-specified flavors and groups', () => {
    const action = {
      type: SET_V2V_BEST_FIT_FLAVORS_AND_DEFAULT_SECURITY_GROUPS,
      payload: processedBestFitFlavors
    };
    const rowsWithCsvFields = [
      {
        ...instancePropertiesRows[0],
        csvFields: {
          osp_flavor: 'x1.xtra-small',
          osp_security_group: 'invalidgroup'
        }
      },
      {
        ...instancePropertiesRows[1],
        csvFields: {
          osp_flavor: 'invalidflavor',
          osp_security_group: 'webservers'
        }
      }
    ];
    const prevState = initialState
      .set('tenantsWithAttributes', tenantsWithAttributes.results)
      .set('isSettingSecurityGroupsAndBestFitFlavors', true)
      .set('instancePropertiesRows', rowsWithCsvFields);
    const state = instancePropertiesStepReducer(prevState, action);

    expect(state.instancePropertiesRows[0].osp_flavor).toEqual({
      id: '42000000000001',
      name: 'x1.xtra-small'
    });
    expect(state.instancePropertiesRows[0].csvInvalidFlavorWarning).toBe(false);
    expect(state.instancePropertiesRows[0].osp_security_group).toEqual({
      id: '42000000000013',
      name: 'default'
    });
    expect(state.instancePropertiesRows[0].csvInvalidGroupWarning).toBe(true);

    expect(state.instancePropertiesRows[1].osp_flavor).toEqual({
      id: '42000000000002',
      name: 'x1.large'
    });
    expect(state.instancePropertiesRows[1].csvInvalidFlavorWarning).toBe(true);
    expect(state.instancePropertiesRows[1].osp_security_group).toEqual({
      id: '42000000000022',
      name: 'webservers'
    });
    expect(state.instancePropertiesRows[1].csvInvalidGroupWarning).toBe(false);
  });
});

it('sets instance properties rows', () => {
  const prevState = initialState.set('instancePropertiesRows', ['old']);
  const action = {
    type: SET_V2V_INSTANCE_PROPERTIES_ROWS,
    payload: ['new']
  };
  const state = instancePropertiesStepReducer(prevState, action);
  expect(state.instancePropertiesRows).toEqual(['new']);
});

it('sets initial state on plan wizard exit', () => {
  const prevState = initialState.set('instancePropertiesRows', ['dirty', 'state']);
  const action = { type: PLAN_WIZARD_EXITED };
  const state = instancePropertiesStepReducer(prevState, action);
  expect(state).toEqual(initialState);
});

it('sets recalculate flag properly on plan wizard next step', () => {
  const prevState = initialState.set('recalculateBestFitFlavorAndSecurityGroup', false);
  const action = {
    type: PLAN_WIZARD_NEXT,
    payload: 'planWizardVMStep'
  };
  const state = instancePropertiesStepReducer(prevState, action);
  expect(state.recalculateBestFitFlavorAndSecurityGroup).toBe(true);
});
