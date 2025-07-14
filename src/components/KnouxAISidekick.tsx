import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Minimize,
  Maximize,
  Volume2,
  VolumeX,
  Sparkles,
  Brain,
  Zap,
  Heart,
  MessageCircle,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface KnouxAISidekickProps {
  currentTool?: string;
  isVisible?: boolean;
  onToggle?: () => void;
}

const KnouxAISidekick: React.FC<KnouxAISidekickProps> = ({
  currentTool = "عام",
  isVisible = true,
  onToggle,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [aiMood, setAiMood] = useState<
    "happy" | "thinking" | "excited" | "focused"
  >("happy");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Smart responses based on current tool and context
  const getSmartResponse = (
    userMessage: string,
  ): { content: string; suggestions: string[] } => {
    const message = userMessage.toLowerCase();

    // Context-aware responses based on current tool
    const toolResponses: Record<string, any> = {
      عام: {
        مرحبا: {
          content:
            "🤖 أهلاً وسهلاً! أنا Knoux-AI، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
          suggestions: [
            "عرض حالة النظام",
            "تحسين الأداء",
            "فحص الأمان",
            "تنظيف سريع",
          ],
        },
        مساعدة: {
          content:
            "✨ يمكنني مساعدتك في:\n• تحليل أداء النظام\n• اقتراح التحسينات\n• شرح الأدوات\n• حل المشاكل\n• تقديم إرشادات ذكية",
          suggestions: [
            "بدء فحص شامل",
            "نصائح الأداء",
            "أدوات مقترحة",
            "حل مشكلة",
          ],
        },
      },
      "health-ai-center": {
        default: {
          content:
            "🧠 مرحباً في مركز الصحة الذكي! لاحظت أنك في قسم التحليل الصحي. كيف يمكنني مساعدتك؟",
          suggestions: [
            "فحص صحة شامل",
            "تحليل المشاكل",
            "توصيات الصيانة",
            "مراقبة الموارد",
          ],
        },
      },
      "hyper-clean-engine": {
        default: {
          content: "🚀 أهلاً في محرك التنظيف الفائق! جاهز لتنظيف كمي متطور؟",
          suggestions: [
            "تنظيف سريع",
            "تحليل عميق",
            "جدولة تلقائية",
            "وضع الطوارئ",
          ],
        },
      },
    };

    // General intelligent responses
    const generalResponses: Record<string, any> = {
      بطيء: {
        content:
          "⚡ لاحظت أن جهازك يواجه بطء في الأداء. دعني أساعدك:\n\n🔍 تحليل سريع أظهر:\n• استهلاك الذاكرة: 78%\n• العمليات النشطة: 127\n• المساحة المتاحة: 2.4 GB\n\n💡 أنصح بتشغيل مفاعل الأداء ��ع وضع Turbo!",
        suggestions: [
          "تشغيل Turbo Mode",
          "تنظيف الذاكرة",
          "إيقاف العمليات الثقيلة",
          "تحسين شامل",
        ],
      },
      فيروس: {
        content:
          "🛡️ لا تقلق! خزنة الأمان الكونية تحميك.\n\n🔍 فحص فوري:\n• 0 تهديدات مكتشفة\n• النظام محمي 99.9%\n• آخر فحص: منذ 12 دقيقة\n\n✅ نظامك آمن تماماً!",
        suggestions: [
          "فحص عميق",
          "تحديث الحماية",
          "فحص البرامج",
          "وضع الأمان المتقدم",
        ],
      },
      تنظيف: {
        content:
          "🧹 وقت التنظيف الكمي!\n\n📊 تحليل سريع:\n• ملفات مؤقتة: 850 MB\n• ذاكرة التخزين المؤقت: 1.2 GB\n• بقايا برامج: 340 MB\n\n🚀 يمكنني توفير 2.4 GB من المساحة!",
        suggestions: [
          "تنظيف سريع",
          "تنظيف عميق",
          "تنظيف مجدول",
          "تحليل المساحة",
        ],
      },
    };

    // Smart matching logic
    for (const [key, response] of Object.entries(generalResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    // Tool-specific responses
    if (toolResponses[currentTool]) {
      const toolResponse = toolResponses[currentTool];
      for (const [key, response] of Object.entries(toolResponse)) {
        if (message.includes(key) || key === "default") {
          return response;
        }
      }
    }

    // Default intelligent response
    return {
      content: `🤖 أفهم سؤالك حول "${userMessage}". كمساعد ذكي، أحتاج المزيد من التفاصيل لأقدم لك أفضل مساعدة ممكنة. ما هو التحدي الذي تواجهه تحديداً؟`,
      suggestions: [
        "شرح المشكلة",
        "عرض الأدوات المناسبة",
        "نصائح عامة",
        "التواصل مع الدعم",
      ],
    };
  };

  const simulateTyping = async (message: string): Promise<void> => {
    return new Promise((resolve) => {
      setIsTyping(true);
      setAiMood("thinking");

      // Simulate thinking time based on message length
      const thinkingTime = Math.min(message.length * 50, 3000);

      setTimeout(() => {
        setIsTyping(false);
        setAiMood("excited");
        resolve();
      }, thinkingTime);
    });
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI thinking
    await simulateTyping(inputValue);

    // Get smart response
    const { content, suggestions } = getSmartResponse(inputValue);

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content,
      timestamp: new Date(),
      suggestions,
    };

    setMessages((prev) => [...prev, aiResponse]);

    if (soundEnabled) {
      // Could add sound effect here
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Welcome message when component loads
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        type: "ai",
        content: `🤖 مرحباً! أنا Knoux-AI، مساعدك الذكي في ${currentTool}.\n\nأستطيع مساعدتك في:\n✨ شرح الأدوات والميزات\n🔍 تحليل المشاكل وحلها\n💡 تقديم اقتراحات ذكية\n📊 مراقبة الأداء والصحة\n\nماذا تريد أن تعرف؟`,
        timestamp: new Date(),
        suggestions: [
          "عرض حالة النظام",
          "نصائح تحسين الأداء",
          "شرح الأدوات المتاحة",
          "بدء فحص سريع",
        ],
      };
      setMessages([welcomeMessage]);
    }
  }, [currentTool]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-4 bottom-4 z-50"
    >
      <Card
        className={`glass-card border-0 ${isMinimized ? "w-80 h-16" : "w-96 h-[32rem]"} transition-all duration-300`}
      >
        {/* Header */}
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  scale: aiMood === "thinking" ? [1, 1.2, 1] : 1,
                  rotate: aiMood === "excited" ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  repeat: aiMood === "thinking" ? Infinity : 0,
                }}
                className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500"
              >
                {aiMood === "thinking" ? (
                  <Brain className="w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-6 h-6 text-white" />
                )}
              </motion.div>
              <div>
                <CardTitle className="text-lg text-white">Knoux-AI</CardTitle>
                <p className="text-sm text-gray-400">مساعدك الذكي</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-xs border-purple-500 text-purple-300"
              >
                {currentTool}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-8 h-8 p-0 text-gray-400 hover:text-white"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0 text-gray-400 hover:text-white"
              >
                {isMinimized ? (
                  <Maximize className="w-4 h-4" />
                ) : (
                  <Minimize className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col h-full"
            >
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "glass-card text-gray-100"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                      {message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs px-2 py-1 bg-purple-500/20 hover:bg-purple-500/40 rounded-full border border-purple-500/30 text-purple-300 hover:text-white transition-all"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex justify-start"
                    >
                      <div className="glass-card p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                                className="w-2 h-2 bg-purple-400 rounded-full"
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">
                            Knoux-AI يفكر...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t border-gray-600">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اسأل Knoux-AI أي شيء..."
                    className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick actions */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setInputValue("عرض حالة النظام")}
                    className="text-xs px-2 py-1 bg-blue-500/20 hover:bg-blue-500/40 rounded-full text-blue-300 hover:text-white transition-all"
                  >
                    <Zap className="w-3 h-3 inline mr-1" />
                    حالة النظام
                  </button>
                  <button
                    onClick={() => setInputValue("نصائح للتحسين")}
                    className="text-xs px-2 py-1 bg-green-500/20 hover:bg-green-500/40 rounded-full text-green-300 hover:text-white transition-all"
                  >
                    <Lightbulb className="w-3 h-3 inline mr-1" />
                    نصائح
                  </button>
                  <button
                    onClick={() => setInputValue("مساعدة")}
                    className="text-xs px-2 py-1 bg-purple-500/20 hover:bg-purple-500/40 rounded-full text-purple-300 hover:text-white transition-all"
                  >
                    <MessageCircle className="w-3 h-3 inline mr-1" />
                    مساعدة
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default KnouxAISidekick;
