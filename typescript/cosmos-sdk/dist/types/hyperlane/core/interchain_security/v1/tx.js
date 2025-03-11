'use strict';
// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               unknown
// source: hyperlane/core/interchain_security/v1/tx.proto
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MsgClientImpl =
  exports.MsgServiceName =
  exports.MsgAnnounceValidatorResponse =
  exports.MsgAnnounceValidator =
  exports.MsgCreateNoopIsmResponse =
  exports.MsgCreateNoopIsm =
  exports.MsgCreateMerkleRootMultisigIsmResponse =
  exports.MsgCreateMerkleRootMultisigIsm =
  exports.MsgCreateMessageIdMultisigIsmResponse =
  exports.MsgCreateMessageIdMultisigIsm =
  exports.protobufPackage =
    void 0;
/* eslint-disable */
const minimal_1 = __importDefault(require('protobufjs/minimal'));
exports.protobufPackage = 'hyperlane.core.interchain_security.v1';
function createBaseMsgCreateMessageIdMultisigIsm() {
  return { creator: '', validators: [], threshold: 0 };
}
exports.MsgCreateMessageIdMultisigIsm = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.validators) {
      writer.uint32(18).string(v);
    }
    if (message.threshold !== 0) {
      writer.uint32(24).uint32(message.threshold);
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateMessageIdMultisigIsm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.validators.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.threshold = reader.uint32();
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
      creator: isSet(object.creator) ? globalThis.String(object.creator) : '',
      validators: globalThis.Array.isArray(
        object === null || object === void 0 ? void 0 : object.validators,
      )
        ? object.validators.map((e) => globalThis.String(e))
        : [],
      threshold: isSet(object.threshold)
        ? globalThis.Number(object.threshold)
        : 0,
    };
  },
  toJSON(message) {
    var _a;
    const obj = {};
    if (message.creator !== '') {
      obj.creator = message.creator;
    }
    if (
      (_a = message.validators) === null || _a === void 0 ? void 0 : _a.length
    ) {
      obj.validators = message.validators;
    }
    if (message.threshold !== 0) {
      obj.threshold = Math.round(message.threshold);
    }
    return obj;
  },
  create(base) {
    return exports.MsgCreateMessageIdMultisigIsm.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseMsgCreateMessageIdMultisigIsm();
    message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : '';
    message.validators =
      ((_b = object.validators) === null || _b === void 0
        ? void 0
        : _b.map((e) => e)) || [];
    message.threshold =
      (_c = object.threshold) !== null && _c !== void 0 ? _c : 0;
    return message;
  },
};
function createBaseMsgCreateMessageIdMultisigIsmResponse() {
  return { id: '' };
}
exports.MsgCreateMessageIdMultisigIsmResponse = {
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
    const message = createBaseMsgCreateMessageIdMultisigIsmResponse();
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
    return exports.MsgCreateMessageIdMultisigIsmResponse.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a;
    const message = createBaseMsgCreateMessageIdMultisigIsmResponse();
    message.id = (_a = object.id) !== null && _a !== void 0 ? _a : '';
    return message;
  },
};
function createBaseMsgCreateMerkleRootMultisigIsm() {
  return { creator: '', validators: [], threshold: 0 };
}
exports.MsgCreateMerkleRootMultisigIsm = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.validators) {
      writer.uint32(18).string(v);
    }
    if (message.threshold !== 0) {
      writer.uint32(24).uint32(message.threshold);
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateMerkleRootMultisigIsm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.validators.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.threshold = reader.uint32();
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
      creator: isSet(object.creator) ? globalThis.String(object.creator) : '',
      validators: globalThis.Array.isArray(
        object === null || object === void 0 ? void 0 : object.validators,
      )
        ? object.validators.map((e) => globalThis.String(e))
        : [],
      threshold: isSet(object.threshold)
        ? globalThis.Number(object.threshold)
        : 0,
    };
  },
  toJSON(message) {
    var _a;
    const obj = {};
    if (message.creator !== '') {
      obj.creator = message.creator;
    }
    if (
      (_a = message.validators) === null || _a === void 0 ? void 0 : _a.length
    ) {
      obj.validators = message.validators;
    }
    if (message.threshold !== 0) {
      obj.threshold = Math.round(message.threshold);
    }
    return obj;
  },
  create(base) {
    return exports.MsgCreateMerkleRootMultisigIsm.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a, _b, _c;
    const message = createBaseMsgCreateMerkleRootMultisigIsm();
    message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : '';
    message.validators =
      ((_b = object.validators) === null || _b === void 0
        ? void 0
        : _b.map((e) => e)) || [];
    message.threshold =
      (_c = object.threshold) !== null && _c !== void 0 ? _c : 0;
    return message;
  },
};
function createBaseMsgCreateMerkleRootMultisigIsmResponse() {
  return { id: '' };
}
exports.MsgCreateMerkleRootMultisigIsmResponse = {
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
    const message = createBaseMsgCreateMerkleRootMultisigIsmResponse();
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
    return exports.MsgCreateMerkleRootMultisigIsmResponse.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a;
    const message = createBaseMsgCreateMerkleRootMultisigIsmResponse();
    message.id = (_a = object.id) !== null && _a !== void 0 ? _a : '';
    return message;
  },
};
function createBaseMsgCreateNoopIsm() {
  return { creator: '' };
}
exports.MsgCreateNoopIsm = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateNoopIsm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.creator = reader.string();
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
      creator: isSet(object.creator) ? globalThis.String(object.creator) : '',
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.creator !== '') {
      obj.creator = message.creator;
    }
    return obj;
  },
  create(base) {
    return exports.MsgCreateNoopIsm.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a;
    const message = createBaseMsgCreateNoopIsm();
    message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : '';
    return message;
  },
};
function createBaseMsgCreateNoopIsmResponse() {
  return { id: '' };
}
exports.MsgCreateNoopIsmResponse = {
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
    const message = createBaseMsgCreateNoopIsmResponse();
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
    return exports.MsgCreateNoopIsmResponse.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a;
    const message = createBaseMsgCreateNoopIsmResponse();
    message.id = (_a = object.id) !== null && _a !== void 0 ? _a : '';
    return message;
  },
};
function createBaseMsgAnnounceValidator() {
  return {
    validator: '',
    storage_location: '',
    signature: '',
    mailbox_id: '',
    creator: '',
  };
}
exports.MsgAnnounceValidator = {
  encode(message, writer = minimal_1.default.Writer.create()) {
    if (message.validator !== '') {
      writer.uint32(10).string(message.validator);
    }
    if (message.storage_location !== '') {
      writer.uint32(18).string(message.storage_location);
    }
    if (message.signature !== '') {
      writer.uint32(26).string(message.signature);
    }
    if (message.mailbox_id !== '') {
      writer.uint32(34).string(message.mailbox_id);
    }
    if (message.creator !== '') {
      writer.uint32(42).string(message.creator);
    }
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAnnounceValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.validator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.storage_location = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.signature = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.mailbox_id = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.creator = reader.string();
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
      validator: isSet(object.validator)
        ? globalThis.String(object.validator)
        : '',
      storage_location: isSet(object.storage_location)
        ? globalThis.String(object.storage_location)
        : '',
      signature: isSet(object.signature)
        ? globalThis.String(object.signature)
        : '',
      mailbox_id: isSet(object.mailbox_id)
        ? globalThis.String(object.mailbox_id)
        : '',
      creator: isSet(object.creator) ? globalThis.String(object.creator) : '',
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.validator !== '') {
      obj.validator = message.validator;
    }
    if (message.storage_location !== '') {
      obj.storage_location = message.storage_location;
    }
    if (message.signature !== '') {
      obj.signature = message.signature;
    }
    if (message.mailbox_id !== '') {
      obj.mailbox_id = message.mailbox_id;
    }
    if (message.creator !== '') {
      obj.creator = message.creator;
    }
    return obj;
  },
  create(base) {
    return exports.MsgAnnounceValidator.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(object) {
    var _a, _b, _c, _d, _e;
    const message = createBaseMsgAnnounceValidator();
    message.validator =
      (_a = object.validator) !== null && _a !== void 0 ? _a : '';
    message.storage_location =
      (_b = object.storage_location) !== null && _b !== void 0 ? _b : '';
    message.signature =
      (_c = object.signature) !== null && _c !== void 0 ? _c : '';
    message.mailbox_id =
      (_d = object.mailbox_id) !== null && _d !== void 0 ? _d : '';
    message.creator = (_e = object.creator) !== null && _e !== void 0 ? _e : '';
    return message;
  },
};
function createBaseMsgAnnounceValidatorResponse() {
  return {};
}
exports.MsgAnnounceValidatorResponse = {
  encode(_, writer = minimal_1.default.Writer.create()) {
    return writer;
  },
  decode(input, length) {
    const reader =
      input instanceof minimal_1.default.Reader
        ? input
        : minimal_1.default.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAnnounceValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  create(base) {
    return exports.MsgAnnounceValidatorResponse.fromPartial(
      base !== null && base !== void 0 ? base : {},
    );
  },
  fromPartial(_) {
    const message = createBaseMsgAnnounceValidatorResponse();
    return message;
  },
};
exports.MsgServiceName = 'hyperlane.core.interchain_security.v1.Msg';
class MsgClientImpl {
  constructor(rpc, opts) {
    this.service =
      (opts === null || opts === void 0 ? void 0 : opts.service) ||
      exports.MsgServiceName;
    this.rpc = rpc;
    this.CreateMessageIdMultisigIsm =
      this.CreateMessageIdMultisigIsm.bind(this);
    this.CreateMerkleRootMultisigIsm =
      this.CreateMerkleRootMultisigIsm.bind(this);
    this.CreateNoopIsm = this.CreateNoopIsm.bind(this);
    this.AnnounceValidator = this.AnnounceValidator.bind(this);
  }
  CreateMessageIdMultisigIsm(request) {
    const data = exports.MsgCreateMessageIdMultisigIsm.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      'CreateMessageIdMultisigIsm',
      data,
    );
    return promise.then((data) =>
      exports.MsgCreateMessageIdMultisigIsmResponse.decode(
        minimal_1.default.Reader.create(data),
      ),
    );
  }
  CreateMerkleRootMultisigIsm(request) {
    const data =
      exports.MsgCreateMerkleRootMultisigIsm.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      'CreateMerkleRootMultisigIsm',
      data,
    );
    return promise.then((data) =>
      exports.MsgCreateMerkleRootMultisigIsmResponse.decode(
        minimal_1.default.Reader.create(data),
      ),
    );
  }
  CreateNoopIsm(request) {
    const data = exports.MsgCreateNoopIsm.encode(request).finish();
    const promise = this.rpc.request(this.service, 'CreateNoopIsm', data);
    return promise.then((data) =>
      exports.MsgCreateNoopIsmResponse.decode(
        minimal_1.default.Reader.create(data),
      ),
    );
  }
  AnnounceValidator(request) {
    const data = exports.MsgAnnounceValidator.encode(request).finish();
    const promise = this.rpc.request(this.service, 'AnnounceValidator', data);
    return promise.then((data) =>
      exports.MsgAnnounceValidatorResponse.decode(
        minimal_1.default.Reader.create(data),
      ),
    );
  }
}
exports.MsgClientImpl = MsgClientImpl;
function isSet(value) {
  return value !== null && value !== undefined;
}
//# sourceMappingURL=tx.js.map
