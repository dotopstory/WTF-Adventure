import log from './log';
import PluginLoader from './plugins';

const NpcsDictionary = {
  data: {},
  properties: {},
  plugins: {},
  getProperty: key => NpcsDictionary.properties[key],
  setProperty: (key, value) => {
    NpcsDictionary.properties[key] = value;
  },
  getData: key => NpcsDictionary.data[key],
  setData: (key, value) => {
    NpcsDictionary.data[key] = value;
  },
  idToString: (id) => {
    if (id in NpcsDictionary.data) {
      return NpcsDictionary.data[id].key;
    }

    return null;
  },
  idToName: (id) => {
    if (id in NpcsDictionary.data) {
      return NpcsDictionary.data[id].name;
    }

    return null;
  },
  stringToId: (name) => {
    if (name in NpcsDictionary.data) {
      return NpcsDictionary.data[name].id;
    }

    log.error(`${name} not found in the NpcsDictionary.`);
    return 'null';
  },
  exists: id => id in NpcsDictionary.data,
  setPlugins: (directory) => {
    NpcsDictionary.plugins = PluginLoader(directory);
  },
  getText: (id) => {
    if (NpcsDictionary.data && NpcsDictionary.data[id]) {
      return NpcsDictionary.data[id].text;
    }

    return null;
  },

  getType: (id) => {
    if (NpcsDictionary.data && NpcsDictionary.data[id]) {
      return NpcsDictionary.data[id].type;
    }

    return null;
  },
};

export default NpcsDictionary;
