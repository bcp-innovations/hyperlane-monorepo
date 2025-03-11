// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               unknown
// source: hyperlane/core/v1/types.proto

/* eslint-disable */
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'hyperlane.core.v1';

/** Mailbox ... */
export interface Mailbox {
  id: string;
  /** owner ... */
  owner: string;
  /** message_sent ... */
  message_sent: number;
  /** message_received ... */
  message_received: number;
  /** default_ism ... */
  default_ism: string;
  /** default_hook */
  default_hook: string;
  /** required_hook */
  required_hook: string;
  /** domain */
  local_domain: number;
}

function createBaseMailbox(): Mailbox {
  return {
    id: '',
    owner: '',
    message_sent: 0,
    message_received: 0,
    default_ism: '',
    default_hook: '',
    required_hook: '',
    local_domain: 0,
  };
}

export const Mailbox = {
  encode(
    message: Mailbox,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner);
    }
    if (message.message_sent !== 0) {
      writer.uint32(24).uint32(message.message_sent);
    }
    if (message.message_received !== 0) {
      writer.uint32(32).uint32(message.message_received);
    }
    if (message.default_ism !== '') {
      writer.uint32(42).string(message.default_ism);
    }
    if (message.default_hook !== '') {
      writer.uint32(66).string(message.default_hook);
    }
    if (message.required_hook !== '') {
      writer.uint32(74).string(message.required_hook);
    }
    if (message.local_domain !== 0) {
      writer.uint32(80).uint32(message.local_domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Mailbox {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMailbox();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.message_sent = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.message_received = reader.uint32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.default_ism = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.default_hook = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.required_hook = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.local_domain = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Mailbox {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : '',
      owner: isSet(object.owner) ? globalThis.String(object.owner) : '',
      message_sent: isSet(object.message_sent)
        ? globalThis.Number(object.message_sent)
        : 0,
      message_received: isSet(object.message_received)
        ? globalThis.Number(object.message_received)
        : 0,
      default_ism: isSet(object.default_ism)
        ? globalThis.String(object.default_ism)
        : '',
      default_hook: isSet(object.default_hook)
        ? globalThis.String(object.default_hook)
        : '',
      required_hook: isSet(object.required_hook)
        ? globalThis.String(object.required_hook)
        : '',
      local_domain: isSet(object.local_domain)
        ? globalThis.Number(object.local_domain)
        : 0,
    };
  },

  toJSON(message: Mailbox): unknown {
    const obj: any = {};
    if (message.id !== '') {
      obj.id = message.id;
    }
    if (message.owner !== '') {
      obj.owner = message.owner;
    }
    if (message.message_sent !== 0) {
      obj.message_sent = Math.round(message.message_sent);
    }
    if (message.message_received !== 0) {
      obj.message_received = Math.round(message.message_received);
    }
    if (message.default_ism !== '') {
      obj.default_ism = message.default_ism;
    }
    if (message.default_hook !== '') {
      obj.default_hook = message.default_hook;
    }
    if (message.required_hook !== '') {
      obj.required_hook = message.required_hook;
    }
    if (message.local_domain !== 0) {
      obj.local_domain = Math.round(message.local_domain);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Mailbox>, I>>(base?: I): Mailbox {
    return Mailbox.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Mailbox>, I>>(object: I): Mailbox {
    const message = createBaseMailbox();
    message.id = object.id ?? '';
    message.owner = object.owner ?? '';
    message.message_sent = object.message_sent ?? 0;
    message.message_received = object.message_received ?? 0;
    message.default_ism = object.default_ism ?? '';
    message.default_hook = object.default_hook ?? '';
    message.required_hook = object.required_hook ?? '';
    message.local_domain = object.local_domain ?? 0;
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
  ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
