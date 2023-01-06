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
    const userId = useSelector<RootReducerType, string>(state => state.profile._id)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.auth.isLoggedIn)
    const currentPage = useSelector<RootReducerType, number>(state => state.pagination.packsCurrentPage)
    const totalCount = useSelector<RootReducerType, number>(state => state.pagination.allCardsPack)

    const [state, setState] = useState(1)

    useEffect(() => {
        // dispatch(getPacksTC(pageCount, state))
    }, [])
    console.log({pageCount, state})

    const array = []

    for (let i = 1; i <= pageCount; i++) {
        array.push(i)
    }

    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        // dispatch(getPacksTC(+e.currentTarget.value, currentPage, userId))
    }

    const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {
        setState(page)
        // dispatch(getPacksTC({pageCount, state}))
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
            <span>
                <Pagination count={arr.length} variant={"outlined"} shape={"rounded"} color={"primary"}
                            onChange={paginationFunc}/>
                Show <NativeSelect variant={"outlined"} defaultValue={pageCount} onChange={setPageCount}>
                {array.map(n => {
                    return <>
                        <option value={n}>{n}</option>
                    </>
                })}
            </NativeSelect>
            </span>
            </div>
        </div>
    )
}

