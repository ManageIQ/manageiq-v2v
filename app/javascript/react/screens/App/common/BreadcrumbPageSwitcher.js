import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverlayTrigger, Popover, Button, Icon, ListGroup, ListGroupItem } from 'patternfly-react';

const BreadcrumbPageSwitcher = ({ activeHref }) => {
  const SwitcherItem = ({ name, href }) => (
    <ListGroupItem className={classNames('no-border', { active: href === activeHref })} href={href}>
      {name}
    </ListGroupItem>
  );
  SwitcherItem.propTypes = {
    name: PropTypes.string,
    href: PropTypes.string
  };

  const popoverContent = (
    <ListGroup style={{ marginBottom: 0, borderTop: 0 }}>
      <SwitcherItem name={__('Migration Plans')} href="#/plans" />
      <SwitcherItem name={__('Infrastructure Mappings')} href="#/mappings" />
      <SwitcherItem name={__('Migration Settings')} href="#/settings" />
    </ListGroup>
  );

  return (
    <OverlayTrigger
      rootClose
      trigger="click"
      placement="bottom"
      overlay={<Popover id="breadcrumb-switcher-popover">{popoverContent}</Popover>}
    >
      <Button
        style={{
          marginTop: '-2px',
          marginBottom: '-4px',
          marginLeft: '15px',
          height: '22px',
          width: '32px',
          lineHeight: '14px'
        }}
      >
        <Icon type="fa" name="exchange" />
      </Button>
    </OverlayTrigger>
  );
};

BreadcrumbPageSwitcher.propTypes = {
  activeHref: PropTypes.string
};

export default BreadcrumbPageSwitcher;
