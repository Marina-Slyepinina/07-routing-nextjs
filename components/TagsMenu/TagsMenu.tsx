"use client"

import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState } from "react";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];


const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

return <div className={css.menuContainer}>
  <button onClick={() => setIsOpen(true)} className={css.menuButton}>
    Notes ▾
  </button>
  {isOpen && <ul className={css.menuList}>
    <li onClick={onClose} className={css.menuItem}>
      <Link href="/notes/filter/all" className={css.menuLink}>
        All notes
      </Link>
    </li>
    {tags.map((tag) => (
      <li onClick={onClose} key={tag} className={css.menuItem}>
        <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
          {tag}
        </Link>
      </li>
    ))}
  </ul>}
</div>
}

export default TagsMenu;
