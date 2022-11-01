
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const LOAD_ITEMS = 'LOAD_ITEMS';

const initListItems = [
  { text: 'Get costume', key: Date.now() },
  { text: 'Get candy', key: Date.now() + 1},
  { text: 'Finish HW5', key: Date.now() + 2},
];

const initialState = {
  listItems: initListItems,
}

const addItem = (state, payload) => {
  const { text, tags, key } = payload;
  let { listItems } = state;
  let newListItems = listItems.concat({
    text: text,
    key: key,
    tags: tags
  });
  return {
    ...state, 
    listItems: newListItems
  };
}

const updateItem = (state, itemId, newText, tags) => {
  let { listItems } = state;
  let newItem = {
    text: newText,
    key: itemId, 
    tags: tags
  };
  let newListItems = listItems.map(elem=>elem.key===itemId?newItem:elem);
  return {
    ...state, 
    listItems: newListItems
  };
}

const deleteItem = (state, itemId) => {
  let { listItems } = state;
  let newListItems = listItems.filter(elem=>elem.key !== itemId);
  return {
    ...state, 
    listItems: newListItems
  }
}

const loadItems = (state, newItems) => {
  return {
    ...state, 
    listItems: newItems
  }
}

function rootReducer(state=initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM:
      return addItem(state, payload); //.text, action.payload.tags);
    case UPDATE_ITEM:
      return updateItem(state, payload.key, payload.text, payload.tags);
    case DELETE_ITEM:
      return deleteItem(state, payload.key);
    case LOAD_ITEMS:
      return loadItems(state, payload.newItems);
    default:
      return state;
  }
}

export { 
  rootReducer, 
  ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, LOAD_ITEMS };