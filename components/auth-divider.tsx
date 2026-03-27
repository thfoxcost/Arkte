import type React from "react";

/**
 * Renders a horizontal divider with optional centered content between two border lines.
 *
 * @param children - Content displayed centered within the divider (e.g., "or", icons). If omitted, the divider shows an uninterrupted line.
 * @returns The divider element containing left and right border lines and a centered content area.
 */
export function AuthDivider({
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className="relative flex w-full items-center" {...props}>
			<div className="w-full border-t" />
			<div className="flex w-max justify-center text-nowrap px-2 text-muted-foreground text-xs">
				{children}
			</div>
			<div className="w-full border-t" />
		</div>
	);
}
