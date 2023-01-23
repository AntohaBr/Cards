import React from 'react';
import {Navigate} from "react-router-dom";
import {URL} from "../../app/App";
import {PacksTable} from "./PacksTable";
import {useAppSelector} from "../../utils/Hooks";


export const Packs = () => {
    const pageCount = useAppSelector(state => state.pagination.packsPageCount)
    const currentPage = useAppSelector(state => state.pagination.packsCurrentPage)
    const totalCount = useAppSelector(state => state.pagination.allCardsPack)
    const packs = useAppSelector(state => state.packs.cardPacks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={URL.LOGIN}/>
    }

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
}

