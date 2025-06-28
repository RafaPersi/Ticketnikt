export interface TicketType {
  link: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  gradient: string;
  bgGradient: string;
}

export const ticketData: Record<string, TicketType> = {
  "VIP": {
    link: "https://drive.google.com/file/d/1qTZlEnN_coGRiS2oLE0ZUtdl0cGfF7bK/view?usp=sharing",
    icon: "👑",
    title: "VIP",
    description: "Acesso Total Premium",
    color: "text-yellow-400",
    gradient: "from-yellow-400 to-yellow-500",
    bgGradient: "from-yellow-400/20 to-yellow-600/20 border-yellow-400/30 hover:border-yellow-400/60 hover:shadow-yellow-400/25"
  },
  "Premium": {
    link: "https://drive.google.com/file/d/1BasHILsJRiKUTwnJHo8pRAuiTsL-JKeI/view?usp=sharing",
    icon: "⭐",
    title: "Premium",
    description: "Área Especial Premium",
    color: "text-pink-400",
    gradient: "from-pink-400 to-pink-500",
    bgGradient: "from-pink-400/20 to-pink-600/20 border-pink-400/30 hover:border-pink-400/60 hover:shadow-pink-400/25"
  },
  "Pista": {
    link: "https://drive.google.com/file/d/1BG4zozsU0hqzxEfhx5ILVdNXmegG2uTf/view?usp=sharing",
    icon: "🎵",
    title: "Pista",
    description: "Pista Geral",
    color: "text-blue-400",
    gradient: "from-blue-400 to-indigo-500",
    bgGradient: "from-blue-400/20 to-indigo-600/20 border-blue-400/30 hover:border-blue-400/60 hover:shadow-blue-400/25"
  },
  "Convidado": {
    link: "https://drive.google.com/file/d/1tJQMy9OzI5zUtmp7nZwlSV3sbWsBrEbR/view?usp=sharing",
    icon: "🎉",
    title: "Convidado",
    description: "Convidado Especial",
    color: "text-green-400",
    gradient: "from-green-400 to-emerald-500",
    bgGradient: "from-green-400/20 to-emerald-600/20 border-green-400/30 hover:border-green-400/60 hover:shadow-green-400/25"
  }
};

export function getRandomTicket(): string {
  const ticketTypes = Object.keys(ticketData);
  return ticketTypes[Math.floor(Math.random() * ticketTypes.length)];
}
