const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

const COMMAND_OPTIONS = [
    { id: 1,label: "To Create Event", value: "/create_event" },
    { id: 2,label: "To Manage Tickets", value: "/manage_tickets" },
    { id: 3,label: "To View Analytics", value: "/view_analytics" },
    { id: 4,label: "For Settings", value: "/settings" },
    { id: 5,label: "Help", value: "/help" },
]

export { BASE_URL, COMMAND_OPTIONS };