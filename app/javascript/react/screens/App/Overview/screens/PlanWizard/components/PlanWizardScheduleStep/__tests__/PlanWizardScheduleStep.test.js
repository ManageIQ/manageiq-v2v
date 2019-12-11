import React from 'react';
import { shallow } from 'enzyme';
import { PlanWizardScheduleStep } from '../PlanWizardScheduleStep';

describe('Plan wizard schedule step', () => {
  it('renders with a warning if migrating an OSP plan immediately', () => {
    const component = shallow(
      <PlanWizardScheduleStep
        targetProvider="openstack"
        migration_plan_type_radio="migration_type_cold"
        migration_plan_choice_radio="migration_plan_now"
        shouldEnableWarmMigration
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders with no warning if migrating an OSP plan later', () => {
    const component = shallow(
      <PlanWizardScheduleStep
        targetProvider="openstack"
        migration_plan_type_radio="migration_type_cold"
        migration_plan_choice_radio="migration_plan_later"
        shouldEnableWarmMigration
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders with a info text when warm migration selected', () => {
    const component = shallow(
      <PlanWizardScheduleStep
        targetProvider="openstack"
        migration_plan_type_radio="migration_type_warm"
        shouldEnableWarmMigration
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders with a info text when warm migration is not available', () => {
    const component = shallow(
      <PlanWizardScheduleStep
        targetProvider="openstack"
        migration_plan_type_radio="migration_type_cold"
        shouldEnableWarmMigration={false}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
