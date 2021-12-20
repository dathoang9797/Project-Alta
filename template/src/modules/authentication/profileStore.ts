import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "@modules/user/entity";
interface IStore {
  statusLogin?: boolean;
  user?: User;
  listPermissionCode?: Array<string>;
}

export const removeProfile = createAction<number>(
  "authentication/removeProfile"
);
export const setToken = createAction<{ token: any; remember: boolean }>(
  "authentication/setToken"
);
interface IStore {
  statusLogin?: boolean;
  user?: User;
  listPermissionCode?: Array<string>;
  linkImage?: string;
  token?: string;
  remember: boolean;
}

const profileStore = createSlice({
  name: "profileStore",
  initialState: {
    statusLogin: false,
    user: null,
    linkImage: "",
    listPermissionCode: [],
    token: null,
    remember: false,
  } as IStore,
  reducers: {
    fetchProfile: (state, action: PayloadAction<{user?:User,listPermissionCode?:string[]}>) =>
      Object.assign(state, {
        statusLogin: action.payload.user!=null,
        user: action.payload.user,
        listPermissionCode:action.payload.listPermissionCode||[]
      }),
    updateProfile: (
      state,
      action: PayloadAction<{
        listPermissionCode?: string[];
        statusLogin?: boolean;
      }>
    ) => Object.assign(state, action.payload),
    saveImageGroup: (state, action) => {
      return {
        ...state,
        linkImage: action.payload,
      };
    },
    logOut: (state) => {
      return {
        ...state,
        statusLogin: false,
        user: null,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeProfile, (state, action) => {
        return {
          statusLogin: false,
          user: null,
          listPermissionCode: [],
          token: null,
          remember: false,
        };
      })
      .addCase(setToken, (state, action) =>
        Object.assign(state, action.payload)
      );
  },
});

export default profileStore;
