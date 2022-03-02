import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  backward,
  forward,
  repeatQuiz,
  resetQuiz,
  setMarkedOptions,
  setQuestions,
  toggleRepeat,
} from "../../store/actions/quiz";
import Button from "../UI/Button";
import Loading from "../UI/Loading";
import QuizHeader from "./headers/QuizHeader";
import QuizQuestion from "./QuizQuestion";

function QuizCarousel({ subjectId, chapterId }) {
  const token = useSelector(state => state.user.token);
  const [score, setScore] = useState(null);
  const dispatch = useDispatch();

  const quiz = useSelector(state => state.quiz);

  const setOptionsForQuestion = (question, options) => {
    dispatch(setMarkedOptions(question, options));
  };

  const getCurrentQuestionIndex = currQuestion => {
    return quiz.attempt.findIndex(
      question => question.questionId === currQuestion.id
    );
  };

  const submitHandler = async () => {
    // const data = await fetchScore(quiz.attempt, subjectId, chapterId, token);
    if (!token) {
      toast.error("Please login to submit your answers");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects/${subjectId}/chapters/${chapterId}/questions/submit-quiz`;
    axios
      .post(
        url,
        {
          attempt: quiz.attempt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        setScore(res.data.score);
        dispatch(resetQuiz());
      })
      .catch(err => {
        console.log(err);
        toast.error("Something went wrong while submitting quiz");
      });
    // if (data) {
    //   setScore(data.score);
    //   dispatch(resetQuiz());
    // }
  };

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects/${subjectId}/chapters/${chapterId}/questions`;
    console.log(url);
    axios
      .get(url)
      .then(res => {
        dispatch(
          setQuestions(
            res.data.questions.map(question => ({
              id: question.id,
              statement: question.statement,
              options: question.options.map(option => ({
                id: option.id,
                value: option.value,
              })),
            }))
          )
        );
      })
      .catch(err => {
        console.log("Error while getting questions");
        console.log(err);
      });
  }, []);

  if (!quiz.repeatedQuestions) {
    return <Loading />;
  }

  if (quiz.questions.length === 0) {
    return <div>No quizes found</div>;
  }

  if (score) {
    console.log("We scored");
    return (
      <div className="max-w-max mx-auto my-auto space-y-4">
        <strong className="text-2xl font-bold">Your score is {score}</strong>
        <Button className="text-center" text={"Go Back"} onClick={() => setScore(null)} />
      </div>
    );
  }

  const currentQuestion = quiz.repeatedQuestions[quiz.currentQuestionIndex];
  const globalQuestionIndex = getCurrentQuestionIndex(currentQuestion);

  return (
    // <div></div>
    <div className="flex flex-col flex-auto items-center">
      <QuizHeader
        className={`my-4`}
        repeat={() => dispatch(repeatQuiz())}
        reset={() => dispatch(resetQuiz())}
        toggleRepeat={() => dispatch(toggleRepeat())}
        next={() => dispatch(forward())}
        prev={() => dispatch(backward())}
        curr={quiz.currentQuestionIndex + 1}
        numRepeats={quiz.questionIndexesToBeRepeated.length}
        onRepeat={quiz.questionIndexesToBeRepeated.includes(
          quiz.currentQuestionIndex
        )}
        submit={submitHandler}
      />
      <QuizQuestion
        question={currentQuestion}
        optionsChecked={quiz.attempt[globalQuestionIndex].optionIds}
        setCheckedOptions={setOptionsForQuestion}
      />
    </div>
  );
}

export default QuizCarousel;
