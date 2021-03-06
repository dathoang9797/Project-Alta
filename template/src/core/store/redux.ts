import { logger } from 'redux-logger';//done
import { createStore, applyMiddleware } from 'redux';//done
import { createWhitelistFilter } from 'redux-persist-transform-filter';//done
import storage from 'redux-persist/lib/storage'// done defaults to localStorage for web
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'//done
import appReducer, { RootState } from '@modules/index';
import CONFIG from '@config/index';//done
import { Selector } from 'react-redux';

const profile = createWhitelistFilter('profile', ['token', "remember"]);
const settingStore = createWhitelistFilter('settingStore', ['language']);

const persistConfig:PersistConfig<RootState> = {
  key: CONFIG.APP_NAME,
  storage,
  blacklist: [],
  transforms: [profile, settingStore],
  whitelist: ["profile", "settingStore"]
}

const persistedReducer = persistReducer(persistConfig, appReducer)
const middleware:any = [];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger)
}
const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store)


export default store;

interface IToken {
  token?:string
}

export const TokenSelector:Selector<RootState,IToken> = (state)=>{
  return {
    token:state.profile.token
  }
}

