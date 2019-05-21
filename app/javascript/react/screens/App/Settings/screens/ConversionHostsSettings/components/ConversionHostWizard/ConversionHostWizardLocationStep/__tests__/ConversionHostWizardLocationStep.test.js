import React from 'react';
import { shallow } from 'enzyme';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../../common/testReduxHelpers';
import ConversionHostWizardLocationStep from '../ConversionHostWizardLocationStep';
import { RHV, OPENSTACK } from '../../../../../../../../../../common/constants';

describe('conversion host wizard location step', () => {
  const store = generateStore({ form: formReducer }, {});

  const mockRhvProvider = {
    id: '1',
    name: 'Mock RHV',
    type: 'ManageIQ::Providers::Redhat::InfraManager'
  };

  const mockOspProvider = {
    id: '2',
    name: 'Mock OSP',
    type: 'ManageIQ::Providers::Openstack::CloudManager'
  };

  const mockRhvClusters = [
    { id: '1', name: 'Mock RHV Cluster 1', ems_id: '1' },
    { id: '2', name: 'Mock RHV Cluster 2', ems_id: '1' },
    { id: '3', name: 'Some other RHV cluster', ems_id: '3' }
  ];

  const mockOspTenants = [
    { id: '1', name: 'Mock OSP Project 1', ems_id: '2' },
    { id: '2', name: 'Mock OSP Project 2', ems_id: '2' },
    { id: '3', name: 'Some other OSP project', ems_id: '3' }
  ];

  const getBaseProps = () => ({
    selectedProviderType: null,
    selectedProviderId: null,
    providers: [mockRhvProvider, mockOspProvider],
    fetchTargetClustersAction: jest.fn(),
    fetchTargetComputeUrls: {
      [RHV]: '/api/mock/rhv/compute',
      [OPENSTACK]: '/api/mock/openstack/compute'
    },
    isFetchingTargetClusters: false,
    targetClusters: [],
    resetFormAction: jest.fn(),
    store
  });

  const shallowDive = jsx => {
    const connectWrapper = shallow(jsx); // <Connect(Form(ConversionHostWizardLocationStep))>
    const formWrapper = connectWrapper.dive(); // <Form(ConversionHostWizardLocationStep)>
    const componentWrapper = formWrapper.dive(); // <ConversionHostWizardLocationStep>
    return componentWrapper.dive(); // shallow-rendered ConversionHostWizardLocationStep
  };

  it('renders the redux-form wrapper correctly', () => {
    const component = shallow(<ConversionHostWizardLocationStep {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in the initial state with both providers present', () => {
    const component = shallowDive(<ConversionHostWizardLocationStep {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in the initial state with only RHV providers present', () => {
    const component = shallowDive(
      <ConversionHostWizardLocationStep {...getBaseProps()} providers={[mockRhvProvider]} />
    );
    expect(component).toMatchSnapshot();
  });

  it('calls fetchTargetClustersAction when the selectedProviderType changes', () => {
    const baseProps = getBaseProps();
    const component = shallowDive(<ConversionHostWizardLocationStep {...baseProps} />);
    expect(baseProps.fetchTargetClustersAction).toHaveBeenCalledTimes(0);
    component.setProps({ selectedProviderType: RHV });
    expect(baseProps.fetchTargetClustersAction).toHaveBeenCalledTimes(1);
    expect(baseProps.fetchTargetClustersAction).toHaveBeenCalledWith(baseProps.fetchTargetComputeUrls[RHV]);
  });

  it('does not call fetchTargetClustersAction when the selectedProviderType does not change', () => {
    const baseProps = getBaseProps();
    const component = shallowDive(<ConversionHostWizardLocationStep {...baseProps} selectedProviderType={RHV} />);
    expect(baseProps.fetchTargetClustersAction).toHaveBeenCalledTimes(0);
    component.setProps({ unrelatedProp: 'foo' });
    expect(baseProps.fetchTargetClustersAction).toHaveBeenCalledTimes(0);
  });

  it('renders correctly when loading clusters after selecting a provider type', () => {
    const component = shallowDive(
      <ConversionHostWizardLocationStep {...getBaseProps()} selectedProviderType={RHV} isFetchingTargetClusters />
    );
    expect(component.find('Spinner').props().loading).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly after loading clusters but before selecting a provider', () => {
    const component = shallowDive(
      <ConversionHostWizardLocationStep
        {...getBaseProps()}
        selectedProviderType={RHV}
        targetClusters={mockRhvClusters}
      />
    );
    expect(component.find('Spinner').props().loading).toBeFalsy();
    expect(component.find('Field[name="cluster"]').props().options).toEqual([]);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly after selecting a RHV provider', () => {
    const component = shallowDive(
      <ConversionHostWizardLocationStep
        {...getBaseProps()}
        selectedProviderType={RHV}
        targetClusters={mockRhvClusters}
        selectedProviderId="1"
      />
    );
    expect(
      component
        .find('Field[name="cluster"]')
        .props()
        .options.map(option => option.id)
    ).toEqual(['1', '2']);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly after selecting an OSP provider', () => {
    const component = shallowDive(
      <ConversionHostWizardLocationStep
        {...getBaseProps()}
        selectedProviderType={OPENSTACK}
        targetClusters={mockOspTenants}
        selectedProviderId="2"
      />
    );
    expect(
      component
        .find('Field[name="cluster"]')
        .props()
        .options.map(option => option.id)
    ).toEqual(['1', '2']);
    expect(component).toMatchSnapshot();
  });

  it('resets the hosts step when the cluster field changes', () => {
    const baseProps = getBaseProps();
    const component = shallowDive(
      <ConversionHostWizardLocationStep
        {...baseProps}
        selectedProviderType={RHV}
        targetClusters={mockRhvClusters}
        selectedProviderId="1"
      />
    );
    component
      .find('Field[name="cluster"]')
      .props()
      .onChange();
    expect(baseProps.resetFormAction).toHaveBeenCalledWith('conversionHostWizardHostsStep');
  });
});
