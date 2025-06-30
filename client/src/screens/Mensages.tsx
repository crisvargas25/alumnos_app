import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Dropdown,
  InputGroup,
  ListGroup,
  Image,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
  type: "text" | "image" | "file"
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isOnline: boolean
  isTyping: boolean
}

interface User {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "offline"
}

export default function MessagingPage() {
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey! How are you doing?",
      lastMessageTime: new Date(Date.now() - 5 * 60000),
      unreadCount: 2,
      isOnline: true,
      isTyping: false,
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for the help yesterday!",
      lastMessageTime: new Date(Date.now() - 30 * 60000),
      unreadCount: 0,
      isOnline: true,
      isTyping: true,
    },
    {
      id: "3",
      name: "Team Alpha",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Meeting at 3 PM today",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60000),
      unreadCount: 5,
      isOnline: false,
      isTyping: false,
    },
    {
      id: "4",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "See you tomorrow!",
      lastMessageTime: new Date(Date.now() - 24 * 60 * 60000),
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "1",
      senderName: "Sarah Johnson",
      content: "Hey! How are you doing?",
      timestamp: new Date(Date.now() - 10 * 60000),
      status: "read",
      type: "text",
    },
    {
      id: "2",
      senderId: "current",
      senderName: "You",
      content: "I'm doing great! Just working on some projects. How about you?",
      timestamp: new Date(Date.now() - 8 * 60000),
      status: "read",
      type: "text",
    },
    {
      id: "3",
      senderId: "1",
      senderName: "Sarah Johnson",
      content: "Same here! Been busy with the new client presentation.",
      timestamp: new Date(Date.now() - 5 * 60000),
      status: "read",
      type: "text",
    },
    {
      id: "4",
      senderId: "current",
      senderName: "You",
      content: "That sounds exciting! Let me know if you need any help.",
      timestamp: new Date(Date.now() - 2 * 60000),
      status: "delivered",
      type: "text",
    },
  ])

  const [activeConversation, setActiveConversation] = useState<string>("1")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachmentModal, setShowAttachmentModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentUser: User = {
    id: "current",
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  }

  const emojis = ["😀", "😂", "❤️", "👍", "👎", "😢", "😮", "😡", "🎉", "🔥"]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
      status: "sent",
      type: "text",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "delivered" } : msg)))
    }, 1000)
  }

  const handleEmojiClick = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "now"
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    return `${days}d`
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeConv = conversations.find((conv) => conv.id === activeConversation)

  return (
    <Container fluid className="h-100 p-0">
      <Row className="h-100 g-0">
        {/* Sidebar - Conversations List */}
        <Col md={4} lg={3} className="border-end bg-light">
          <Card className="h-100 border-0 rounded-0">
            <Card.Header className="bg-primary text-white">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">
                  <i className="bi bi-chat-dots me-2"></i>
                  Messages
                </h5>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-light" size="sm" className="border-0">
                    <i className="bi bi-three-dots-vertical"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <i className="bi bi-person-plus me-2"></i>New Chat
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <i className="bi bi-people me-2"></i>New Group
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                      <i className="bi bi-gear me-2"></i>Settings
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Header>

            <div className="p-3">
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>

            <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
              {filteredConversations.map((conversation) => (
                <ListGroup.Item
                  key={conversation.id}
                  action
                  active={activeConversation === conversation.id}
                  onClick={() => setActiveConversation(conversation.id)}
                  className="border-0 py-3"
                >
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-3">
                      <Image
                        src={conversation.avatar || "/placeholder.svg"}
                        roundedCircle
                        width={50}
                        height={50}
                        alt={conversation.name}
                      />
                      {conversation.isOnline && (
                        <span
                          className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white"
                          style={{ width: "12px", height: "12px" }}
                        ></span>
                      )}
                    </div>
                    <div className="flex-grow-1 min-width-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="mb-1 text-truncate">{conversation.name}</h6>
                        <small className="text-muted">{formatTime(conversation.lastMessageTime)}</small>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 text-muted small text-truncate">
                          {conversation.isTyping ? (
                            <span className="text-primary">
                              <i className="bi bi-three-dots"></i> typing...
                            </span>
                          ) : (
                            conversation.lastMessage
                          )}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge bg="primary" pill>
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Main Chat Area */}
        <Col md={8} lg={9} className="d-flex flex-column">
          {activeConv ? (
            <>
              {/* Chat Header */}
              <Card.Header className="bg-white border-bottom">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-3">
                      <Image
                        src={activeConv.avatar || "/placeholder.svg"}
                        roundedCircle
                        width={40}
                        height={40}
                        alt={activeConv.name}
                      />
                      {activeConv.isOnline && (
                        <span
                          className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white"
                          style={{ width: "10px", height: "10px" }}
                        ></span>
                      )}
                    </div>
                    <div>
                      <h6 className="mb-0">{activeConv.name}</h6>
                      <small className="text-muted">
                        {activeConv.isOnline ? "Online" : `Last seen ${formatTime(activeConv.lastMessageTime)}`}
                      </small>
                    </div>
                  </div>
                  <div>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Voice Call</Tooltip>}>
                      <Button variant="outline-primary" size="sm" className="me-2">
                        <i className="bi bi-telephone"></i>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Video Call</Tooltip>}>
                      <Button variant="outline-primary" size="sm" className="me-2">
                        <i className="bi bi-camera-video"></i>
                      </Button>
                    </OverlayTrigger>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" size="sm">
                        <i className="bi bi-three-dots-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <i className="bi bi-info-circle me-2"></i>View Profile
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <i className="bi bi-bell-slash me-2"></i>Mute
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <i className="bi bi-archive me-2"></i>Archive
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger">
                          <i className="bi bi-trash me-2"></i>Delete Chat
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Card.Header>

              {/* Messages Area */}
              <div className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: "#f8f9fa" }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`d-flex mb-3 ${message.senderId === "current" ? "justify-content-end" : ""}`}
                  >
                    {message.senderId !== "current" && (
                      <Image
                        src={activeConv.avatar || "/placeholder.svg"}
                        roundedCircle
                        width={32}
                        height={32}
                        className="me-2"
                        alt={message.senderName}
                      />
                    )}
                    <div
                      className={`max-width-70 ${message.senderId === "current" ? "text-end" : ""}`}
                      style={{ maxWidth: "70%" }}
                    >
                      <div
                        className={`p-3 rounded-3 ${
                          message.senderId === "current" ? "bg-primary text-white" : "bg-white border"
                        }`}
                      >
                        <p className="mb-0">{message.content}</p>
                      </div>
                      <div className="d-flex align-items-center mt-1">
                        <small className="text-muted">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </small>
                        {message.senderId === "current" && (
                          <small className="ms-2">
                            {message.status === "sent" && <i className="bi bi-check text-muted"></i>}
                            {message.status === "delivered" && <i className="bi bi-check-all text-muted"></i>}
                            {message.status === "read" && <i className="bi bi-check-all text-primary"></i>}
                          </small>
                        )}
                      </div>
                    </div>
                    {message.senderId === "current" && (
                      <Image
                        src={currentUser.avatar || "/placeholder.svg"}
                        roundedCircle
                        width={32}
                        height={32}
                        className="ms-2"
                        alt="You"
                      />
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <Card.Footer className="bg-white border-top">
                <Form onSubmit={handleSendMessage}>
                  <InputGroup>
                    <Button variant="outline-secondary" onClick={() => setShowAttachmentModal(true)}>
                      <i className="bi bi-paperclip"></i>
                    </Button>
                    <Form.Control
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage(e)
                        }
                      }}
                    />
                    <Button variant="outline-secondary" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                      <i className="bi bi-emoji-smile"></i>
                    </Button>
                    <Button variant="primary" type="submit" disabled={!newMessage.trim()}>
                      <i className="bi bi-send"></i>
                    </Button>
                  </InputGroup>
                </Form>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="mt-2 p-2 bg-light rounded">
                    {emojis.map((emoji, index) => (
                      <Button
                        key={index}
                        variant="link"
                        size="sm"
                        onClick={() => handleEmojiClick(emoji)}
                        className="p-1"
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                )}
              </Card.Footer>
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="text-center">
                <i className="bi bi-chat-dots display-1 text-muted"></i>
                <h4 className="mt-3 text-muted">Select a conversation to start messaging</h4>
              </div>
            </div>
          )}
        </Col>
      </Row>

      {/* Attachment Modal */}
      <Modal show={showAttachmentModal} onHide={() => setShowAttachmentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Attachment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-2">
            <Button variant="outline-primary" size="lg">
              <i className="bi bi-camera me-2"></i>Camera
            </Button>
            <Button variant="outline-primary" size="lg">
              <i className="bi bi-image me-2"></i>Photo & Video
            </Button>
            <Button variant="outline-primary" size="lg">
              <i className="bi bi-file-earmark me-2"></i>Document
            </Button>
            <Button variant="outline-primary" size="lg">
              <i className="bi bi-geo-alt me-2"></i>Location
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  )
}
