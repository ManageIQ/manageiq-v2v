import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'patternfly-react';
import ConversionHostsSettings from '../ConversionHostsSettings';
import ConversionHostsEmptyState from '../components/ConversionHostsEmptyState';
import ShowWizardEmptyState from '../../../../common/ShowWizardEmptyState/ShowWizardEmptyState';
import ConversionHostsList from '../components/ConversionHostsList';

describe('ConversionHostsSettings component', () => {
  const getBaseProps = () => ({
    fetchProvidersAction: jest.fn(),
    fetchConversionHostsAction: jest.fn(),
    conversionHosts: [],
    hasSufficientProviders: true,
    isFetchingProviders: false,
    isFetchingConversionHosts: false,
    showConversionHostWizardAction: jest.fn(),
    hideConversionHostWizardAction: jest.fn(),
    conversionHostWizardVisible: false
  });

  it('renders a spinner when fetching conversion hosts', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} isFetchingConversionHosts />);
    expect(component.find(Spinner).prop('loading')).toBeTruthy();
  });

  it('renders a spinner when fetching providers', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} isFetchingProviders />);
    expect(component.find(Spinner).prop('loading')).toBeTruthy();
  });

  it('renders an empty state when insufficient providers are present', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} hasSufficientProviders={false} />);
    expect(component.find(ShowWizardEmptyState)).toHaveLength(1);
    expect(component.find(ConversionHostsEmptyState)).toHaveLength(0);
    expect(component.find(ConversionHostsList)).toHaveLength(0);
  });

  it('renders an empty state when no conversion hosts are present', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} />);
    expect(component.find(ConversionHostsEmptyState)).toHaveLength(1);
    expect(component.find(ShowWizardEmptyState)).toHaveLength(0);
    expect(component.find(ConversionHostsList)).toHaveLength(0);
  });

  it('renders the list view when conversion hosts are present', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} conversionHosts={[{ foo: 'bar' }]} />);
    expect(component.find(ConversionHostsList)).toHaveLength(1);
    expect(component.find(ShowWizardEmptyState)).toHaveLength(0);
    expect(component.find(ConversionHostsEmptyState)).toHaveLength(0);
  });
});
