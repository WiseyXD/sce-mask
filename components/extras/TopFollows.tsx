import { UserTwitterCard } from '@/components/UserTwitterCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TopFollows() {
    // get all top follows

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

                    {/* Map all top follows */}
                    <UserTwitterCard
                        username={'username'}
                        userId={'null'}
                        logoutButton={false}
                        userDescription="null"
                        image="null"
                        followerCount={0}
                        followingCount={0}
                        showCount={true}
                        showDescription={true}
                    />
                    <UserTwitterCard
                        username={'username'}
                        userId={'null'}
                        logoutButton={false}
                        userDescription="null"
                        image="null"
                        followerCount={0}
                        followingCount={0}
                        showCount={true}
                        showDescription={true}
                    />

                    <UserTwitterCard
                        username={'username'}
                        userId={'null'}
                        logoutButton={false}
                        userDescription="null"
                        image="null"
                        followerCount={0}
                        followingCount={0}
                        showCount={true}
                        showDescription={true}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
