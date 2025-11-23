import React from "react";
import { useNavigate } from "react-router-dom";

const projects = [
    { title: "To-Do App", img: "https://cdn-icons-png.flaticon.com/512/9919/9919289.png", link: "/todo" },
    { title: "Quiz App", img: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png", link: "/quiz" },
    { title: "Weather App", img: "https://cdn-icons-png.flaticon.com/512/9790/9790666.png", link: "/weather" },
];

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center py-12 px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-100">
                My Learning Projects
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl w-full">
                {projects.map((project, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(project.link)}
                        className="cursor-pointer group"
                    >
                        <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                            <img
                                src={project.img}
                                alt={project.title}
                                className="w-full h-60 object-contain bg-gray-700 p-6 rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="p-4 text-center bg-gray-800">
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-100 group-hover:text-teal-400 transition-colors duration-300">
                                    {project.title}
                                </h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="mt-16 text-sm text-gray-400">
                Made with ❤️ by{" "}
                <a href="#" className="text-teal-400 hover:underline">
                    Bilal
                </a>
            </footer>
        </div>
    );
}
