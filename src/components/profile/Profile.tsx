import React, {useEffect, useState} from 'react';
import {Avatar, Badge, Button, Container, IconButton, Paper, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import s from "./Profile.module.css"
import {AddAPhoto, BorderColor, Logout} from "@mui/icons-material";

import {RootReducerType, useTypedDispatch} from "../../redux/Store";
import {emailInProfileTC, logOutTC, NewNameTC} from "../../app/app-reducer";
import {useSelector} from "react-redux";

export const Profile = React.memo((props: {}) => {

    const email = useSelector<RootReducerType, string>(state => state.appReducerProfile.email)
    const dispatch = useTypedDispatch()
    const [title, setTitle] = useState("Alex")
    const [editNameMod, setEditNameMod] = useState<boolean>(false)

    useEffect(() => {
        dispatch(emailInProfileTC())
    }, [])

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    const updateNameHandler = () => {
        dispatch(NewNameTC(title, ''))
    }

    return (
        <Container maxWidth="sm">
            <Box className={s.box}>
                <h2>
                    Personal information
                </h2>
                <Badge className={s.Badge}
                       overlap="circular"
                       anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                       badgeContent={
                           <IconButton
                               style={{width: 35, height: 35, border: "1px solid white", backgroundColor: "gray"}}
                               className={s.mySVG}>
                               <AddAPhoto/>
                           </IconButton>
                       }
                >
                    <Avatar alt="Me"
                            src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614599142_52-p-foto-cheloveka-na-belom-fone-59.jpg"/>
                </Badge>
                <div className={s.Span}>
                    {editNameMod
                        ?
                        < >
                            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.currentTarget.value)}
                                    // onBlur={() => setEditNameMod(false)}
                                    variant="standard"
                                    autoFocus
                                    label="NickName"
                                />
                                <Button sx={{ml: 2}} onClick={updateNameHandler} size="small"
                                        variant="contained">Save</Button>
                                {/*<button onClick={updateNameHandler}>save</button>*/}
                            </Box>

                        </>
                        :
                        <>
                            <span onDoubleClick={() => setEditNameMod(true)}><h3>{title}</h3></span>
                            <IconButton>
                                <BorderColor onClick={() => setEditNameMod(true)}/>
                            </IconButton>
                        </>
                    }
                </div>
                <span>{email}</span>
                <Button onClick={logOutHandler} variant="outlined" startIcon={<Logout/>}>
                    Log out
                </Button>
            </Box>
        </Container>

    )
})