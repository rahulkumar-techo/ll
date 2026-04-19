import 'react-native-get-random-values'

import * as ExpoCrypto from 'expo-crypto'
import { Platform } from 'react-native'

type CryptoWithOptionalSubtle = Crypto & {
  subtle?: Partial<SubtleCrypto> & {
    digest: (algorithm: AlgorithmIdentifier, data: BufferSource) => Promise<ArrayBuffer>
  }
}

function getAlgorithmName(algorithm: AlgorithmIdentifier) {
  if (typeof algorithm === 'string') {
    return algorithm
  }

  return algorithm.name
}

if (Platform.OS !== 'web') {
  const cryptoRef = (globalThis.crypto ?? {}) as CryptoWithOptionalSubtle

  if (typeof cryptoRef.getRandomValues !== 'function') {
    cryptoRef.getRandomValues = ExpoCrypto.getRandomValues as typeof cryptoRef.getRandomValues
  }

  if (typeof cryptoRef.randomUUID !== 'function') {
    cryptoRef.randomUUID = ExpoCrypto.randomUUID as typeof cryptoRef.randomUUID
  }

  if (typeof cryptoRef.subtle === 'undefined') {
    cryptoRef.subtle = {
      digest: (algorithm, data) => {
        const name = getAlgorithmName(algorithm) as ExpoCrypto.CryptoDigestAlgorithm
        return ExpoCrypto.digest(name, data)
      },
    } as CryptoWithOptionalSubtle['subtle']
  }

  ;(globalThis as typeof globalThis & { crypto: CryptoWithOptionalSubtle }).crypto = cryptoRef
}
