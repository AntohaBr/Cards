import {ChangeEvent, FC, memo, useEffect, useState} from 'react'
import {SearchIcon, alpha, InputBase, styled} from 'collections-mui'
import s from 'common/Styles/Forms.module.css'
import {packsActions} from 'reducers/Packs-reducer'
import {useAppDispatch, useDebounce} from 'utils'
import {useMatch} from "react-router-dom"
import {cardsActions} from 'reducers/Cards-reducer'
import {PATH} from 'constants/Routing/Rout-constants'


const SearchContainer = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
    color: 'lightgrey',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
    border: '1px solid lightgrey',
    borderRadius: '4px',
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '300px',
    },
}))


type SearchPropsType = {
    valueSearch: string
}


export const Search: FC<SearchPropsType> = memo(({valueSearch}) => {
    const [value, setValue] = useState<string>(valueSearch ? valueSearch : '')

    const debouncedValue = useDebounce<string>(value, 700)
    const dispatch = useAppDispatch()
    const match = useMatch('/:routeKey/*')

    useEffect(() => {
        if ('/' + match?.params.routeKey === PATH.PACKS) {
            dispatch(packsActions.setPackNameForSearch(value))
        } else if ('/' + match?.params.routeKey === PATH.CARDS) {
            dispatch(cardsActions.setQuestionForSearch(value))
        }
    }, [debouncedValue])

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <div>
            <div className={s.filterTitle}>Search</div>
            <div>
                <SearchContainer>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder='Provide your text'
                        inputProps={{'aria-label': 'search'}}
                        type='search'
                        value={value}
                        onChange={changeHandler}
                    />
                </SearchContainer>
            </div>
        </div>
    )
})
