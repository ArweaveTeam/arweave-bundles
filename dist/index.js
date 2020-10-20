"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignatureData = exports.DataItemJson = exports.verify = exports.unpackTags = exports.decodeTagAt = exports.decodeTag = exports.decodeData = exports.sign = exports.create = void 0;
var ar_data_base_1 = require("./ar-data-base");
Object.defineProperty(exports, "getSignatureData", { enumerable: true, get: function () { return ar_data_base_1.getSignatureData; } });
Object.defineProperty(exports, "DataItemJson", { enumerable: true, get: function () { return ar_data_base_1.DataItemJson; } });
var ar_data_create_1 = require("./ar-data-create");
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return ar_data_create_1.createData; } });
Object.defineProperty(exports, "sign", { enumerable: true, get: function () { return ar_data_create_1.sign; } });
var ar_data_read_1 = require("./ar-data-read");
Object.defineProperty(exports, "decodeData", { enumerable: true, get: function () { return ar_data_read_1.decodeData; } });
Object.defineProperty(exports, "decodeTag", { enumerable: true, get: function () { return ar_data_read_1.decodeTag; } });
Object.defineProperty(exports, "decodeTagAt", { enumerable: true, get: function () { return ar_data_read_1.decodeTagAt; } });
Object.defineProperty(exports, "unpackTags", { enumerable: true, get: function () { return ar_data_read_1.unpackTags; } });
var ar_data_bundle_1 = require("./ar-data-bundle");
var ar_data_verify_1 = require("./ar-data-verify");
Object.defineProperty(exports, "verify", { enumerable: true, get: function () { return ar_data_verify_1.verify; } });
function ArweaveData(deps) {
    return {
        createData: function (opts, jwk) {
            return ar_data_create_1.createData(deps, opts, jwk);
        },
        sign: function (d, jwk) {
            return ar_data_create_1.sign(deps, d, jwk);
        },
        addTag: function (d, name, value) {
            return ar_data_create_1.addTag(deps, d, name, value);
        },
        verify: function (d) {
            return ar_data_verify_1.verify(deps, d);
        },
        decodeData: function (d, options) {
            if (options === void 0) { options = { string: false }; }
            return ar_data_read_1.decodeData(deps, d, options);
        },
        decodeTag: function (tag) {
            return ar_data_read_1.decodeTag(deps, tag);
        },
        decodeTagAt: function (d, index) {
            return ar_data_read_1.decodeTagAt(deps, d, index);
        },
        unpackTags: function (d) {
            return ar_data_read_1.unpackTags(deps, d);
        },
        bundleData: function (txData) {
            return ar_data_bundle_1.bundleData(deps, txData);
        },
        unbundleData: function (txData) {
            return ar_data_bundle_1.unbundleData(deps, txData);
        }
    };
}
exports.default = ArweaveData;
//# sourceMappingURL=index.js.map