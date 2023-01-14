import React, {useEffect} from 'react';
import PacksTable from "./Table/PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../../redux/store";
import {Navigate} from "react-router-dom";
import {URL} from "../../app/App";
import {getCardPackTC} from "../../redux/cardPacks-Reducer";
import {emailInProfileAC, emailInProfileTC} from "../../redux/Reducer-profile";


const Packs = () => {

    const pageCount = useSelector<RootReducerType, number>(state => state.pagination.packsPageCount)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    const currentPage = useSelector<RootReducerType, number>(state => state.pagination.packsCurrentPage)
    const totalCount = useSelector<RootReducerType, number>(state => state.pagination.allCardsPack)
    const dispatch=useDispatch<ThunkDispatchType>()

    useEffect(() => {
        dispatch(emailInProfileTC())
    }, [])

    if (isLoggedIn) {

        return (
            <div>
                <PacksTable pageCount={pageCount} totalCount={totalCount} currentPage={currentPage}/>
            </div>
        );
    }
    else {
        return <Navigate to={URL.LOGIN}/>

    }
};

export default Packs;