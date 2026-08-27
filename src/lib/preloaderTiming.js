// Shared between Preloader.jsx and useHeroReady.js so the "hero may now
// animate in" signal always lines up with the door-open moment, defined in
// exactly one place.
export const BG_LEAD_MS = 1000
export const HOLD_MS = 3000
export const LINE_EXPAND_MS = 500
export const DOOR_OPEN_MS = 900
export const FINISH_FADE_MS = 300
export const DOOR_OPEN_AT = BG_LEAD_MS + HOLD_MS + LINE_EXPAND_MS
export const TOTAL_MS = DOOR_OPEN_AT + DOOR_OPEN_MS + FINISH_FADE_MS
