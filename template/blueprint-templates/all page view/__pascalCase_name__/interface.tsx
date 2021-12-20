import { ReactNode } from "react";

export interface IModal {
  isVisible: boolean;
  dataEdit: any;
}

export interface IpropsModalAdd {
  handleRefresh: () => void;
  modal: IModal;
  setModal: (arg: any) => void;
}
export interface IFormContent {
  label?:string,
  name: string,
  render?: ReactNode,
  rules?: any,
}