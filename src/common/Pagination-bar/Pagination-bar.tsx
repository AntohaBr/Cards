import React, {ChangeEvent} from 'react'
import {NativeSelect, Pagination} from '@mui/material'


type PaginatorPropsType = {
    paginationPages: number
    pageCount: number
    page: number
    pageCountHandler: (value: string) => void
    handleChangePage: (page: number) => void
    optionSelect: number[]
    status: string
}


export const PaginationBar = (props: PaginatorPropsType) => {

    const pageCountHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        props.pageCountHandler(e.currentTarget.value)
    }

    const handleChangePage = (event: unknown, page: number) => {
        props.handleChangePage(page)
    }

    return (
        <div>
            <Pagination
                color='primary'
                shape='rounded'
                page={props.page}
                onChange={handleChangePage}
                count={props.paginationPages}
                disabled={props.status === 'loading'}
            />
            <span>Show</span>
            <NativeSelect
                value={props.pageCount}
                onChange={pageCountHandler}
            >
                {props.optionSelect.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
            </NativeSelect>
            <span>Cards per page</span>
        </div>
    )
}