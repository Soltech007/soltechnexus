// components/ui/animated-split-text.tsx
"use client";

import { useEffect, useState, useRef } from 'react';

interface AnimatedSplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    animateOn?: 'load' | 'scroll';
    splitBy?: 'chars' | 'words';
    animation?: 'fade-up' | 'rotate-in' | 'blur-in' | 'slide-in';
}

export default function AnimatedSplitText({
    text,
    className = '',
    delay = 0,
    stagger = 30,
    animateOn = 'load',
    splitBy = 'chars',
    animation = 'fade-up'
}: AnimatedSplitTextProps) {
    const [isVisible, setIsVisible] = useState(animateOn === 'load');
    const containerRef = useRef<HTMLSpanElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (animateOn === 'scroll' && containerRef.current && mounted) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.1, rootMargin: '-50px' }
            );

            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, [animateOn, mounted]);

    const elements = splitBy === 'words'
        ? text.split(' ').map(word => word + ' ')
        : text.split('');

    const getAnimationClasses = () => {
        const visible = isVisible && mounted;

        switch (animation) {
            case 'rotate-in':
                return {
                    initial: 'opacity-0 rotate-12 scale-0 blur-sm',
                    animate: visible ? 'opacity-100 rotate-0 scale-100 blur-0' : 'opacity-0 rotate-12 scale-0 blur-sm'
                };
            case 'blur-in':
                return {
                    initial: 'opacity-0 blur-lg scale-125',
                    animate: visible ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-125'
                };
            case 'slide-in':
                return {
                    initial: 'opacity-0 translate-x-10 translate-y-10',
                    animate: visible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-10 translate-y-10'
                };
            case 'fade-up':
            default:
                return {
                    initial: 'opacity-0 translate-y-10',
                    animate: visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                };
        }
    };

    const animationClasses = getAnimationClasses();

    if (!mounted) return <span className={className}>{text}</span>;

    return (
        <span
            ref={containerRef}
            className={`inline-block ${className}`}
            style={{ perspective: '1000px' }}
        >
            {elements.map((element, index) => (
                <span
                    key={index}
                    className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            will-change-transform ${animationClasses.animate}`}
                    style={{
                        transitionDelay: `${delay + (index * stagger)}ms`,
                        transformOrigin: 'center bottom',
                        display: element === ' ' ? 'inline' : 'inline-block',
                    }}
                >
                    {element === ' ' ? '\u00A0' : element}
                </span>
            ))}
        </span>
    );
}