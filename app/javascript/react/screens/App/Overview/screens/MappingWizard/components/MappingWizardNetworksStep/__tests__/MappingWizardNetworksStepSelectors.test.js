import { sourceClusterNetworks } from '../mappingWizardNetworksStep.fixtures';
import { uniqueNetworks } from '../MappingWizardNetworksStepSelectors';

test('uniqueNetworks creates a mapping of networks organized by uid_ems and lan id', () => {
  const sourceNetworks = sourceClusterNetworks[0].lans;

  expect(uniqueNetworks(sourceNetworks)).toMatchSnapshot();
});
