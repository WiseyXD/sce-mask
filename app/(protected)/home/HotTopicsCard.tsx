import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { imageLink } from '@/lib/utils';
import Image from 'next/image';

export default function HotTopicsCard() {
    // get all trending topics
    return (
        <Card className="overflow-hidden">
            <CardHeader className="">
                <CardTitle>Hot Topics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-y-3">
                    {/* map them here */}
                    <div className="flex items-start justify-start gap-x-3">
                        <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="70"
                            src={imageLink}
                            width="70"
                        />
                        <div className="flex flex-col">
                            <div className="flex gap-x-2">
                                <p className="text-muted text-sm">
                                    Entertainment
                                </p>
                                <p className="text-muted text-sm">Trending</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">Ronaldo</p>
                            </div>
                            <div>
                                <p className="text-muted text-sm">272K Posts</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex gap-x-2">
                            <p className="text-muted text-sm">Entertainment</p>
                            <p className="text-muted text-sm">Trending</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">Ronaldo</p>
                        </div>
                        <div>
                            <p className="text-muted text-sm">272K Posts</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
