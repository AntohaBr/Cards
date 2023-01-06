import React, {ChangeEvent, useEffect, useState} from 'react';
import PacksTable from "./Table/PacksTable";
import {NativeSelect, Pagination} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {URL} from "../../app/App";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {getPacksTC} from "../../redux/Packs-reducer";


export const Packs = () => {
    const dispatch = useDispatch<ThunkDispatchType>()
    const pageCount = useSelector<RootReducerType, number>(state => state.pagination.packsPageCount)
    const user_id = useSelector<RootReducerType, string>(state => state.profile._id)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.auth.isLoggedIn)
    const currentPage = useSelector<RootReducerType, number>(state => state.pagination.packsCurrentPage)
    const totalCount = useSelector<RootReducerType, number>(state => state.pagination.allCardsPack)


    const [state, setState] = useState(1)

    useEffect(() => {
        dispatch(getPacksTC({pageCount, page: state}))
    }, [])
    console.log({pageCount, state})

    const array = []

    for (let i = 1; i <= pageCount; i++) {
        array.push(i)
    }

    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getPacksTC({pageCount: +e.currentTarget.value, page: currentPage, user_id}))
    }

    const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {
        setState(page)
        dispatch(getPacksTC({pageCount, page: state}))
    }

    const pagination = Math.ceil(totalCount / pageCount)

    const arr = []
    for (let i = 0; i < pagination; i++) {
        arr.push(i)
    }

    if (!isLoggedIn) {
        return <Navigate to={URL.LOGIN}/>
    }

    return (
        <div>
            <PacksTable/>
            <div>
                <Pagination
                    count={arr.length}
                    variant={"outlined"}
                    shape={"rounded"}
                    color={"primary"}
                    onChange={paginationFunc}
                />
                <span>Show</span>
                <NativeSelect
                    variant={"outlined"}
                    defaultValue={pageCount}
                    onChange={setPageCount}>
                    {array.map(n => {
                        return <>
                            <option value={n}>{n}</option>
                        </>
                    })}
                </NativeSelect>
            </div>
        </div>
    )
}

