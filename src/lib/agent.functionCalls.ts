import { ROLE_BASE_ACCESS } from "@/constants/agent.constant";
import {  tool,  } from "@openai/agents";
import z from "@openai/zod";

const checkRoleBaseAccess = tool({
  name: "checkRoleBaseAccess",
  description: "Check access and permission based on the user's role.",
  parameters: z.object({role: z.string()}),

  async execute(_args) {
    const role = _args.role as keyof typeof mapping | "2";
    // if (!role) return { allowed: false, reason: "No user info" };

    const mapping = {
      "1": "admin",
      "2": "customer",
      "3": "organizer",
    } as const;

    const access = mapping[role] as keyof typeof ROLE_BASE_ACCESS | undefined;
    if (!access) return { allowed: false, reason: "Role not recognized", role: mapping[role] ?? "not found"  };

    return { allowed: true, role: access, details: ROLE_BASE_ACCESS[access] };
  },
});

const sampleEvents = [
  {
    orgId: "org001",
    title: "Summer Music Festival",
    banner: "https://cdn.ticketport.com/banners/summer-fest.jpg",
    image: "https://cdn.ticketport.com/images/summer-fest-main.jpg",
    category: 1,
    date: "2025-07-15",
    time: "18:00",
    location: "Central Park Amphitheater, NYC",
    description: "Join us for an unforgettable night of music, lights, and celebration with top artists from around the globe.",
    status: 1,
  },
  {
    orgId: "org002",
    title: "Startup Pitch Night",
    banner: "https://cdn.ticketport.com/banners/startup-night.jpg",
    image: "https://cdn.ticketport.com/images/startup-night.jpg",
    category: 2,
    date: "2025-08-01",
    time: "17:30",
    location: "Innovation Hub, San Francisco",
    description: "Watch early-stage startups pitch their ideas to investors and tech enthusiasts. Networking opportunities included!",
    status: 1,
  },
  {
    orgId: "org003",
    title: "Art & Culture Expo",
    banner: "https://cdn.ticketport.com/banners/art-expo.jpg",
    image: "https://cdn.ticketport.com/images/art-expo-main.jpg",
    category: 3,
    date: "2025-09-05",
    time: "10:00",
    location: "Downtown Exhibition Center, Chicago",
    description: "Explore diverse artistic expressions and cultural showcases from across the world.",
    status: 1,
  },
  {
    orgId: "org004",
    title: "Tech Conference 2025",
    banner: "https://cdn.ticketport.com/banners/tech-conf.jpg",
    image: "https://cdn.ticketport.com/images/tech-conf.jpg",
    category: 1,
    date: "2025-10-20",
    time: "09:00",
    location: "Silicon Valley Convention Center",
    description: "The biggest tech conference of the year featuring talks from industry leaders, panels, and hands-on workshops.",
    status: 1,
  },
  {
    orgId: "org005",
    title: "Culinary Fiesta",
    banner: "https://cdn.ticketport.com/banners/culinary-fiesta.jpg",
    image: "https://cdn.ticketport.com/images/culinary-fiesta.jpg",
    category: 4,
    date: "2025-11-11",
    time: "14:00",
    location: "Harbor View Plaza, Seattle",
    description: "Taste the world! A food lover’s paradise with live cooking shows, gourmet booths, and cultural flavors.",
    status: 1,
  }
];
interface Cache {
  data: object;
  message: string;
  component: string;
  componentType: string;
}
let cache: Cache | null = null, ts = 0;
const getAllEventsTool = tool({
  name: "getAllEvents",
  description: "Get and shows all events. Only for admin and organizer.",
  parameters: z.object({}),
  async execute() {
    if (Date.now() - ts < 5*60*1000 && cache) return cache;
    cache = { data: sampleEvents, message: "Success", component: 'markdown', componentType: 'table' };
    ts = Date.now();
    return cache;
      
  }
})

const createEventTool = tool({
  name: "createEvent",
  description: "Create an event. Only for admin and organizer.",
  parameters: z.object({}),
  async execute() {
      return { data: {}, message: "To create the event, you need to fill the opened form with the following information: title, description, date, time, location, category, banner, image ", component: 'event-form', componentType: 'form' };
  }
})

export { checkRoleBaseAccess, getAllEventsTool, createEventTool };
