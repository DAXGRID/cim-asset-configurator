import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen, faCircle } from '@fortawesome/free-solid-svg-icons';

const entityElement = (entity, index) => {
  return (
    <div className="entity-element" key={index}>
      <li title={entity.description} key={entity.id}><FontAwesomeIcon icon={faFolderOpen} /> {entity.name}
        <ul className="attributes">{attributes(entity)}</ul>
      </li>
    </div>
  );
}

const attributes = (entity) => {
  return entity.attributes.map((x, i) => {
    return (
      <li className="entity-attribute" title={x.description} key={i}>
        <span className="attribute-bullet">
          <FontAwesomeIcon icon={faCircle} />
        </span>
        {x.name}
      </li>
    )
  });
}

const MenuItem = ({ cimPackage }) => {
  return (
    <div className="menu-item">
      {cimPackage.map((x, i) => {
        return entityElement(x, i);
      })}
    </div>
  );
}

MenuItem.propTypes = {
  cimPackage: PropTypes.array
};

export default MenuItem;
