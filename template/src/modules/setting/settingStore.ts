import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locale } from "@locale/index";
interface IStore {
  language: keyof Locale;
}

const settingStore = createSlice({
  name: "settingStore",
  initialState: {
    language: "en",
  } as IStore,
  reducers: {
    updateLanguage: (state, action: PayloadAction<keyof Locale>) =>
      Object.assign(state, { language: action.payload }),
  },
});

export default settingStore;
