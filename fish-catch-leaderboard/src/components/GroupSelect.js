import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGroups } from "../context/GroupContext";

const GroupSelect = () => {
  const { groups, activeGroupId, setActiveGroupId } = useGroups();
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const activeGroup = useMemo(
    () => groups.find((g) => g.id === activeGroupId) || null,
    [groups, activeGroupId]
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (
        buttonRef.current?.contains(e.target) ||
        menuRef.current?.contains(e.target)
      )
        return;
      setOpen(false);
      setHighlighted(-1);
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setHighlighted(-1);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const openMenu = () => {
    setOpen(true);
    const idx = Math.max(
      0,
      groups.findIndex((g) => g.id === activeGroupId)
    );
    setHighlighted(idx);
  };

  const onTriggerKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        openMenu();
      }
    }
  };

  const onMenuKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % Math.max(1, groups.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted(
        (h) => (h - 1 + Math.max(1, groups.length)) % Math.max(1, groups.length)
      );
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlighted(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlighted(groups.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (groups[highlighted]) {
        setActiveGroupId(groups[highlighted].id);
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
  };

  const onSelect = (id) => {
    setActiveGroupId(id);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const label = activeGroup ? activeGroup.name : "Select group";
  const menuId = "group-select-menu";

  return (
    <div className="group-select-container">
      <button
        ref={buttonRef}
        type="button"
        className="group-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onTriggerKeyDown}
      >
        <span className="group-select-label" title={label}>
          {label}
        </span>
        <span className="group-select-caret" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul
          id={menuId}
          className="group-select-menu"
          role="listbox"
          ref={menuRef}
          tabIndex={-1}
          onKeyDown={onMenuKeyDown}
        >
          {groups.length === 0 && (
            <li className="group-select-empty" aria-disabled="true">
              No groups
            </li>
          )}
          {groups.map((g, idx) => (
            <li
              key={g.id}
              role="option"
              aria-selected={g.id === activeGroupId}
              className={`group-select-item ${
                idx === highlighted ? "highlighted" : ""
              } ${g.id === activeGroupId ? "active" : ""}`}
              onMouseEnter={() => setHighlighted(idx)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSelect(g.id)}
            >
              <span className="dot" />
              <span className="text" title={g.name}>
                {g.name}
              </span>
              {g.id === activeGroupId && (
                <span className="check" aria-hidden>
                  ✓
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupSelect;
