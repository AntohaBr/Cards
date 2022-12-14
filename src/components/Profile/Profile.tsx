import React, {useEffect, useState} from 'react';
import {Avatar, Badge, Button, Icon, IconButton, Paper, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import style from "./Profile.module.css"
import {AddAPhoto, BorderColor, Logout} from "@mui/icons-material";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {useDispatch, useSelector} from "react-redux";
import {emailInfoTC, updateProfileTC} from "../../redux/Profile-reducer";
import {Navigate} from 'react-router-dom';
import {URL} from "../../app/App";
import {logOutTC} from "../../redux/Autch-reducer";


export const Profile = React.memo(() => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)
    const isLoggedIn = useSelector<RootReducerType, boolean>((state) => state.auth.isLoggedIn)
    const email = useSelector<RootReducerType, string>(state => state.profile.email)
    const dispatch = useDispatch<ThunkDispatchType>()
    const avatarRedux = useSelector<RootReducerType, string>(state => state.profile.avatar)
    const nameRedux = useSelector<RootReducerType, string>(state => state.profile.name)

    const [name, setName] = useState<string>(nameRedux)
    const [avatar, setAvatar] = useState<string>(avatarRedux);
    const [editNameMod, setEditNameMod] = useState<boolean>(false)

    useEffect(() => {
        dispatch(emailInfoTC())
    }, [])

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    const updateUserHandler = () => {
        dispatch(updateProfileTC(name, avatar))
        setEditNameMod(false)
    }

    const photoUpload = (e: any): void => {
        e.preventDefault()
        const reader = new FileReader()
        const file = e.target.files[0]
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                setAvatar(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }


    if (!isLoggedIn) {
        return <Navigate to={URL.LOGIN}/>
    }

    return <div className={style.profileBlock}>
        <div className={style.profileContainer}>
            <h2 className={style.profileTitle}>Personal information</h2>
            <Badge className={style.profileBadge}
                   overlap='circular'
                   anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                   badgeContent={
                       <label htmlFor='avatar'>
                           <input type={'file'} id='avatar' style={{display: 'none'}}
                                  accept={'.jpg, .jpeg, .png, img'} multiple onChange={photoUpload}
                                  src={avatar}/>
                           <Icon
                               style={{
                                   width: 35, height: 35, border: '1px solid white', borderRadius: 20,
                                   backgroundColor: 'gray', display: 'flex', alignItems: 'center',
                                   opacity: 0.7, cursor: 'pointer'
                               }}>
                               <AddAPhoto style={{color: 'white', width: '100%'}}/>
                           </Icon>
                       </label>
                   }
            >
                <Avatar alt={'avatar'} src={avatar}/>
            </Badge>
            <div className={style.profileSpan}>
                {editNameMod
                    ?
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.currentTarget.value)}
                            variant='standard'
                            autoFocus
                            label='NickName'
                        />
                        <Button sx={{ml: 2}} onClick={updateUserHandler} size='small' variant='contained'
                                style={{width: 70, borderRadius: 20}}>Save</Button>
                    </Box>
                    :
                    <>
                        <span onDoubleClick={() => setEditNameMod(true)}><h3>{name}</h3></span>
                        <IconButton>
                            <BorderColor onClick={() => setEditNameMod(true)}/>
                        </IconButton>
                    </>
                }
            </div>
            <div className={style.profileEmail}>{email}</div>
            <Button onClick={logOutHandler} variant="outlined" style={{width: 130, borderRadius: 20}}
                    startIcon={<Logout/>} disabled={isDisable}>Log out</Button>
        </div>
    </div>
})

