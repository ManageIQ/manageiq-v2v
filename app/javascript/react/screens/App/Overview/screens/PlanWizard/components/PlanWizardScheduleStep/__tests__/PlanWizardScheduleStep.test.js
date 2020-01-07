import React from 'react';
import { shallow } from 'enzyme';
import { PlanWizardScheduleStep } from '../PlanWizardScheduleStep';
import { OPENSTACK } from '../../../../../../../../../common/constants';

describe('Plan wizard schedule step', () => {
  const getBaseProps = () => ({
    targetProvider: OPENSTACK,
    migration_plan_type_radio: 'migration_type_cold',
    migration_plan_choice_radio: 'migration_plan_now',
    warmMigrationCompatibility: {
      isFetchingTargetValidationData: false,
      shouldEnableWarmMigration: true
    },
    showAlertAction: jest.fn()
  });

  it('renders with a warning if migrating an OSP plan immediately', () => {
    const component = shallow(<PlanWizardScheduleStep {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with no warning if migrating an OSP plan later', () => {
    const component = shallow(
      <PlanWizardScheduleStep {...getBaseProps()} migration_plan_choice_radio="migration_plan_later" />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders with a info text when warm migration selected', () => {
    const component = shallow(
      <PlanWizardScheduleStep {...getBaseProps()} migration_plan_type_radio="migration_type_warm" />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders with warm migration option disabled when it is not available', () => {
    const component = shallow(
      <PlanWizardScheduleStep
        {...getBaseProps()}
        warmMigrationCompatibility={{
          isFetchingTargetValidationData: false,
          shouldEnableWarmMigration: false
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
