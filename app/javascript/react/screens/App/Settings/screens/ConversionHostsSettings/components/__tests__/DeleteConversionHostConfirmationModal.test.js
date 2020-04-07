import React from 'react';
import { shallow } from 'enzyme';
import DeleteConversionHostConfirmationModal from '../DeleteConversionHostConfirmationModal';

describe('delete conversion host confirmation modal', () => {
  const getBaseProps = () => ({
    conversionHostToDelete: { id: '1', name: 'Mock Conversion Host' },
    deleteConversionHostAction: jest.fn(),
    hideConversionHostDeleteModalAction: jest.fn(),
    conversionHostDeleteModalVisible: true,
    isDeletingConversionHost: false
  });

  it('renders correctly', () => {
    const component = shallow(<DeleteConversionHostConfirmationModal {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('disables remove button when disable is in progress', () => {
    const component = shallow(<DeleteConversionHostConfirmationModal {...getBaseProps()} isDeletingConversionHost />);
    expect(component.find('Button[bsStyle="primary"]').props().disabled).toBe(true);
  });

  it('calls the hide action on cancel button click', () => {
    const props = getBaseProps();
    const component = shallow(<DeleteConversionHostConfirmationModal {...props} />);
    component.find('Button[className="btn-cancel"]').simulate('click');
    expect(props.hideConversionHostDeleteModalAction).toHaveBeenCalledTimes(1);
  });

  it('calls the delete action correctly on remove button click', () => {
    const props = getBaseProps();
    const component = shallow(<DeleteConversionHostConfirmationModal {...props} />);
    component.find('Button[bsStyle="primary"]').simulate('click');
    expect(props.deleteConversionHostAction).toHaveBeenCalledTimes(1);
    expect(props.deleteConversionHostAction).toHaveBeenCalledWith({
      id: '1',
      name: 'Mock Conversion Host'
    });
  });
});
