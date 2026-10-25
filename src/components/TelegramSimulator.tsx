import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowRight, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

interface TelegramSimulatorProps {
  currentCode: string | null;
  onLinkSuccess: (chatId: string) => void;
  isLinked: boolean;
  onUnlink: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  actionButton?: {
    text: string;
    url?: string;
  };
}

export const TelegramSimulator: React.FC<TelegramSimulatorProps> = ({
  currentCode,
  onLinkSuccess,
  isLinked,
  onUnlink,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: '👋 *Welcome to Teacher Alex Vocabulary Assistant!*\n\nI send you daily spaced-repetition words and review reminders to help you speak with confidence in professional settings.\n\nTo connect your account, tap the blue **START** button below or send your 6-digit linking code.',
      time: '12:00',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const trimmed = text.trim();
      const match = trimmed.match(/^(?:\/(?:start|link)\s+)?(\d{6})$/i);

      if (match) {
        const codeProvided = match[1];
        if (currentCode && codeProvided === currentCode) {
          const fakeChatId = '582335339';
          onLinkSuccess(fakeChatId);
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: 'bot',
              text: '🎉 *Awesome! Your Telegram account is successfully connected to Teacher Alex!* 🎓\n\nYour chat ID has been linked to your account. You will now receive your scheduled English vocabulary cards based on your Poke-Me-On preferences.\n\nReady to add or review your words?',
              time: timeStr,
              actionButton: {
                text: '🚀 Open Poke-Me-On Dashboard',
              },
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: 'bot',
              text: '❌ *Invalid or Expired Code*\n\nThe code you entered does not match your current active linking code. Please check your account page for the fresh 6-digit code or tap "Connect in 1 Tap".',
              time: timeStr,
            },
          ]);
        }
      } else if (trimmed === '/start') {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: '👋 Hello! To link this chat with your Teacher Alex account, please tap the **"Connect on Telegram"** button on the website, or reply here with `/link [6-digit code]`.',
            time: timeStr,
          },
        ]);
      } else if (trimmed === '/help') {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: '💡 *Teacher Alex Bot Commands:*\n\n• `/link 123456` - Link with your 6-digit code\n• `/status` - Check if your account is linked\n• `/help` - View instructions',
            time: timeStr,
          },
        ]);
      } else if (trimmed === '/status') {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: isLinked
              ? '✅ *Your account is active and connected!* Next vocabulary batch is scheduled via Poke-Me-On.'
              : '⚠️ *Not yet linked.* Please generate a code at account.teacher-alex.com.',
            time: timeStr,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: '❓ Unrecognized command. Use `/link 123456` with your 6-digit code or tap the **START** link from your browser.',
            time: timeStr,
          },
        ]);
      }
    }, 600);
  };

  const handleStartWithCode = () => {
    if (!currentCode) return;
    sendMessage(`/start ${currentCode}`);
  };

  return (
    <div className="flex flex-col h-[560px] bg-[#0f172a] text-slate-100 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden font-sans">
      {/* Telegram App Header */}
      <div className="bg-[#1e293b] px-4 py-3 flex items-center justify-between border-b border-slate-700/80">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow">
              TA
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1e293b]"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-sm text-white">Teacher Alex Assistant</h4>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-1.5 py-0.2 rounded border border-blue-400/30">
                BOT
              </span>
            </div>
            <p className="text-xs text-slate-400">@TeacherAlexAccountBot</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLinked && (
            <button
              onClick={onUnlink}
              className="text-xs text-rose-400 hover:text-rose-300 bg-rose-950/40 border border-rose-800/60 px-2.5 py-1 rounded-md transition-colors"
            >
              Reset Link
            </button>
          )}
          <span className="text-xs text-slate-400">Telegram Simulator</span>
        </div>
      </div>

      {/* Telegram Chat Message Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-[#0f172a] to-[#0b1120]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-[#1e293b] text-slate-200 border border-slate-700/70 rounded-bl-sm'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <div
                className={`text-[10px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                }`}
              >
                {msg.time}
              </div>
            </div>

            {/* Telegram Inline Keyboard Button */}
            {msg.actionButton && (
              <div className="mt-2 w-full max-w-[85%]">
                <div className="bg-[#24344d] hover:bg-[#2c4060] text-sky-300 font-medium text-xs sm:text-sm py-2 px-3 rounded-xl border border-sky-500/30 text-center flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md">
                  <span>{msg.actionButton.text}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 py-1 px-3 bg-[#1e293b]/60 rounded-full w-fit">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></span>
            <span
              className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></span>
            <span
              className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></span>
            <span className="ml-1 text-[11px]">bot is typing...</span>
          </div>
        )}
      </div>

      {/* Quick Action Tray (Simulating 1-Tap Deep Link) */}
      {currentCode && !isLinked && (
        <div className="bg-[#182234] border-t border-slate-700/80 px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="text-xs text-slate-300">
            <span className="text-amber-400 font-medium">Deep Link Trigger:</span> Code ready:{' '}
            <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-amber-300">
              {currentCode}
            </span>
          </div>
          <button
            onClick={handleStartWithCode}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Tap START Button
          </button>
        </div>
      )}

      {/* Input bar */}
      <div className="p-3 bg-[#1e293b] border-t border-slate-700/80 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputText.trim()) {
              sendMessage(inputText);
              setInputText('');
            }
          }}
          placeholder="Send a message (e.g. /start or /link 123456)..."
          className="flex-1 bg-[#0f172a] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            if (inputText.trim()) {
              sendMessage(inputText);
              setInputText('');
            }
          }}
          className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
