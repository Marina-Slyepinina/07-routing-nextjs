import { fetchNotes, NotesResponse } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
    params: Promise<{slug: string[]}>;
}

export default async function Notes({params}: Props) {  
    const { slug } = await params;
    const tag = slug?.[0] ?? "";

    const initialSearch = "";
    const initialPage = 1;

    const initialData: NotesResponse = await fetchNotes(initialSearch, initialPage, tag);
    
    return <>
        <NotesClient tag={tag} initialData={initialData} initialPage={initialPage} initialSearch={initialSearch} />
    </>
}
