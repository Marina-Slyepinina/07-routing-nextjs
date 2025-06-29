// import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
// import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import NotePreview from "@/components/NotePreview/NotePreview";

type Props = {
    params: Promise<{ id: string }>;
};
 
const NotePreviewDetails = async ({ params }: Props) => {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview/>
        </HydrationBoundary>
    );
};

export default NotePreviewDetails;
