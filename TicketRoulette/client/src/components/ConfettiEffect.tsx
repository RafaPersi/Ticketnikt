import { useEffect } from "react";
import { motion } from "framer-motion";

export function ConfettiEffect() {
  useEffect(() => {
    const colors = ['#6366F1', '#EC4899', '#F59E0B', '#10B981'];
    const confettiContainer = document.getElementById('confetti-container');
    
    if (!confettiContainer) return;
    
    for (let i = 0; i < 50; i++) {
      const confettiPiece = document.createElement('div');
      confettiPiece.className = 'absolute w-3 h-3';
      confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confettiPiece.style.left = Math.random() * 100 + '%';
      confettiPiece.style.top = '-10px';
      confettiPiece.style.animationDelay = Math.random() * 3 + 's';
      confettiPiece.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confettiPiece.style.animation = 'confetti 0.8s ease-out forwards';
      confettiContainer.appendChild(confettiPiece);
      
      setTimeout(() => {
        if (confettiPiece.parentNode) {
          confettiPiece.parentNode.removeChild(confettiPiece);
        }
      }, 5000);
    }
  }, []);

  return <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50" />;
}
