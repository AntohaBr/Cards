import React, {ChangeEvent, useState} from 'react';
import {Avatar, Badge, Button, Icon, IconButton, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import style from "./Profile.module.css"
import {AddAPhoto, BorderColor, Logout} from "@mui/icons-material";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileTC} from "../../redux/Profile-reducer";
import {Navigate, useNavigate} from 'react-router-dom';
import {URL} from "../../app/App";
import {logOutTC} from "../../redux/Auth-reducer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {setAppErrorAC} from "../../redux/App-reducer";
import {convertFileToBase64} from "../../utils/Convert-fаile-to-base64";
import {InputTypeFile} from "../../common/Input-type-file/Input-type-file";


export const Profile = React.memo(() => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)
    const isLoggedIn = useSelector<RootReducerType, boolean>((state) => state.auth.isLoggedIn)
    const email = useSelector<RootReducerType, string>(state => state.profile.email)
    const avatarRedux = useSelector<RootReducerType, string>(state => state.profile.avatar)
    const nameRedux = useSelector<RootReducerType, string>(state => state.profile.name)
    const dispatch = useDispatch<ThunkDispatchType>()
    const navigate = useNavigate()

    const [name, setName] = useState<string>(nameRedux)
    const [avatar, setAvatar] = useState<string>(avatarRedux);
    const [editNameMod, setEditNameMod] = useState<boolean>(false)

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    const updateUserHandler = () => {
        dispatch(updateProfileTC(name, avatar))
        setEditNameMod(false)
    }

    const onClickBackToPacksHandler = () => {
        navigate(URL.PACKS)
    }

    // const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length) {
    //         const file = e.target.files[0]
    //         if (file.size < 102400) {
    //             convertFileToBase64(file, (file64: string) => {
    //                 setAvatar(file64)
    //                 dispatch(updateProfileTC(name, file64))
    //             })
    //         } else {
    //             dispatch(setAppErrorAC('File too large'))
    //         }
    //     }
    // }

    if (!isLoggedIn) {
        return <Navigate to={URL.LOGIN}/>
    }

    return <div className={style.profileBlock}>
        <div className={style.profileBackToPacks}>
            <ArrowBackIcon color={'primary'}/>
            <span className={style.profileBackToPacksText} onClick={onClickBackToPacksHandler}>Back to Packs List</span>
        </div>
        <div className={style.profileContainer}>
            <h2 className={style.profileTitle}>Personal information</h2>
            <Badge className={style.profileBadge}
                   overlap='circular'
                   anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                   badgeContent={
                <InputTypeFile
                    name={name}
                    // setAvatar={setAvatar}
                />

                       // <label htmlFor='avatar'>
                       //     <input type={'file'} id='avatar' style={{display: 'none'}}
                       //            accept={'.jpg, .jpeg, .png, img'} multiple onChange={uploadHandler}
                       //     />
                       //     <IconButton component='span'>
                       //         <Icon
                       //             style={{
                       //                 width: 35, height: 35, border: '1px solid white', borderRadius: 20,
                       //                 backgroundColor: 'gray', display: 'flex', alignItems: 'center',
                       //                 opacity: 0.7, cursor: 'pointer'
                       //             }}>
                       //             <AddAPhoto style={{color: 'white', width: '100%'}}/>
                       //         </Icon>
                       //     </IconButton>
                       // </label>
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

