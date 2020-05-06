import React from 'react';
import MenuItem from '../menu-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

const assetSchemaJson = fs.readFileSync('./asset-schema.json', 'UTF8');
const schema = JSON.parse(assetSchemaJson);

const getNamespaces = () => {
  const namespaces = schema.namespaces.map((namespace) => {
    let clonedNamespace = JSON.parse(JSON.stringify(namespace));

    clonedNamespace.entities = namespace.entities.filter((entity) => {
      return !(isPrimitiveType(entity));
    });

    if (!clonedNamespace.entities)
      return null;

    return clonedNamespace;
  });

  return namespaces;
}

const flattenDerivedEntities = (node, nodes) => {
  nodes.push(node);

  node.derivedEntities.forEach((x) => {
    flattenDerivedEntities(x, nodes);
  });
}

const isPrimitiveType = (entity) => {
  if (
    entity.stereoType === 'Compound' ||
    entity.stereoType === 'CIMDatatype' ||
    entity.stereoType === 'enumeration' ||
    entity.stereoType === 'Primitive'
  ) {
    return true;
  }

  return false;
}

const getPackages = () => {
  const namespaces = getNamespaces();

  let entities = [];
  namespaces.forEach((namespace) => {
    if (!namespace.name)
      return;

    namespace.entities.forEach((entity) => {
      flattenDerivedEntities(entity, entities);
    });
  });

  const packages = sortEntitiesByNamespaces(entities);

  return packages;
}

const sortEntitiesByNamespaces = (entities) => {
  let packages = {};

  entities.forEach((x) => {
    if (!packages[x.packageName])
      packages[x.packageName] = [];

    packages[x.packageName].push(x);
  });

  return packages;
}

const SideMenu = () => {
  return (
    <div className="side-menu">
      <ul className="tree-view">
        {Object.keys(getPackages()).map((packageKey) => {
          return (
            <div key={packageKey}>
              <p>
                <FontAwesomeIcon icon={faFolder} /> {packageKey}
              </p>
              <MenuItem cimPackage={getPackages()[packageKey]} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default SideMenu;

