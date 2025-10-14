import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

export function truncateString(str: string, maxLength: number = 50) {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}