import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const imageLink =
    'https://pbs.twimg.com/profile_images/1772122423510327296/6fpvWkS8_400x400.jpg';
