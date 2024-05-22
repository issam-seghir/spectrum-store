import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstCharOfEveryWord(str :string) {
    return str.replace(/\b\w/g, function (char : string) {
        return char.toUpperCase();
    });
}
