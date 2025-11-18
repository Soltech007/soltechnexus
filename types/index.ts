import { ReactNode } from 'react';

export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  features?: string[];
}

export interface Product {
  icon: ReactNode;
  title: string;
  description: string;
  items: string[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface ContactInfo {
  icon: ReactNode;
  title: string;
  details: string[];
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export interface NavLink {
  name: string;
  path: string;
}