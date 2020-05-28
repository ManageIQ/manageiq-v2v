import React from 'react';
import { shallow } from 'enzyme';
import PlanWizardResultsStep from '../PlanWizardResultsStep';

describe('Plan wizard results step', () => {
  const getBaseProps = () => ({
    postPlansUrl: '/api/foo',
    editPlansUrl: '/api/bar',
    postMigrationPlansAction: jest.fn(),
    editMigrationPlansAction: jest.fn(),
    plansBody: { name: 'Mock Plan', mock: 'data' },
    planSchedule: 'migration_plan_later',
    isPostingPlans: false,
    isRejectedPostingPlans: false,
    errorPostingPlans: null,
    isPuttingPlans: false,
    isRejectedPuttingPlans: false,
    errorPuttingPlans: null,
    migrationPlansResult: { mock: 'data' },
    migrationRequestsResult: { mock: 'data' },
    hidePlanWizardAction: jest.fn(),
    editingPlan: null,
    targetProvider: 'openstack'
  });

  it('renders with a warning if migrating an OSP plan later', () => {
    const component = shallow(<PlanWizardResultsStep {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with no warning if migrating an OSP plan immediately', () => {
    const component = shallow(<PlanWizardResultsStep {...getBaseProps()} planSchedule="migration_plan_now" />);
    expect(component).toMatchSnapshot();
  });
});
