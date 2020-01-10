import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'patternfly-react';
import ConversionHostsSettings from '../ConversionHostsSettings';
import ConversionHostsEmptyState from '../components/ConversionHostsEmptyState';
import NoProvidersEmptyState from '../../../../common/NoProvidersEmptyState';
import ConversionHostsList from '../components/ConversionHostsList';
import ConversionHostWizard from '../components/ConversionHostWizard';

const getBaseProps = () => ({
  deleteConversionHostAction: jest.fn(),
  fetchProvidersAction: jest.fn(),
  isFetchingProviders: false,
  hasTargetProvider: true,
  fetchConversionHostsAction: jest.fn(() => Promise.resolve()),
  fetchConversionHostTasksAction: jest.fn(() => Promise.resolve()),
  combinedListItems: [],
  showConversionHostWizardAction: jest.fn(),
  conversionHostWizardMounted: false,
  setHostToDeleteAction: jest.fn(),
  showConversionHostDeleteModalAction: jest.fn(),
  conversionHostDeleteModalVisible: false,
  conversionHostToDelete: null,
  isDeletingConversionHost: false,
  hideConversionHostDeleteModalAction: jest.fn()
});

describe('ConversionHostsSettings component', () => {
  it('renders a spinner when fetching conversion hosts', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} isFetchingConversionHosts />);
    expect(component.find(Spinner).prop('loading')).toBeTruthy();
  });

  it('renders a spinner when fetching providers', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} isFetchingProviders />);
    expect(component.find(Spinner).prop('loading')).toBeTruthy();
  });

  it('renders an empty state when insufficient providers are present', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} hasTargetProvider={false} />);
    expect(component.find(NoProvidersEmptyState)).toHaveLength(1);
    expect(component.find(ConversionHostsEmptyState)).toHaveLength(0);
    expect(component.find(ConversionHostsList)).toHaveLength(0);
    expect(component.find(ConversionHostWizard)).toHaveLength(0);
  });

  it('renders an empty state when no conversion hosts are present', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} />);
    expect(component.find(ConversionHostsEmptyState)).toHaveLength(1);
    expect(component.find(NoProvidersEmptyState)).toHaveLength(0);
    expect(component.find(ConversionHostsList)).toHaveLength(0);
    expect(component.find(ConversionHostWizard)).toHaveLength(0);
  });

  it('renders the list view when conversion hosts are present', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} combinedListItems={[{ foo: 'bar' }]} />);
    expect(component.find(ConversionHostsList)).toHaveLength(1);
    expect(component.find(NoProvidersEmptyState)).toHaveLength(0);
    expect(component.find(ConversionHostsEmptyState)).toHaveLength(0);
    expect(component.find(ConversionHostWizard)).toHaveLength(0);
  });

  it('renders the wizard when the wizard should be mounted', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} conversionHostWizardMounted />);
    expect(component.find(ConversionHostWizard)).toHaveLength(1);
  });

  it('calls the show wizard action when clicking the configure link', () => {
    const preventDefault = jest.fn();
    const baseProps = getBaseProps();
    const component = shallow(<ConversionHostsSettings {...baseProps} />);
    component.find('.heading-with-link-container .pull-right a').simulate('click', { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(baseProps.showConversionHostWizardAction).toHaveBeenCalledTimes(1);
  });
});

describe('ConversionHostsSettings polling', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const flushPromises = () => new Promise(setImmediate); // https://stackoverflow.com/a/51045733

  it('fetches on mount, then polls every 15 seconds', async () => {
    const baseProps = getBaseProps();
    shallow(<ConversionHostsSettings {...baseProps} />);
    await flushPromises();
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(1);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(2);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(3);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(3);
  });

  it('stops polling on unmount', async () => {
    const baseProps = getBaseProps();
    const component = shallow(<ConversionHostsSettings {...baseProps} />);
    await flushPromises();
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(1);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(2);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(2);
    component.unmount();
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(2);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(2);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(2);
  });

  it('stops polling when a modal opens', async () => {
    const baseProps = getBaseProps();
    const component = shallow(<ConversionHostsSettings {...baseProps} />);
    await flushPromises();
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(1);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(2);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(2);
    component.setProps({ conversionHostWizardMounted: true });
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(2);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(2);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(2);
  });

  it('restarts polling when a modal closes', async () => {
    const baseProps = { ...getBaseProps(), conversionHostWizardMounted: true };
    const component = shallow(<ConversionHostsSettings {...baseProps} />);
    await flushPromises();
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(0);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(0);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(0);
    component.setProps({ conversionHostWizardMounted: false });
    await flushPromises();
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(1);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(2);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(15000);
    expect(baseProps.fetchConversionHostsAction).toHaveBeenCalledTimes(3);
    expect(baseProps.fetchConversionHostTasksAction).toHaveBeenCalledTimes(3);
  });
});
