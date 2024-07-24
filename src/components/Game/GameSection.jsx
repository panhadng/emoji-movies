import { useState, useEffect } from "react";
import {
  EmojisWrapper,
  GameContainer,
  GameTitle,
  HintsWrapper,
  NextButton,
  SectionContainer,
  TimeBar,
  TimeBarFill,
} from "./GameElements";
import movies from "../../assets/movies.json";

const GameSection = () => {
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

  const handleNextClick =()=>{
    // console.log("press next");
    window.location.reload()
  }

  const getHint = (name) => {
    const words = name.split(" ");
    const numWords = words.length;
    const numLetters = name.replace(/ /g, "").length;
    return `${numWords} Word(s), ${numLetters} Letter(s)`;
  };

  const getTimeBarStyle = () => {
    if (timerExpired) {
      return { width: "0%", backgroundColor: "#ddd" };
    }

    const percentage = (timeLeft / timerDuration) * 100;
    const color = `rgb(${255 - percentage * 1.5}, ${percentage * 1.5}, 0)`;
    return { width: `${percentage}%`, backgroundColor: color };
  };

  return (
    <SectionContainer>
      {currentMovie ? (
        <GameContainer>
          <GameTitle>Guess The Movie</GameTitle>
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
              <NextButton onClick={handleNextClick} >Next</NextButton>
            </div>
          ) : (
            <>
              <p>Time left: {timeLeft}s</p>
              <NextButton onClick={handleNextClick} >Next</NextButton>
            </>
          )}
        </GameContainer>
      ) : (
        <p>Loading...</p>
      )}
    </SectionContainer>
  );
};

export default GameSection;
