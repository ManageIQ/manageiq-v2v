import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverlayTrigger, Popover, Button, Icon, ListGroup, ListGroupItem } from 'patternfly-react';

const BreadcrumbPageSwitcher = ({ items, activeHref }) => {
  const popover = (
    <Popover id="breadcrumb-switcher-popover">
      <ListGroup style={{ marginBottom: 0, borderTop: 0 }}>
        {items.map(({ name, href }) => (
          <ListGroupItem className={classNames('no-border', { active: href === activeHref })} href={href} key={href}>
            {name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Popover>
  );

  return (
    <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={popover}>
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
  activeHref: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, href: PropTypes.string })).isRequired
};

export default BreadcrumbPageSwitcher;
