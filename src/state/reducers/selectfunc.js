import { selectedFunc as defaultState } from '../store/initialState'
import types from '../constants/actionTypes'

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_FUNC:
      return action.payload
    default:
      return state
  }
}
