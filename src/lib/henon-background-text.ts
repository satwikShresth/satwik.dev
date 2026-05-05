import {
	type LayoutLine,
	layoutWithLines,
	type PreparedTextWithSegments,
	prepareWithSegments,
} from "@chenglou/pretext";

/** Matches site body: [styles.css] Source Sans 3 — avoid system-ui for Pretext accuracy. */
export const HENON_BG_FONT = '400 14px "Source Sans 3"';

export const HENON_BG_LINE_HEIGHT_PX = 21;

/** Horizontal inset from container edges for wrapped background copy. */
export const HENON_BG_PAD_X = 24;

/**
 * Decorative background copy for the Hénon attractor layer (repeated for texture).
 * Single-line source; Pretext handles wrapping.
 */
export const HENON_BACKGROUND_TEXT = [
	"I like to code. Systems, types, maps, and small tools that stay fast.",
	"Rust, React, oRPC, Postgres, canvas, workers, and the occasional hike.",
	"Measure twice, ship once — layout without reflow where it matters.",
].join(" ");

export function createHenonBackgroundPrepared(): PreparedTextWithSegments {
	return prepareWithSegments(HENON_BACKGROUND_TEXT, HENON_BG_FONT);
}

export function layoutHenonBackgroundLines(
	prepared: PreparedTextWithSegments,
	containerWidthPx: number,
): LayoutLine[] {
	const maxWidth = Math.max(
		64,
		Math.floor(containerWidthPx - HENON_BG_PAD_X * 2),
	);
	const { lines } = layoutWithLines(
		prepared,
		maxWidth,
		HENON_BG_LINE_HEIGHT_PX,
	);
	return lines;
}
