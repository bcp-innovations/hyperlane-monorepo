'use strict';
// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               unknown
// source: hyperlane/core/interchain_security/v1/query.proto
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.QueryClientImpl =
  exports.QueryServiceName =
  exports.QueryLatestAnnouncedStorageLocationResponse =
  exports.QueryLatestAnnouncedStorageLocationRequest =
  exports.QueryAnnouncedStorageLocationsResponse =
  exports.QueryAnnouncedStorageLocationsRequest =
  exports.QueryIsmResponse =
  exports.QueryIsmRequest =
  exports.QueryIsmsResponse =
  exports.QueryIsmsRequest =
  exports.protobufPackage =
    void 0;
/* eslint-disable */
const minimal_1 = __importDefault(require('protobufjs/minimal'));
const pagination_1 = require('../../../../cosmos/base/query/v1beta1/pagination');
const any_1 = require('../../../../google/protobuf/any');
exports.protobufPackage = 'hyperlane.core.interchain_security.v1';
function createBaseQueryIsmsRequest() {
  return { pagination: undefined };
}
exports.QueryIsmsRequest = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    if (message.pagination !== undefined) {
      pagination_1.PageRequest.encode(
        message.pagination,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIsmsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.pagination = pagination_1.PageRequest.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      pagination: isSet(object.pagination)
        ? pagination_1.PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.pagination !== undefined) {
      obj.pagination = pagination_1.PageRequest.toJSON(message.pagination);
    }
    return obj;
  },
  create(base) {
    return exports.QueryIsmsRequest.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    const message = createBaseQueryIsmsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? pagination_1.PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};
function createBaseQueryIsmsResponse() {
  return { isms: [], pagination: undefined };
}
exports.QueryIsmsResponse = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    for (const v of message.isms) {
      any_1.Any.encode(v, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      pagination_1.PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIsmsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.isms.push(any_1.Any.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.pagination = pagination_1.PageResponse.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      isms: globalThis.Array.isArray(
        object === null || object === void 0 ? void 0 : object.isms,
      )
        ? object.isms.map((e) => any_1.Any.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? pagination_1.PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },
  toJSON(message) {
    var _a;
    const obj = {};
    if ((_a = message.isms) === null || _a === void 0 ? void 0 : _a.length) {
      obj.isms = message.isms.map((e) => any_1.Any.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = pagination_1.PageResponse.toJSON(message.pagination);
    }
    return obj;
  },
  create(base) {
    return exports.QueryIsmsResponse.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a;
    const message = createBaseQueryIsmsResponse();
    message.isms =
      ((_a = object.isms) === null || _a === void 0
        ? void 0
        : _a.map((e) => any_1.Any.fromPartial(e))) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? pagination_1.PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};
function createBaseQueryIsmRequest() {
  return { id: '' };
}
exports.QueryIsmRequest = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIsmRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { id: isSet(object.id) ? globalThis.String(object.id) : '' };
  },
  toJSON(message) {
    const obj = {};
    if (message.id !== '') {
      obj.id = message.id;
    }
    return obj;
  },
  create(base) {
    return exports.QueryIsmRequest.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a;
    const message = createBaseQueryIsmRequest();
    message.id = (_a = object.id) !== null && _a !== void 0 ? _a : '';
    return message;
  },
};
function createBaseQueryIsmResponse() {
  return { ism: undefined };
}
exports.QueryIsmResponse = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    if (message.ism !== undefined) {
      any_1.Any.encode(message.ism, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIsmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.ism = any_1.Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      ism: isSet(object.ism) ? any_1.Any.fromJSON(object.ism) : undefined,
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.ism !== undefined) {
      obj.ism = any_1.Any.toJSON(message.ism);
    }
    return obj;
  },
  create(base) {
    return exports.QueryIsmResponse.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    const message = createBaseQueryIsmResponse();
    message.ism =
      object.ism !== undefined && object.ism !== null
        ? any_1.Any.fromPartial(object.ism)
        : undefined;
    return message;
  },
};
function createBaseQueryAnnouncedStorageLocationsRequest() {
  return { mailbox_id: '', validator_address: '' };
}
exports.QueryAnnouncedStorageLocationsRequest = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    if (message.mailbox_id !== '') {
      writer.uint32(10).string(message.mailbox_id);
    }
    if (message.validator_address !== '') {
      writer.uint32(18).string(message.validator_address);
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAnnouncedStorageLocationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.mailbox_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.validator_address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      mailbox_id: isSet(object.mailbox_id)
        ? globalThis.String(object.mailbox_id)
        : '',
      validator_address: isSet(object.validator_address)
        ? globalThis.String(object.validator_address)
        : '',
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.mailbox_id !== '') {
      obj.mailbox_id = message.mailbox_id;
    }
    if (message.validator_address !== '') {
      obj.validator_address = message.validator_address;
    }
    return obj;
  },
  create(base) {
    return exports.QueryAnnouncedStorageLocationsRequest.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseQueryAnnouncedStorageLocationsRequest();
    message.mailbox_id =
      (_a = object.mailbox_id) !== null && _a !== void 0 ? _a : '';
    message.validator_address =
      (_b = object.validator_address) !== null && _b !== void 0 ? _b : '';
    return message;
  },
};
function createBaseQueryAnnouncedStorageLocationsResponse() {
  return { storage_locations: [] };
}
exports.QueryAnnouncedStorageLocationsResponse = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    for (const v of message.storage_locations) {
      writer.uint32(10).string(v);
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAnnouncedStorageLocationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.storage_locations.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      storage_locations: globalThis.Array.isArray(
        object === null || object === void 0
          ? void 0
          : object.storage_locations,
      )
        ? object.storage_locations.map((e) => globalThis.String(e))
        : [],
    };
  },
  toJSON(message) {
    var _a;
    const obj = {};
    if (
      (_a = message.storage_locations) === null || _a === void 0
        ? void 0
        : _a.length
    ) {
      obj.storage_locations = message.storage_locations;
    }
    return obj;
  },
  create(base) {
    return exports.QueryAnnouncedStorageLocationsResponse.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a;
    const message = createBaseQueryAnnouncedStorageLocationsResponse();
    message.storage_locations =
      ((_a = object.storage_locations) === null || _a === void 0
        ? void 0
        : _a.map((e) => e)) || [];
    return message;
  },
};
function createBaseQueryLatestAnnouncedStorageLocationRequest() {
  return { mailbox_id: '', validator_address: '' };
}
exports.QueryLatestAnnouncedStorageLocationRequest = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    if (message.mailbox_id !== '') {
      writer.uint32(10).string(message.mailbox_id);
    }
    if (message.validator_address !== '') {
      writer.uint32(18).string(message.validator_address);
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestAnnouncedStorageLocationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.mailbox_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.validator_address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      mailbox_id: isSet(object.mailbox_id)
        ? globalThis.String(object.mailbox_id)
        : '',
      validator_address: isSet(object.validator_address)
        ? globalThis.String(object.validator_address)
        : '',
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.mailbox_id !== '') {
      obj.mailbox_id = message.mailbox_id;
    }
    if (message.validator_address !== '') {
      obj.validator_address = message.validator_address;
    }
    return obj;
  },
  create(base) {
    return exports.QueryLatestAnnouncedStorageLocationRequest.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a, _b;
    const message = createBaseQueryLatestAnnouncedStorageLocationRequest();
    message.mailbox_id =
      (_a = object.mailbox_id) !== null && _a !== void 0 ? _a : '';
    message.validator_address =
      (_b = object.validator_address) !== null && _b !== void 0 ? _b : '';
    return message;
  },
};
function createBaseQueryLatestAnnouncedStorageLocationResponse() {
  return { storage_location: '' };
}
exports.QueryLatestAnnouncedStorageLocationResponse = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    if (message.storage_location !== '') {
      writer.uint32(10).string(message.storage_location);
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestAnnouncedStorageLocationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.storage_location = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      storage_location: isSet(object.storage_location)
        ? globalThis.String(object.storage_location)
        : '',
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.storage_location !== '') {
      obj.storage_location = message.storage_location;
    }
    return obj;
  },
  create(base) {
    return exports.QueryLatestAnnouncedStorageLocationResponse.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a;
    const message = createBaseQueryLatestAnnouncedStorageLocationResponse();
    message.storage_location =
      (_a = object.storage_location) !== null && _a !== void 0 ? _a : '';
    return message;
  },
};
exports.QueryServiceName = 'hyperlane.core.interchain_security.v1.Query';
class QueryClientImpl {
  constructor(rpc, opts) {
    this.service =
      (opts === null || opts === void 0 ? void 0 : opts.service) ||
      exports.QueryServiceName;
    this.rpc = rpc;
    this.Isms = this.Isms.bind(this);
    this.Ism = this.Ism.bind(this);
    this.AnnouncedStorageLocations = this.AnnouncedStorageLocations.bind(this);
    this.LatestAnnouncedStorageLocation =
      this.LatestAnnouncedStorageLocation.bind(this);
  }
  Isms(request) {
    const data = exports.QueryIsmsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, 'Isms', data);
    return promise.then((data) =>
      exports.QueryIsmsResponse.decode(minimal_1.default.Reader.create(data)),
    );
  }
  Ism(request) {
    const data = exports.QueryIsmRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, 'Ism', data);
    return promise.then((data) =>
      exports.QueryIsmResponse.decode(minimal_1.default.Reader.create(data)),
    );
  }
  AnnouncedStorageLocations(request) {
    const data =
      exports.QueryAnnouncedStorageLocationsRequest.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      'AnnouncedStorageLocations',
      data,
    );
    return promise.then((data) =>
      exports.QueryAnnouncedStorageLocationsResponse.decode(
        minimal_1.default.Reader.create(data),
      ),
    );
  }
  LatestAnnouncedStorageLocation(request) {
    const data =
      exports.QueryLatestAnnouncedStorageLocationRequest.encode(
        request,
      ).finish();
    const promise = this.rpc.request(
      this.service,
      'LatestAnnouncedStorageLocation',
      data,
    );
    return promise.then((data) =>
      exports.QueryLatestAnnouncedStorageLocationResponse.decode(
        minimal_1.default.Reader.create(data),
      ),
    );
  }
}
exports.QueryClientImpl = QueryClientImpl;
function isSet(value) {
  return value !== null && value !== undefined;
}
//# sourceMappingURL=query.js.map
