import { motion } from "framer-motion";
import { ticketData } from "@/lib/ticketData";

interface TicketPreviewProps {
  ticketType: string;
  index: number;
}

export function TicketPreview({ ticketType, index }: TicketPreviewProps) {
  const ticket = ticketData[ticketType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="group cursor-pointer"
    >
      <div className={`bg-gradient-to-br ${ticket.bgGradient} rounded-xl p-4 transition-all duration-300 hover:scale-105`}>
        <div className="text-center">
          <div className="text-2xl mb-2">{ticket.icon}</div>
          <h3 className={`font-bold ${ticket.color} text-sm`}>{ticket.title}</h3>
          <p className="text-xs text-slate-400">{ticket.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
