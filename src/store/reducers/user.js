const initialState = {
  data: [],
  loading: true,
};

export const userReducer = (state = initialState, action) => {
  const {data} = state;
  switch (action.type) {
    case 'LOAD_USERS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case 'DELETE_USER':
      const findEl = data.findIndex((item) => item.id === action.payload);
      const result = [...data.slice(0, findEl), ...data.slice(findEl + 1)];
      return {
        ...state,
        data: result,
      };
    case 'EDIT_USER':
      console.log(action.payload);
      const resultEditUser = data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      return {
        ...state,
        data: resultEditUser,
      };

    case 'NEW_USER':
      const newUser = [action.payload, ...data];
      return {
        ...state,
        data: newUser,
      };
    default:
      return state;
  }
};
