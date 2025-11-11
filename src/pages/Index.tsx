import { useState, useRef, useEffect } from "react";
import { Message, ReminderData } from "@/types/chat";
import { Header } from "@/components/layout/Header";
import { RemindersPanel } from "@/components/layout/RemindersPanel";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { MedicationCard } from "@/components/chat/MedicationCard";
import { ConfirmationModal } from "@/components/chat/ConfirmationModal";
import { QuickActions } from "@/components/chat/QuickActions";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm MediPal, your medication assistant. I can help you set reminders and provide information about medications. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reminders, setReminders] = useState<ReminderData[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingReminder, setPendingReminder] = useState<ReminderData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate API call - Replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock response based on user input
      const lowerInput = messageText.toLowerCase();
      let response: Message;

      if (lowerInput.includes("remind") || lowerInput.includes("set")) {
        const mockReminder: ReminderData = {
          medication_name: "Aspirin",
          dose: "100mg",
          frequency: "daily",
          frequency_description: "Once daily",
          start_time: new Date().toISOString(),
          reminder_id: Date.now().toString(),
        };

        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'll help you set up a medication reminder. Please confirm the details.",
          timestamp: new Date(),
          action: { type: "ask_confirm" },
          reminder: mockReminder,
        };

        setPendingReminder(mockReminder);
        setShowConfirmModal(true);
      } else if (lowerInput.includes("info") || lowerInput.includes("about")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Here's the information about the medication:",
          timestamp: new Date(),
          action: { type: "provide_med_info" },
          med_info: {
            name: "Aspirin",
            common_uses: "Pain relief, fever reduction, and prevention of blood clots",
            side_effects: "May cause stomach upset, heartburn, or bleeding in some cases",
          },
        };
      } else if (lowerInput.includes("show") || lowerInput.includes("list")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: reminders.length > 0 
            ? `You have ${reminders.length} active reminder${reminders.length !== 1 ? 's' : ''}. Check the panel on the right to see details.`
            : "You don't have any active reminders yet. Would you like to set one?",
          timestamp: new Date(),
        };
      } else {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I can help you with medication reminders and information. Try asking me to 'set a reminder' or 'tell me about a medication'.",
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, response]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmReminder = () => {
    if (pendingReminder) {
      setReminders((prev) => [...prev, pendingReminder]);
      toast({
        title: "Reminder set!",
        description: `${pendingReminder.medication_name} reminder has been created.`,
      });
      setPendingReminder(null);
    }
    setShowConfirmModal(false);
  };

  const handleEditReminder = () => {
    setShowConfirmModal(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "Please tell me what you'd like to change about the reminder.",
        timestamp: new Date(),
      },
    ]);
  };

  const handleCancelModal = () => {
    setShowConfirmModal(false);
    setPendingReminder(null);
  };

  const handleSnoozeReminder = (reminderId: string, minutes: number) => {
    toast({
      title: "Reminder snoozed",
      description: `Reminder snoozed for ${minutes} minutes.`,
    });
  };

  const handleCancelReminder = (reminderId: string) => {
    setReminders((prev) => prev.filter((r) => r.reminder_id !== reminderId));
    toast({
      title: "Reminder cancelled",
      description: "The reminder has been removed.",
    });
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "cleared",
        role: "assistant",
        content: "Chat history cleared. How may I assist you now?",
        timestamp: new Date(),
      },
    ]);
    setReminders([]);
    toast({
      title: "Chat cleared",
      description: "Your chat history and reminders have been reset.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <ChatMessage message={message} />
                {message.med_info && <MedicationCard medInfo={message.med_info} />}
              </div>
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <QuickActions onAction={handleSendMessage} onClearChat={handleClearChat} />

          <div className="border-t bg-card p-4">
            <div className="flex gap-2 max-w-4xl mx-auto">
              <Input
                placeholder="Ask me about medications or set a reminder..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage(input)}
                disabled={isLoading || !input.trim()}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Reminders Panel - Desktop */}
        <div className="hidden lg:block w-80 border-l bg-muted/30 overflow-y-auto p-4">
          <RemindersPanel
            reminders={reminders}
            onSnooze={handleSnoozeReminder}
            onCancel={handleCancelReminder}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {pendingReminder && (
        <ConfirmationModal
          open={showConfirmModal}
          onOpenChange={setShowConfirmModal}
          reminder={pendingReminder}
          onConfirm={handleConfirmReminder}
          onEdit={handleEditReminder}
          onCancel={handleCancelModal}
        />
      )}
    </div>
  );
};

export default Index;
