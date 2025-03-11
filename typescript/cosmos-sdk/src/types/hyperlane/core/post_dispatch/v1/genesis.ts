// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               unknown
// source: hyperlane/core/post_dispatch/v1/genesis.proto

/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';

import {
  GasOracle,
  InterchainGasPaymaster,
  MerkleTreeHook,
  NoopHook,
} from './types';

export const protobufPackage = 'hyperlane.core.post_dispatch.v1';

/** GenesisState defines the post dispatch submodule's genesis state. */
export interface GenesisState {
  igps: InterchainGasPaymaster[];
  igp_gas_configs: DestinationGasConfigGenesisWrapper[];
  merkle_tree_hooks: MerkleTreeHook[];
  noop_hooks: NoopHook[];
}

/** DestinationGasConfigGenesisWrapper ... */
export interface DestinationGasConfigGenesisWrapper {
  /** remote_domain ... */
  remote_domain: number;
  /** gas_oracle ... */
  gas_oracle?: GasOracle | undefined;
  /** gas_overhead ... */
  gas_overhead: string;
  /** igp_id is required for the Genesis handling. */
  igp_id: string;
}

function createBaseGenesisState(): GenesisState {
  return {
    igps: [],
    igp_gas_configs: [],
    merkle_tree_hooks: [],
    noop_hooks: [],
  };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.igps) {
      InterchainGasPaymaster.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.igp_gas_configs) {
      DestinationGasConfigGenesisWrapper.encode(
        v!,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    for (const v of message.merkle_tree_hooks) {
      MerkleTreeHook.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.noop_hooks) {
      NoopHook.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.igps.push(
            InterchainGasPaymaster.decode(reader, reader.uint32()),
          );
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.igp_gas_configs.push(
            DestinationGasConfigGenesisWrapper.decode(reader, reader.uint32()),
          );
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.merkle_tree_hooks.push(
            MerkleTreeHook.decode(reader, reader.uint32()),
          );
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.noop_hooks.push(NoopHook.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      igps: globalThis.Array.isArray(object?.igps)
        ? object.igps.map((e: any) => InterchainGasPaymaster.fromJSON(e))
        : [],
      igp_gas_configs: globalThis.Array.isArray(object?.igp_gas_configs)
        ? object.igp_gas_configs.map((e: any) =>
            DestinationGasConfigGenesisWrapper.fromJSON(e),
          )
        : [],
      merkle_tree_hooks: globalThis.Array.isArray(object?.merkle_tree_hooks)
        ? object.merkle_tree_hooks.map((e: any) => MerkleTreeHook.fromJSON(e))
        : [],
      noop_hooks: globalThis.Array.isArray(object?.noop_hooks)
        ? object.noop_hooks.map((e: any) => NoopHook.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.igps?.length) {
      obj.igps = message.igps.map((e) => InterchainGasPaymaster.toJSON(e));
    }
    if (message.igp_gas_configs?.length) {
      obj.igp_gas_configs = message.igp_gas_configs.map((e) =>
        DestinationGasConfigGenesisWrapper.toJSON(e),
      );
    }
    if (message.merkle_tree_hooks?.length) {
      obj.merkle_tree_hooks = message.merkle_tree_hooks.map((e) =>
        MerkleTreeHook.toJSON(e),
      );
    }
    if (message.noop_hooks?.length) {
      obj.noop_hooks = message.noop_hooks.map((e) => NoopHook.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(
    base?: I,
  ): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I,
  ): GenesisState {
    const message = createBaseGenesisState();
    message.igps =
      object.igps?.map((e) => InterchainGasPaymaster.fromPartial(e)) || [];
    message.igp_gas_configs =
      object.igp_gas_configs?.map((e) =>
        DestinationGasConfigGenesisWrapper.fromPartial(e),
      ) || [];
    message.merkle_tree_hooks =
      object.merkle_tree_hooks?.map((e) => MerkleTreeHook.fromPartial(e)) || [];
    message.noop_hooks =
      object.noop_hooks?.map((e) => NoopHook.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDestinationGasConfigGenesisWrapper(): DestinationGasConfigGenesisWrapper {
  return {
    remote_domain: 0,
    gas_oracle: undefined,
    gas_overhead: '',
    igp_id: '0',
  };
}

export const DestinationGasConfigGenesisWrapper = {
  encode(
    message: DestinationGasConfigGenesisWrapper,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.remote_domain !== 0) {
      writer.uint32(8).uint32(message.remote_domain);
    }
    if (message.gas_oracle !== undefined) {
      GasOracle.encode(message.gas_oracle, writer.uint32(18).fork()).ldelim();
    }
    if (message.gas_overhead !== '') {
      writer.uint32(26).string(message.gas_overhead);
    }
    if (message.igp_id !== '0') {
      writer.uint32(32).uint64(message.igp_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): DestinationGasConfigGenesisWrapper {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDestinationGasConfigGenesisWrapper();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.remote_domain = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.gas_oracle = GasOracle.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.gas_overhead = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.igp_id = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DestinationGasConfigGenesisWrapper {
    return {
      remote_domain: isSet(object.remote_domain)
        ? globalThis.Number(object.remote_domain)
        : 0,
      gas_oracle: isSet(object.gas_oracle)
        ? GasOracle.fromJSON(object.gas_oracle)
        : undefined,
      gas_overhead: isSet(object.gas_overhead)
        ? globalThis.String(object.gas_overhead)
        : '',
      igp_id: isSet(object.igp_id) ? globalThis.String(object.igp_id) : '0',
    };
  },

  toJSON(message: DestinationGasConfigGenesisWrapper): unknown {
    const obj: any = {};
    if (message.remote_domain !== 0) {
      obj.remote_domain = Math.round(message.remote_domain);
    }
    if (message.gas_oracle !== undefined) {
      obj.gas_oracle = GasOracle.toJSON(message.gas_oracle);
    }
    if (message.gas_overhead !== '') {
      obj.gas_overhead = message.gas_overhead;
    }
    if (message.igp_id !== '0') {
      obj.igp_id = message.igp_id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DestinationGasConfigGenesisWrapper>, I>>(
    base?: I,
  ): DestinationGasConfigGenesisWrapper {
    return DestinationGasConfigGenesisWrapper.fromPartial(base ?? ({} as any));
  },
  fromPartial<
    I extends Exact<DeepPartial<DestinationGasConfigGenesisWrapper>, I>,
  >(object: I): DestinationGasConfigGenesisWrapper {
    const message = createBaseDestinationGasConfigGenesisWrapper();
    message.remote_domain = object.remote_domain ?? 0;
    message.gas_oracle =
      object.gas_oracle !== undefined && object.gas_oracle !== null
        ? GasOracle.fromPartial(object.gas_oracle)
        : undefined;
    message.gas_overhead = object.gas_overhead ?? '';
    message.igp_id = object.igp_id ?? '0';
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

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
