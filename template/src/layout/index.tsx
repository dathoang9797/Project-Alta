
import React, { Component, MouseEventHandler, PropsWithChildren, ReactNode,useEffect } from "react";
import { withRouter } from "react-router";
import HeaderComponent from "./Header";
import SiderComponent from "./Sidebar";
interface IDefaultLayoutProps {
  history: any;
}

const DefaultLayout:React.FC<PropsWithChildren<IDefaultLayoutProps>> = (props) => {
  const [menu,setMenu] = React.useState<string>("sider-component big");
  const [padding,setPadding] =React.useState<string>("0rem 5.6vw 1rem 1.4vw")
 
  const onClick=(e)=>{
    const targetNode = e.target as HTMLDivElement;
    if (
      targetNode.className == "main-component" ||
      e.target == e.currentTarget
    ) {
      setMenu("sider-component");
      return;
    }
    if (
      targetNode.tagName == "INPUT" ||
      targetNode.tagName == "BUTTON" ||
      targetNode.onclick != null ||
      targetNode.parentElement!.onclick != null
    ) {
      return;
    }
    setMenu("sider-component")
  }

  useEffect(()=>{
    if(props.history.location.pathname=="/"){
      setPadding("0rem 1.4vw 1rem 1.4vw");
    }else{
      setPadding("0rem 5.6vw 1rem 1.4vw");
    }
  },[props.history.location])

  return (
    <div className="all-page-component">
      <SiderComponent setClassName={setMenu} className={menu} />
      <div className="right-page-component" onClick={onClick}>
        <div className="w-100 d-flex flex-row-reverse"><HeaderComponent /></div>
        <div className="main-component" style={{padding}} >{props.children}</div>
      </div>
    </div>
  );
};

export default React.memo(withRouter(DefaultLayout));
