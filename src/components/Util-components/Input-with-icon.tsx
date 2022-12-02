import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


export const InputWithIcon = () => {

    return (
        <Box sx= {{'& > :not(style)': {m: 1}}}>
            <TextField
                id='input-with-icon-textfield'
                label= 'Search'
                InputProps= {{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon/>
                        </InputAdornment>
                    )
                }}
                variant='standard'
            />
        </Box>
    )
}