import React from 'react';
import placeholder from '../../../../../assets/images/miq_v2v_ui/v2v-mappings-content@2x.png';

const InfrastructureMapping = () => (
  <div style={{ position: 'relative' }}>
    <img
      src={placeholder}
      style={{
        maxWidth: 'calc(100% + 40px)',
        height: 'auto',
        position: 'absolute',
        left: -20
      }}
      alt="infrastructure mappings list"
    />
  </div>
);
export default InfrastructureMapping;
