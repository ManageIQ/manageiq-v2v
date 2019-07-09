RSpec.describe Rails::Application::Configuration do
  let(:filter_parameters) { Rails.application.config.filter_parameters }

  context "filters" do
    it "includes additional parameters to filter" do
      expect(filter_parameters).to include(:conversion_host_ssh_private_key)
      expect(filter_parameters).to include(:vmware_ssh_private_key)
      expect(filter_parameters).to include(:openstack_tls_ca_certs)
    end
  end
end
