import React from 'react'
import {NativeSelect, Pagination} from "@mui/material";


type PaginatorPropsType = {
    paginationPages: number
    page: number
    // handleChangePage: (page: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {

    const handleChangePage = (event: unknown, page: number) => {
        // props.handleChangePage(page)
    }

    return (
        <div>
            <Pagination
                color="primary"
                shape="rounded"
                count={props.paginationPages}
                page={props.page}
                onChange={handleChangePage}

            />
            {/*<span>Show</span>*/}
            {/*<NativeSelect>1</NativeSelect>*/}
        </div>
    )
}