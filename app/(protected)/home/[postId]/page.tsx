export default async function Page({ params }: { params: { postId: string } }) {
    const { postId } = params;
    return <div>page for post with id : {postId}</div>;
}
