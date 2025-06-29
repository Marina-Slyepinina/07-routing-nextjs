'use client'
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps {
    children: React.ReactNode,
    onClose: () => void,
}

export default function Modal({ children, onClose }: ModalProps) {

    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    
    useEffect(() => {
        const onEscape = (e: KeyboardEvent) => {
        if (e.code === "Escape") {
            onClose();
        }
        };
        document.addEventListener("keydown", onEscape);

        return () => {
        document.removeEventListener("keydown", onEscape);
        };
    }, [onClose]);

return createPortal(    
    <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackdrop}
        >
        <div className={css.modal}>
            {children}
            <button onClick={onClose}>Close</button>
        </div>
    </div>,
    document.body
    )
}