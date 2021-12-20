import React from 'react';
import { useHistory } from 'react-router';
import { Button } from "antd";
import ChangeLanguage from '@shared/components/ChangeLanguage';
import { useIntl } from 'react-intl';
import { invertBy } from 'lodash';

const logo = require('@shared/assets/images/logo.png');

const PageError = () => {
  const history = useHistory();
  const intl = useIntl();

  return (
    <div className="page-error ">
      {/* <span className="label-logo" >
        <img className='label-logo-forgot' src={logo} />
      </span> */}
      <div className="main-content">
        <div className='title-404'>{intl.formatMessage({ id: "common.404error" })}</div>
        <div className='page-not-found'>{intl.formatMessage({ id: "common.page.notfound" })}</div>
        <p className="note-404">{intl.formatMessage({ id: "common.404note" })}</p>
        <Button className="normal-button">
          <a onClick={() => history.push("/login")}>{intl.formatMessage({ id: "common.home" })}</a>
        </Button>
      </div>

    </div>
  )
}

export default PageError
