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
    proto: {
      type: '/hyperlane.core.v1.MsgCreateMailbox',
      converter: MsgCreateMailbox,
    },
    amino: {
      type: 'hyperlane/v1/MsgCreateMailbox',
      converter: null,
    },
  },
  MsgSetMailbox: {
    proto: {
      type: '/hyperlane.core.v1.MsgSetMailbox',
      converter: MsgSetMailbox,
    },
    amino: {
      type: 'hyperlane/v1/MsgSetMailbox',
      converter: null,
    },
  },
  MsgProcessMessage: {
    proto: {
      type: '/hyperlane.core.v1.MsgProcessMessage',
      converter: MsgProcessMessage,
    },
    amino: {
      type: 'hyperlane/v1/MsgProcessMessage',
      converter: null,
    },
  },

  // Interchain security transactions
  MsgCreateMessageIdMultisigIsm: {
    proto: {
      type: '/hyperlane.core.v1.MsgCreateMessageIdMultisigIsm',
      converter: MsgCreateMessageIdMultisigIsm,
    },
    amino: {
      type: 'hyperlane/v1/MsgCreateMessageIdMultisigIsm',
      converter: null,
    },
  },
  MsgCreateMerkleRootMultisigIsm: {
    proto: {
      type: '/hyperlane.core.v1.MsgCreateMerkleRootMultisigIsm',
      converter: MsgCreateMerkleRootMultisigIsm,
    },
    amino: {
      type: 'hyperlane/v1/MsgCreateMerkleRootMultisigIsm',
      converter: null,
    },
  },
  MsgCreateNoopIsm: {
    proto: {
      type: '/hyperlane.core.v1.MsgCreateNoopIsm',
      converter: MsgCreateNoopIsm,
    },
    amino: {
      type: 'hyperlane/v1/MsgCreateNoopIsm',
      converter: null,
    },
  },
  MsgAnnounceValidator: {
    proto: {
      type: '/hyperlane.core.v1.MsgAnnounceValidator',
      converter: MsgAnnounceValidator,
    },
    amino: {
      type: 'hyperlane/v1/MsgAnnounceValidator',
      converter: null,
    },
  },

  // Post dispatch transactions
  MsgCreateIgp: {
    proto: {
      type: '/hyperlane.core.v1.MsgCreateIgp',
      converter: MsgCreateIgp,
    },
    amino: {
      type: 'hyperlane/v1/MsgCreateIgp',
      converter: null,
    },
  },
  MsgSetIgpOwner: {
    proto: {
      type: '/hyperlane.core.v1.MsgSetIgpOwner',
      converter: MsgSetIgpOwner,
    },
    amino: {
      type: 'hyperlane/v1/MsgSetIgpOwner',
      converter: null,
    },
  },
  MsgSetDestinationGasConfig: {
    proto: {
      type: '/hyperlane.core.v1.MsgSetDestinationGasConfig',
      converter: MsgSetDestinationGasConfig,
    },
    amino: {
      type: 'hyperlane/v1/MsgSetDestinationGasConfig',
      converter: null,
    },
  },
  MsgPayForGas: {
    proto: {
      type: '/hyperlane.core.v1.MsgPayForGas',
      converter: MsgPayForGas,
    },
    amino: {
      type: 'hyperlane/v1/MsgPayForGas',
      converter: null,
    },
  },
  MsgClaim: {
    proto: {
      type: '/hyperlane.core.v1.MsgClaim',
      converter: MsgClaim,
    },
    amino: {
      type: 'hyperlane/v1/MsgClaim',
      converter: null,
    },
  },
  MsgCreateMerkleTreeHook: {
    proto: {
      type: '/hyperlane.core.v1.MsgCreateMerkleTreeHook',
      converter: MsgCreateMerkleTreeHook,
    },
    amino: {
      type: 'hyperlane/v1/MsgCreateMerkleTreeHook',
      converter: null,
    },
  },
  MsgCreateNoopHook: {
    proto: {
      type: '/hyperlane.core.v1.MsgCreateNoopHook',
      converter: MsgCreateNoopHook,
    },
    amino: {
      type: 'hyperlane/v1/MsgCreateNoopHook',
      converter: null,
    },
  },

  // Warp transactions
  MsgCreateCollateralToken: {
    proto: {
      type: '/hyperlane.warp.v1.MsgCreateCollateralToken',
      converter: MsgCreateCollateralToken,
    },
    amino: {
      type: 'hyperlane/warp/v1/MsgCreateCollateralToken',
      converter: null,
    },
  },
  MsgCreateSyntheticToken: {
    proto: {
      type: '/hyperlane.warp.v1.MsgCreateSyntheticToken',
      converter: MsgCreateSyntheticToken,
    },
    amino: {
      type: 'hyperlane/warp/v1/MsgCreateSyntheticToken',
      converter: null,
    },
  },
  MsgSetToken: {
    proto: {
      type: '/hyperlane.warp.v1.MsgSetToken',
      converter: MsgSetToken,
    },
    amino: {
      type: 'hyperlane/warp/v1/MsgSetToken',
      converter: null,
    },
  },
  MsgEnrollRemoteRouter: {
    proto: {
      type: '/hyperlane.warp.v1.MsgEnrollRemoteRouter',
      converter: MsgEnrollRemoteRouter,
    },
    amino: {
      type: 'hyperlane/warp/v1/MsgEnrollRemoteRouter',
      converter: null,
    },
  },
  MsgUnrollRemoteRouter: {
    proto: {
      type: '/hyperlane.warp.v1.MsgUnrollRemoteRouter',
      converter: MsgUnrollRemoteRouter,
    },
    amino: {
      type: 'hyperlane/warp/v1/MsgUnrollRemoteRouter',
      converter: null,
    },
  },
  MsgRemoteTransfer: {
    proto: {
      type: '/hyperlane.warp.v1.MsgRemoteTransfer',
      converter: MsgRemoteTransfer,
    },
    amino: {
      type: 'hyperlane/warp/v1/MsgRemoteTransfer',
      converter: null,
    },
  },
};
