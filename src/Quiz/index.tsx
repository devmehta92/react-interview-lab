import { useState } from "react";
import "./index.css";

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Mumbai", "Berlin", "Madrid", "Karachi", "Washington DC"],
        answer: "Paris"
    },
    {
        question: "Who are prositutues of Football?",
        options: ["Liverpool", "Chelsea", "Manchester City", "Arsenal", "Tottenham"],
        answer: "Liverpool"
    },
    {
        question: "Who is the worst player of football?",
        options: ["Gerrard", "Carragher", "Downing"],
        answer: "Carragher"
    },
    {
        question: "What is the name of your crush?",
        options: ["Shraddha", "Ayesha", "Saloni", "Dhyani"],
        answer: "Dhyani"
    },
    {
        question: "Which is bigger?",
        options: ["Manchester United", "Liverpool"],
        answer: "Manchester United"
    },
]

const Quiz = () => {

    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showBannerMessage, setShowBannerMessage] = useState(false);
    const onAnswerClick = (answer: string) => {
        setShowBannerMessage(true);
        if (quizData[currentQ].answer == answer) {
            setScore((prev) => prev + 1);
            if (currentQ != quizData.length - 1) {
                setCurrentQ(prev => prev + 1);
            }
        } else {
            alert('Wrong answer selected. Please try again');
        }
    }

    const renderQuizQuestions = (idx: number) => {
        return (<Question question={quizData[idx].question} options={quizData[idx].options} onAnswerClick={onAnswerClick} />);
    }

    const onPageChange = (action: string) => {
        if (action == 'next' && currentQ != quizData.length - 1) {
            setCurrentQ(prev => prev + 1);
        }
        if (action == 'prev' && currentQ != 0) {
            setCurrentQ(prev => prev - 1);
        }
        setShowBannerMessage(false);
    }

    return (
        <div className="container">
            <div className="quizCard">
                <div className="title">Quiz App</div>
                <div className="questionNumber">Question {currentQ + 1} of {quizData.length} </div>
                <div className="questionDiv">
                    {renderQuizQuestions(currentQ)}
                </div>
                <div className="quizInfo">
                    <div className="score">Score: {score}</div>
                    <div className="pagination">
                        <button className="pageBtns" onClick={() => onPageChange('prev')}>Prev</button>
                        <button className="pageBtns" onClick={() => onPageChange('next')}>Next</button>
                    </div>
                </div>
                <div className="banner">
                    {showBannerMessage && <span>Correct!</span>}
                </div>
            </div>
        </div>
    );
}

type QuestionFormat = {
    question: string,
    options: string[],
    onAnswerClick: (answer: string) => void;
}

const Question = ({ question, options, onAnswerClick }: QuestionFormat) => {
    return (
        <div>
            <div className="question">{question}</div>
            <div className="options">{
                options.map((option, idx) => {
                    return (
                        <span className="option" key={idx} onClick={() => onAnswerClick(option)}>{option}</span>
                    );
                })
            }</div>
        </div>
    )

}

export default Quiz;