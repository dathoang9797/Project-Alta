import { PaginationEntity } from '@core/pagination/entity';
import { OptionEntity } from '@core/table';
import React, { useRef } from 'react';

export interface IRef {
    getData: () => any;
    fetchData: (obj?: {
        pagination?: PaginationEntity,
        option?: OptionEntity
    }) => void;
    setOption: (option: OptionEntity) => void;
    setPagination: (params:PaginationEntity)=>void;
    setSelection?:(params:Array<any>)=>void;
    clearSelection?:()=>void;
}

const useTable: () => IRef = () => {
    const ref = useRef({
        getData: null,
        fetchData: null,
        setOption: null,
        setPagination: null,
    })

    const getRef = () => {
        return { ...ref.current };
    }

    return ref.current
}

export default useTable;