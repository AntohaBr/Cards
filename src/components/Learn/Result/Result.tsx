import React, {useState} from 'react';
import {Button, Container, Grid, Paper, Radio, TextField} from "@mui/material";
import {URL} from "../../../app/App";
import {ArrowBack} from "@mui/icons-material";
import styles from "../Learn.module.css";
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const navigate=useNavigate()

    const [answers,setAnswers]=useState([
        {title:'Did not know',grade:1},
        {title:'Forgot',grade:2},
        {title:'A lot of thought',grade:3},
        {title:'Confused',grade:4},
        {title:'Knew the answer',grade:5},

    ])


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
                        <br/>
                        <br/>
                        <h4>Answer:</h4>
                        <span>
                            This is how...
                        </span>






                         <p>
                             Rate yourself:
                             {answers.map(el=>{
                                 return(
                                     <div>
                                            <Radio />
                                            <span>{el.title}</span>
                                     </div>
                                     )

                             })}
                         </p>

                        <Button variant={"contained"}>
                          Next
                        </Button>
                    </div>

                </Paper>
            </Container>

        </Grid>
    );
};

export default Result;