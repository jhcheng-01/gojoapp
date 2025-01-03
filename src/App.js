import React from "react";
import ReactDOM from "react-dom";

import { useEffect, useState } from 'react'
import './App.css'

import freaky from "./images/freaky.jpg"
import paused_gif from "./images/freeze.png"
import playing_gif from "./images/backshot.gif"

import yaoi from "./images/yaoi.png"

import credits_icon from "./images/credits.jpg"
import shop_icon from "./images/shop.png"

import toji from "./images/toji.gif"
import purple from "./images/purple.gif"
import skibidi from "./images/skibidi.jpg"
import deodorant from "./images/deodorant.png"
import taperfade from "./images/taperfade.gif"
import rizz from "./images/rizz.gif"
import thukuna from "./images/thukuna.jpg"
import chill_guy from "./images/chill.png"
import goku from "./images/goku.jpg"
import walter from "./images/walterwhite.png"
import subway from "./images/subwaysurfers.gif"
import victory from "./images/victory.gif"

import useSound from 'use-sound';
import boom_sfx from './sounds/boom.mp3';
import getout_sfx from './sounds/getout.mp3';
import chaching_sfx from './sounds/chaching.mp3';
import victoryspeech_sfx from './sounds/victoryspeech.mp3';
import clapping_sfx from './sounds/clapping.mp3';

function App()
{
  const [time, setTime] = useState(0);
  const [lct, set_lct] = useState(0);
  const [ls, set_ls] = useState(0);

  const [click_enabled, toggle_click] = useState(true);
  const [power, setPower] = useState(1);
  const [aura, setAura] = useState(0);

  const [gif_src, set_src] = useState(paused_gif);
  const [count, setCount] = useState(0);

  const [play_boom] = useSound(boom_sfx);
  const [play_chaching] = useSound(chaching_sfx);
  const [play_getout] = useSound(getout_sfx);
  const [play_victoryspeech] = useSound(victoryspeech_sfx)
  const [play_clapping] = useSound(clapping_sfx, {volume: 0.3})

  const [subway_enabled, toggle_subway] = useState(false);
  const [shop_opened, toggle_shop] = useState(false);
  const [credits_opened, toggle_credits] = useState(false);
  const [game_won, win_game] = useState(false);

  function add_aura(added_aura)
  {
    if (!shop_opened)
    {
      console.log("adding aura");
      setCount((count) => count + added_aura);
    }
    else
    {
      console.log("cannot add aura");
    }
    
  }

  useEffect(() => {

    const interval = setInterval(() => {
      console.log("aura: " + aura)
      add_aura(aura);
    }, 1000);
  
    return () => clearInterval(interval);
    
  }, [aura, click_enabled]);


  function handle_click()
  {
    if (click_enabled)
    {
      setCount((count) => count + power);
      play_boom();
      set_lct(time);
      set_src(playing_gif);
      setTimeout(() => {
        set_src(paused_gif);
      }, 100);
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

  function open_credits()
  {
    toggle_credits(true);
    toggle_click(false);
  }

  function close_credits()
  {
    toggle_credits(false);
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
    if (cost == 1000000)
    {
      win_game(true);
      play_clapping();
      play_victoryspeech();
      return;
    }

    if (count >= cost)
    {
      setCount(count - cost);
      setPower(power + extra_power);
      setAura(aura + extra_aura);

      if (cost == 699)
      {
        toggle_subway(true);
      }

      play_chaching();
    }
    else
    {
      play_getout();
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
          {props.aura > 0 && <h3>aura: +{props.aura}</h3>}
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
          img = {toji}
          name = "dancing roblox toji"
          cost = {50}
          power = {0}
          aura = {2}
          description = "hop on league of legends"
        />

        <Shop_Item
          img = {freaky}
          name = "extra freak"
          cost = {100}
          power = {1}
          aura = {0}
          description = "g-g-g-gyatt?!?"
        />

        <Shop_Item
          img = {purple}
          name = "hollow purple"
          cost = {250}
          power = {3}
          aura = {7}
          description = "this is me throwing rocks at my neighbors window"
        />

        <Shop_Item
          img = {chill_guy}
          name = "chill guy"
          cost = {500}
          power = {0}
          aura = {50}
          description = "One day we will have to answer to God for our sins"
        />

        <Shop_Item
          img = {skibidi}
          name = "skibdi toilet"
          cost = {1000}
          power = {12}
          aura = {80}
          description = "bop bop"
        />

        <Shop_Item
          img = {deodorant}
          name = "deodorant"
          cost = {5000}
          power = {45}
          aura = {100}
          description = "for all the smelly CS majors"
        />

        <Shop_Item
          img = {walter}
          name = "walter white"
          cost = {5000}
          power = {1}
          aura = {500}
          description = "jesse we have to cook"
        />

        <Shop_Item
          img = {rizz}
          name = "infinite skibidi rizz"
          cost = {6999}
          power = {100}
          aura = {0}
          description = "will get you a restraining order"
        />

        <Shop_Item
          img = {subway}
          name = "subway surfers clip"
          cost = {699}
          power = {0}
          aura = {0}
          description = "+0 power or aura but adds a subway surfer clip on the side"
        />

        <Shop_Item
          img = {taperfade}
          name = "gojo taper fade"
          cost = {15000}
          power = {200}
          aura = {200}
          description = "oough...."
        />

        <Shop_Item
          img = {thukuna}
          name = "thukuna"
          cost = {50000}
          power = {500}
          aura = {400}
          description = "it ith i! the kingth of curtheth!"
        />

        <Shop_Item
          img = {goku}
          name = "goku"
          cost = {100000}
          power = {1000}
          aura = {0}
          description = "i hear your brainrot is strong! let me fight it!"
        />

        <Shop_Item
          img = {victory}
          name = "win the game"
          cost = {1000000}
          power = {0}
          aura = {0}
          description = "victory royale"
        />
      </ul>
    </div>
    )
  }

  function Credits()
  {
    return (
      <>
        <div
          className="full-screen-div"
          style={
            { 
            backgroundColor: 'rebeccapurple',
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

          <h1 style={{color: "white"}}>Images used in this project belong to the following sources/artists:</h1>
          <div className="credits">
            <ul>
              <h3>Tenor</h3>
              <h3>Jujutsu Kaisen</h3>
              <h3>Dragonball</h3>
              <h3>Fortnite</h3>
              <h3>DaFuqBoom (Skibidi Toilet)</h3>
              <h3>Phillip Banks (Chill Guy)</h3>

              <h3>1shymura</h3>
              <h3>Xiao_rei</h3>
              <h3>Junko</h3>
              <h3>Suhmizo</h3>
              <h3>yu_uue</h3>
              <h3>bluebees</h3>
              <h3>xxgojoxx</h3>
              <h3>jaryn</h3>
              <h3>sumi</h3>
            </ul>
          </div>
          <p style={{color: "white"}}>If your art is featured but we didn't get your name, please notify us so we can add you.</p>
          <p style={{color: "white"}}>If you are an artist and want your art removed, please notify us so we can do so.</p>

          <button type="button" onClick={() => close_credits()}>
            <h3>close credits</h3>
          </button>

        </div>
      </>
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

  function Win()
  {
    return (
      <>
        <div
          className="full-screen-div"
          style={
            { 
            backgroundColor: 'tan',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            userSelect: 'none',
            zIndex: 3
            }
          }
        >

          

          <div className="center">
            <h1>epic win</h1>
            <p>thanks for playing</p>
            <p>we hope your brain has been sufficiently rotted</p>
            <p>- team thukuna's last tooth (jasmine & jack)</p>

            <h2>final stats</h2>
            <p>
              backshots: {count}
            </p>
            <p>
              power: {power}
            </p>
            <p>
              aura: {aura}
            </p>

            <img src={yaoi}></img>
          </div>

        </div>
      </>
    )
  }

  return (
    <>
      {game_won && <Win/>}
      {shop_opened && <Shop/>}
      {credits_opened && <Credits/>}
      <div
        className="full-screen-div"
        style={
          { 
          backgroundImage: "url('" + gif_src + "')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          userSelect: 'none',
          zIndex: 0
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
          <h2 className="text-stroke">
            click anywhere on screen to backshot
          </h2>
          <p className="text-stroke">
            by team thukuna's last tooth (jasmine & jack)
          </p>
          <p className="text-stroke">
            for brainrot jia.seed hackathon 2024
          </p>
        </div>
        {subway_enabled && (<img className="subway-surfers" src={subway}/>)}

        <div className="bottom-bar">
          
          <Stats/>
          <div className="shop-button">
            <button type="button" onClick={() => open_shop()}>
              <img src={shop_icon} alt="Shop" width="100" height="100"></img>
            </button>
            <button type="button" onClick={() => open_credits()}>
              <img src={credits_icon} alt="Credits" width="100" height="100"></img>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App