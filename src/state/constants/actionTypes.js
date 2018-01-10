const scopeTypes = (types = [], scope = 'App') => (
  types.reduce(
    (scopedTypes, type) => {
      scopedTypes[type] = Symbol(`${scope}/${type}`)
      return scopedTypes
    }, {}
  )
)

const funcTypes = [
    'SET_FUNC'
]

const appTypes = [
  'WEB3_INITIALIZED',
  'SET_ACCOUNTS',
  'SET_CONTRACTS'
]

const formTypes = [
  'RESET_FORM',
  'UPDATE_RECIPIENT',
  'UPDATE_AMOUNT',
]

const metaTypes = [
  'UPDATE_BALANCE',
  'PUSH_TRANSACTION'
]

export default {
  ...scopeTypes(appTypes),
  ...scopeTypes(funcTypes),
  ...scopeTypes(formTypes, 'Form'),
  ...scopeTypes(metaTypes, 'Meta')
}
