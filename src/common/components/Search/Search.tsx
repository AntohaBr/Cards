import {ChangeEvent, memo, useCallback, useEffect, useState} from 'react'
import {SearchIcon, alpha, InputBase, styled} from 'collections-mui'
import s from 'common/Styles/Forms.module.css'
import {packsActions} from "../../../reducers/Packs-reducer";
import {useAppDispatch, useDebounce} from "../../../utils";
import {useNavigate} from "react-router-dom";
import {getCards} from "../../../reducers/Cards-reducer";


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
    onChange: (valueSearch: string) => void
    valueSearch: string
}


export const Search = memo((props: SearchPropsType) => {

    const changeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            props.onChange(e.currentTarget.value)
        },
        [props.onChange]
    )

    return (
        <div>
            <div className={s.filterTitle}>Search</div>
            <div>
                <SearchContainer>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        id='q'
                        placeholder='Provide your text'
                        inputProps={{'aria-label': 'search'}}
                        type='search'
                        value={props.valueSearch}
                        onChange={changeHandler}
                        name='q'
                    />
                </SearchContainer>
            </div>
        </div>
    )
})
