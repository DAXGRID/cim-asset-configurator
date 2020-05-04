import React from 'react';
import PropTypes from 'prop-types';

const getNamespace = (x) => {
  if (x.id && x.entities && x.entities.length > 0)
    return <li><ul>{entities(x)}</ul></li>;
}

const entities = (namespace) => {
  return namespace.entities.map((x, index) => {
    let entities = [];
    addNode(x, entities);

    return (
      <ul key={index}>
        {entities.map((x) => {
          return entityElement(x);
        })}
      </ul>
    );
  });
}



function addNode(node, nodes) {
  nodes.push(node);
  node.derivedEntities.forEach((x) => {
    addNode(x, nodes);
  });
}

const entityElement = (entity) => {
  return (
    <li title={entity.description} key={entity.id}>{entity.name}
      <ul>{attributes(entity)}</ul>
    </li>
  );
}

const attributes = (entity) => {
  return entity.attributes.map((x, i) => {
    return <li title={x.description} key={i}>{x.name}</li>;
  });
}

const MenuItem = ({ namespace }) => {
  return (
    <div>{getNamespace(namespace)}</div>
  );
}

MenuItem.propTypes = {
  namespace: PropTypes.object
};

export default MenuItem;
