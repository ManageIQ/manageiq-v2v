import React from 'react';
import { shallow, mount } from 'enzyme';
import ConversionHostsEmptyState from '../ConversionHostsEmptyState';

describe('conversion hosts empty state', () => {
  const getBaseProps = () => ({
    showConversionHostWizardAction: jest.fn()
  });

  it('renders correctly', () => {
    const component = shallow(<ConversionHostsEmptyState {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('calls the correct action on button click', () => {
    const props = getBaseProps();
    const component = mount(<ConversionHostsEmptyState {...props} />);
    component.find('Button').simulate('click');
    expect(props.showConversionHostWizardAction).toHaveBeenCalledTimes(1);
  });
});
