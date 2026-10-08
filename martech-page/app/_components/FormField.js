"use client";

import { useEffect, useId, useRef, useState } from "react";
import { asset } from "../_lib/base";

/*
 * The contact form's field, in the three states the design specifies: at rest,
 * focused, and in error. Input and select sit in a 50px pill, the textarea in a
 * 160px rounded box; error swaps the white ground for a pale red one and adds a
 * line under the field.
 */

const SHELL =
  "w-full border-solid px-[20px] text-[15px] text-ink transition-shadow outline-none placeholder:text-faint";
const REST = "border border-line-strong bg-white";
const ERRORED = "border-2 border-error bg-error-tint px-[19px]";

// Focus and error both thicken the border to 2px, so they take a pixel back off
// the padding and the text does not shift as the state changes.
const ON_FOCUS =
  "focus:border-2 focus:border-brand focus:px-[19px] focus:shadow-[0_0_0_4px_rgba(112,77,227,0.14)]";

function shell(invalid) {
  return `${SHELL} ${invalid ? ERRORED : `${REST} ${ON_FOCUS}`}`;
}

function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-start gap-[4px] text-[13px] font-medium whitespace-nowrap text-ink"
    >
      {children}
      {required ? <span className="text-brand">*</span> : null}
    </label>
  );
}

function ErrorMessage({ id, children }) {
  return (
    <p id={id} className="flex items-center gap-[7px] pl-[4px] text-[13px] text-error">
      <img src={asset("/figma/icon-error.svg")} alt="" width={14} height={14} className="shrink-0" />
      {children}
    </p>
  );
}

/** A single-line field, or a textarea when `rows` is given. */
export function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  rows,
  value,
  onChange,
  error,
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const Tag = rows ? "textarea" : "input";

  return (
    <div className="flex w-full flex-col gap-[8px]">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>

      <Tag
        id={id}
        name={name}
        rows={rows}
        type={rows ? undefined : type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${shell(error)} ${
          rows
            ? "h-[160px] resize-none rounded-[24px] py-[16px] leading-[1.8]"
            : "h-[50px] rounded-[50px]"
        }`}
      />

      {error ? <ErrorMessage id={errorId}>{error}</ErrorMessage> : null}
    </div>
  );
}

/**
 * The 詢問主題 picker. Built rather than a native <select> because the design
 * gives the open menu its own card, rounded rows and a marked current choice,
 * none of which a native dropdown will take. That means the keyboard has to be
 * put back by hand: up and down move, Enter and Space choose, Escape closes.
 */
export function SelectField({
  label,
  name,
  placeholder,
  options,
  required = false,
  value,
  onChange,
  error,
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const listId = `${id}-list`;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);

  // Clicking away or tabbing out closes it, the same as a native picker.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };
    const onFocus = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  const choose = (option) => {
    onChange(option);
    setOpen(false);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") return setOpen(false);

    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        setActive(Math.max(0, options.indexOf(value)));
        setOpen(true);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(options[active]);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative flex w-full flex-col gap-[8px]">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>

      <input type="hidden" name={name} value={value ?? ""} />

      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onClick={() => {
          setActive(Math.max(0, options.indexOf(value)));
          setOpen((o) => !o);
        }}
        onKeyDown={onKeyDown}
        className={`${shell(error)} flex h-[50px] items-center justify-between rounded-[50px] text-left ${
          // While the menu is open the trigger keeps the focused look even if
          // the pointer has moved on to an option.
          !error && open
            ? "border-2 border-brand px-[19px] shadow-[0_0_0_4px_rgba(112,77,227,0.14)]"
            : ""
        }`}
      >
        <span className={value ? "text-ink" : "text-faint"}>
          {value ?? placeholder}
        </span>
        <img
          src={asset("/figma/icon-chevron-down.svg")}
          alt=""
          width={18}
          height={18}
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-full right-0 left-0 z-20 mt-[8px] flex flex-col gap-[2px] rounded-[24px] border border-solid border-line bg-white p-[8px] shadow-card"
        >
          {options.map((option, i) => {
            const chosen = option === value;
            return (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={chosen}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(option)}
                  className={`flex h-[44px] w-full items-center rounded-[16px] px-[16px] text-left text-[15px] transition-colors ${
                    chosen
                      ? "bg-brand/8 font-medium text-brand-deep"
                      : i === active
                        ? "bg-canvas text-ink"
                        : "text-ink"
                  }`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {error ? <ErrorMessage id={errorId}>{error}</ErrorMessage> : null}
    </div>
  );
}
