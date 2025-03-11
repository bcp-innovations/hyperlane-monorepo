// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               unknown
// source: hyperlane/core/interchain_security/v1/query.proto

/* eslint-disable */
import _m0 from 'protobufjs/minimal';

import {
  PageRequest,
  PageResponse,
} from '../../../../cosmos/base/query/v1beta1/pagination';
import { Any } from '../../../../google/protobuf/any';

export const protobufPackage = 'hyperlane.core.interchain_security.v1';

/** QueryIsmsRequest ... */
export interface QueryIsmsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest | undefined;
}

/** QueryIsmsResponse ... */
export interface QueryIsmsResponse {
  isms: Any[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse | undefined;
}

/** QueryIsmRequest ... */
export interface QueryIsmRequest {
  id: string;
}

/** QueryIsmResponse ... */
export interface QueryIsmResponse {
  ism?: Any | undefined;
}

/** QueryAnnouncedStorageLocationsRequest ... */
export interface QueryAnnouncedStorageLocationsRequest {
  mailbox_id: string;
  validator_address: string;
}

/** QueryAnnouncedStorageLocationsResponse ... */
export interface QueryAnnouncedStorageLocationsResponse {
  storage_locations: string[];
}

/** QueryAnnouncedStorageLocationsRequest ... */
export interface QueryLatestAnnouncedStorageLocationRequest {
  mailbox_id: string;
  validator_address: string;
}

/** QueryAnnouncedStorageLocationsResponse ... */
export interface QueryLatestAnnouncedStorageLocationResponse {
  storage_location: string;
}

function createBaseQueryIsmsRequest(): QueryIsmsRequest {
  return { pagination: undefined };
}

export const QueryIsmsRequest = {
  encode(
    message: QueryIsmsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIsmsRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIsmsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIsmsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryIsmsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIsmsRequest>, I>>(
    base?: I,
  ): QueryIsmsRequest {
    return QueryIsmsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIsmsRequest>, I>>(
    object: I,
  ): QueryIsmsRequest {
    const message = createBaseQueryIsmsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryIsmsResponse(): QueryIsmsResponse {
  return { isms: [], pagination: undefined };
}

export const QueryIsmsResponse = {
  encode(
    message: QueryIsmsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.isms) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIsmsResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIsmsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.isms.push(Any.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIsmsResponse {
    return {
      isms: globalThis.Array.isArray(object?.isms)
        ? object.isms.map((e: any) => Any.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryIsmsResponse): unknown {
    const obj: any = {};
    if (message.isms?.length) {
      obj.isms = message.isms.map((e) => Any.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIsmsResponse>, I>>(
    base?: I,
  ): QueryIsmsResponse {
    return QueryIsmsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIsmsResponse>, I>>(
    object: I,
  ): QueryIsmsResponse {
    const message = createBaseQueryIsmsResponse();
    message.isms = object.isms?.map((e) => Any.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryIsmRequest(): QueryIsmRequest {
  return { id: '' };
}

export const QueryIsmRequest = {
  encode(
    message: QueryIsmRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIsmRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  fromJSON(object: any): QueryIsmRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : '' };
  },

  toJSON(message: QueryIsmRequest): unknown {
    const obj: any = {};
    if (message.id !== '') {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIsmRequest>, I>>(
    base?: I,
  ): QueryIsmRequest {
    return QueryIsmRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIsmRequest>, I>>(
    object: I,
  ): QueryIsmRequest {
    const message = createBaseQueryIsmRequest();
    message.id = object.id ?? '';
    return message;
  },
};

function createBaseQueryIsmResponse(): QueryIsmResponse {
  return { ism: undefined };
}

export const QueryIsmResponse = {
  encode(
    message: QueryIsmResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.ism !== undefined) {
      Any.encode(message.ism, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIsmResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIsmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ism = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIsmResponse {
    return { ism: isSet(object.ism) ? Any.fromJSON(object.ism) : undefined };
  },

  toJSON(message: QueryIsmResponse): unknown {
    const obj: any = {};
    if (message.ism !== undefined) {
      obj.ism = Any.toJSON(message.ism);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIsmResponse>, I>>(
    base?: I,
  ): QueryIsmResponse {
    return QueryIsmResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIsmResponse>, I>>(
    object: I,
  ): QueryIsmResponse {
    const message = createBaseQueryIsmResponse();
    message.ism =
      object.ism !== undefined && object.ism !== null
        ? Any.fromPartial(object.ism)
        : undefined;
    return message;
  },
};

function createBaseQueryAnnouncedStorageLocationsRequest(): QueryAnnouncedStorageLocationsRequest {
  return { mailbox_id: '', validator_address: '' };
}

export const QueryAnnouncedStorageLocationsRequest = {
  encode(
    message: QueryAnnouncedStorageLocationsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.mailbox_id !== '') {
      writer.uint32(10).string(message.mailbox_id);
    }
    if (message.validator_address !== '') {
      writer.uint32(18).string(message.validator_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryAnnouncedStorageLocationsRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  fromJSON(object: any): QueryAnnouncedStorageLocationsRequest {
    return {
      mailbox_id: isSet(object.mailbox_id)
        ? globalThis.String(object.mailbox_id)
        : '',
      validator_address: isSet(object.validator_address)
        ? globalThis.String(object.validator_address)
        : '',
    };
  },

  toJSON(message: QueryAnnouncedStorageLocationsRequest): unknown {
    const obj: any = {};
    if (message.mailbox_id !== '') {
      obj.mailbox_id = message.mailbox_id;
    }
    if (message.validator_address !== '') {
      obj.validator_address = message.validator_address;
    }
    return obj;
  },

  create<
    I extends Exact<DeepPartial<QueryAnnouncedStorageLocationsRequest>, I>,
  >(base?: I): QueryAnnouncedStorageLocationsRequest {
    return QueryAnnouncedStorageLocationsRequest.fromPartial(
      base ?? ({} as any),
    );
  },
  fromPartial<
    I extends Exact<DeepPartial<QueryAnnouncedStorageLocationsRequest>, I>,
  >(object: I): QueryAnnouncedStorageLocationsRequest {
    const message = createBaseQueryAnnouncedStorageLocationsRequest();
    message.mailbox_id = object.mailbox_id ?? '';
    message.validator_address = object.validator_address ?? '';
    return message;
  },
};

function createBaseQueryAnnouncedStorageLocationsResponse(): QueryAnnouncedStorageLocationsResponse {
  return { storage_locations: [] };
}

export const QueryAnnouncedStorageLocationsResponse = {
  encode(
    message: QueryAnnouncedStorageLocationsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.storage_locations) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryAnnouncedStorageLocationsResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  fromJSON(object: any): QueryAnnouncedStorageLocationsResponse {
    return {
      storage_locations: globalThis.Array.isArray(object?.storage_locations)
        ? object.storage_locations.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: QueryAnnouncedStorageLocationsResponse): unknown {
    const obj: any = {};
    if (message.storage_locations?.length) {
      obj.storage_locations = message.storage_locations;
    }
    return obj;
  },

  create<
    I extends Exact<DeepPartial<QueryAnnouncedStorageLocationsResponse>, I>,
  >(base?: I): QueryAnnouncedStorageLocationsResponse {
    return QueryAnnouncedStorageLocationsResponse.fromPartial(
      base ?? ({} as any),
    );
  },
  fromPartial<
    I extends Exact<DeepPartial<QueryAnnouncedStorageLocationsResponse>, I>,
  >(object: I): QueryAnnouncedStorageLocationsResponse {
    const message = createBaseQueryAnnouncedStorageLocationsResponse();
    message.storage_locations = object.storage_locations?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryLatestAnnouncedStorageLocationRequest(): QueryLatestAnnouncedStorageLocationRequest {
  return { mailbox_id: '', validator_address: '' };
}

export const QueryLatestAnnouncedStorageLocationRequest = {
  encode(
    message: QueryLatestAnnouncedStorageLocationRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.mailbox_id !== '') {
      writer.uint32(10).string(message.mailbox_id);
    }
    if (message.validator_address !== '') {
      writer.uint32(18).string(message.validator_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryLatestAnnouncedStorageLocationRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  fromJSON(object: any): QueryLatestAnnouncedStorageLocationRequest {
    return {
      mailbox_id: isSet(object.mailbox_id)
        ? globalThis.String(object.mailbox_id)
        : '',
      validator_address: isSet(object.validator_address)
        ? globalThis.String(object.validator_address)
        : '',
    };
  },

  toJSON(message: QueryLatestAnnouncedStorageLocationRequest): unknown {
    const obj: any = {};
    if (message.mailbox_id !== '') {
      obj.mailbox_id = message.mailbox_id;
    }
    if (message.validator_address !== '') {
      obj.validator_address = message.validator_address;
    }
    return obj;
  },

  create<
    I extends Exact<DeepPartial<QueryLatestAnnouncedStorageLocationRequest>, I>,
  >(base?: I): QueryLatestAnnouncedStorageLocationRequest {
    return QueryLatestAnnouncedStorageLocationRequest.fromPartial(
      base ?? ({} as any),
    );
  },
  fromPartial<
    I extends Exact<DeepPartial<QueryLatestAnnouncedStorageLocationRequest>, I>,
  >(object: I): QueryLatestAnnouncedStorageLocationRequest {
    const message = createBaseQueryLatestAnnouncedStorageLocationRequest();
    message.mailbox_id = object.mailbox_id ?? '';
    message.validator_address = object.validator_address ?? '';
    return message;
  },
};

function createBaseQueryLatestAnnouncedStorageLocationResponse(): QueryLatestAnnouncedStorageLocationResponse {
  return { storage_location: '' };
}

export const QueryLatestAnnouncedStorageLocationResponse = {
  encode(
    message: QueryLatestAnnouncedStorageLocationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.storage_location !== '') {
      writer.uint32(10).string(message.storage_location);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueryLatestAnnouncedStorageLocationResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  fromJSON(object: any): QueryLatestAnnouncedStorageLocationResponse {
    return {
      storage_location: isSet(object.storage_location)
        ? globalThis.String(object.storage_location)
        : '',
    };
  },

  toJSON(message: QueryLatestAnnouncedStorageLocationResponse): unknown {
    const obj: any = {};
    if (message.storage_location !== '') {
      obj.storage_location = message.storage_location;
    }
    return obj;
  },

  create<
    I extends Exact<
      DeepPartial<QueryLatestAnnouncedStorageLocationResponse>,
      I
    >,
  >(base?: I): QueryLatestAnnouncedStorageLocationResponse {
    return QueryLatestAnnouncedStorageLocationResponse.fromPartial(
      base ?? ({} as any),
    );
  },
  fromPartial<
    I extends Exact<
      DeepPartial<QueryLatestAnnouncedStorageLocationResponse>,
      I
    >,
  >(object: I): QueryLatestAnnouncedStorageLocationResponse {
    const message = createBaseQueryLatestAnnouncedStorageLocationResponse();
    message.storage_location = object.storage_location ?? '';
    return message;
  },
};

/** Msg defines the module Msg service. */
export interface Query {
  /** Isms ... */
  Isms(request: QueryIsmsRequest): Promise<QueryIsmsResponse>;
  /** Ism ... */
  Ism(request: QueryIsmRequest): Promise<QueryIsmResponse>;
  /** AnnouncedStorageLocations ... */
  AnnouncedStorageLocations(
    request: QueryAnnouncedStorageLocationsRequest,
  ): Promise<QueryAnnouncedStorageLocationsResponse>;
  /** LatestAnnouncedStorageLocation ... */
  LatestAnnouncedStorageLocation(
    request: QueryLatestAnnouncedStorageLocationRequest,
  ): Promise<QueryLatestAnnouncedStorageLocationResponse>;
}

export const QueryServiceName = 'hyperlane.core.interchain_security.v1.Query';
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Isms = this.Isms.bind(this);
    this.Ism = this.Ism.bind(this);
    this.AnnouncedStorageLocations = this.AnnouncedStorageLocations.bind(this);
    this.LatestAnnouncedStorageLocation =
      this.LatestAnnouncedStorageLocation.bind(this);
  }
  Isms(request: QueryIsmsRequest): Promise<QueryIsmsResponse> {
    const data = QueryIsmsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, 'Isms', data);
    return promise.then((data) =>
      QueryIsmsResponse.decode(_m0.Reader.create(data)),
    );
  }

  Ism(request: QueryIsmRequest): Promise<QueryIsmResponse> {
    const data = QueryIsmRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, 'Ism', data);
    return promise.then((data) =>
      QueryIsmResponse.decode(_m0.Reader.create(data)),
    );
  }

  AnnouncedStorageLocations(
    request: QueryAnnouncedStorageLocationsRequest,
  ): Promise<QueryAnnouncedStorageLocationsResponse> {
    const data = QueryAnnouncedStorageLocationsRequest.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      'AnnouncedStorageLocations',
      data,
    );
    return promise.then((data) =>
      QueryAnnouncedStorageLocationsResponse.decode(_m0.Reader.create(data)),
    );
  }

  LatestAnnouncedStorageLocation(
    request: QueryLatestAnnouncedStorageLocationRequest,
  ): Promise<QueryLatestAnnouncedStorageLocationResponse> {
    const data =
      QueryLatestAnnouncedStorageLocationRequest.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      'LatestAnnouncedStorageLocation',
      data,
    );
    return promise.then((data) =>
      QueryLatestAnnouncedStorageLocationResponse.decode(
        _m0.Reader.create(data),
      ),
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

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
