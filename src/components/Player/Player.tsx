import { useRef, useState } from 'react';
import { getTimeCodeFromNum } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeVolume } from '../../store/reducers/playerReducer';
import './player.css';
import { playList } from './playList';
import useAudioPlayer from './useAudioPlayer';

const Player = () => {
  const sounds = useAppSelector((state) => state.player.sounds); //список всех треков
  const volumeControl = useAppSelector((state) => state.player.volumeControl);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();
  const playerVisible = useAppSelector((state) => state.settingsApp.settings.playerVisible);
  const [tempVolume, setTempVolume] = useState(volumeControl);

  const {
    currentTime,
    duration,
    isPlay,
    setPlay,
    setClickedTime,
    activeSound,
    setActiveSound,
    titleTrack,
  } = useAudioPlayer(audioElementRef);

  const changeTrack = (count: number) => {
    if (count >= playList.length) {
      setActiveSound(0);
    } else if (count < 0) {
      setActiveSound(playList.length - 1);
    } else {
      setActiveSound(count);
    }
    if (audioElementRef.current!) {
      audioElementRef.current.src = playList[activeSound].src;
      setPlay(true);
    }
  };

  audioElementRef.current?.addEventListener('ended', () => {
    changeTrack(activeSound + 1);
  });

  const changeSoundControl = (time: number) => {
    setClickedTime(time);
  };

  const soundsElem = sounds.map((sound, i) => {
    return (
      <li
        className={i === activeSound && isPlay ? 'play-item item-active' : 'play-item'}
        key={sound.id}
        onClick={() => {
          if (i !== activeSound) {
            changeTrack(i);
          } else {
            isPlay ? setPlay(false) : setPlay(true);
          }
        }}
      >
        {sound.title}
      </li>
    );
  });

  return (
    <div className={playerVisible ? 'player' : 'player hidden'}>
      <div className="player-controls">
        <audio ref={audioElementRef} src={playList[activeSound].src}></audio>
        <button
          className="play-prev player-icon"
          onClick={() => changeTrack(activeSound - 1)}
        ></button>
        {isPlay ? (
          <button className="player-icon pause" onClick={() => setPlay(false)}></button>
        ) : (
          <button className="player-icon play" onClick={() => setPlay(true)}></button>
        )}
        <button
          className="play-next player-icon"
          onClick={() => changeTrack(activeSound + 1)}
        ></button>
      </div>
      <div className="name-track">{isPlay ? titleTrack : ''}</div>
      <audio src={playList[activeSound].src}></audio>
      <input
        className="player progress-bar"
        type="range"
        style={{
          color: 'red',
          background: `
          linear-gradient(
            to right, 
            #710707 0%, 
            #710707 ${(currentTime * 100) / duration}%, 
            #C4C4C4 ${(currentTime * 100) / duration}%, 
            #C4C4C4 100% )`,
        }}
        value={currentTime && duration ? `${(currentTime * 100) / duration}` : 0}
        onChange={(e) => changeSoundControl((+e.target.value * duration) / 100)}
      />
      <div className="time-div">
        <span className="currentTime">
          {currentTime === 0 ? '' : getTimeCodeFromNum(currentTime) + ` / `}
        </span>
        <span className="durationTime">{duration === 0 ? '' : getTimeCodeFromNum(duration)}</span>
      </div>
      <ul className="play-list">{soundsElem}</ul>
      <div className="volume__controls">
        <input
          className="player progress-volume"
          type="range"
          style={{
            background: `
            linear-gradient(
              to right, 
              #710707 0%, 
              #710707 ${volumeControl * 100}%, 
              #C4C4C4 ${volumeControl * 100}%, 
              #C4C4C4 100% )`,
          }}
          value={volumeControl * 100}
          onChange={(e) => {
            dispatch(changeVolume(+e.target.value / 100));
            setTempVolume(+e.target.value / 100);
          }}
        />
        <div
          className={volumeControl === 0 ? 'volume off' : 'volume on'}
          onClick={() => {
            volumeControl != 0 ? dispatch(changeVolume(0)) : dispatch(changeVolume(tempVolume));
          }}
        ></div>
      </div>
    </div>
  );
};

export default Player;
