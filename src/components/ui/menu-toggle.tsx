"use client";

import React from "react";

interface MenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function MenuToggle({ isOpen, onClick, className }: MenuToggleProps) {
  return (
    <button
      className={`menu-toggle ${isOpen ? "menu-toggle-open" : ""} ${
        className || ""
      }`}
      onClick={onClick}
      aria-label="Toggle navigation"
      aria-expanded={isOpen}
    >
      <span className="menu-toggle-line menu-toggle-line-top" />
      <span className="menu-toggle-line menu-toggle-line-middle" />
      <span className="menu-toggle-line menu-toggle-line-bottom" />
    </button>
  );
}
