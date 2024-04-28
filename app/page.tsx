import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-10">
            Landing will be here.
            <div className="flex flex-col gap-y-[100px] items-center">
                <Link href={'/register'}>
                    <Button variant={'outline'}>Join Today</Button>
                </Link>
            </div>
        </main>
    );
}
