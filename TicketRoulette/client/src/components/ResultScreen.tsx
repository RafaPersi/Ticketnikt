import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ExternalLink, RotateCcw, Share2, Copy, Facebook, Twitter } from "lucide-react";
import { ticketData } from "@/lib/ticketData";
import { ConfettiEffect } from "./ConfettiEffect";
import { useToast } from "@/hooks/use-toast";

interface ResultScreenProps {
  ticketType: string;
  onTryAgain: () => void;
}

export function ResultScreen({ ticketType, onTryAgain }: ResultScreenProps) {
  const ticket = ticketData[ticketType];
  const { toast } = useToast();

  const handleAccessTicket = () => {
    window.open(ticket.link, '_blank');
  };

  const handleShare = (platform: string) => {
    const text = `Acabei de ganhar um ingresso ${ticket.title}! 🎟️`;
    const url = window.location.href;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(text + ' ' + url);
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para sua área de transferência.",
        });
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center space-y-8"
    >
      <ConfettiEffect />
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-slate-850/90 backdrop-blur-sm border-slate-700/50 max-w-2xl mx-auto shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center animate-bounce-slow"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              🎉 Parabéns!
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-slate-300 mb-8"
            >
              Seu ingresso foi selecionado:
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <div className={`bg-gradient-to-br ${ticket.gradient} p-8 rounded-2xl text-white shadow-2xl max-w-sm mx-auto transform hover:scale-105 transition-transform duration-300`}>
                <div className="text-center">
                  <div className="text-6xl mb-4">{ticket.icon}</div>
                  <h3 className="text-3xl font-bold mb-2">{ticket.title}</h3>
                  <p className="text-lg opacity-90">{ticket.description}</p>
                  <div className="mt-6 p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                    <p className="text-sm font-medium">Seu ingresso está pronto!</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <Button
                onClick={handleAccessTicket}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-4 px-8 text-lg transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Acessar Meu Ingresso
              </Button>
              
              <Button
                onClick={onTryAgain}
                variant="secondary"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-8"
                size="lg"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Tentar Novamente
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-slate-850/50 backdrop-blur-sm max-w-md mx-auto border-slate-700/30">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white mb-3 flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Compartilhe sua sorte!
            </h3>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => handleShare('facebook')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleShare('twitter')}
                size="sm"
                className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded-full"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleShare('whatsapp')}
                size="sm"
                className="bg-green-600 hover:bg-green-700 p-3 rounded-full"
              >
                <span className="text-sm">📱</span>
              </Button>
              <Button
                onClick={() => handleShare('copy')}
                size="sm"
                variant="secondary"
                className="bg-slate-600 hover:bg-slate-500 p-3 rounded-full"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
