'use client';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

type TSearchProps = {
    setFunction: (filteredItems: any[]) => void;
    oldItem: any[];
};

export default function Search({ setFunction, oldItem }: TSearchProps) {
    const [text, setText] = useState('');

    useEffect(() => {
        if (text == '') {
            return;
        }
        const filteredList = oldItem?.filter((bookmark: any) =>
            bookmark.post.text.toLowerCase().includes(text.toLowerCase())
        );
        setFunction(filteredList);

        return () => {
            setFunction(oldItem);
        };
    }, [text, setFunction, oldItem]);

    return (
        <div className="">
            <Input
                placeholder={'Search...'}
                className="rounded-full px-8"
                onChange={(e: any) => setText(e.target.value)}
            />
        </div>
    );
}
