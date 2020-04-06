import React from 'react';
import { shallow } from 'enzyme';
import ConversionHostRemoveButton from '../ConversionHostRemoveButton';

describe('conversion host remove button', () => {
  const getBaseProps = () => ({
    hostOrTask: { id: '12345', name: 'mock-host' },
    setHostToDeleteAction: jest.fn(),
    showConversionHostDeleteModalAction: jest.fn()
  });

  it('renders correctly', () => {
    const component = shallow(<ConversionHostRemoveButton {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with a unique id for each host', () => {
    const c1 = shallow(<ConversionHostRemoveButton {...getBaseProps()} />);
    const c2 = shallow(
      <ConversionHostRemoveButton {...getBaseProps()} hostOrTask={{ id: '67890', name: 'mock-host' }} />
    );
    expect(c1.find('Button').props().id).not.toEqual(c2.find('Button').props().id);
  });

  it('passes extra props to the Button', () => {
    const component = shallow(<ConversionHostRemoveButton {...getBaseProps()} extraProp="extraValue" />);
    expect(component.find('Button').props().extraProp).toBe('extraValue');
  });

  it('calls the correct actions on click', () => {
    const props = getBaseProps();
    const component = shallow(<ConversionHostRemoveButton {...props} />);
    const stopPropagation = jest.fn();
    component.find('Button').simulate('click', { stopPropagation });
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(props.setHostToDeleteAction).toHaveBeenCalledTimes(1);
    expect(props.setHostToDeleteAction).toHaveBeenCalledWith(props.hostOrTask);
    expect(props.showConversionHostDeleteModalAction).toHaveBeenCalledTimes(1);
  });
});
