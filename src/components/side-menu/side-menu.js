import React from 'react';
import MenuItem from '../menu-item';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

const assetSchemaJson = fs.readFileSync('./asset-schema.json', 'UTF8');
const schema = JSON.parse(assetSchemaJson);

const getNamespaces = () => {
  return schema.namespaces.map((namespace) => {
    let clonedNamespace = JSON.parse(JSON.stringify(namespace));

    clonedNamespace.entities = namespace.entities.filter((entity) => {
      return !(isPrimitiveType(entity));
    });

    if (!clonedNamespace.entities)
      return null;

    return clonedNamespace;
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

const SideMenu = () => {
  return (
    <div className="side-menu">
      <ul className="tree-view">
        {getNamespaces().map((x, i) => {
          return <MenuItem key={i} namespace={x} />;
        })}
      </ul>
    </div>
  );
}

export default SideMenu;

