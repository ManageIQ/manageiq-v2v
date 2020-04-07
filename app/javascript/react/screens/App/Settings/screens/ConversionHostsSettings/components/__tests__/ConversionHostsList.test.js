import React from 'react';
import { shallow } from 'enzyme';
import ConversionHostsList from '../ConversionHostsList';
import ListViewToolbar from '../../../../../common/ListViewToolbar/ListViewToolbar';
import RetryConversionHostConfirmationModal from '../RetryConversionHostConfirmationModal';

describe('conversion hosts list', () => {
  const getBaseProps = () => ({
    combinedListItems: [{ id: '1', mock: 'task', meta: { isTask: true } }, { id: '2', mock: 'host', meta: {} }],
    conversionHostToDelete: null,
    deleteConversionHostAction: jest.fn(),
    hideConversionHostDeleteModalAction: jest.fn(),
    setHostToDeleteAction: jest.fn(),
    conversionHostDeleteModalVisible: false,
    showConversionHostDeleteModalAction: jest.fn(),
    isDeletingConversionHost: false,
    conversionHostRetryModalMounted: false,
    isPostingConversionHosts: false,
    setConversionHostTaskToRetryAction: jest.fn(),
    showConversionHostRetryModalAction: jest.fn(),
    postConversionHostsUrl: '/mock/post/url',
    saveTextFileAction: jest.fn()
  });

  it('renders the outer components correctly', () => {
    const component = shallow(<ConversionHostsList {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders the inner list view correctly', () => {
    const component = shallow(<ConversionHostsList {...getBaseProps()} />);
    expect(component.find(ListViewToolbar).dive()).toMatchSnapshot();
  });

  it('renders the retry modal when it should be mounted', () => {
    const baseProps = getBaseProps();
    const component = shallow(<ConversionHostsList {...baseProps} conversionHostRetryModalMounted />);
    const retryModal = component.find(RetryConversionHostConfirmationModal);
    expect(retryModal).toHaveLength(1);
    expect(retryModal.props().postConversionHostsUrl).toEqual(baseProps.postConversionHostsUrl);
  });
});
