'use client';
import { MessageSquare, Users } from 'lucide-react';
import { useState } from 'react';

export default function CommunityPosts() {
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

    return (
        <div className="px-2">
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
            </div>
        </div>
    );
}
