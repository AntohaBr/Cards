import React, {ChangeEvent, useEffect, useState} from 'react';
import {Avatar, Badge, Button, Container, Icon, IconButton, Paper, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import style from "./Profile.module.css"
import {AddAPhoto, BorderColor, Logout} from "@mui/icons-material";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {useDispatch, useSelector} from "react-redux";
import {logOutTC} from "../../redux/App-reducer";
import {emailInProfileTC, NewNameTC} from "../../redux/Profile-reducer";
import { Navigate } from 'react-router-dom';
import {URL} from "../../app/App";
import {getPacksTC} from "../../redux/Packs-reducer";


export const Profile = React.memo(() => {

    const isDisable=useSelector<RootReducerType,boolean>(state => state.app.isDisabled)
    const isLoggedIn = useSelector<RootReducerType, boolean>((state) => state.auth.isLoggedIn)
    const email = useSelector<RootReducerType, string>(state => state.profile.email)
    const dispatch = useDispatch<ThunkDispatchType>()

    const [title, setTitle] = useState("Alex")
    const [editNameMod, setEditNameMod] = useState<boolean>(false)



    useEffect(() => {
        dispatch(getPacksTC())
    }, [])
    useEffect(() => {
        dispatch(emailInProfileTC())
    }, [])

    const logOutHandler = () => {
        dispatch(logOutTC())
        if (!isLoggedIn) {
            return <Navigate to={URL.LOGIN}/>
        }
    }

    const updateNameHandler = () => {
        dispatch(NewNameTC(title, ''))
        setEditNameMod(false)
    }

    const changeAvatar = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length){
            const img = e.target.files[0];
        }
    }

    return <div className={style.profileBlock}>
               <div className={style.profileContainer}>
                   <h2 className={style.profileTitle}>Personal information</h2>
                   <Badge className={style.profileBadge}
                          overlap="circular"
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                          badgeContent={
                              <>
                                  <label htmlFor="add_avatar">
                                      <input type={"file"} id='add_avatar' style={{display:'none'}} accept={'image/*'} onChange={changeAvatar}/>
                                      <Icon
                                          style={{width: 35, height: 35, border: "1px solid white", borderRadius:20, backgroundColor: "gray"}}
                                          className={style.profileMySVG}>
                                          <AddAPhoto/>
                                      </Icon>
                                  </label>
                              </>
                          }
                   >
                       <Avatar alt="Me"
                               src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614599142_52-p-foto-cheloveka-na-belom-fone-59.jpg"/>
                   </Badge>
                   <div className={style.profileSpan}>
                       {editNameMod
                           ?
                               <Box  sx={{display: 'flex', alignItems: 'flex-end'}}>
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
                           :
                           <>
                               <span onDoubleClick={() => setEditNameMod(true)}><h3>{title}</h3></span>
                               <IconButton>
                                   <BorderColor onClick={() => setEditNameMod(true)}/>
                               </IconButton>
                           </>
                       }
                   </div>
                   <span className={style.profileEmail}>{email}</span>
                   <Button onClick={logOutHandler} variant="outlined"  startIcon={<Logout/>} disabled={isDisable}>
                       Log out
                   </Button>
               </div>
       </div>
})


// конвертирование
// const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
//     const reader = new FileReader();
//
//     reader.onloadend = () => {
//         const file64 = reader.result as string;
//
//         callBack(file64);
//     };
//     reader.readAsDataURL(file);
// };


//
// const convertFileToBase64 =
// const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
//     if (e.target.files && e.target.files.length) {
//         const file = e.target.files[0];
//
//         if (file.size < minFileSize) {
//             convertFileToBase64(file, (file64: string) => {
//                 dispatch(updateUser({ avatar: file64 }));
//             });
//         } else {
//             dispatch(
//                 setAppSnackbarValue({
//                     type: snackbarType.ERROR,
//                     message: 'Incorrect file size or type',
//                 }),
//             );
//         }
//     }
// };
