export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: Contact[];
}