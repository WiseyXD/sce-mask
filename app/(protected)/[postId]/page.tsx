import { getPostbyId } from '@/actions/posts';

export default async function Page({ params }: { params: { postId: string } }) {
    const { postId } = params;
    const data = await getPostbyId(postId);
    console.log(data.msg);
    return (
        <div className="min-h-screen w-full">
            <p>{postId}</p>
        </div>
    );
}
