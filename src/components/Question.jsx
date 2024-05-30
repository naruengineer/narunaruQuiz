import React, { useState } from "react";
import { Questions } from "./Questions";
import ReactPlayer from "react-player";
import { Spinner } from "@chakra-ui/react";

export const Question = () => {
  const [Score, setScore] = useState(0); //スコア管理
  const [CurrentQuestion, setCurrentQuestion] = useState(0); //出題数を管理
  const [MissAnswer, setMissAnswer] = useState(false); //不正解の場合の分岐を管理
  const [CorrectAnswer, setCorrectAnswer] = useState(false); //正解の場合の分岐を管理
  const [QuizEnd, setQuizEnd] = useState(false); //結果表示を管理
  const [QuestionStart, setQuestionStart] = useState(true); //初期画面の表示を管理
  const [QuestionIndex, setQuestionIndex] = useState(null); //Questionsの中からのランダムでの出題を管理
  const [QuizEndLoading, setQuizEndLoading] = useState(false); //スコア計算中の表示を管理
  const [UsedQuestions, setUsedQuestions] = useState([]); //出題済みの問題を管理
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false); //正解時の音声を管理
  const [answeredMiss, setAnsweredMiss] = useState(false); //不正解時の音声を管理

  //クイズに正解していた場合、10点追加し、次の問題を表示させる。
  const CheckAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 10); //10点追加
      setCorrectAnswer(true); //正解表示
      setAnsweredCorrectly(true);
      setTimeout(() => {
        setCorrectAnswer(false);
        setAnsweredCorrectly(false);
        handleNextQuestion();
      }, 2000); // 2秒後に次の質問を表示
    } else {
      setMissAnswer(true);
      setAnsweredMiss(true);
      setTimeout(() => {
        setMissAnswer(false);
        setAnsweredMiss(false);
        handleNextQuestion();
      }, 2000); // 2秒後に次の質問を表示
    }
  };
  //次の問題へ移行する際の
  const handleNextQuestion = () => {
    setMissAnswer(false);
    randomizeQuestion();
    if (CurrentQuestion < 9) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizEndLoading(true);
      setTimeout(() => {
        setQuizEndLoading(false);
        setQuizEnd(true);
      }, 2000);
    }
  };
  //スタートボタンを押すとランダムに出題開始
  const handleStart = () => {
    setQuestionStart(false);
    randomizeQuestion();
  };
  //もう一度チャレンジを押された場合、すべてリセットする
  const handleRestart = () => {
    setQuestionStart(true);
    setQuizEnd(false);
    setCurrentQuestion(0);
    setScore(0);
  };
  //問題をランダムに出題するロジック
  const randomizeQuestion = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * Questions.length);
    } while (UsedQuestions.includes(randomIndex));

    setUsedQuestions((prev) => [...prev, randomIndex]);
    setQuestionIndex(randomIndex);
  };

  return (
    <div className="QuizAll">
      {answeredMiss && ( //不正解時の音声
        <ReactPlayer
          url="Quiz-Wrong_Buzzer01-1.mp3"
          playing={true}
          controls={true}
          volume={1}
          width="0"
          height="0"
        />
      )}
      {answeredCorrectly && ( //正解時の音声
        <ReactPlayer
          url="https://tadanote.tokyo/wp-content/uploads/2020/02/correct001.mp3"
          playing={true}
          controls={true}
          volume={1}
          width="0"
          height="0"
        />
      )}
      {QuestionStart ? ( //開始表示
        <div>
          <ReactPlayer
            url="Thunder-Real_Ambi03-1.mp3"
            playing={true}
            controls={true}
            volume={1}
            width="0"
            height="0"
          />
          <h1>Quiz App</h1>
          <p>クイズに正解して高得点を目指そう</p>
          <p>全10問</p>
          <button onClick={handleStart}>Let's start!</button>
        </div>
      ) : QuizEndLoading ? ( //10問回答終了時に2秒間表示
        <p>
          スコアを計算中です
          {<Spinner />}
        </p>
      ) : QuizEnd ? ( //スコア表示
        <div>
          {Score >= 90 ? (
            <>
              <img
                src="/mauro-shared-pictures-P-JuHm6FuMk-unsplash.jpg"
                alt=""
                width="200"
                height="300"
              />
              <ReactPlayer
                url="Onoma-Sparkle01-2(Short).mp3"
                playing={true}
                controls={true}
                volume={1}
                width="0"
                height="0"
              />
              <h6>素晴らしい！あなたの獲得スコアは{Score}点です</h6>
            </>
          ) : Score >= 70 ? (
            <>
              <ReactPlayer
                url="Onoma-Surprise01-1(Low).mp3"
                playing={true}
                controls={true}
                volume={1}
                width="0"
                height="0"
              />
              <h6>まあまあだね！あなたの獲得スコアは{Score}点です</h6>
            </>
          ) : Score >= 50 ? (
            <>
              <h6>まだまだだね！あなたの獲得スコアは{Score}点です</h6>
              <ReactPlayer
                url="Onoma-Negative13-1(Low).mp3"
                playing={true}
                controls={true}
                volume={1}
                width="0"
                height="0"
              />
            </>
          ) : (
            <>
              <img src="/image_67170049.JPG" alt="" width="200" height="300" />
              <h6>やる気ある？お話にならないよ</h6>
              <ReactPlayer
                url="Phrase04-1.mp3"
                playing={true}
                controls={true}
                volume={1}
                width="0"
                height="0"
              />
            </>
          )}
          <button onClick={handleRestart}>もう一度チャレンジ</button>
        </div>
      ) : MissAnswer ? ( //不正解の場合の表示
        <>
          <img src="/image_67170049.JPG" alt="" width="200" height="300" />
          <h5>残念。</h5>
        </>
      ) : CorrectAnswer ? ( //正解の場合の表示
        <>
          <img
            src="/mauro-shared-pictures-P-JuHm6FuMk-unsplash.jpg"
            alt=""
            width="200"
            height="300"
          />
          <h2>正解！！！</h2>
        </>
      ) : (
        //出題時の表示
        <div>
          <ReactPlayer
            url="Timer02-2(Timbre1-30_Seconds).mp3"
            playing={true}
            controls={true}
            volume={1}
            width="0"
            height="0"
          />
          <h3>Question No. {CurrentQuestion + 1}</h3>
          <h4>{Questions[QuestionIndex].question}</h4>
          {Questions[QuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                CheckAnswer(option === Questions[QuestionIndex].answer)
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
