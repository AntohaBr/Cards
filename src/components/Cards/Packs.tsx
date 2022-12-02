import React, {ChangeEvent, useEffect, useState} from 'react';
import PacksTable from "./Table/PacksTable";
import {Button, NativeSelect, Pagination, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
// import {getCardPackTC} from "../../redux/cardPacks-Reducer";
import {Navigate} from "react-router-dom";
import {URL} from "../../app/App";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";

export const Packs = () => {
    // const dispatch = useDispatch<ThunkDispatchType>()
    // const pageCount = useSelector<RootReducerType, number>(state => state.pagination.packsPageCount)
    // const userId = useSelector<RootReducerType, string>(state => state.cardPacks.userId)
    // const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.auth.isLoggedIn)
    // const currentPage = useSelector<RootReducerType, number>(state => state.pagination.packsCurrentPage)
    // const totalCount = useSelector<RootReducerType, number>(state => state.pagination.allCardsPack)
    //
    // const [state, setState] = useState(1)
    //
    // useEffect(() => {
    //     dispatch(getCardPackTC(pageCount, state))
    // }, [])
    // console.log({pageCount, state})
    //
    // const array = []
    //
    // for (let i = 1; i <= pageCount; i++) {
    //     array.push(i)
    // }
    //
    // const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
    //     dispatch(getCardPackTC(+e.currentTarget.value, currentPage, userId))
    // }
    //
    // const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {
    //     setState(page)
    //     dispatch(getCardPackTC(pageCount, state))
    // }
    //
    // const pagination = Math.ceil(totalCount / pageCount)
    //
    // const arr = []
    // for (let i = 0; i < pagination; i++) {
    //     arr.push(i)
    // }
    //
    // if (!isLoggedIn) {
    //     return <Navigate to={URL.LOGIN}/>
    // }

    return (
        <div>
            Проверка на переход packs. Уже работает!
            {/*<PacksTable/>*/}
            {/*<div>*/}
            {/*<span>*/}
            {/*    <Pagination count={arr.length} variant={"outlined"} shape={"rounded"} color={"primary"}*/}
            {/*                onChange={paginationFunc}/>*/}
            {/*    Show <NativeSelect variant={"outlined"} defaultValue={pageCount} onChange={setPageCount}>*/}
            {/*    {array.map(n => {*/}
            {/*        return <>*/}
            {/*            <option value={n}>{n}</option>*/}
            {/*        </>*/}
            {/*    })}*/}
            {/*</NativeSelect>*/}
            {/*</span>*/}
            {/*</div>*/}
        </div>
    )
}

