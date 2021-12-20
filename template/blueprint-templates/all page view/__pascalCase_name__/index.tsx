import React, { useState } from "react";
import MainTitleComponent from "@shared/components/MainTitleComponent";
import ModalAdd from './component/MainModal/ModalAdd{{pascalCase name}}';
import { IModal } from "./interface";
import TableComponent from "@shared/components/TableComponent";
import RightMenu, { IArrayAction } from "@layout/RightMenu";
import { DeleteConfirm } from "@shared/components/ConfirmDelete";
import SelectAndLabelConponent, { ISelectAndLabel, ISelectData } from "@shared/components/SelectAndLabelConponent";
import { ColumnsType } from "antd/lib/table";
import EditIconComponent from "@shared/components/EditIconComponent";
import { useAltaIntl } from "@shared/hook/useTranslate";
import { router{{ pascalCase name }} } from "./router";
import useTable from "@shared/components/TableComponent/hook";
import CircleLabel from '@shared/components/CircleLabel'

const dataTable = require("./data.json");


const {{ pascalCase name }} = () => {
  // useState và useEffect nên đặt ở đầu  
  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
  });
  const { formatMessage } = useAltaIntl();
  const table = useTable();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const idChoosen = "id"; //get your id here. Ex: accountId, userId,...
  
  const columns: ColumnsType = [
    {
      dataIndex: "tagName",
    },
    {
      dataIndex: "lastUpdate",
    },
    {
      dataIndex: "group",
    },
    {
      dataIndex: "group",
      render: () => <CircleLabel text={formatMessage("common.statusActive")} colorCode="blue"/>
    },
    {
      dataIndex: "update",
      render: (item, record, index) => <EditIconComponent  disable={index % 2 == 0} onClick={() => {
        setModal({ dataEdit: record, isVisible: true })
      }} />
    },
  ];
  const handleRefresh = () => {
    table.fetchData();
    setSelectedRowKeys([])
  }
  const arrayAction: IArrayAction[] = [
    {
      iconType: "add", handleAction: () => {
        setModal({ dataEdit: null, isVisible: true })
      }
    },
    { iconType: "share" },
    {
      iconType: "delete",
      disable: selectedRowKeys?.length==0,
      handleAction: () => {
        DeleteConfirm({
          content: formatMessage("common.delete"),
          handleOk: () => {
            // call Api Delete here
            handleRefresh()
          },
          handleCancel: () => { },
        });
      },
    },
  ];

  const dataString: ISelectData[] = [{ name: formatMessage("common.all"), value: null }]
  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: "Lĩnh vực", dataString },
    { textLabel: "Địa bàn quản lý", dataString },
    { textLabel: "Trạng thái", dataString },
  ]

  const onChangeSelectStatus = (status) => {
    table.fetchData({
      option: { accountStatus: status }
    })
  }
  return (
    <div className='{{kebabCase name}}'>
      {/* MainTitleComponent add your router here */}
      <MainTitleComponent breadcrumbs={router{{pascalCase name}} } />
      <div className=" main-card">
        <div className="d-flex ">
          {arraySelectFilter.map((item, index) => <SelectAndLabelConponent onChange={onChangeSelectStatus} key={index} className="margin-select" dataString={item.dataString} textLabel={item.textLabel} />)}
        </div>
        <TableComponent
          translateFirstKey='{{camelCase name}}'
          onRowSelect={setSelectedRowKeys}
          rowKey={(res) => res[idChoosen]}
          register={table}
          dataSource={dataTable}
          columns={columns}
          // add your search here 
        />

      </div>
      {/* những component con ít quan trọng hơn nên đặt ở cuối  */}
      <RightMenu arrayAction={arrayAction} />
      <ModalAdd modal={modal} setModal={setModal} handleRefresh={handleRefresh} />
    </div>
  );
};

export default {{ pascalCase name }};

