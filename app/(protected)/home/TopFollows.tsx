import { UserTwitterCard } from '@/components/UserTwitterCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TopFollows() {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="">
                <CardTitle>Who to follow</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center">
                    {/* <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src={imageLink}
                        width="300"
                    /> */}
                    <UserTwitterCard username={'username'} />
                    <UserTwitterCard username={'username'} />

                    <UserTwitterCard username={'username'} />
                </div>
            </CardContent>
        </Card>
    );
}
