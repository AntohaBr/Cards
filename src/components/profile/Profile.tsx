import React, {useState} from 'react';
import {Avatar, Badge, Button, Container, IconButton, Paper, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import s from "./Profile.module.css"
import {AddAPhoto, BorderColor, Logout} from "@mui/icons-material";

export const Profile = React.memo((props: {}) => {
    const [title, setTitle] = useState("Alex")
    const [editNameMod, setEditNameMod] = useState<boolean>(false)

    const setEditModeTrue = () => {
        setEditNameMod(true)
    }
    const setEditModeFalse = () => {
        setEditNameMod(false)
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
                        <>
                            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                <TextField
                                    value={title}
                                    variant="standard"
                                    autoFocus onBlur={setEditModeFalse}
                                    label="NickName"
                                />
                                <Button size="small" variant="contained">Save</Button>
                            </Box>

                        </>
                        :
                        <>
                            <span onDoubleClick={setEditModeTrue}><h3>{title}</h3></span>
                            <IconButton>
                                <BorderColor onClick={setEditModeTrue}/>
                            </IconButton>
                        </>
                    }
                </div>
                <Button variant="outlined" startIcon={<Logout/>}>
                    Log out
                </Button>
            </Box>
        </Container>

    )
})