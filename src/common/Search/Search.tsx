import React, {ChangeEvent, useCallback} from 'react';
import SearchIcon from '@mui/icons-material/Search'
import {alpha, InputBase, styled} from "@mui/material";


const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    color: 'lightgrey',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
    onChange: (searchValue: string) => void
    searchValue: string
}


 export const Search = React.memo((props:SearchPropsType) => {
    const changeHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    },[props.onChange])

    return <div>
        <h4>Search</h4>
        <SearchContainer>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Provide your text"
                inputProps={{ 'aria-label': 'search' }}
                type="text"
                onChange={changeHandler}
            />
        </SearchContainer>
    </div>
})