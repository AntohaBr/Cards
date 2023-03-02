import React, {ChangeEvent} from 'react'
import {NativeSelect, Pagination} from '@mui/material'
import {useAppSelector} from 'utils'
import {selectAppStatus} from 'store/Selectors'


type PaginatorPropsType = {
    paginationPages: number
    pageCount: number
    page: number
    pageCountHandler: (value: string) => void
    handleChangePage: (page: number) => void
}


export const PaginationBar = React.memo((props: PaginatorPropsType) => {
        const status = useAppSelector(selectAppStatus)

        const optionSelect = [10, 25, 50, 100]

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
                    disabled={status === 'loading'}
                />
                <span>Show</span>
                <NativeSelect
                    value={props.pageCount}
                    onChange={pageCountHandler}
                >
                    {optionSelect.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </NativeSelect>
                <span>Cards per page</span>
            </div>
        )
    }
)