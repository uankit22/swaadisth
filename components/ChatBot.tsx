"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Settings,
  X,
  Paperclip,
  Smile,
  Send,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  Bot,
  BellRing,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

const suggestions = [
  "Tell me about your products",
  "How does shipping work?",
  "What's your return policy?",
  "Do you offer bulk orders?",
]

const qaDatabase = [
  {
    keywords: ["hello", "hi", "hey"],
    response: "Hello! Welcome to Swaadishta. How can I assist you today?",
  },
  {
    keywords: ["products", "snacks", "sweets"],
    response:
      "We offer a wide range of authentic Indian snacks and sweets. Our popular categories include Namkeen, Mithai, Dry Fruits, and Special Combos. Some of our bestsellers are Kaju Katli, Soan Papdi, and Masala Peanuts. Would you like more information about any specific product?",
  },
  {
    keywords: ["shipping", "delivery"],
    response:
      "We offer free shipping on orders above ₹699. Standard delivery takes 3-5 business days. For orders below ₹699, a shipping fee of ₹60 is applied. We currently deliver across India. International shipping is available for select countries.",
  },
  {
    keywords: ["return", "refund", "exchange"],
    response:
      "We have a 7-day return and exchange policy for unopened products. If you're not satisfied with your purchase, please contact our customer service team within 7 days of receiving your order. We'll guide you through the return process and issue a refund once we receive the returned item.",
  },
  {
    keywords: ["ingredients", "allergens"],
    response:
      "All our products are made with 100% natural ingredients. We don't use any preservatives or artificial flavors. For specific allergen information, please check the product details on our website. If you have severe allergies, please contact us before ordering.",
  },
  {
    keywords: ["price", "cost", "discount"],
    response:
      "Our prices vary by product. You can find detailed pricing information on each product page. We often run seasonal discounts and promotions. Sign up for our newsletter to stay updated on the latest offers! We also have a loyalty program where you earn points on every purchase.",
  },
  {
    keywords: ["order", "track"],
    response:
      "To track your order, please visit our 'Track Order' page and enter your order number. You can find your order number in the confirmation email we sent you. If you're having trouble, please contact our customer support with your email address and we'll help you locate your order.",
  },
  {
    keywords: ["cancel", "cancellation"],
    response:
      "Order cancellation is possible within 1 hour of placing the order. Please contact our customer service team immediately if you need to cancel your order. After 1 hour, orders enter processing and cannot be cancelled, but you can return the item once received.",
  },
  {
    keywords: ["payment", "methods"],
    response:
      "We accept various payment methods including credit/debit cards, net banking, UPI, and cash on delivery (for orders above ₹499). All online transactions are secure and encrypted. We also offer EMI options for orders above ₹3000.",
  },
  {
    keywords: ["quality", "freshness"],
    response:
      "We take pride in the quality and freshness of our products. All items are made to order and have no added preservatives. We follow strict quality control measures to ensure the best taste and freshness. Our products typically have a shelf life of 15-30 days when stored properly.",
  },
  {
    keywords: ["bulk", "wholesale"],
    response:
      "For bulk or wholesale orders, please contact our sales team at bulk@swaadishta.com. We offer special discounts for large orders and can customize packages for events or corporate gifting. Minimum order quantities may apply for wholesale pricing.",
  },
  {
    keywords: ["vegan", "vegetarian"],
    response:
      "Most of our products are vegetarian. We have a selection of vegan options as well. Each product page clearly mentions if the item is suitable for vegans. Some of our popular vegan items include Dry Fruit Ladoos and Roasted Makhana.",
  },
  {
    keywords: ["shelf", "life", "storage"],
    response:
      "The shelf life of our products varies, but typically ranges from 15 to 30 days when stored properly. We recommend storing our snacks in an airtight container in a cool, dry place. For best results, consume within a week of opening the package.",
  },
  {
    keywords: ["gift", "gifting"],
    response:
      "We offer special gift packs and customizable hampers perfect for various occasions. Check out our 'Gifting' section for more details or contact us for personalized gifting solutions. We can add custom messages and handle direct shipping to your gift recipients.",
  },
  {
    keywords: ["nutrition", "calories"],
    response:
      "Nutritional information for each product is available on its respective product page. If you need more detailed information, please contact our customer service. We're working on providing comprehensive nutritional labels for all our products.",
  },
  {
    keywords: ["fssai", "certification"],
    response:
      "Yes, we are FSSAI certified. Our certification number is displayed on all our product packaging and on our website footer. We adhere to all food safety regulations and undergo regular audits to maintain our certification.",
  },
  {
    keywords: ["contact", "customer service", "support"],
    response:
      "You can reach our customer service team at care@swaadishta.com or call us at +91 98765 43210. Our support hours are Monday to Saturday, 10:00 AM to 05:30 PM IST. We aim to respond to all queries within 24 hours.",
  },
  {
    keywords: ["recipe", "cook", "prepare"],
    response:
      "While we don't share our exact recipes, we can provide some general cooking tips. For example, our Gulab Jamun mix works best when kneaded with warm milk. We're working on a recipe blog to share traditional Indian recipes and modern twists on classics. Is there a particular dish you're interested in?",
  },
  {
    keywords: ["customize", "personalize", "special order"],
    response:
      "We offer customization options for bulk orders and special events. This includes custom packaging, personalized messages, and even tweaks to our recipes (like reducing sugar content). Please email us at special@swaadishta.com with your requirements and we'll be happy to assist you.",
  },
  {
    keywords: ["eco-friendly", "sustainable", "environment"],
    response:
      "We're committed to sustainability. Our packaging is made from recycled materials, and we're constantly working to reduce our environmental impact. We source ingredients locally where possible and are exploring compostable packaging options for the future.",
  },
  {
    keywords: ["loyalty program", "rewards"],
    response:
      "Yes, we have a loyalty program! For every ₹1000 you spend, you earn 100 points. These points can be redeemed for discounts on future purchases. You also get double points on your birthday and exclusive access to new product launches.",
  },
  {
    keywords: ["spicy", "heat level"],
    response:
      "Our products come in various heat levels. Each product page specifies the spice level, ranging from mild to extra hot. We can also customize spice levels for bulk orders. Some of our popular spicy items include Masala Peanuts and Spicy Mixture.",
  },
  {
    keywords: ["bestsellers", "popular", "top products"],
    response:
      "Our bestsellers include Kaju Katli, Soan Papdi, Besan Ladoo, and Masala Peanuts. These items consistently receive high ratings from our customers. We also have a 'Top Rated' section on our website where you can see our most popular products.",
  },
  {
    keywords: ["festival", "occasion", "seasonal"],
    response:
      "We offer special products and gift hampers for major Indian festivals like Diwali, Holi, and Raksha Bandhan. We also have seasonal specials, like Mango Barfi during summer. Check our website or subscribe to our newsletter to stay updated on festival offers and limited-edition products.",
  },
  {
    keywords: ["health", "diet", "low sugar"],
    response:
      "We understand the growing health consciousness among our customers. We offer a range of healthier options, including sugar-free sweets, roasted snacks (instead of fried), and products made with alternative sweeteners. We're also developing a line of diabetic-friendly sweets.",
  },
  {
    keywords: ["packaging", "gift wrap"],
    response:
      "All our products come in attractive, sturdy packaging to ensure they reach you in perfect condition. For gifting, we offer premium gift wrap options. You can choose from various designs and add a personalized message card. We use eco-friendly materials for our packaging wherever possible.",
  },
  {
    keywords: ["sample", "try", "taster"],
    response:
      "We offer a 'Taster Box' that includes small portions of our bestselling items. This is a great way to try a variety of our products. The Taster Box is available in vegetarian and vegan options. It's perfect for first-time customers or as a gift.",
  },
]

export default function ChatBot() {
  // Media query hook
  const isMobile = useMediaQuery("(max-width: 768px)")

  // State hooks
  const [showChatWidget, setShowChatWidget] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<{ type: "user" | "bot"; text: string; timestamp: number }[]>([
    { type: "bot", text: "Hello! Welcome to Swaadishta. How can I assist you today?", timestamp: Date.now() },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [chatHistory, setChatHistory] = useState<{ type: "user" | "bot"; text: string; timestamp: number }[]>([])
  const [isChatbotMuted, setIsChatbotMuted] = useState(false)
  const [chatFontSize, setChatFontSize] = useState(16)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [showNotification, setShowNotification] = useState(false)
  const [showMinimizedNotification, setShowMinimizedNotification] = useState(false)

  // Ref hooks
  const chatEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Other hooks
  const { toast } = useToast()

  // Effect hooks
  useEffect(() => {
    const handleResize = () => {
      if (chatContainerRef.current) {
        const vh = window.innerHeight * 0.01
        chatContainerRef.current.style.setProperty("--vh", `${vh}px`)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 3000) // Show the notification after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false)
        setShowMinimizedNotification(true)
      }, 5000) // Hide the notification after 5 seconds
    }
    return () => clearTimeout(timer)
  }, [showNotification])

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages, isTyping])

  // Callback hooks
  const handleSuggestionClick = useCallback((suggestion: string) => {
    handleChatSubmit(suggestion)
    setShowSuggestions(false)
  }, [])

  const handleChatSubmit = useCallback(
    (message: string) => {
      if (!message.trim()) return

      const userMessage = { type: "user" as const, text: message, timestamp: Date.now() }
      setChatMessages((prev) => [...prev, userMessage])
      setChatHistory((prev) => [...prev, userMessage])
      setShowSuggestions(false)

      setIsTyping(true)

      setTimeout(
        () => {
          setIsTyping(false)
          const botResponse = getBotResponse(message)
          const botMessage = { type: "bot" as const, text: botResponse, timestamp: Date.now() }
          setChatMessages((prev) => [...prev, botMessage])
          setChatHistory((prev) => [...prev, botMessage])

          if (!isChatbotMuted) {
            speakMessage(botResponse)
          }
        },
        1000 + Math.random() * 1000,
      )
    },
    [isChatbotMuted],
  )

  const handleRateResponse = useCallback(
    (helpful: boolean) => {
      console.log(`User rated the response as ${helpful ? "helpful" : "not helpful"}`)
      toast({
        title: "Thank you for your feedback!",
        description: helpful ? "We're glad our response was helpful." : "We'll work on improving our responses.",
        duration: 3000,
      })
    },
    [toast],
  )

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        // Here you would typically upload the file to your server
        // For this example, we'll just add a message about the upload
        handleChatSubmit(`I've uploaded a file: ${file.name}`)
        toast({
          title: "File Uploaded",
          description: `Your file ${file.name} has been uploaded successfully.`,
          duration: 3000,
        })
      }
    },
    [handleChatSubmit, toast],
  )

  // Helper functions
  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()

    // Check for matching keywords
    for (const qa of qaDatabase) {
      if (qa.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return qa.response
      }
    }

    // If no match is found, use a more sophisticated fallback
    return generateFallbackResponse(lowerMessage)
  }

  const generateFallbackResponse = (message: string) => {
    const fallbackResponses = [
      "I'm not quite sure about that. Could you please rephrase your question?",
      "That's an interesting query. Let me check with our team and get back to you. In the meantime, is there anything else I can help with?",
      "I don't have specific information about that, but I'd be happy to connect you with our customer support team. Would you like their contact details?",
      "I'm still learning about that topic. Can you tell me more about what you're looking for?",
      "While I don't have a direct answer, I can suggest some related topics that might be helpful. Would you like that?",
    ]

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }

  const speakMessage = useCallback(
    (message: string) => {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(message)
        speech.lang = selectedLanguage // Use the selected language
        window.speechSynthesis.speak(speech)
      }
    },
    [selectedLanguage],
  )

  const toggleChatWidget = () => {
    setShowChatWidget((prev) => !prev)
    setShowNotification(false)
    setShowMinimizedNotification(false)
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 2,
      },
    },
  }

  // If on mobile, don't render anything
  if (isMobile) {
    return null
  }

  // Only render on desktop
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={toggleChatWidget}
              className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <MessageSquare className="h-8 w-8" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white"
          >
            <p>Chat with Swaadishta AI</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 mb-2"
          >
            <Card className="w-64 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white border-none shadow-lg overflow-hidden">
              <CardContent className="p-3 flex items-center">
                <Bot className="h-6 w-6 mr-2 text-yellow-300" />
                <p className="text-sm font-medium">Need help? Chat with our AI assistant!</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Notification */}
      <AnimatePresence>
        {showMinimizedNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-20 right-0 mb-2"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white border-none shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={toggleChatWidget}
                  >
                    <BellRing className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white"
                >
                  <p>Chat with our AI assistant</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {showChatWidget && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-[90vw] sm:w-[400px] max-w-[400px] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border border-purple-200 flex flex-col"
            style={{ height: "calc(var(--vh, 1vh) * 70)" }}
          >
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-4 flex justify-between items-center rounded-t-3xl">
              <h3 className="font-bold flex items-center text-lg">
                <Bot className="h-6 w-6 mr-2 text-yellow-300" />
                Swaadishta AI
              </h3>
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-white rounded-xl shadow-xl border-none">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Preferences</h4>
                        <p className="text-sm text-muted-foreground">Customize your chat experience</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="mute">Mute Chatbot</Label>
                          <Switch id="mute" checked={isChatbotMuted} onCheckedChange={setIsChatbotMuted} />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="fontSize">Font Size</Label>
                          <Slider
                            id="fontSize"
                            min={12}
                            max={24}
                            step={1}
                            value={[chatFontSize]}
                            onValueChange={(value) => setChatFontSize(value[0])}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="language">Language</Label>
                          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="hi">Hindi</SelectItem>
                              <SelectItem value="ta">Tamil</SelectItem>
                              <SelectItem value="te">Telugu</SelectItem>
                              <SelectItem value="bn">Bengali</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChatWidget}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div
              className="flex-grow overflow-y-auto p-4 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50"
              style={{ fontSize: `${chatFontSize}px` }}
            >
              {chatMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`mb-4 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-2xl shadow-md",
                      message.type === "user"
                        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border border-purple-100",
                    )}
                  >
                    {message.text}
                    <div className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-md border border-purple-100">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        transition: { repeat: Number.POSITIVE_INFINITY, duration: 1 },
                      }}
                    >
                      <Loader2 className="h-5 w-5 text-purple-500" />
                    </motion.div>
                  </div>
                </div>
              )}

              {showSuggestions && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-white hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 border-purple-200 text-purple-700"
                      >
                        {suggestion}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleChatSubmit(chatMessage)
                setChatMessage("")
              }}
              className="p-4 border-t border-purple-100 flex gap-2 bg-white"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 border-purple-200 focus:ring-purple-500 rounded-full"
              />
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: "none" }} />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-purple-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 rounded-full"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="border-purple-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 rounded-full"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="grid grid-cols-8 gap-2">
                    {["😀", "😂", "😍", "🤔", "😎", "👍", "❤️", "🎉"].map((emoji) => (
                      <button
                        key={emoji}
                        className="text-2xl hover:bg-purple-100 p-1 rounded transition-colors"
                        onClick={() => {
                          setChatMessage((prev) => prev + emoji)
                          setShowEmojiPicker(false)
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                type="submit"
                size="icon"
                disabled={!chatMessage.trim()}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity rounded-full"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>

            {/* Rate response buttons */}
            {chatMessages.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 border-t border-purple-100 flex justify-between items-center bg-white"
              >
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRateResponse(true)}
                    className="border-purple-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 rounded-full"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Helpful
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRateResponse(false)}
                    className="border-purple-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 rounded-full"
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Not Helpful
                  </Button>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 rounded-full"
                    >
                      Chat History
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-purple-700">Chat History</DialogTitle>
                      <DialogDescription className="text-purple-500">
                        Review your conversation history
                      </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[300px] overflow-y-auto">
                      {chatHistory.map((message, index) => (
                        <div key={index} className={`mb-2 ${message.type === "user" ? "text-right" : "text-left"}`}>
                          <span className="font-bold text-purple-700">{message.type === "user" ? "You" : "Bot"}:</span>{" "}
                          {message.text}
                          <div className="text-xs opacity-50 text-purple-500">
                            {new Date(message.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

