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

interface IFormatTimeProps {
  time: string;
  options?: Intl.DateTimeFormatOptions;
}
export function formatTime({ time, options }: IFormatTimeProps) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }

  return new Date(time).toLocaleTimeString('en-US', {
    ...defaultOptions,
    ...options,
  })
}