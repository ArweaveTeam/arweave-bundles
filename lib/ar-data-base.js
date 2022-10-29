"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignatureData = exports.DataItemJson = void 0;
/**
 * Serialized format of a DataItem. Json.
 */
class DataItemJson {
    constructor() {
        this.owner = "";
        this.target = "";
        this.nonce = "";
        this.tags = [];
        this.data = "";
        this.signature = "";
        this.signatureType = 1;
        this.id = "";
    }
}
exports.DataItemJson = DataItemJson;
/**
 * Return the message that should be signed to produce a valid signature
 *
 * @param deps
 * @param d
 */
function getSignatureData(deps, d) {
    return __awaiter(this, void 0, void 0, function* () {
        if (d.signatureType) {
            return deps.deepHash([
                deps.utils.stringToBuffer("dataitem"),
                deps.utils.stringToBuffer("1"),
                deps.utils.stringToBuffer(d.signatureType.toString()),
                deps.utils.b64UrlToBuffer(d.owner),
                deps.utils.b64UrlToBuffer(d.target),
                deps.utils.b64UrlToBuffer(d.nonce),
                serializeTags(deps, d.tags),
                deps.utils.b64UrlToBuffer(d.data),
            ]);
        }
        return deps.deepHash([
            deps.utils.stringToBuffer("dataitem"),
            deps.utils.stringToBuffer("1"),
            deps.utils.b64UrlToBuffer(d.owner),
            deps.utils.b64UrlToBuffer(d.target),
            deps.utils.b64UrlToBuffer(d.nonce),
            [
                ...d.tags.map((tag) => [
                    deps.utils.b64UrlToBuffer(tag.name),
                    deps.utils.b64UrlToBuffer(tag.value),
                ]),
            ],
            deps.utils.b64UrlToBuffer(d.data),
        ]);
    });
}
exports.getSignatureData = getSignatureData;
function serializeTags(deps, tags) {
    let byt = Buffer.from("");
    // we first add the count of tag elements (https://avro.apache.org/docs/1.11.1/specification/#arrays-1)
    byt = Buffer.concat([byt, Buffer.from([zigzag_encode(tags.length)])]);
    // each tag record is encoded following https://avro.apache.org/docs/1.11.1/specification/#arrays-1
    for (let tag of tags) {
        let name = Buffer.from(tag.name);
        let value = Buffer.from(tag.value);
        byt = Buffer.concat([byt, Buffer.from([zigzag_encode(name.byteLength)])]);
        byt = Buffer.concat([byt, name]);
        byt = Buffer.concat([byt, Buffer.from([zigzag_encode(value.byteLength)])]);
        byt = Buffer.concat([byt, value]);
    }
    // we terminate it with a 0 based on https://avro.apache.org/docs/1.11.1/specification/#arrays-1
    byt = Buffer.concat([byt, Buffer.from([zigzag_encode(0)])]);
    return byt;
}
function zigzag_encode(i) {
    return (i >> 31) ^ (i << 1);
}
