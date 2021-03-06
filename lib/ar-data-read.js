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
exports.unpackTags = exports.decodeTagAt = exports.decodeTag = exports.decodeData = void 0;
/**
 * Decode the data content of a DataItem, either to a string or Uint8Array of bytes
 *
 * @param deps
 * @param d
 * @param param2
 */
function decodeData(deps, d, options = { string: false }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (options.string) {
            return deps.utils.b64UrlToString(d.data);
        }
        else {
            return deps.utils.b64UrlToBuffer(d.data);
        }
    });
}
exports.decodeData = decodeData;
/**
 * Decode an individual tag from a DataItem. Always decodes name and value as strings
 *
 * @param deps
 * @param tag
 */
function decodeTag(deps, tag) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            name: deps.utils.b64UrlToString(tag.name),
            value: deps.utils.b64UrlToString(tag.value),
        };
    });
}
exports.decodeTag = decodeTag;
/**
 * Decodes an individual tag from a DataItem at index. Throws if index is out of bounds.
 *
 */
function decodeTagAt(deps, d, index) {
    return __awaiter(this, void 0, void 0, function* () {
        if (d.tags.length < index - 1) {
            throw new Error(`Invalid index ${index} when tags array has ${d.tags.length} tags`);
        }
        return decodeTag(deps, d.tags[index]);
    });
}
exports.decodeTagAt = decodeTagAt;
/**
 * Unpack all tags in a DataItem into a key value map of
 *
 * `name: string | string[]`
 *
 * Always decodes as string values, maintains the order
 * the tags were seriliazed in when converting a collection
 * of tags with the same key.
 *
 * @param deps
 * @param d
 */
function unpackTags(deps, d) {
    return __awaiter(this, void 0, void 0, function* () {
        const tags = {};
        for (const tag of d.tags) {
            const { name, value } = yield decodeTag(deps, tag);
            if (!tags.hasOwnProperty(name)) {
                tags[name] = value;
                continue;
            }
            tags[name] = [...tags[name], value];
        }
        return tags;
    });
}
exports.unpackTags = unpackTags;
