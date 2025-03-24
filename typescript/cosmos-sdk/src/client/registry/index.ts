import {
  MsgAnnounceValidator,
  MsgCreateMerkleRootMultisigIsm,
  MsgCreateMessageIdMultisigIsm,
  MsgCreateNoopIsm,
} from '../../types/hyperlane/core/interchain_security/v1/tx.js';
import {
  MsgClaim,
  MsgCreateIgp,
  MsgCreateMerkleTreeHook,
  MsgCreateNoopHook,
  MsgPayForGas,
  MsgSetDestinationGasConfig,
  MsgSetIgpOwner,
} from '../../types/hyperlane/core/post_dispatch/v1/tx.js';
import {
  MsgCreateMailbox,
  MsgProcessMessage,
  MsgSetMailbox,
} from '../../types/hyperlane/core/v1/tx.js';
import {
  MsgCreateCollateralToken,
  MsgCreateSyntheticToken,
  MsgEnrollRemoteRouter,
  MsgRemoteTransfer,
  MsgSetToken,
  MsgUnrollRemoteRouter,
} from '../../types/hyperlane/warp/v1/tx.js';

export const REGISTRY = {
  // Core transactions
  MsgCreateMailbox: {
    typeUrl: '/hyperlane.core.v1.MsgCreateMailbox',
    aminoType: 'hyperlane/v1/MsgCreateMailbox',
    proto: MsgCreateMailbox,
  },
  MsgSetMailbox: {
    typeUrl: '/hyperlane.core.v1.MsgSetMailbox',
    aminoType: 'hyperlane/v1/MsgSetMailbox',
    proto: MsgSetMailbox,
  },
  MsgProcessMessage: {
    typeUrl: '/hyperlane.core.v1.MsgProcessMessage',
    aminoType: 'hyperlane/v1/MsgProcessMessage',
    proto: MsgProcessMessage,
  },

  // Interchain security transactions
  MsgCreateMessageIdMultisigIsm: {
    typeUrl: '/hyperlane.core.v1.MsgCreateMessageIdMultisigIsm',
    aminoType: 'hyperlane/v1/MsgCreateMessageIdMultisigIsm',
    proto: MsgCreateMessageIdMultisigIsm,
  },
  MsgCreateMerkleRootMultisigIsm: {
    typeUrl: '/hyperlane.core.v1.MsgCreateMerkleRootMultisigIsm',
    aminoType: 'hyperlane/v1/MsgCreateMerkleRootMultisigIsm',
    proto: MsgCreateMerkleRootMultisigIsm,
  },
  MsgCreateNoopIsm: {
    typeUrl: '/hyperlane.core.v1.MsgCreateNoopIsm',
    aminoType: 'hyperlane/v1/MsgCreateNoopIsm',
    proto: MsgCreateNoopIsm,
  },
  MsgAnnounceValidator: {
    typeUrl: '/hyperlane.core.v1.MsgAnnounceValidator',
    aminoType: 'hyperlane/v1/MsgAnnounceValidator',
    proto: MsgAnnounceValidator,
  },

  // Post dispatch transactions
  MsgCreateIgp: {
    typeUrl: '/hyperlane.core.v1.MsgCreateIgp',
    aminoType: 'hyperlane/v1/MsgCreateIgp',
    proto: MsgCreateIgp,
  },
  MsgSetIgpOwner: {
    typeUrl: '/hyperlane.core.v1.MsgSetIgpOwner',
    aminoType: 'hyperlane/v1/MsgSetIgpOwner',
    proto: MsgSetIgpOwner,
  },
  MsgSetDestinationGasConfig: {
    typeUrl: '/hyperlane.core.v1.MsgSetDestinationGasConfig',
    aminoType: 'hyperlane/v1/MsgSetDestinationGasConfig',
    proto: MsgSetDestinationGasConfig,
  },
  MsgPayForGas: {
    typeUrl: '/hyperlane.core.v1.MsgPayForGas',
    aminoType: 'hyperlane/v1/MsgPayForGas',
    proto: MsgPayForGas,
  },
  MsgClaim: {
    typeUrl: '/hyperlane.core.v1.MsgClaim',
    aminoType: 'hyperlane/v1/MsgClaim',
    proto: MsgClaim,
  },
  MsgCreateMerkleTreeHook: {
    typeUrl: '/hyperlane.core.v1.MsgCreateMerkleTreeHook',
    aminoType: 'hyperlane/v1/MsgCreateMerkleTreeHook',
    proto: MsgCreateMerkleTreeHook,
  },
  MsgCreateNoopHook: {
    typeUrl: '/hyperlane.core.v1.MsgCreateNoopHook',
    aminoType: 'hyperlane/v1/MsgCreateNoopHook',
    proto: MsgCreateNoopHook,
  },

  // Warp transactions
  MsgCreateCollateralToken: {
    typeUrl: '/hyperlane.warp.v1.MsgCreateCollateralToken',
    aminoType: 'hyperlane/warp/v1/MsgCreateCollateralToken',
    proto: MsgCreateCollateralToken,
  },
  MsgCreateSyntheticToken: {
    typeUrl: '/hyperlane.warp.v1.MsgCreateSyntheticToken',
    aminoType: 'hyperlane/warp/v1/MsgCreateSyntheticToken',
    proto: MsgCreateSyntheticToken,
  },
  MsgSetToken: {
    typeUrl: '/hyperlane.warp.v1.MsgSetToken',
    aminoType: 'hyperlane/warp/v1/MsgSetToken',
    proto: MsgSetToken,
  },
  MsgEnrollRemoteRouter: {
    typeUrl: '/hyperlane.warp.v1.MsgEnrollRemoteRouter',
    aminoType: 'hyperlane/warp/v1/MsgEnrollRemoteRouter',
    proto: MsgEnrollRemoteRouter,
  },
  MsgUnrollRemoteRouter: {
    typeUrl: '/hyperlane.warp.v1.MsgUnrollRemoteRouter',
    aminoType: 'hyperlane/warp/v1/MsgUnrollRemoteRouter',
    proto: MsgUnrollRemoteRouter,
  },
  MsgRemoteTransfer: {
    typeUrl: '/hyperlane.warp.v1.MsgRemoteTransfer',
    aminoType: 'hyperlane/warp/v1/MsgRemoteTransfer',
    proto: MsgRemoteTransfer,
  },
};
