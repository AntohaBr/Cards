import React, {useEffect} from 'react';
import {Navigate} from "react-router-dom";
import {URL} from "../../app/App";
import {PacksTable} from "./Table/PacksTable";
import {isInitializedTC} from "../../redux/App-reducer";
import {useAppDispatch, useAppSelector} from "../../utils/Hooks";


export const Packs = () => {
    const pageCount = useAppSelector(state => state.pagination.packsPageCount)
    const currentPage = useAppSelector(state => state.pagination.packsCurrentPage)
    const totalCount = useAppSelector(state => state.pagination.allCardsPack)
    const packs = useAppSelector(state => state.packs.cardPacks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(isInitializedTC())
    }, [])

    if (isLoggedIn) {
        return (
            <div>
                <PacksTable
                    pageCount={pageCount}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    packs={packs}
                />
            </div>
        )
    } else {
        return <Navigate to={URL.LOGIN}/>
    }
}

