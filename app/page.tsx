'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function DinoGame() {
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [obstaclePosition, setObstaclePosition] = useState(100);

  const jump = useCallback(() => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  }, [isJumping, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setObstaclePosition(prev => {
        if (prev <= -10) {
          setScore(s => s + 1);
          return 100;
        }
        return prev - 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (obstaclePosition > 0 && obstaclePosition < 20 && !isJumping) {
      setGameOver(true);
    }
  }, [obstaclePosition, isJumping]);

  const restart = () => {
    setGameOver(false);
    setScore(0);
    setObstaclePosition(100);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <nav className="absolute top-4 right-4 space-x-4">
        <Link href="/contact" className="text-blue-600 hover:underline">Contact</Link>
        <Link href="/api/health" className="text-blue-600 hover:underline">Health</Link>
      </nav>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Dino Game</h1>
        <p className="text-gray-600">Press SPACE to jump</p>
        <p className="text-xl font-semibold">Score: {score}</p>
      </div>

      <div className="relative w-96 h-32 bg-white border-2 border-gray-300 overflow-hidden">
        <div 
          className={`absolute bottom-0 left-8 w-8 h-8 bg-green-500 transition-all duration-500 ${
            isJumping ? 'bottom-16' : 'bottom-0'
          }`}
        >
          🦕
        </div>
        <div 
          className="absolute bottom-0 w-4 h-8 bg-red-500"
          style={{ left: `${obstaclePosition}%` }}
        >
          🌵
        </div>
      </div>

      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold text-red-600 mb-2">Game Over!</p>
          <button 
            onClick={restart}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Restart
          </button>
        </div>
      )}

      <button 
        onClick={jump}
        className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 md:hidden"
      >
        Jump
      </button>
    </div>
  );
}
