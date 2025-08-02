import React, { useState, useEffect } from 'react';
import {LinkItem} from "@/data/data";

const ImageSlider = ({ mainLinks }: { mainLinks: LinkItem[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === mainLinks.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // 3초마다 실행

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <div className="relative w-full max-w-5xl h-96 overflow-hidden rounded-lg shadow-lg">
                    <div
                        className="flex transition-transform duration-1000 ease-in-out h-full"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            width: `${mainLinks.length * 100}%`
                        }}
                    >
                        {mainLinks.map((link, index) => (
                            <div
                                key={index}
                                className="w-full h-full flex-shrink-0 relative"
                                style={{ width: `${100 / mainLinks.length}%` }}
                            >
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full h-full"
                                >
                                    <img
                                        src={link.image}
                                        alt={link.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                                        <h3 className="text-lg font-semibold">{link.title}</h3>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ImageSlider;