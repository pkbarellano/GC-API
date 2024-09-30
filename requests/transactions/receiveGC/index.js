const create = require('./create.request');
const getReceiveGCFromVendor = require('./getReceiveGCFromVendor.request');
const createReceiveGCFromVendor = require('./createReceiveGCFromVendor.request');
const getUpdateReceiveGCFromVendor = require('./getUpdateReceiveGCFromVendor.request');
const updateReceiveGCFromVendor = require('./updateReceiveGCFromVendor.request');

module.exports = {
    create: create,
    getReceiveGCFromVendor: getReceiveGCFromVendor,
    createReceiveGCFromVendor: createReceiveGCFromVendor,
    getUpdateReceiveGCFromVendor: getUpdateReceiveGCFromVendor,
    updateReceiveGCFromVendor: updateReceiveGCFromVendor
};