import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {Navigate} from "react-router-dom";
import {URL} from "../../app/App";
import {PacksTable} from "./Table/PacksTable";
import {isInitializedTC} from "../../redux/App-reducer";


export const Packs = () => {
    const pageCount = useSelector<RootReducerType, number>(state => state.pagination.packsPageCount)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.auth.isLoggedIn)
    const currentPage = useSelector<RootReducerType, number>(state => state.pagination.packsCurrentPage)
    const totalCount = useSelector<RootReducerType, number>(state => state.pagination.allCardsPack)
    const dispatch = useDispatch<ThunkDispatchType>()

    useEffect(() => {
        dispatch(isInitializedTC())
    }, [])

    if (isLoggedIn) {
        return (
            <div>
                <PacksTable pageCount={pageCount} totalCount={totalCount} currentPage={currentPage}/>
            </div>
        )
    } else {
        return <Navigate to={URL.LOGIN}/>
    }
}

