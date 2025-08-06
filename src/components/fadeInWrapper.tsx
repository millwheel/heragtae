'use client';

import { useEffect, useRef, useState } from 'react';

interface FadeUpWrapperProps {
    children: React.ReactNode;
    delay?: number; // ms
}
export default function FadeInWrapper({ children, delay = 0 }: FadeUpWrapperProps) {
    const ref = useRef<HTMLDivElement>(null!);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className="relative overflow-hidden">
            <div className="relative z-10">{children}</div>

            <div
                className={`
                    absolute inset-0 bg-white z-20 pointer-events-none
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-0 blur-0' : 'opacity-100 blur-sm'}
                `}
            />
        </div>
    );
}