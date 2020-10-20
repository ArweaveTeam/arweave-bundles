"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var __1 = __importDefault(require(".."));
// Import deps from Arweave-Js
var arweave_1 = __importDefault(require("arweave"));
var deepHash_1 = __importDefault(require("arweave/node/lib/deepHash"));
var fs_1 = require("fs");
// Just used for some checks.
var _arweave = arweave_1.default.init({
    host: "arweave.net",
    port: "443",
    protocol: "https",
});
var wallet0 = JSON.parse(fs_1.readFileSync(path.join(__dirname, "test_key0.json")).toString());
var wallet1 = JSON.parse(fs_1.readFileSync(path.join(__dirname, "test_key1.json")).toString());
var TEST_STRING = "HELLOWORLD_TEST_STRING";
var TEST_TAGS = [
    { name: "MyTag", value: "0" },
    { name: "OtherTag", value: "Foo" },
    { name: "MyTag", value: "1" },
];
var VALID_BASE64U = "LS0t";
var INVALID_BASE64U = "LS0t*&";
var deps = {
    utils: arweave_1.default.utils,
    crypto: arweave_1.default.crypto,
    deepHash: deepHash_1.default,
};
var Data = __1.default(deps);
describe("Data API - basic", function () {
    it("should encode and decode string data", function () {
        return __awaiter(this, void 0, void 0, function () {
            var item, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Data.createData({ data: TEST_STRING }, wallet0)];
                    case 1:
                        item = _b.sent();
                        expect(item.data).not.toBe(!TEST_STRING);
                        _a = expect;
                        return [4 /*yield*/, Data.decodeData(item, { string: true })];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).toBe(TEST_STRING);
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe("Data API - verification", function () {
    it("should verify a valid signed DataItem", function () {
        return __awaiter(this, void 0, void 0, function () {
            var item0, signed, verified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Data.createData({ data: TEST_STRING, tags: TEST_TAGS }, wallet0)];
                    case 1:
                        item0 = _a.sent();
                        return [4 /*yield*/, Data.sign(item0, wallet0)];
                    case 2:
                        signed = _a.sent();
                        return [4 /*yield*/, Data.verify(signed)];
                    case 3:
                        verified = _a.sent();
                        expect(verified).toBe(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should fail to verify a DataItem with no signature or id", function () {
        return __awaiter(this, void 0, void 0, function () {
            var item0, _a, signed, _b, signed2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, Data.createData({ data: "TESTSTRINGA" }, wallet0)];
                    case 1:
                        item0 = _d.sent();
                        _a = expect;
                        return [4 /*yield*/, Data.verify(item0)];
                    case 2:
                        _a.apply(void 0, [_d.sent()]).toBe(false);
                        return [4 /*yield*/, Data.sign(item0, wallet0)];
                    case 3:
                        signed = _d.sent();
                        signed.id = "";
                        _b = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 4:
                        _b.apply(void 0, [_d.sent()]).toBe(false);
                        return [4 /*yield*/, Data.sign(item0, wallet0)];
                    case 5:
                        signed2 = _d.sent();
                        signed.signature = "";
                        _c = expect;
                        return [4 /*yield*/, Data.verify(signed2)];
                    case 6:
                        _c.apply(void 0, [_d.sent()]).toBe(false);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should fail to verify a DataItem with a invalid owner", function () {
        return __awaiter(this, void 0, void 0, function () {
            var item0, signed, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Data.createData({ data: "TESTSTRINGA" }, wallet0)];
                    case 1:
                        item0 = _c.sent();
                        return [4 /*yield*/, Data.sign(item0, wallet0)];
                    case 2:
                        signed = _c.sent();
                        _a = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 3:
                        _a.apply(void 0, [_c.sent()]).toBe(true);
                        signed.owner = wallet1.n;
                        _b = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 4:
                        _b.apply(void 0, [_c.sent()]).toBe(false);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should fail to verify a DataItem with a modified or invalid id or signature", function () {
        return __awaiter(this, void 0, void 0, function () {
            var item0, signed, correctId, _a, _b, _c, _d, signed2, correctSignature, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, Data.createData({ data: "TESTSTRINGA" }, wallet0)];
                    case 1:
                        item0 = _j.sent();
                        return [4 /*yield*/, Data.sign(item0, wallet0)];
                    case 2:
                        signed = _j.sent();
                        correctId = signed.id;
                        signed.id = "XXXX" + signed.id.substr(4);
                        _a = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 3:
                        _a.apply(void 0, [_j.sent()]).toBe(false);
                        signed.id = "FOO";
                        _b = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 4:
                        _b.apply(void 0, [_j.sent()]).toBe(false);
                        signed.id = INVALID_BASE64U;
                        _c = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 5:
                        _c.apply(void 0, [_j.sent()]).toBe(false);
                        signed.id = correctId;
                        _d = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 6:
                        _d.apply(void 0, [_j.sent()]).toBe(true);
                        return [4 /*yield*/, Data.sign(item0, wallet0)];
                    case 7:
                        signed2 = _j.sent();
                        correctSignature = signed2.signature;
                        signed2.signature = "";
                        _e = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 8:
                        _e.apply(void 0, [_j.sent()]).toBe(false);
                        signed2.signature = VALID_BASE64U;
                        _f = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 9:
                        _f.apply(void 0, [_j.sent()]).toBe(false);
                        signed2.signature = INVALID_BASE64U;
                        _g = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 10:
                        _g.apply(void 0, [_j.sent()]).toBe(false);
                        signed2.signature = correctSignature;
                        _h = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 11:
                        _h.apply(void 0, [_j.sent()]).toBe(true);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should fail to verify a DataItem with a modified nonce", function () {
        return __awaiter(this, void 0, void 0, function () {
            var item0, signed, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Data.createData({ data: "TESTSTRINGA", nonce: VALID_BASE64U }, wallet0)];
                    case 1:
                        item0 = _b.sent();
                        return [4 /*yield*/, Data.sign(item0, wallet0)];
                    case 2:
                        signed = _b.sent();
                        signed.nonce = signed.nonce + VALID_BASE64U;
                        _a = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).toBe(false);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should fail to verify a DataItem with invalid Base64", function () {
        return __awaiter(this, void 0, void 0, function () {
            var item0, signed, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Data.createData({ data: "TESTSTRINGA", nonce: VALID_BASE64U }, wallet0)];
                    case 1:
                        item0 = _b.sent();
                        return [4 /*yield*/, Data.sign(item0, wallet0)];
                    case 2:
                        signed = _b.sent();
                        signed.data = INVALID_BASE64U;
                        _a = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).toBe(false);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should fail to verify a DataItem with modified tags", function () {
        return __awaiter(this, void 0, void 0, function () {
            var item0, signed, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Data.createData({ data: "TESTSTRINGA", tags: TEST_TAGS, nonce: VALID_BASE64U }, wallet0)];
                    case 1:
                        item0 = _c.sent();
                        return [4 /*yield*/, Data.sign(item0, wallet0)];
                    case 2:
                        signed = _c.sent();
                        _a = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 3:
                        _a.apply(void 0, [_c.sent()]).toBe(true);
                        signed.tags = signed.tags.slice(1);
                        _b = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 4:
                        _b.apply(void 0, [_c.sent()]).toBe(false);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("should fail to verify a DataItem with invalid tags", function () {
        return __awaiter(this, void 0, void 0, function () {
            var item0, signed, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Data.createData({ data: "TESTSTRINGA", tags: TEST_TAGS, nonce: VALID_BASE64U }, wallet0)];
                    case 1:
                        item0 = _b.sent();
                        return [4 /*yield*/, Data.sign(item0, wallet0)];
                    case 2:
                        signed = _b.sent();
                        signed.tags[0].name = INVALID_BASE64U;
                        _a = expect;
                        return [4 /*yield*/, Data.verify(signed)];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).toBe(false);
                        return [2 /*return*/];
                }
            });
        });
    });
    describe("Data API - Bundling", function () {
        it("should bundle a number of items", function () {
            return __awaiter(this, void 0, void 0, function () {
                var item0, signed0, item1, signed1, item2, signed2, bundle;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Data.createData({ data: "TESTSTRINGA", tags: TEST_TAGS, nonce: VALID_BASE64U }, wallet0)];
                        case 1:
                            item0 = _a.sent();
                            return [4 /*yield*/, Data.sign(item0, wallet0)];
                        case 2:
                            signed0 = _a.sent();
                            return [4 /*yield*/, Data.createData({ data: "TESTSTRINGB", tags: TEST_TAGS, nonce: VALID_BASE64U }, wallet0)];
                        case 3:
                            item1 = _a.sent();
                            return [4 /*yield*/, Data.sign(item0, wallet0)];
                        case 4:
                            signed1 = _a.sent();
                            return [4 /*yield*/, Data.createData({ data: "TESTSTRINGC", tags: TEST_TAGS, nonce: VALID_BASE64U }, wallet0)];
                        case 5:
                            item2 = _a.sent();
                            return [4 /*yield*/, Data.sign(item0, wallet0)];
                        case 6:
                            signed2 = _a.sent();
                            return [4 /*yield*/, Data.bundleData([signed0, signed1, signed2])];
                        case 7:
                            bundle = _a.sent();
                            expect(bundle.items).toBeInstanceOf(Array);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should unbundle a number of items", function () {
            return __awaiter(this, void 0, void 0, function () {
                var json, items;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            json = fs_1.readFileSync(path.join(__dirname, "bundle0.json")).toString();
                            return [4 /*yield*/, Data.unbundleData(json)];
                        case 1:
                            items = _a.sent();
                            expect(items.length).toBe(3);
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should unbundle and discard invalid items", function () {
            return __awaiter(this, void 0, void 0, function () {
                var json, items;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            json = fs_1.readFileSync(path.join(__dirname, "/bundle1-invaliditem0.json")).toString();
                            return [4 /*yield*/, Data.unbundleData(json)];
                        case 1:
                            items = _a.sent();
                            expect(items.length).toBe(2);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
//# sourceMappingURL=tests.spec.js.map