import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MappingWizard from '../MappingWizard';

import { coreComponents } from '../../../../../../../components/';
import componentRegistry from '../../../../../../../components/componentRegistry';

jest.mock('../../../../../../../components/componentRegistry');
componentRegistry.registerMultiple(coreComponents);

describe('MappingWizard component', () => {
  const getBaseProps = () => ({
    hideMappingWizardAction: jest.fn(),
    mappingWizardExitedAction: jest.fn(),
    hideMappingWizard: false
  });

  it('renders the mapping wizard', () => {
    const component = shallow(<MappingWizard {...getBaseProps()} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
