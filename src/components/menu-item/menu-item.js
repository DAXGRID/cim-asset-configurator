import React from 'react';
import PropTypes from 'prop-types';

const entityElement = (entity) => {
  return (
    <li className="entity-title" title={entity.description} key={entity.id}>{entity.name}
      <ul>{attributes(entity)}</ul>
    </li>
  );
}

const attributes = (entity) => {
  return entity.attributes.map((x, i) => {
    return <li className="entity-attribute" title={x.description} key={i}>{x.name}</li>;
  });
}

const MenuItem = ({ cimPackage }) => {
  return (
    <div className="menu-item">
      {cimPackage.map(x => {
        return entityElement(x);
      })}
    </div>
  );
}

MenuItem.propTypes = {
  cimPackage: PropTypes.array
};

export default MenuItem;
