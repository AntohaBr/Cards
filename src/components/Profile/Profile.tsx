import React, {ChangeEvent, useEffect, useState} from 'react';
import {Avatar, Badge, Button, Icon, IconButton, Paper, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import style from "./Profile.module.css"
import {AddAPhoto, BorderColor, Logout} from "@mui/icons-material";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {useDispatch, useSelector} from "react-redux";
import {logOutTC, setAppErrorAC} from "../../redux/App-reducer";
import {emailInProfileTC, NewNameTC} from "../../redux/Profile-reducer";
import {Navigate} from 'react-router-dom';
import {URL} from "../../app/App";


export const Profile = React.memo(() => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)
    const isLoggedIn = useSelector<RootReducerType, boolean>((state) => state.auth.isLoggedIn)
    const email = useSelector<RootReducerType, string>(state => state.profile.email)
    const dispatch = useDispatch<ThunkDispatchType>()

    const [title, setTitle] = useState('')
    const [editNameMod, setEditNameMod] = useState<boolean>(false)

    useEffect(() => {
        dispatch(emailInProfileTC())
    }, [])

    const logOutHandler = () => {
        dispatch(logOutTC())

    }

    const updateNameHandler = () => {
        dispatch(NewNameTC(title, ''))
        setEditNameMod(false)
    }

    // const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         const file64 = reader.result as string;
    //         callBack(file64);
    //     }
    //     reader.readAsDataURL(file);
    // }
    //
    // const uploadHandlerAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
    //     if (e.target.files && e.target.files.length) {
    //         const file = e.target.files[0]
    //         console.log(file.size)
    //         const minFileSize = 40000
    //
    //             convertFileToBase64(file, (file64: string) => {
    //                 dispatch(NewNameTC(title, file64))
    //             })
    //
    //     }
    // }

    const [errorSize, setErrorSize] = useState<null | string>(null);

    const maxSize = 400000;

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            if (file.size < maxSize) {
                convertFileToBase64(file, (file64: string) => {
                    setErrorSize(null);
                    //  dispatchToThunk(file64);
                });
            } else {
                setErrorSize("Файл слишком большого размера");
            }
        }
    };

    const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const file64 = reader.result as string;
            callBack(file64);
        };
        reader.readAsDataURL(file);
    };

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
                       <label htmlFor='add_avatar'>
                           <input type={'file'} id='add_avatar' style={{display: 'none'}}
                                  accept={'.jpg, .jpeg, .png .img'} multiple onChange={uploadHandler}/>
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
                <Avatar alt={'file'} src=''/>
            </Badge>
            <div className={style.profileSpan}>
                {editNameMod
                    ?
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            variant='standard'
                            autoFocus
                            label='NickName'
                        />
                        <Button sx={{ml: 2}} onClick={updateNameHandler} size='small' variant='contained'
                                style={{width: 70, borderRadius: 20}}>Save</Button>
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
            <div className={style.profileEmail}>{email}</div>
            <Button onClick={logOutHandler} variant="outlined" style={{width: 130, borderRadius: 20}}
                    startIcon={<Logout/>} disabled={isDisable}>Log out</Button>
        </div>
    </div>
})





// export const ConvertImageToBase64 = () => {
//
//     const [errorSize, setErrorSize] = useState<null | string>(null);
//
//     const maxSize = 400000;
//
//     const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
//         if (e.target.files && e.target.files.length) {
//             const file = e.target.files[0];
//
//             if (file.size < maxSize) {
//                 convertFileToBase64(file, (file64: string) => {
//                     setErrorSize(null);
//                     //  dispatchToThunk(file64);
//                 });
//             } else {
//                 setErrorSize("Файл слишком большого размера");
//             }
//         }
//     };
//
//     const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
//         const reader = new FileReader();
//
//         reader.onloadend = () => {
//             const file64 = reader.result as string;
//             callBack(file64);
//         };
//         reader.readAsDataURL(file);
//     };

    // const toDataURL = (url: string) =>
    //     fetch(url)
    //         .then((response) => response.blob())
    //         .then(
    //             (blob) =>
    //                 new Promise((resolve, reject) => {
    //                     const reader = new FileReader();
    //                     reader.onloadend = () => resolve(reader.result);
    //                     reader.onerror = reject;
    //                     reader.readAsDataURL(blob);
    //                 })
    //         );
    //
    // toDataURL(
    //     "https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0"
    // ).then((dataUrl) => {
    //     console.log("RESULT:", dataUrl);
    // });
    //
    // return <input type="file" />;
// };