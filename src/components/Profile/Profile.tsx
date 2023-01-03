import React, {ChangeEvent, useEffect, useState} from 'react';
import {Avatar, Badge, Button, Container, IconButton, Paper, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import s from "./Profile.module.css"
import {AddAPhoto, ArrowBack, BorderColor, Logout} from "@mui/icons-material";
import {RootReducerType, ThunkDispatchType} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {logOutTC} from "../../redux/app-Reducer";
import {emailInProfileTC, NewNameTC} from "../../redux/Reducer-profile";
import {Navigate, useNavigate} from 'react-router-dom';
import {URL} from "../../app/App";


export const Profile = React.memo((props: {}) => {
    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    const email = useSelector<RootReducerType, string>(state => state.profile.email)
    const avatar = useSelector<RootReducerType, string>(state => state.profile.avatar)
    const userName = useSelector<RootReducerType, string>(state => state.profile.name)
    const dispatch = useDispatch<ThunkDispatchType>()
    const [title, setTitle] = useState(userName)
    const [editNameMod, setEditNameMod] = useState<boolean>(false)
    const navigate=useNavigate()

    useEffect(() => {
        dispatch(emailInProfileTC())
    }, [])


    const [ava,setAva]=useState('')
    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    const updateNameHandler = () => {
        dispatch(NewNameTC({name: title}))
        setEditNameMod(false)
    }

    if (!isLoggedIn) {
        return <Navigate to={URL.LOGIN}/>
    }


    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setAva(file64)
                    dispatch(NewNameTC({avatar:file64}))
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }


    const convertFileToBase64 = (
        file: File,
        callBack: (value: string) => void
    ) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    return (
        <>
            <div className={s.back} onClick={()=> navigate(URL.CARD_PACK)}>
                <ArrowBack />
                <span>Back to pack-list</span>

            </div>
        <Container maxWidth="sm">
            <Box className={s.box}>
                <h2>
                    Personal information
                </h2>
                <Badge className={s.Badge}
                       overlap="circular"
                       anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                       badgeContent={


                           <label>
                               <input type="file" accept={'image/*'}
                                     onChange={uploadHandler}
                                      style={{display: 'none'}}
                               />
                               <IconButton
                                   style={{width: 35, height: 35, border: "1px solid white", backgroundColor: "gray"}}
                                   className={s.mySVG} component={'span'}>
                                   <AddAPhoto/>
                               </IconButton>
                           </label>
                       }
                >

                    <Avatar alt="Me"  src={avatar}  style={{width: '100px'}}/>
                </Badge>
                <div className={s.Span}>
                    {editNameMod
                        ?
                        <>
                            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.currentTarget.value)}
                                    variant="standard"
                                    autoFocus
                                    label="NickName"
                                />
                                <Button sx={{ml: 2}} onClick={updateNameHandler} size="small"
                                        variant="contained">Save</Button>
                            </Box>

                        </>
                        :
                        <>
                            <span onDoubleClick={() => setEditNameMod(true)}><h3>{userName}</h3></span>
                            <IconButton>
                                <BorderColor onClick={() => setEditNameMod(true)}/>
                            </IconButton>
                        </>
                    }
                </div>
                <span>{email}</span>
                <Button onClick={logOutHandler} variant="outlined" startIcon={<Logout/>} disabled={isDisable}>
                    Log out
                </Button>
            </Box>
        </Container>
            </>

    )
})