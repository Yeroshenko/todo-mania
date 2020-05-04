import { listsApi } from 'api'

const SET_ALL = 'LISTS:SET_ALL'

const initialState = {
  lists: []
}

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL: 
      return {
        ...state,
        lists: action.lists
      }

    default:
      return state
  }
}

// Actions creators
export const setLists = (lists) => ({ type: SET_ALL, lists })


// Thank creators
export const getLists = () => async (dispatch) => {
  try {
    const lists = await listsApi.getAll()
    
    dispatch(setLists(lists))
  } catch(e) {}
} 


export default listsReducer