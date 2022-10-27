import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeVolume } from '../../store/reducers/playerReducer';
import { playList } from './playList';

function useAudioPlayer(audioElementRef: React.RefObject<HTMLAudioElement>) {
  const [isPlay, setPlay] = useState(false); //флаг, который определлесят включен трек или нет
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); //длина проигрываемого трека
  const [activeSound, setActiveSound] = useState(0); //номер трека, который проиигрывается сначала нулевой индекс элемента из массива
  const [titleTrack, setTitleTrack] = useState(`${playList[activeSound].title}`); // название одного трека
  const [clickedTime, setClickedTime] = useState<number | null>(0); // время куда кликнули, чтобы перемотать туда трек
  const volumeControl = useAppSelector((state) => state.player.volumeControl);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (audioElementRef?.current) {
      audioElementRef.current.volume = volumeControl || 0;
    }
  }, [volumeControl]);

  useEffect(() => {
    if (clickedTime && clickedTime !== currentTime) {
      if (audioElementRef?.current?.currentTime) {
        audioElementRef.current.currentTime = clickedTime;
      }
      setClickedTime(null);
    }
  }, [currentTime, clickedTime]);

  useEffect(() => {
    if (isPlay) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
    setTitleTrack(playList[activeSound].title);
  }, [isPlay, activeSound]);

  useEffect(() => {
    audioElementRef.current?.addEventListener('loadeddata', () => {
      setAudioData();
    });
    audioElementRef.current?.addEventListener('timeupdate', setAudioTime);

    const cleanup = () => {
      audioElementRef.current?.removeEventListener('loadeddata', setAudioData);
      audioElementRef.current?.removeEventListener('timeupdate', setAudioTime);
    };
    return cleanup;
  }, [audioElementRef.current]);

  const setAudioData = () => {
    audioElementRef.current?.volume != 0.4;
    dispatch(changeVolume(audioElementRef.current?.volume || 0));
    setDuration(audioElementRef.current?.duration || 0);
    setCurrentTime(audioElementRef.current?.currentTime || 0);
  };

  const setAudioTime = () => {
    setCurrentTime(audioElementRef.current?.currentTime || 0);
  };

  return {
    currentTime,
    duration,
    isPlay,
    setPlay,
    setClickedTime,
    activeSound,
    setActiveSound,
    titleTrack,
  };
}

export default useAudioPlayer;
