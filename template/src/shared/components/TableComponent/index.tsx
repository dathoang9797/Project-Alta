import { useAsync } from "../../hook/useAsync";
import { Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Pagination from "./Component/Pagination";
import { InitPagination } from "./interface";
import { IBEPaginationTable, InitOption } from "./interface";
import SearchComponent from "../SearchComponent/SearchComponent";
import { FormattedMessage, useIntl } from "react-intl";
import { CheckPermissionFunc } from "@hoc/CheckPermission";
import { useSelector } from "react-redux";
import { RootState } from "@modules";
import { PaginationEntity } from "@core/pagination/entity";
import { OptionEntity } from "@core/table";
import lodash from "lodash";

interface IState {
  pagination: PaginationEntity;
  option: OptionEntity;
  selection: Array<any>;
  rowKey?: any;
}

const TableComponent: React.FC<IBEPaginationTable> = (
  props: IBEPaginationTable
) => {
  let {
    apiServices,
    columns = [],
    register,
    defaultOption,
    translateFirstKey = "common",
    getDataAfter,
    disableFirstCallApi = false,
    dataSource = [],
    search,
    hasStt = false,
  } = props;
  const listPermissionCode = useSelector(
    (state: RootState) => state.profile.listPermissionCode
  );
  const language = useSelector(
    (state: RootState) => state.settingStore.language
  );
  const [repository] = useAsync(apiServices||Promise.resolve);
  const intl = useIntl();
  const [state, setState] = useState<IState>({
    pagination: {...InitPagination,...props.pagination},
    option: { ...defaultOption, ...InitOption },
    selection: [],
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedRowKeys(selectedRowKeys);
      props.onRowSelect && props.onRowSelect(selectedRowKeys);
      props.onRowSelectDetail && props.onRowSelectDetail(selectedRows);
    },
  };

  // React.useEffect(()=>{
  //   console.log(selectedRowKeys)
  // },[selectedRowKeys])

  const handleClickOnRow = (record: any) => {
    if (typeof props.rowKey != "function") {
      return;
    }
    //@ts-ignore
    const _rowKey = props.rowKey(record);

    const isInArr = selectedRowKeys.some((key) => key === _rowKey);
    if (isInArr == false) {
      const _selectedRowKeys = [...selectedRowKeys, _rowKey];
      setSelectedRowKeys(_selectedRowKeys);
      props.onRowSelect && props.onRowSelect(_selectedRowKeys);
      // setSelectedRow(selectedRows);
      // props.onRowSelectDetail && props.onRowSelectDetail(selectedRows);
    }
  };

  useEffect(() => {
    if (!disableFirstCallApi && apiServices) getDataWithCurrentState();
  }, [apiServices]);

  const getDataWithCurrentState = (_state?: {
    pagination?: PaginationEntity;
    option?: OptionEntity;
  }) => {
    const option = Object.assign({}, state.option, _state?.option);
    const pagination = Object.assign({}, state.pagination, _state?.pagination);
    setState((prev) => ({ ...prev, option }));

    if (apiServices) {
      repository.execute(pagination, option).then((res) => {
        if (getDataAfter) {
          getDataAfter(res);
        }
        setState((prev) => {
          return {
            ...prev,
            pagination: {
              ...pagination,
              ...res?.info,
            },
          };
        });
      });
    } else {
      setState((prev) => ({ ...prev, pagination }));
    }
  };

  const handleSearch = (text) => {
    const pagination = InitPagination;
    const option = {
      search: text,
    };
    getDataWithCurrentState({ pagination, option });
  };

  const handleChangePage = (
    newPagination: PaginationEntity,
    _filter?,
    _sorter?
  ) => {
    let option = state.option;
    option.sorter = _sorter;
    let newCurrent = newPagination.current;
    if (newPagination.pageSize != state.pagination.pageSize) {
      newCurrent = 1;
    }

    getDataWithCurrentState({
      pagination: { ...newPagination, current: newCurrent },
      option,
    });
    setState((prev) => ({ ...prev, selection: [] }));
  };

  const getData = () => {
    return {
      data: repository.value?.data || [],
      ...state,
    };
  };

  //React.useImperativeHandle(register,()=>{})

  if (register) {
    register.clearSelection = () => { setSelectedRowKeys([]) }
    register.getData = getData;
    register.fetchData = (...args) => { setSelectedRowKeys([]); getDataWithCurrentState(...args) };
    register.setOption = (value) =>
      setState((prev) => ({ ...prev, option: { ...prev.option, ...value } }));
    register.setPagination = (value) =>
      setState((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, ...value },
      }));
    register.setSelection = (value) =>
      setState((prev) => ({ ...prev, selection: value }));
  }

  const align = {
    left: "to-left",
    right: "to-right",
  };

  const thisColumns = React.useMemo(() => {
    // xét từng column một

    //Check permision
    const col = columns
      .filter((item) => {
        const permissionCode = item?.permissionCode || null;
        if (permissionCode) {
          const checkPermissionForColumn = CheckPermissionFunc(
            permissionCode,
            listPermissionCode
          );
          return checkPermissionForColumn;
        }
        return true;
      })
      .map((ite) => ({ ...ite, permissionCode: undefined }));

    // translate title
    const columnTranslate = col.map((item) => {
      const key = item?.title || `${translateFirstKey}.${item?.dataIndex}`;
      // ưu tiên nếu dev truyền vào title trước nha
      const title = intl.formatMessage({
        id: key,
        defaultMessage: key,
      });
      return { ...item, title };
    });

    //xét có nên thêm stt
    if (hasStt) {
      const hasSttColumn = {
        title: intl.formatMessage({
          id: "common.stt",
          defaultMessage: "STT",
        }),
        width: "5.9rem",
        className:'text-center',
        dataIndex: "tableComponentStt",
        render: (text, record, index) => {
          const num =state.pagination.current||1;
          const pageSize=state.pagination.pageSize||1
          return ((num - 1) * pageSize) +(index + 1);
        },
      };
      return [hasSttColumn, ...columnTranslate];
    }
    //dịch mỗi thằng
    return columnTranslate;
  }, [hasStt, columns, state.pagination, listPermissionCode, language]);

  const onRow = (record, rowIndex) => ({
    onClick: () => {
      handleClickOnRow(record);
    },
  })

  return (
    <div className={`card-main-table ${props?.className}`}>
      {search?.placeholder && (
        <div
          className={`search-in-table ${search?.align ? align[search?.align] : "to-right"
            }`}
        >
          <div className="search-label-default">
            {intl.formatMessage({
              id: "common.keyword",
              defaultMessage: "common.keyword",
            })}
          </div>
          <SearchComponent
            onSearch={handleSearch}
            placeholder={search?.placeholder}
            classNames={search?.className ? search?.className : ""}
          />
        </div>
      )}
      <Table
        rowSelection={props.onRowSelect!=null ? rowSelection:undefined}
        onRow={props.onRowSelect ? onRow : undefined}
        summary={(pageData) => {
          if (selectedRowKeys.length == 0 || lodash.isEmpty(props.summaryKey)) {
            return undefined;
          }
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>
                <Typography.Text className="ml-1 mt-4 mb-4">
                  <FormattedMessage
                    id={props.summaryKey}
                    values={{ rows: selectedRowKeys.length }}
                  />
                </Typography.Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
        {...props}
        className="main-table"
        dataSource={repository?.value?.data || dataSource}
        loading={props?.loading || repository?.status == "loading"}
        pagination={props.pagination!==false&&state.pagination}
        onChange={handleChangePage}
        columns={thisColumns}
      />
     {props.pagination!==false&& <Pagination pagination={state.pagination} onChange={handleChangePage} />}
    </div>
  );
};

export default React.memo(TableComponent);
