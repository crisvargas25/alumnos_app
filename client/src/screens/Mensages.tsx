"use client"

import type React from "react"
import { useState } from "react"
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Dropdown,
  InputGroup,
  ListGroup,
  Image,
  Modal,
} from "react-bootstrap"
import Swal from "sweetalert2"

interface Email {
  id: string
  senderId: string
  senderName: string
  senderEmail: string
  subject: string
  content: string
  timestamp: Date
  status: "unread" | "read" | "replied" | "forwarded"
  priority: "low" | "normal" | "high"
  hasAttachments: boolean
  attachments?: string[]
}

interface Folder {
  id: string
  name: string
  icon: string
  count: number
  color?: string
}

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export default function EmailSystem() {
  const [folders] = useState<Folder[]>([
    { id: "inbox", name: "Inbox", icon: "bi-inbox", count: 12 },
    { id: "sent", name: "Sent", icon: "bi-send", count: 8 },
    { id: "drafts", name: "Drafts", icon: "bi-file-earmark-text", count: 3 },
    { id: "trash", name: "Trash", icon: "bi-trash", count: 5 },
    { id: "spam", name: "Spam", icon: "bi-shield-exclamation", count: 2 },
  ])

  const [emails, setEmails] = useState<Email[]>([
    {
      id: "1",
      senderId: "1",
      senderName: "Sarah Johnson",
      senderEmail: "sarah.johnson@company.com",
      subject: "Project Update - Q4 Marketing Campaign",
      content:
        "Hi team,\n\nI wanted to provide you with an update on our Q4 marketing campaign. We've made significant progress over the past week and I'm excited to share the latest developments with you.\n\nKey Achievements:\n- Completed the creative assets for social media\n- Finalized the email marketing templates\n- Secured partnerships with 3 major influencers\n\nNext Steps:\n- Launch the campaign on Monday\n- Monitor performance metrics daily\n- Prepare weekly reports\n\nPlease let me know if you have any questions or concerns.\n\nBest regards,\nSarah",
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      status: "unread",
      priority: "high",
      hasAttachments: true,
      attachments: ["campaign-assets.zip", "timeline.pdf"],
    },
    {
      id: "2",
      senderId: "2",
      senderName: "Mike Chen",
      senderEmail: "mike.chen@techcorp.com",
      subject: "Meeting Confirmation - Tomorrow 3 PM",
      content:
        "Hello,\n\nThis is to confirm our meeting scheduled for tomorrow at 3:00 PM in Conference Room B.\n\nAgenda:\n1. Review project timeline\n2. Discuss budget allocation\n3. Plan next quarter objectives\n\nPlease bring your latest reports and any questions you might have.\n\nSee you tomorrow!\n\nMike Chen\nProject Manager",
      timestamp: new Date(Date.now() - 4 * 60 * 60000),
      status: "read",
      priority: "normal",
      hasAttachments: false,
    },
    {
      id: "3",
      senderId: "3",
      senderName: "Emma Wilson",
      senderEmail: "emma.wilson@design.co",
      subject: "Design Review Required",
      content:
        "Hi there,\n\nI've completed the initial designs for the new website layout. Could you please review them and provide your feedback?\n\nThe designs include:\n- Homepage mockup\n- Product pages\n- Contact form\n- Mobile responsive versions\n\nI've attached all the files for your review. Please let me know your thoughts by Friday so we can proceed with the development phase.\n\nThanks!\nEmma",
      timestamp: new Date(Date.now() - 6 * 60 * 60000),
      status: "read",
      priority: "normal",
      hasAttachments: true,
      attachments: ["homepage-design.png", "mobile-mockup.png"],
    },
    {
      id: "4",
      senderId: "4",
      senderName: "David Rodriguez",
      senderEmail: "david.r@finance.com",
      subject: "URGENT: Budget Approval Needed",
      content:
        "Team,\n\nWe need immediate approval for the additional budget allocation for the Q4 project. The deadline is approaching and we cannot proceed without this approval.\n\nAmount requested: $15,000\nPurpose: Additional marketing spend and contractor fees\nDeadline: End of this week\n\nPlease review the attached proposal and get back to me ASAP.\n\nRegards,\nDavid Rodriguez\nFinance Manager",
      timestamp: new Date(Date.now() - 8 * 60 * 60000),
      status: "unread",
      priority: "high",
      hasAttachments: true,
      attachments: ["budget-proposal.xlsx"],
    },
    {
      id: "5",
      senderId: "5",
      senderName: "Lisa Park",
      senderEmail: "lisa.park@hr.company.com",
      subject: "Team Building Event - Save the Date",
      content:
        "Dear Team,\n\nWe're excited to announce our upcoming team building event!\n\nDate: Next Friday, December 15th\nTime: 2:00 PM - 6:00 PM\nLocation: Riverside Park Pavilion\n\nActivities planned:\n- Team challenges and games\n- BBQ dinner\n- Awards ceremony\n- Networking session\n\nPlease RSVP by Wednesday so we can finalize the catering arrangements.\n\nLooking forward to seeing everyone there!\n\nBest,\nLisa Park\nHR Manager",
      timestamp: new Date(Date.now() - 12 * 60 * 60000),
      status: "read",
      priority: "low",
      hasAttachments: false,
    },
  ])

  const [activeFolder, setActiveFolder] = useState<string>("inbox")
  const [selectedEmail, setSelectedEmail] = useState<string | null>("1")
  const [searchTerm, setSearchTerm] = useState("")
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [composeForm, setComposeForm] = useState({
    to: "",
    subject: "",
    priority: "normal" as "low" | "normal" | "high",
    content: "",
  })

  const currentUser: User = {
    id: "current",
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger"
      case "low":
        return "success"
      default:
        return "secondary"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return "bi-exclamation-triangle-fill"
      case "low":
        return "bi-arrow-down"
      default:
        return "bi-dash"
    }
  }

  const filteredEmails = emails.filter(
    (email) =>
      email.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedEmailData = emails.find((email) => email.id === selectedEmail)

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!composeForm.to.trim() || !composeForm.subject.trim() || !composeForm.content.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all required fields (To, Subject, and Message)",
        confirmButtonColor: "#0d6efd",
      })
      return
    }

    // Show loading alert
    Swal.fire({
      title: "Sending Email...",
      text: "Please wait while we send your email",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    // Simulate sending delay
    setTimeout(async () => {
      const newEmail: Email = {
        id: Date.now().toString(),
        senderId: "current",
        senderName: currentUser.name,
        senderEmail: currentUser.email,
        subject: composeForm.subject,
        content: composeForm.content,
        timestamp: new Date(),
        status: "read",
        priority: composeForm.priority,
        hasAttachments: false,
      }

      setEmails([newEmail, ...emails])
      setComposeForm({ to: "", subject: "", priority: "normal", content: "" })
      setShowComposeModal(false)

      // Show success alert
      await Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: `Your email has been sent successfully to ${composeForm.to}`,
        confirmButtonColor: "#198754",
        timer: 3000,
        timerProgressBar: true,
      })
    }, 2000)
  }

  const handleSaveDraft = async () => {
    if (!composeForm.subject.trim() && !composeForm.content.trim()) {
      await Swal.fire({
        icon: "info",
        title: "Empty Draft",
        text: "Please add some content before saving as draft",
        confirmButtonColor: "#0d6efd",
      })
      return
    }

    await Swal.fire({
      icon: "success",
      title: "Draft Saved!",
      text: "Your email has been saved to drafts",
      confirmButtonColor: "#198754",
      timer: 2000,
      timerProgressBar: true,
    })

    setShowComposeModal(false)
  }

  const markAsRead = (emailId: string) => {
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, status: "read" as const } : email)))
  }

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmail(emailId)
    markAsRead(emailId)
  }

  const handleDeleteEmail = async (emailId: string) => {
    const email = emails.find((e) => e.id === emailId)
    if (!email) return

    const result = await Swal.fire({
      title: "Delete Email?",
      text: `Are you sure you want to delete "${email.subject}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      setEmails(emails.filter((e) => e.id !== emailId))
      if (selectedEmail === emailId) {
        setSelectedEmail(null)
      }

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The email has been moved to trash",
        confirmButtonColor: "#198754",
        timer: 2000,
        timerProgressBar: true,
      })
    }
  }

  const handleArchiveEmail = async (emailId: string) => {
    const email = emails.find((e) => e.id === emailId)
    if (!email) return

    await Swal.fire({
      icon: "success",
      title: "Email Archived!",
      text: `"${email.subject}" has been moved to archive`,
      confirmButtonColor: "#198754",
      timer: 2000,
      timerProgressBar: true,
    })
  }

  const handleReplyEmail = async () => {
    if (!selectedEmailData) return

    const { value: replyText } = await Swal.fire({
      title: `Reply to: ${selectedEmailData.subject}`,
      input: "textarea",
      inputLabel: "Your reply",
      inputPlaceholder: "Type your reply here...",
      inputAttributes: {
        "aria-label": "Type your reply here",
      },
      showCancelButton: true,
      confirmButtonText: "Send Reply",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0d6efd",
      inputValidator: (value) => {
        if (!value) {
          return "Please enter your reply message"
        }
      },
    })

    if (replyText) {
      // Show sending animation
      Swal.fire({
        title: "Sending Reply...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      setTimeout(async () => {
        // Mark original email as replied
        setEmails(
          emails.map((email) => (email.id === selectedEmailData.id ? { ...email, status: "replied" as const } : email)),
        )

        await Swal.fire({
          icon: "success",
          title: "Reply Sent!",
          text: `Your reply has been sent to ${selectedEmailData.senderEmail}`,
          confirmButtonColor: "#198754",
          timer: 3000,
          timerProgressBar: true,
        })
      }, 1500)
    }
  }

  const handleForwardEmail = async () => {
    if (!selectedEmailData) return

    const { value: formValues } = await Swal.fire({
      title: "Forward Email",
      html: `
        <div style="text-align: left;">
          <label for="swal-input1" style="display: block; margin-bottom: 5px; font-weight: bold;">To:</label>
          <input id="swal-input1" class="swal2-input" placeholder="recipient@example.com" type="email" style="margin-bottom: 15px;">
          <label for="swal-input2" style="display: block; margin-bottom: 5px; font-weight: bold;">Additional message (optional):</label>
          <textarea id="swal-input2" class="swal2-textarea" placeholder="Add your message here..."></textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Forward",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0d6efd",
      preConfirm: () => {
        const email = (document.getElementById("swal-input1") as HTMLInputElement)?.value
        const message = (document.getElementById("swal-input2") as HTMLTextAreaElement)?.value
        if (!email) {
          Swal.showValidationMessage("Please enter recipient email")
          return false
        }
        return { email, message }
      },
    })

    if (formValues) {
      Swal.fire({
        title: "Forwarding Email...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      setTimeout(async () => {
        setEmails(
          emails.map((email) =>
            email.id === selectedEmailData.id ? { ...email, status: "forwarded" as const } : email,
          ),
        )

        await Swal.fire({
          icon: "success",
          title: "Email Forwarded!",
          text: `Email has been forwarded to ${formValues.email}`,
          confirmButtonColor: "#198754",
          timer: 3000,
          timerProgressBar: true,
        })
      }, 1500)
    }
  }

  const handleAttachFiles = async () => {
    await Swal.fire({
      icon: "info",
      title: "File Attachment",
      text: "File attachment feature will be available soon!",
      confirmButtonColor: "#0d6efd",
    })
  }

  const handleNewChat = async () => {
    const { value: email } = await Swal.fire({
      title: "Start New Conversation",
      input: "email",
      inputLabel: "Enter recipient's email address",
      inputPlaceholder: "recipient@example.com",
      showCancelButton: true,
      confirmButtonText: "Start Chat",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0d6efd",
      inputValidator: (value) => {
        if (!value) {
          return "Please enter an email address"
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address"
        }
      },
    })

    if (email) {
      setComposeForm({ ...composeForm, to: email })
      setShowComposeModal(true)
    }
  }

  return (
    <Container fluid className="h-100 p-0" style={{ backgroundColor: "#f8f9fa" }}>
      <Row className="h-100 g-0">
        {/* Sidebar - Folders */}
        <Col md={2} className="border-end bg-white">
          <div className="p-3 border-bottom">
            <Button variant="primary" className="w-100" onClick={() => setShowComposeModal(true)}>
              <i className="bi bi-plus-circle me-2"></i>
              Compose
            </Button>
          </div>

          <ListGroup variant="flush">
            {folders.map((folder) => (
              <ListGroup.Item
                key={folder.id}
                action
                active={activeFolder === folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className="border-0 py-3"
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <i className={`${folder.icon} me-3`}></i>
                    <span>{folder.name}</span>
                  </div>
                  {folder.count > 0 && (
                    <Badge bg="secondary" pill>
                      {folder.count}
                    </Badge>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="p-3 mt-auto border-top">
            <div className="d-flex align-items-center">
              <Image
                src={currentUser.avatar || "/placeholder.svg"}
                roundedCircle
                width={32}
                height={32}
                className="me-2"
                alt={currentUser.name}
              />
              <div>
                <div className="fw-bold small">{currentUser.name}</div>
                <div className="text-muted small">{currentUser.email}</div>
              </div>
            </div>
          </div>
        </Col>

        {/* Email List */}
        <Col md={4} className="border-end bg-white">
          <div className="p-3 border-bottom">
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="overflow-auto" style={{ height: "calc(100vh - 120px)" }}>
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={`p-3 border-bottom cursor-pointer ${
                  selectedEmail === email.id ? "bg-primary bg-opacity-10" : ""
                } ${email.status === "unread" ? "border-start border-primary border-3" : ""}`}
                onClick={() => handleEmailSelect(email.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-start justify-content-between mb-2">
                  <div className="flex-grow-1 min-width-0">
                    <div className="d-flex align-items-center mb-1">
                      <span className={`fw-${email.status === "unread" ? "bold" : "normal"} text-truncate me-2`}>
                        {email.senderName}
                      </span>
                      {email.priority !== "normal" && (
                        <i
                          className={`${getPriorityIcon(email.priority)} text-${getPriorityColor(email.priority)} me-1`}
                        ></i>
                      )}
                      {email.hasAttachments && <i className="bi bi-paperclip text-muted me-1"></i>}
                      {email.status === "replied" && <i className="bi bi-reply text-success me-1"></i>}
                      {email.status === "forwarded" && <i className="bi bi-forward text-info me-1"></i>}
                    </div>
                    <div className={`fw-${email.status === "unread" ? "bold" : "normal"} text-truncate mb-1`}>
                      {email.subject}
                    </div>
                    <div className="text-muted small text-truncate">{email.content.substring(0, 100)}...</div>
                  </div>
                  <div className="text-end ms-2">
                    <small className="text-muted">{formatTime(email.timestamp)}</small>
                    {email.status === "unread" && (
                      <div className="mt-1">
                        <span
                          className="badge bg-primary rounded-circle"
                          style={{ width: "8px", height: "8px" }}
                        ></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Email Content */}
        <Col md={6} className="d-flex flex-column bg-white">
          {selectedEmailData ? (
            <>
              {/* Email Header */}
              <div className="p-4 border-bottom">
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div className="flex-grow-1">
                    <h4 className="mb-2">{selectedEmailData.subject}</h4>
                    <div className="d-flex align-items-center mb-2">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        roundedCircle
                        width={40}
                        height={40}
                        className="me-3"
                        alt={selectedEmailData.senderName}
                      />
                      <div>
                        <div className="fw-bold">{selectedEmailData.senderName}</div>
                        <div className="text-muted small">{selectedEmailData.senderEmail}</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center text-muted small">
                      <span className="me-3">
                        <i className="bi bi-clock me-1"></i>
                        {selectedEmailData.timestamp.toLocaleString()}
                      </span>
                      {selectedEmailData.priority !== "normal" && (
                        <Badge bg={getPriorityColor(selectedEmailData.priority)} className="me-2">
                          {selectedEmailData.priority.toUpperCase()} PRIORITY
                        </Badge>
                      )}
                      {selectedEmailData.hasAttachments && (
                        <span>
                          <i className="bi bi-paperclip me-1"></i>
                          {selectedEmailData.attachments?.length} attachment(s)
                        </span>
                      )}
                    </div>
                  </div>

                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                      <i className="bi bi-three-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleReplyEmail}>
                        <i className="bi bi-reply me-2"></i>Reply
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleForwardEmail}>
                        <i className="bi bi-forward me-2"></i>Forward
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => handleArchiveEmail(selectedEmailData.id)}>
                        <i className="bi bi-archive me-2"></i>Archive
                      </Dropdown.Item>
                      <Dropdown.Item className="text-danger" onClick={() => handleDeleteEmail(selectedEmailData.id)}>
                        <i className="bi bi-trash me-2"></i>Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                {selectedEmailData.hasAttachments && (
                  <div className="mb-3">
                    <div className="fw-bold small mb-2">Attachments:</div>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedEmailData.attachments?.map((attachment, index) => (
                        <div key={index} className="border rounded p-2 d-flex align-items-center">
                          <i className="bi bi-file-earmark me-2"></i>
                          <span className="small">{attachment}</span>
                          <Button variant="link" size="sm" className="p-0 ms-2">
                            <i className="bi bi-download"></i>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Email Body */}
              <div className="flex-grow-1 p-4 overflow-auto">
                <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{selectedEmailData.content}</div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-top bg-light">
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={handleReplyEmail}>
                    <i className="bi bi-reply me-2"></i>Reply
                  </Button>
                  <Button variant="outline-primary" onClick={handleForwardEmail}>
                    <i className="bi bi-forward me-2"></i>Forward
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="text-center">
                <i className="bi bi-envelope display-1 text-muted"></i>
                <h4 className="mt-3 text-muted">Select an email to read</h4>
              </div>
            </div>
          )}
        </Col>
      </Row>

      {/* Compose Email Modal */}
      <Modal show={showComposeModal} onHide={() => setShowComposeModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-envelope me-2"></i>
            Compose Email
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSendEmail}>
          <Modal.Body>
            <Row className="mb-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="recipient@example.com"
                    value={composeForm.to}
                    onChange={(e) => setComposeForm({ ...composeForm, to: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={composeForm.priority}
                    onChange={(e) =>
                      setComposeForm({ ...composeForm, priority: e.target.value as "low" | "normal" | "high" })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email subject"
                value={composeForm.subject}
                onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="Write your message here..."
                value={composeForm.content}
                onChange={(e) => setComposeForm({ ...composeForm, content: e.target.value })}
                required
              />
            </Form.Group>

            <div className="d-flex align-items-center gap-3">
              <Button variant="outline-secondary" size="sm" onClick={handleAttachFiles}>
                <i className="bi bi-paperclip me-1"></i>
                Attach Files
              </Button>
              <Button variant="outline-secondary" size="sm">
                <i className="bi bi-emoji-smile me-1"></i>
                Emoji
              </Button>
              <Button variant="outline-secondary" size="sm">
                <i className="bi bi-type me-1"></i>
                Format
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowComposeModal(false)}>
              Cancel
            </Button>
            <Button variant="outline-secondary" onClick={handleSaveDraft}>
              <i className="bi bi-file-earmark me-2"></i>
              Save Draft
            </Button>
            <Button variant="primary" type="submit">
              <i className="bi bi-send me-2"></i>
              Send Email
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}
