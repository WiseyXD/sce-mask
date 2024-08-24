'use client';
import { createCommunity } from '@/actions/community';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { communitySchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from './ui/use-toast';

export default function CreateCommunityForm({ userId }: { userId: string }) {
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const form = useForm<z.infer<typeof communitySchema>>({
        resolver: zodResolver(communitySchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof communitySchema>) => {
        try {
            console.log('submitted');
            const resp = await createCommunity(values.name, values.description);
            if (!resp.success) {
                toast({
                    title: `${resp.msg}`,
                    variant: 'destructive',
                });
            }
            toast({
                title: `${resp.msg}`,
            });
            console.log(resp);
            form.reset();
        } catch (error) {
            console.log(error);
            toast({
                title: `error while creating an community from client side.`,
                variant: 'destructive',
            });
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <PlusCircle className="mr-2 h-6 w-6" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Community</DialogTitle>
                    <DialogDescription>
                        Start a new community for like-minded individuals
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name of the community
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="shadcn"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your name of community.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Description of the community
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Describe your community.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Create Community
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
