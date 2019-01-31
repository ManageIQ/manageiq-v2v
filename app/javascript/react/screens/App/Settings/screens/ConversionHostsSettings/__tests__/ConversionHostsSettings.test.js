import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'patternfly-react';
import ConversionHostsSettings from '../ConversionHostsSettings';
import ConversionHostsEmptyState from '../components/ConversionHostsEmptyState';
import ConversionHostsList from '../components/ConversionHostsList';

describe('ConversionHostsSettings component', () => {
  const getBaseProps = () => ({
    fetchConversionHostsAction: jest.fn(),
    conversionHosts: [],
    isFetchingConversionHosts: false,
    showConversionHostWizardAction: jest.fn(),
    hideConversionHostWizardAction: jest.fn(),
    conversionHostWizardVisible: false
  });

  it('renders a spinner when fetching conversion hosts', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} isFetchingConversionHosts />);
    expect(component.find(Spinner).prop('loading')).toBeTruthy();
  });

  it('renders the empty state when no conversion hosts are present', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} />);
    expect(component.find(ConversionHostsEmptyState)).toHaveLength(1);
    expect(component.find(ConversionHostsList)).toHaveLength(0);
  });

  it('renders the list view when conversion hosts are present', () => {
    const component = shallow(<ConversionHostsSettings {...getBaseProps()} conversionHosts={[{ foo: 'bar' }]} />);
    expect(component.find(ConversionHostsList)).toHaveLength(1);
    expect(component.find(ConversionHostsEmptyState)).toHaveLength(0);
  });
});
