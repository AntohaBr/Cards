import React, {useEffect} from 'react';
import {Button, Container, Grid, Paper} from "@mui/material";
import styles from './Learn.module.css'
import {URL} from "../../app/App";
import {ArrowBack} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const Learn = () => {
    const navigate=useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            navigate(URL.RESULT)
        },4000)
    },[])
    return (
        <Grid container xs={6} sm={12} >
           <Container fixed>
               <div>
                   <Button onClick={() => navigate(URL.CARD_PACK)}>
                       <ArrowBack/>
                   </Button>
                   <span>Back to pack List</span>
               </div>
               <h3 style={{textAlign:"center"}}>Learn "Pack Name"</h3>
               <Paper>
                   <div className={styles.main}>
                       <p><strong>
                           Question:
                       </strong> How work JS?</p>
                       <p>Количество попыток:10</p>

                       <p>..........</p>

                       <Button variant={"contained"}>
                           Show answer
                       </Button>
                   </div>

               </Paper>
           </Container>

        </Grid>
    );
};

export default Learn;