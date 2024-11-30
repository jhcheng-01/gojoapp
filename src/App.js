import React from "react";
import ReactDOM from "react-dom";

import { useEffect, useState } from 'react'
import './App.css'

import useSound from 'use-sound';
import boom_sfx from './/sounds/boom.mp3';

function App()
{
  const [time, setTime] = useState(0);
  const [lct, set_lct] = useState(0);

  const [gif_src, set_src] = useState(".//images/freaky.jpg");
  const [count, setCount] = useState(0);
  const [play_boom] = useSound(boom_sfx);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTime((time) => time + 0.00001);
    }, 10);

    if (lct > 0 && time <= lct + 0.15)
    {
      set_src(".//images/backshot.gif")
    }
    else
    {
      set_src(".//images/freeze.png")
    }
  });

  function handle_click()
  {
    setCount((count) => count + 1);
    play_boom();
    set_lct(time);
  }

  return (
    <>

      <div
        style={
          { 
          backgroundImage: "url('" + gif_src + "')",
          backgroundSize: 'cover', // Adjust as needed
          backgroundPosition: 'center', // Adjust as needed
          width: '100vh',
          height: '100vh',
          userSelect: 'none'
          }
        }
        onClick={() => 
          {
            handle_click();
          }
        }
      >

        <h1>Satoru Gojo's Backshot Clicker</h1>

        <audio id="audio" loop autoplay> 
          <source src=".//sounds/piano.mp3" type="audio/mpeg"/>
        </audio>

        <div className="card">
          <h1>
            Clicks: {count}
          </h1>
        </div>

      </div>
    </>
  )
}

export default App