import React, { useState } from "react";

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
    },
    {
        question: "Which language is used for web apps?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript",
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets",
        ],
        answer: "Cascading Style Sheets",
    },
    {
        question: "Which React hook is used to manage state?",
        options: ["useEffect", "useState", "useRef", "useReducer"],
        answer: "useState",
    },
];

export default function Quiz() {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState("");
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleNext = () => {
        if (!selected) return;
        if (selected === questions[current].answer) setScore(score + 1);
        setShowAnswer(false);
        setSelected("");
        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            setShowScore(true);
        }
    };

    const handlePrev = () => {
        if (current > 0) {
            setCurrent(current - 1);
            setSelected("");
            setShowAnswer(false);
        }
    };

    const handleRestart = () => {
        setCurrent(0);
        setSelected("");
        setScore(0);
        setShowScore(false);
        setShowAnswer(false);
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start p-6 text-white">
            <h1 className="text-4xl font-bold mb-10">Quiz App</h1>

            {showScore ? (
                <div className="text-center">
                    <p className="text-2xl mb-4">
                        Your Score: {score} / {questions.length}
                    </p>
                    <button
                        onClick={handleRestart}
                        className="bg-teal-500 px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
                    >
                        Restart Quiz
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-xl bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <p className="mb-4 text-lg">
                        Question {current + 1} of {questions.length}
                    </p>
                    <h2 className="text-2xl font-semibold mb-6">
                        {questions[current].question}
                    </h2>

                    <div className="flex flex-col gap-3 mb-6">
                        {questions[current].options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelected(opt)}
                                className={`p-3 rounded-lg text-left transition-colors ${selected === opt
                                        ? "bg-teal-500 text-white"
                                        : "bg-gray-700 hover:bg-gray-600"
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>

                    {showAnswer && (
                        <p className="mb-4 text-green-400 font-semibold">
                            Correct Answer: {questions[current].answer}
                        </p>
                    )}

                    <div className="flex justify-between">
                        <button
                            onClick={handlePrev}
                            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Previous
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={handleShowAnswer}
                                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Show Answer
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
