# Hyperlane Cosmos Module SDK Types

The Hyperlane Cosmos SDK Types contains autogenerated TypeScript types and proto encoders/decoders for the [Cosmos Hyperlane Module Implementation](https://github.com/bcp-innovations/hyperlane-cosmos).
It can be used inside an SDK for type support and for encoding and decoding the Hyperlane specific Cosmos transactions as well as other projects which might benefit from the Hyperlane Cosmos types.

## Install

```bash
# Install with NPM
npm install @hyperlane-xyz/cosmos-types

# Or with Yarn
yarn add @hyperlane-xyz/cosmos-types
```

## Setup

Before contributing make sure docker is installed and running which is needed for the type generation. Furthermore Node 18 or newer is required.

## Contribute

First you need to install the dependencies by running `yarn install`.

### Generating TS Types

You can automatically generate the TypeScript types from the proto files of the Cosmos Hyperlane Module by executing the following commands. Note that this only needs to be done if the proto files change in the Cosmos Hyperlane Module project.

```bash
cd typescript/cosmos-types
docker compose up
```

After this command has finished the newly generated types can be found under `src/types`.

### Building the project

You can build the project with `yarn build`, the build output can be found under `dist`.
