import React from 'react';
import { shallow } from 'enzyme';
import ConversionHostRetryButton from '../ConversionHostRetryButton';

describe('conversion host retry button', () => {
  const getBaseProps = () => ({
    task: { id: '12345', name: 'mock-task' },
    setConversionHostTaskToRetryAction: jest.fn(),
    showConversionHostRetryModalAction: jest.fn()
  });

  it('renders correctly', () => {
    const component = shallow(<ConversionHostRetryButton {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with a unique id for each task', () => {
    const c1 = shallow(<ConversionHostRetryButton {...getBaseProps()} />);
    const c2 = shallow(<ConversionHostRetryButton {...getBaseProps()} task={{ id: '67890', name: 'mock-task' }} />);
    expect(c1.find('Button').props().id).not.toEqual(c2.find('Button').props().id);
  });

  it('passes extra props to the Button', () => {
    const component = shallow(<ConversionHostRetryButton {...getBaseProps()} extraProp="extraValue" />);
    expect(component.find('Button').props().extraProp).toBe('extraValue');
  });

  it('calls the correct actions on click', () => {
    const props = getBaseProps();
    const component = shallow(<ConversionHostRetryButton {...props} />);
    const stopPropagation = jest.fn();
    component.find('Button').simulate('click', { stopPropagation });
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(props.setConversionHostTaskToRetryAction).toHaveBeenCalledTimes(1);
    expect(props.setConversionHostTaskToRetryAction).toHaveBeenCalledWith(props.task);
    expect(props.showConversionHostRetryModalAction).toHaveBeenCalledTimes(1);
  });
});
