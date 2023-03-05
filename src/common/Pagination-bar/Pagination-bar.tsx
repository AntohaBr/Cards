import {memo} from 'react'
import {MenuItem, Pagination, Select} from 'collections'
import {useAppSelector} from 'utils'
import {selectAppStatus} from 'store/Selectors'
import {SelectChangeEvent} from '@mui/material/Select'
import s from './Pagination-bar.module.css'


type PaginatorPropsType = {
    paginationPages: number
    pageCount: number
    page: number
    pageCountHandler: (value: string) => void
    handleChangePage: (page: number) => void
}


export const PaginationBar = memo((props: PaginatorPropsType) => {
        const status = useAppSelector(selectAppStatus)

        const optionSelect = [5, 10, 25]

        const pageCountHandler = (e: SelectChangeEvent) => {
            props.pageCountHandler(e.target.value as string)
        }

        const handleChangePage = (event: unknown, page: number) => {
            props.handleChangePage(page)
        }

        return (
            <div className={s.paginationBar}>
                <Pagination
                    color='primary'
                    shape='rounded'
                    page={props.page}
                    onChange={handleChangePage}
                    count={props.paginationPages}
                    disabled={status === 'loading'}
                />
                <div className={s.select}>
                    <span>Show</span>
                    <Select
                        size={'small'}
                        disabled={status === 'loading'}
                        value={props.pageCount.toString()}
                        onChange={pageCountHandler}
                    >
                        {optionSelect.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    <span>Cards per page</span>
                </div>
            </div>
        )
    }
)