'use client';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users } from 'lucide-react';
import { useState } from 'react';

export default function CommunityBody() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [communities, setCommunities] = useState([
        {
            id: 1,
            name: 'React Developers',
            description: 'A community for React enthusiasts',
        },
        {
            id: 2,
            name: 'UI/UX Designers',
            description: 'Share and discuss UI/UX design ideas',
        },
    ]);

    const [posts] = useState([
        {
            id: 1,
            communityId: 1,
            title: 'New React 18 features',
            content: "Let's discuss the new features in React 18...",
        },
        {
            id: 2,
            communityId: 2,
            title: 'Designing for accessibility',
            content: 'Tips for making your designs more accessible...',
        },
    ]);

    const [discoveredCommunities] = useState([
        {
            id: 3,
            name: 'Python Coders',
            description: 'For Python programming discussions',
        },
        {
            id: 4,
            name: 'Data Science Hub',
            description: 'Explore the world of data science',
        },
    ]);

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">
                        Posts from Your Communities
                    </h2>

                    <div className="space-y-6">
                        {posts.map((post) => {
                            const community = communities.find(
                                (c) => c.id === post.communityId
                            );
                            return (
                                <div
                                    key={post.id}
                                    className="bg-card rounded-lg p-4 shadow-sm"
                                >
                                    <h3 className="font-semibold text-lg mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-3">
                                        {post.content}
                                    </p>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Users className="h-4 w-4 mr-1" />
                                        <span className="mr-4">
                                            {community?.name}
                                        </span>
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        <span>12 comments</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">
                        Discover Communities
                    </h2>
                    <div className="space-y-4">
                        {discoveredCommunities.map((community) => (
                            <div
                                key={community.id}
                                className="flex items-center space-x-4 bg-card rounded-lg p-4 shadow-sm"
                            >
                                <Users className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">
                                        {community.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {community.description}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Join
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
