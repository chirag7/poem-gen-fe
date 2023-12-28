import React, { useEffect, useState } from "react";
import {FormControl, Input} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { GET_EMOTION_ANALYSIS_URL, GET_POEM_URL } from "./util";
import EmotionChart from "./EmotionChart";
import DisplayPoem from "./DisplayPoem";

const MainArea = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [generatedPoem, setGeneratedPoem] = useState('');
  const [emotions, setEmotions] = useState([]);

  const onSubmit = () => {

    if(isLoading) return;
    setIsLoading(true);
    setGeneratedPoem('')
    setEmotions([])
    const options = {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({input: userInput}),
        referrerPolicy: "unsafe-url"
    }


    fetch(GET_POEM_URL, options)
        .then(res => res.json())
        .then((res) => setGeneratedPoem(res.response || ''))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
  
    } 

  useEffect(() => {
    if(generatedPoem) {
        const options = {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({input: generatedPoem}),
            referrerPolicy: "unsafe-url"
        }
        fetch(GET_EMOTION_ANALYSIS_URL, options)
            .then(res => res.json())
            .then((res) => setEmotions(res))
            .catch((err) => console.log(err))
    }
  }, [generatedPoem])
  return (
    <main>
      <FormControl sx={{ width: "50%", m: 1 }}>
        <Input
          id="standard-adornment-amount"
          label="Amount"
          placeholder="Enter a topic, word or phrase for the poem"
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
      </FormControl>
      <LoadingButton 
        variant="contained" 
        size="medium" 
        loading={isLoading} 
        onClick={onSubmit}>
            Submit
       </LoadingButton>
       <div className="flex m-top-10">
        <DisplayPoem data={generatedPoem} />
        <EmotionChart data={emotions} />
       </div>
    </main>
  );
};

export default MainArea;
