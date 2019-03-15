import _ from 'underscore';
import log from './log';
import PluginLoader from './plugins';

const ShopsDictionary = {
  data: {},
  properties: {},
  plugins: {},
  getProperty: key => ShopsDictionary.properties[key],
  setProperty: (key, value) => {
    ShopsDictionary.properties[key] = value;
  },
  getData: key => ShopsDictionary.data[key],
  setData: (key, value) => {
    ShopsDictionary.data[key] = value;
  },
  idToString: (id) => {
    if (id in ShopsDictionary.data) {
      return ShopsDictionary.data[id].key;
    }

    return null;
  },
  idToName: (id) => {
    if (id in ShopsDictionary.data) {
      return ShopsDictionary.data[id].name;
    }

    return null;
  },
  stringToId: (name) => {
    if (name in ShopsDictionary.data) {
      return ShopsDictionary.data[name].id;
    }

    log.error(`${name} not found in the ShopsDictionary.`);
    return 'null';
  },
  exists: id => id in ShopsDictionary.data,
  setPlugins: (directory) => {
    ShopsDictionary.plugins = PluginLoader(directory);
  },
  isShopNPC: npcId => ShopsDictionary.data[npcId],
  getItems: id => ShopsDictionary.data[id].items,
  getItemCount: id => ShopsDictionary.getItems(id).length,

  /**
   * Reason for the shopId variable is because some shops
   * may have different prices for the same item. A way to
   * spice up the game.
   */
  getCost: (shopId, itemId, count) => {
    const shop = ShopsDictionary.data[shopId];
    const index = shop.items.indexOf(itemId);

    if (!index) {
      return -1;
    }

    return shop.prices[index] * count;
  },

  getCount: (id) => {
    const {
      count,
    } = ShopsDictionary.data[id];
    const counts = [];

    if (_.isArray(count)) {
      return count;
    }

    for (let i = 0; i < ShopsDictionary.getItemCount(id); i += 1) {
      counts.push(count);
    }

    return counts;
  },
};

export default ShopsDictionary;
