'use client'

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from 'use-debounce';
import { fetchNotes, NotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.client.module.css";

interface NotesClientProps {
    initialData: NotesResponse;
    initialSearch: string;
    initialPage: number;
    tag: string
}
  
export default function NotesClient({initialData, initialSearch, initialPage, tag}: NotesClientProps) {  
    const [inputValue, setInputValue] = useState(initialSearch);
    const [page, setPage] = useState<number>(initialPage);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [debouncedValue] = useDebounce(inputValue, 300)

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);

    const { data, isSuccess } = useQuery({
        queryKey: ["notes", debouncedValue, page, tag],
        queryFn: () => fetchNotes(debouncedValue, page, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
        initialData,
    })

    const onSearch = (value: string) => {
        setInputValue(value);
        setPage(1);
    };
    
return <>
    <div className={css.app}>
        <div className={css.toolbar}>
            <SearchBox value={inputValue} onSearch={onSearch}/>
            
            {isSuccess && data.totalPages > 1 && <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />}
                
            <button className={css.button} onClick={onOpen}>Create note +</button>
        </div>
    </div>
        
    {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    
    {isOpen &&
        <Modal onClose={onClose}>
            <NoteForm onClose={onClose} />
        </Modal>}
</>
}

