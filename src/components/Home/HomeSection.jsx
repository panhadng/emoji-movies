import { useState, useEffect } from "react";
import {
  EmojisWrapper,
  GameContainer,
  HintsWrapper,
  HomeContainer,
  TimeBar,
  TimeBarFill,
} from "./HomeElements";
import movies from "../../assets/movies.json";

const HomeSection = () => {
  const timerDuration = 5;
  const [currentMovie, setCurrentMovie] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * movies.movies.length);
    const randomMovie = movies.movies[randomNum];
    setCurrentMovie(randomMovie);

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          setTimerExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getHint = (name) => {
    const words = name.split(" ");
    const numWords = words.length;
    const numLetters = name.replace(/ /g, "").length;
    return `${numWords} Word(s), ${numLetters} Letter(s)`;
  };

  const getTimeBarStyle = () => {
    const percentage = (timeLeft / timerDuration) * 100;
    const color = `rgb(${255 - percentage * 1.5}, ${percentage * 1.5}, 0)`;
    return { width: `${percentage}%`, backgroundColor: color };
  };

  return (
    <HomeContainer>
      {currentMovie ? (
        <GameContainer>
          <EmojisWrapper>{currentMovie.emojis}</EmojisWrapper>
          <HintsWrapper>{getHint(currentMovie.name)}</HintsWrapper>
          <TimeBar>
            <TimeBarFill style={getTimeBarStyle()}></TimeBarFill>
          </TimeBar>
          {timerExpired ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>Time's up!</p>
              <p>
                The movie was:{" "}
                <span style={{ fontWeight: "bold" }}>{currentMovie.name}</span>
              </p>
            </div>
          ) : (
            <p>Time left: {timeLeft}s</p>
          )}
        </GameContainer>
      ) : (
        <p>Loading...</p>
      )}
    </HomeContainer>
  );
};

export default HomeSection;
