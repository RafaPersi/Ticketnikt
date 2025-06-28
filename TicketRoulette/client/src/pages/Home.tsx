import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dice6, Ticket, Users } from "lucide-react";
import { TicketPreview } from "@/components/TicketPreview";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { ticketData, getRandomTicket } from "@/lib/ticketData";

type AppState = 'selection' | 'loading' | 'result';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('selection');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [totalDraws, setTotalDraws] = useState(1247);
  const [onlineUsers] = useState(Math.floor(Math.random() * 200) + 700);

  const handleDrawTicket = () => {
    const selected = getRandomTicket();
    setSelectedTicket(selected);
    setAppState('loading');
    
    // Increment draw count locally
    setTotalDraws(prev => prev + 1);
  };

  const handleLoadingComplete = () => {
    setAppState('result');
  };

  const handleTryAgain = () => {
    setAppState('selection');
    setSelectedTicket(null);
  };

  // Floating background elements
  const floatingElements = [
    { size: 'w-32 h-32', position: 'top-10 left-10', gradient: 'from-primary/10 to-secondary/10', delay: 0 },
    { size: 'w-48 h-48', position: 'top-1/2 right-20', gradient: 'from-secondary/10 to-yellow-400/10', delay: 1 },
    { size: 'w-40 h-40', position: 'bottom-20 left-1/3', gradient: 'from-yellow-400/10 to-green-400/10', delay: 2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-radial -z-10" />
      
      {/* Floating Background Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`fixed ${element.size} ${element.position} bg-gradient-to-r ${element.gradient} rounded-full blur-xl -z-10`}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: element.delay,
          }}
        />
      ))}

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-yellow-400 bg-clip-text text-transparent animate-pulse-slow"
          >
            🎟️ Seu Ingresso
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg md:text-xl mt-4 max-w-2xl mx-auto"
          >
            Descubra qual ingresso especial foi reservado para você! Cada sorteio é único e emocionante.
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-center"
          >
            <Card className="inline-flex items-center gap-6 bg-slate-850/50 backdrop-blur-sm border-slate-700/50">
              <CardContent className="flex items-center gap-6 p-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-primary" />
                  <span className="text-sm text-slate-300">Ingressos Distribuídos:</span>
                  <span className="font-bold text-yellow-400">
                    {totalDraws.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="h-4 w-px bg-slate-600" />
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-slate-300">Online:</span>
                  <span className="font-bold text-green-400">
                    {onlineUsers}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content based on app state */}
          {appState === 'selection' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-8"
            >
              {/* Ticket Preview Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.keys(ticketData).map((ticketType, index) => (
                  <TicketPreview
                    key={ticketType}
                    ticketType={ticketType}
                    index={index}
                  />
                ))}
              </div>

              {/* Main Action Button */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={handleDrawTicket}
                    className="group relative bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold py-6 px-12 text-xl md:text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 animate-glow"
                    size="lg"
                  >
                    <Dice6 className="w-6 h-6 mr-3" />
                    Sortear Meu Ingresso!
                  </Button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-slate-400 text-sm max-w-md mx-auto"
                >
                  Clique no botão acima para descobrir qual ingresso especial foi selecionado para você!
                </motion.p>
              </div>
            </motion.div>
          )}

          {appState === 'loading' && (
            <LoadingScreen onComplete={handleLoadingComplete} />
          )}

          {appState === 'result' && selectedTicket && (
            <ResultScreen ticketType={selectedTicket} onTryAgain={handleTryAgain} />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-400 text-sm">
              © 2024 Seu Ingresso. Sistema de distribuição aleatória de ingressos.
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="text-slate-500 hover:text-primary transition-colors duration-300">
                ❓ FAQ
              </a>
              <a href="#" className="text-slate-500 hover:text-primary transition-colors duration-300">
                ✉️ Contato
              </a>
              <a href="#" className="text-slate-500 hover:text-primary transition-colors duration-300">
                🛡️ Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
