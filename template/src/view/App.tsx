import React, { Suspense, useEffect } from "react";
import PrivatePage from "../routers/component/PrivatePage";
import PublicPage from "../routers/component/PublicPage";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import "@shared/assets/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "@styles/styles.scss";
import { Selector } from "@reduxjs/toolkit";
import locale, { Locale } from "@locale/index";
import { RootState } from "@modules";
import { IntlProvider } from "react-intl";
import UserEntity from "@modules/user/entity";
import authenticationPresenter from "@modules/authentication/presenter";
import lodash from "lodash";
import profileStore from "@modules/authentication/profileStore";
import { useSingleAsync } from "@shared/hook/useAsync";
import Loading from "@shared/components/Loading";

// For Test
interface IAppSelector {
  token?: string;
  statusLogin: boolean;
  remember: boolean;
  language: keyof Locale;
}

const AppSelector: Selector<RootState, IAppSelector> = (state: RootState) => ({
  token: state.profile.token,
  statusLogin: state.profile.statusLogin,
  remember: state.profile.remember,
  language: state.settingStore.language,
});

const App = () => {
  const dispatch = useDispatch();
  const { token, statusLogin, language } = useSelector(AppSelector);
  const getProfile = useSingleAsync<UserEntity>(authenticationPresenter.getProfile)
  const memoLangData = React.useMemo(() => {
    return locale[language];
  }, [language]);

  useEffect(() => {
    if (lodash.isEmpty(token)) {
      return;
    }
    getProfile.execute({}).then((user: UserEntity) => {
      dispatch(profileStore.actions.fetchProfile({ user }));
    });
  }, [token])

  return (
    <IntlProvider locale={language} messages={memoLangData}>
      <ConfigProvider
        locale={memoLangData}
      >
        {getProfile.status == "loading" ? <Loading />:<MainView statusLogin={statusLogin}/>}

      </ConfigProvider>
    </IntlProvider>
  );
};


const MainView = React.memo(({ statusLogin }: { statusLogin: boolean }) => {
  return <>{statusLogin ? (
    <Suspense fallback={<></>}>
      <PrivatePage />
    </Suspense>
  ) : (
    <Suspense fallback={<></>}>
      <PublicPage />
    </Suspense>
  )}</>
})

export default App;
