'use client';

import React, { useState, useEffect, Children } from 'react';

interface SliderWrapperProps {
    children: React.ReactNode;
    autoSlide?: boolean;
    interval?: number;
}

export default function SliderWrapper({
                                          children,
                                          autoSlide = true,
                                          interval = 5000,
                                      }: SliderWrapperProps) {
    const childrenArray = Children.toArray(children);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!autoSlide) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % childrenArray.length);
        }, interval);

        return () => clearInterval(timer);
    }, [autoSlide, interval, childrenArray.length]);

    if (childrenArray.length === 0) return null;

    return (
        <div className="overflow-hidden">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    width: `${childrenArray.length * 100}%`,
                    transform: `translateX(-${index * (100 / childrenArray.length)}%)`,
                }}
            >
                {childrenArray.map((child, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-full h-full"
                        style={{ width: `${100 / childrenArray.length}%` }}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}