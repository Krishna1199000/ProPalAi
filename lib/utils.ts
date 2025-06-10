import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validatePassword(password: string): { isValid: boolean; message?: string; score: number } {
  let score = 0;
  const messages: string[] = [];

  if (password.length >= 8) {
    score += 20;
  } else {
    messages.push('Password must be at least 8 characters long');
  }

  if (/[A-Z]/.test(password)) {
    score += 20;
  } else {
    messages.push('Password must contain at least one uppercase letter');
  }

  if (/[a-z]/.test(password)) {
    score += 20;
  } else {
    messages.push('Password must contain at least one lowercase letter');
  }

  if (/[0-9]/.test(password)) {
    score += 20;
  } else {
    messages.push('Password must contain at least one number');
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 20;
  } else {
    messages.push('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)');
  }

  return {
    isValid: messages.length === 0,
    message: messages.length > 0 ? messages[0] : undefined,
    score: score,
  };
} 