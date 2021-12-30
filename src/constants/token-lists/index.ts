// used to mark unsupported tokens, these are hosted lists of unsupported tokens
/**
 * @TODO add list from blockchain association
 */
export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  // COMPOUND_LIST,
  // AAVE_LIST,
  // CMC_ALL_LIST,
  // CMC_STABLECOIN,
  // WRAPPED_LIST,
  // YEARN_LIST,
  // UMA_LIST,
  // SYNTHETIX_LIST,
  // NFTX_LIST_V1,
  // NFTX_LIST_V2,
  // SET_LIST,
  // ROLL_LIST,
  // COINGECKO_LIST,
  // KLEROS_LIST,
  // GEMINI_LIST,
  // OPYN_LIST,
  // ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
