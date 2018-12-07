import Immutable from 'seamless-immutable';

export const tenantsWithAttributes = Immutable({
  results: [
    {
      href: 'http://0.0.0.0:8080/api/cloud_tenants/42000000000003',
      id: '42000000000003',
      name: 'HR Intranet',
      description: '',
      enabled: true,
      ems_ref: '39f6ca6e7cdd40278d67394d8144c2e7',
      ems_id: '42000000000004',
      created_at: '2018-11-06T04:05:55Z',
      updated_at: '2018-11-06T04:05:55Z',
      type: 'ManageIQ::Providers::Openstack::CloudManager::CloudTenant',
      parent_id: null,
      flavors: [
        {
          href: 'http://0.0.0.0:8080/api/flavors/42000000000001',
          id: '42000000000001',
          ems_id: '42000000000004',
          name: 'x1.xtra-small',
          description: '1 CPUs, 2 MB RAM, 40 GB Root Disk',
          cpus: 1,
          cpu_cores: null,
          memory: 2097152,
          ems_ref: '4c3c4b65-9ad8-4af7-9f13-6f9c58ab020b',
          type: 'ManageIQ::Providers::Openstack::CloudManager::Flavor',
          supports_32_bit: null,
          supports_64_bit: null,
          enabled: true,
          supports_hvm: null,
          supports_paravirtual: null,
          block_storage_based_only: null,
          cloud_subnet_required: null,
          ephemeral_disk_size: 0,
          ephemeral_disk_count: 0,
          root_disk_size: 42949672960,
          swap_disk_size: 0,
          publicly_available: true
        },
        {
          href: 'http://0.0.0.0:8080/api/flavors/42000000000002',
          id: '42000000000002',
          ems_id: '42000000000004',
          name: 'x1.large',
          description: '4 CPUs, 8 GB RAM, 80 GB Root Disk',
          cpus: 4,
          cpu_cores: null,
          memory: 8589934592,
          ems_ref: '69f82071-eeee-45b0-b22e-fb3c42dd62d3',
          type: 'ManageIQ::Providers::Openstack::CloudManager::Flavor',
          supports_32_bit: null,
          supports_64_bit: null,
          enabled: true,
          supports_hvm: null,
          supports_paravirtual: null,
          block_storage_based_only: null,
          cloud_subnet_required: null,
          ephemeral_disk_size: 0,
          ephemeral_disk_count: 0,
          root_disk_size: 85899345920,
          swap_disk_size: 0,
          publicly_available: true
        },
        {
          href: 'http://0.0.0.0:8080/api/flavors/42000000000004',
          id: '42000000000004',
          ems_id: '42000000000004',
          name: 'x1.xtra-large',
          description: '4 CPUs, 16 GB RAM, 80 GB Root Disk',
          cpus: 4,
          cpu_cores: null,
          memory: 17179869184,
          ems_ref: 'b520210d-832a-4421-9045-3ebe3f226e94',
          type: 'ManageIQ::Providers::Openstack::CloudManager::Flavor',
          supports_32_bit: null,
          supports_64_bit: null,
          enabled: true,
          supports_hvm: null,
          supports_paravirtual: null,
          block_storage_based_only: null,
          cloud_subnet_required: null,
          ephemeral_disk_size: 0,
          ephemeral_disk_count: 0,
          root_disk_size: 85899345920,
          swap_disk_size: 0,
          publicly_available: true
        },
        {
          href: 'http://0.0.0.0:8080/api/flavors/42000000000005',
          id: '42000000000005',
          ems_id: '42000000000004',
          name: 'conversion_host',
          description: '2 CPUs, 4 GB RAM, 40 GB Root Disk',
          cpus: 2,
          cpu_cores: null,
          memory: 4294967296,
          ems_ref: 'e147fdb1-bd66-4a13-9095-8133ec0481e5',
          type: 'ManageIQ::Providers::Openstack::CloudManager::Flavor',
          supports_32_bit: null,
          supports_64_bit: null,
          enabled: true,
          supports_hvm: null,
          supports_paravirtual: null,
          block_storage_based_only: null,
          cloud_subnet_required: null,
          ephemeral_disk_size: 0,
          ephemeral_disk_count: 0,
          root_disk_size: 42949672960,
          swap_disk_size: 0,
          publicly_available: true
        },
        {
          href: 'http://0.0.0.0:8080/api/flavors/42000000000006',
          id: '42000000000006',
          ems_id: '42000000000004',
          name: 'x1.small',
          description: '2 CPUs, 4 GB RAM, 80 GB Root Disk',
          cpus: 2,
          cpu_cores: null,
          memory: 4294967296,
          ems_ref: 'edb791fb-b8c6-4e23-9201-228e2e4a2020',
          type: 'ManageIQ::Providers::Openstack::CloudManager::Flavor',
          supports_32_bit: null,
          supports_64_bit: null,
          enabled: true,
          supports_hvm: null,
          supports_paravirtual: null,
          block_storage_based_only: null,
          cloud_subnet_required: null,
          ephemeral_disk_size: 0,
          ephemeral_disk_count: 0,
          root_disk_size: 85899345920,
          swap_disk_size: 0,
          publicly_available: true
        }
      ],
      security_groups: [
        {
          href: 'http://0.0.0.0:8080/api/security_groups/42000000000022',
          id: '42000000000022',
          name: 'webservers',
          description: '',
          type: 'ManageIQ::Providers::Openstack::NetworkManager::SecurityGroup',
          ems_id: '42000000000005',
          ems_ref: 'ca331bf6-6f45-45a8-af75-972daa5eea5e',
          cloud_network_id: null,
          cloud_tenant_id: '42000000000003',
          orchestration_stack_id: null,
          network_group_id: null,
          network_router_id: null,
          cloud_subnet_id: null
        },
        {
          href: 'http://0.0.0.0:8080/api/security_groups/42000000000020',
          id: '42000000000020',
          name: 'dbservers',
          description: '',
          type: 'ManageIQ::Providers::Openstack::NetworkManager::SecurityGroup',
          ems_id: '42000000000005',
          ems_ref: 'afa611ec-6e49-4714-ac86-61a01be735bf',
          cloud_network_id: null,
          cloud_tenant_id: '42000000000003',
          orchestration_stack_id: null,
          network_group_id: null,
          network_router_id: null,
          cloud_subnet_id: null
        },
        {
          href: 'http://0.0.0.0:8080/api/security_groups/42000000000016',
          id: '42000000000016',
          name: 'appservers',
          description: '',
          type: 'ManageIQ::Providers::Openstack::NetworkManager::SecurityGroup',
          ems_id: '42000000000005',
          ems_ref: '5a74ac6b-7d9a-4e1a-9851-6efd6c1241a2',
          cloud_network_id: null,
          cloud_tenant_id: '42000000000003',
          orchestration_stack_id: null,
          network_group_id: null,
          network_router_id: null,
          cloud_subnet_id: null
        },
        {
          href: 'http://0.0.0.0:8080/api/security_groups/42000000000013',
          id: '42000000000013',
          name: 'default',
          description: 'Default security group',
          type: 'ManageIQ::Providers::Openstack::NetworkManager::SecurityGroup',
          ems_id: '42000000000005',
          ems_ref: '2b7f39a0-1423-4059-b929-6ee578f2bf1c',
          cloud_network_id: null,
          cloud_tenant_id: '42000000000003',
          orchestration_stack_id: null,
          network_group_id: null,
          network_router_id: null,
          cloud_subnet_id: null
        }
      ],
      default_security_group: {
        id: '42000000000013',
        name: 'default',
        description: 'Default security group',
        type: 'ManageIQ::Providers::Openstack::NetworkManager::SecurityGroup',
        ems_id: '42000000000005',
        ems_ref: '2b7f39a0-1423-4059-b929-6ee578f2bf1c',
        cloud_network_id: null,
        cloud_tenant_id: '42000000000003',
        orchestration_stack_id: null,
        network_group_id: null,
        network_router_id: null,
        cloud_subnet_id: null
      }
    }
  ]
});

export const queryTenantsWithAttributesData = {
  method: 'POST',
  argumentUrl: '/api/cloud_tenants',
  requestUrl: '/api/cloud_tenants?expand=resources&attributes=flavors%2Csecurity_groups%2Cdefault_security_group',
  response: { data: tenantsWithAttributes }
};

export const flavorMappings = Immutable([
  { source_href_slug: 'vms/42000000000017', destination_href_slug: 'cloud_tenants/42000000000003' },
  { source_href_slug: 'vms/42000000000006', destination_href_slug: 'cloud_tenants/42000000000003' }
]);

export const bestFitFlavors = Immutable({
  results: [
    {
      source_href_slug: 'vms/42000000000017',
      best_fit: 'flavors/42000000000005',
      all_fit: ['flavors/42000000000005', 'flavors/42000000000006', 'flavors/42000000000002', 'flavors/42000000000004']
    },
    {
      source_href_slug: 'vms/42000000000006',
      best_fit: 'flavors/42000000000002',
      all_fit: ['flavors/42000000000002', 'flavors/42000000000004']
    }
  ]
});

export const processedBestFitFlavors = Immutable({
  editingPlan: null,
  vmBestFitFlavors: [
    {
      flavor_id: '42000000000005',
      tenant_id: '42000000000003',
      vm_id: '42000000000017'
    },
    {
      flavor_id: '42000000000002',
      tenant_id: '42000000000003',
      vm_id: '42000000000006'
    }
  ]
});

export const bestFitFlavorData = {
  method: 'POST',
  url: '/api/transformation_mappings',
  response: { data: bestFitFlavors }
};

export const instancePropertiesRows = [
  {
    name: 'Database-01',
    status: 'ok',
    reason: 'VM available for migration',
    cluster: 'V2V_Cluster',
    path: 'Obsolete vCenter/V2V-DC/V2V',
    allocated_size: '61.20GB',
    id: '42000000000017',
    ems_cluster_id: '42000000000001',
    valid: true,
    osp_security_group: {},
    osp_flavor: {}
  },
  {
    name: 'fdupont-test-migration',
    status: 'ok',
    reason: 'VM available for migration',
    cluster: 'V2V_Cluster',
    path: 'Obsolete vCenter/V2V-DC',
    allocated_size: '17.18GB',
    id: '42000000000006',
    ems_cluster_id: '42000000000001',
    valid: true,
    osp_security_group: {},
    osp_flavor: {}
  }
];
