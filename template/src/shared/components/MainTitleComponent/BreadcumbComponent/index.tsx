import React, { useEffect } from "react";
import Icon, { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { UilAngleRight } from "@iconscout/react-unicons";
import { memo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { IRouter } from "@routers/interface";

interface props {
  className?: any;
  breadcrumbs: IRouter[] | IRouter;
}
const BreadcumbComponent = ({ breadcrumbs, className = "" }: props) => {
  const renderBreadcrumdArray = () => {
    if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
      return breadcrumbs.map((router: IRouter, index) => {
        let lastBreadcrumb = index + 1 == breadcrumbs.length;
        let classNameBreadcrumb = "";
        if (lastBreadcrumb == true) {
          classNameBreadcrumb = "breadcb__last";
        }
        return (
          <React.Fragment key={index}>
            <span className="breadcb__icon">
              <Icon component={UilAngleRight} />
            </span>
            <span className={`breadcb__li ${classNameBreadcrumb} `}>
              <Link to={!lastBreadcrumb ? router.path : undefined}>
                <FormattedMessage id={router.name} defaultMessage={router.name} />
              </Link>
            </span>
          </React.Fragment>
        );
      })
    } else {
      const router: any = breadcrumbs;
      return (
        <React.Fragment>
          <span className="breadcb__icon">
            <Icon component={UilAngleRight} />
          </span>
          <span className={`breadcb__li breadcb__last `}>
            <Link to={router.path}>
              <FormattedMessage id={router.name} defaultMessage={router.name} />
            </Link>
          </span>
        </React.Fragment>
      );
    }
  }
  return (
    <div className={`breadcb ${className}`}>
      <span className="breadcb__li">
        <Link to="/">
          <FormattedMessage id="common.home" />
        </Link>
      </span>
      {renderBreadcrumdArray()}
    </div>
  );
};

export default memo(BreadcumbComponent);
