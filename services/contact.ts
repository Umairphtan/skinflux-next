import API from "@/libs/axios";
import { ContactResponse } from "@/types/contact";

// submit contact
export const submitContact = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  const res = await API.post("/contact", data);
  return res.data;
};

// get all contacts (ADMIN ONLY)
export const getContacts = async (): Promise<ContactResponse> => {
  const res = await API.get("/contact");
  return res.data;
};