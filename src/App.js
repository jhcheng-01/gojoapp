import React from "react";
import ReactDOM from "react-dom";

import { useEffect, useState } from 'react'
import './App.css'

import freaky from "./images/freaky.jpg"
import paused_gif from "./images/freeze.png"
import playing_gif from "./images/backshot.gif"

import shop_icon from "./images/shop.png"
import chill_guy from "./images/chill.png"
import goku from "./images/goku.jpg"

import useSound from 'use-sound';
import boom_sfx from './sounds/boom.mp3';

function App()
{
  const [time, setTime] = useState(0);
  const [lct, set_lct] = useState(0);
  const [ls, set_ls] = useState(0);

  const [click_enabled, toggle_click] = useState(true);
  const [power, setPower] = useState(1);
  const [aura, setAura] = useState(0);

  const [gif_src, set_src] = useState(freaky);
  const [count, setCount] = useState(0);
  const [play_boom] = useSound(boom_sfx);
  const [shop_opened, toggle_shop] = useState(false);

  /*
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTime((time) => time + 0.00001);
    }, 10);

    if (time > ls + 1)
    {
      setCount(count + aura);
      set_ls(time);
    }

    if (lct > 0 && time <= lct + 0.15)
    {
      set_src(playing_gif)
    }
    else
    {
      set_src(paused_gif)
    }
    return;
  });
  */

  function handle_click()
  {
    if (click_enabled)
    {
      setCount((count) => count + power);
      play_boom();
      set_lct(time);
    }
  }

  function open_shop()
  {
    toggle_shop(true);
    toggle_click(false);
  }

  function close_shop()
  {
    toggle_shop(false);
    toggle_click(true);
  }

  function Stats()
  {
    return (
      <>
        <h1 className="text-stroke">
          backshots: {count}
        </h1>
        <p className="text-stroke">
          power: {power}
        </p>
        <p className="text-stroke">
          aura: {aura}
        </p>
      </>
    );
    
  }

  function buy_item(cost, extra_power, extra_aura)
  {
    if (count >= cost)
    {
      setCount(count - cost);
      setPower(extra_power + power);
      setAura(extra_aura + aura);
    }
  }

  function Shop_Item(props)
  {
    return (
      <>
        <div className="shop-item">
          <img className="square-image" src={props.img}/>
          <h1 className="text-stroke">{props.name}</h1>
          <p>{props.description}</p>
          {props.power > 0 && <h3>power: +{props.power}</h3>}
          {props.aura > 0 && <h3>power: +{props.aura}</h3>}
          <button type="button" onClick={() => buy_item(props.cost, props.power, props.aura)}>
            <h3>buy (cost: {props.cost})</h3>
          </button>
        </div>
      </>
    );
  }

  function Catalog()
  {
    return (
    <div className="catalog">
      <ul>
        <Shop_Item
          img = {freaky}
          name = "extra freak"
          cost = {50}
          power = {1}
          aura = {0}
          description = "g-g-g-gyatt?!?"
        />

        <Shop_Item
          img = {chill_guy}
          name = "chill guy"
          cost = {500}
          power = {0}
          aura = {20}
          description = "yea"
        />

        <Shop_Item
          img = {goku}
          name = "goku"
          cost = {100000}
          power = {1000}
          aura = {0}
          description = "i hear your brainrot is strong! let me fight it!"
        />
      </ul>
    </div>
    )
  }

  function Shop()
  {
    return (
      <>
        <div
          className="full-screen-div"
          style={
            { 
            backgroundColor: 'midnightblue',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            userSelect: 'none',
            zIndex: 2
            }
          }
        >

          <div className="center">
            <Stats/>
          </div>

          <Catalog/>

          <button type="button" onClick={() => close_shop()}>
            <h3>close shop</h3>
          </button>

        </div>
      </>
    )
  }

  return (
    <>
      {shop_opened && <Shop/>}
      <div
        className="full-screen-div"
        style={
          { 
          backgroundImage: "url('" + gif_src + "')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          userSelect: 'none',
          zIndex: 1
          }
        }
        onClick={() => 
          {
            handle_click();
          }
        }
      >

        <div className="center">
          <h1 className="text-stroke">
            satoru gojo's backshots clicker
          </h1>
          <p className="text-stroke">
            by team thukuna's last tooth (jasmine & jack)
          </p>
        </div>

        <div className="bottom-bar">
          
          <Stats/>
          <div className="shop-button">
            <button type="button" onClick={() => open_shop()}>
              <img src={shop_icon} alt="Shop" width="100" height="100"></img>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App