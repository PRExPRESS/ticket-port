import type { Field } from "@/components/DynamicForm";

export const createEventFields: Field[] = [
  {
    name: "organizerId",
    label: "Organizer ID",
    type: "text",
  },
  {
    name: "title",
    label: "Title",
    type: "text",
  },
  {
    name: "banner",
    label: "Banner",
    type: "file",
  },
  {
    name: "image",
    label: "Image",
    type: "file",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
  },
  {
    name: "date",
    label: "Date",
    type: "date",
  },
  {
    name: "time",
    label: "Time",
    type: "time",
  },
  {
    name: "submit",
    label: "Create Event",
    type: "submit",
  },
]; 