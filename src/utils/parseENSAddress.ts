const ENS_ETH_NAME_REGEX = /^(([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+)eth(\/.*)?$/
const ENS_EWC_NAME_REGEX = /^(([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+)ewc(\/.*)?$/

export function parseENSAddress(ensAddress: string): { ensName: string; ensPath: string | undefined } | undefined {
  let match = ensAddress.match(ENS_EWC_NAME_REGEX)
  if (match) {
    return { ensName: `${match[1].toLowerCase()}ewc`, ensPath: match[4] }
  }

  match = ensAddress.match(ENS_ETH_NAME_REGEX)
  if (match) {
    return { ensName: `${match[1].toLowerCase()}eth`, ensPath: match[4] }
  }

  return undefined
}
