import React, {ChangeEvent, useEffect, useState} from 'react';
import PacksTable from "./Table/PacksTable";
import {Button, NativeSelect, Pagination, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../../redux/store";
import {getCardPackTC} from "../../redux/cardPacks-Reducer";
import {Navigate} from "react-router-dom";
import {URL} from "../../app/App";

const Packs = () => {
    const dispatch = useDispatch<ThunkDispatchType>()
    const pageCount = useSelector<RootReducerType, number>(state => state.cardPacks.pageCount)
    const userId = useSelector<RootReducerType, string>(state => state.cardPacks.userId)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    const currentPage = useSelector<RootReducerType, number>(state => state.cardPacks.currentPage)
    const totalCount = useSelector<RootReducerType, number>(state => state.cardPacks.allCardsPack)


    const [state, setState] = useState(0)

    useEffect(() => {
        dispatch(getCardPackTC( pageCount, state))

    }, [])


    if (!isLoggedIn) {
        return <Navigate to={URL.LOGIN}/>
    }

    const array = []

    for (let i = 1; i <= pageCount; i++) {
        array.push(i)
    }
    console.log(array)
    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCardPackTC( +e.currentTarget.value, currentPage,userId))

    }


    const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {
        setState(page)
        dispatch(getCardPackTC( pageCount, state))
    }

    const pagination = Math.ceil(totalCount / pageCount)

    const arr = []
    for (let i = 0; i < pagination; i++) {
        arr.push(i)
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
                    return (
                        <>
                            <option value={n}>{n}</option>

                        </>


                    )
                })}

            </NativeSelect>

            </span>
            </div>
        </div>
    );
};

export default Packs;