import React from 'react';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

const assetSchemaJson = fs.readFileSync('./../asset-schema.json', 'UTF8');
const schema = JSON.parse(assetSchemaJson);

const namespaces = () => {
    return schema.namespaces.map((x, i) => {

        x.entities = x.entities.filter((y) => {
            return !(isPrimitiveType(y));
        });

        if (x.id && x.entities && x.entities.length > 0)
            return <li key={i}>{x.id} <ul>{entities(x)}</ul></li>;
    });
}

const entities = (namespace) => {
    return namespace.entities.map((x) => {
        return <li title={x.description} key={x.id}>{x.name} <ul>{attributes(x)}</ul></li>;
    });
}

const attributes = (entity) => {
    return entity.attributes.map((x, i) => {
        return <li title={x.description} key={i}>{x.name}</li>;
    });
}

const isPrimitiveType = (x) => {
        if (x.stereoType === 'Compound'
            || x.stereoType === 'CIMDatatype'
            || x.stereoType === 'enumeration'
            || x.stereoType === 'Primitive')
            return true;

    return false;
}

const SideMenu = () => {
    return (
        <div className="side-menu">
          <ul className="tree-view">
            {namespaces()}
          </ul>
        </div>
    );
}

export default SideMenu;

