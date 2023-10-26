
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

const loadItems = (state, items) => {
  return {
    ...state,
    listItems: [...items]
  }
}

const addItem = (state, text, tags, key) => {
  let { listItems } = state;
  let newListItems = listItems.concat({
    text: text,
    tags: tags, 
    key: key
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

function rootReducer(state=initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM:
      return addItem(state, payload.text, payload.tags, payload.key);
    case UPDATE_ITEM:
      return updateItem(state, payload.key, payload.text, payload.tags);
    case DELETE_ITEM:
      return deleteItem(state, payload.key);
    case LOAD_ITEMS:
      return loadItems(state, payload.newListItems);
    default:
      return state;
  }
}

export { 
  rootReducer, 
  ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, LOAD_ITEMS
};