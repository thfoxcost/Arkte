import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders the root Card container with responsive sizing and slot attributes.
 *
 * @param className - Additional CSS classes appended to the component's default class list
 * @param size - Visual size variant; `"default"` applies standard spacing and typography, `"sm"` reduces gaps and padding
 * @param props - Additional HTML `div` props spread onto the root element
 * @returns The root `<div>` element for the Card with `data-slot="card"` and `data-size` set to `size`
 */
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card header region with a responsive grid layout and spacing.
 *
 * The rendered element has `data-slot="card-header"`, merges the component's
 * internal layout classes with any provided `className`, and forwards all other
 * `div` props to the root element.
 *
 * @param className - Additional CSS classes to merge with the header's default classes
 * @returns A `div` element that serves as the card header container
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card title container.
 *
 * Applies title typography and spacing, sets `data-slot="card-title"`, and adjusts text size when the parent card is marked as small (`data-size="sm"`).
 *
 * @returns A `div` element containing the card title with appropriate styling and `data-slot` attribute.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card's description text container with muted small-text styling.
 *
 * @returns A `div` element with `data-slot="card-description"` and the applied classes.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * Renders the card action area positioned in the header grid and aligned to the end.
 *
 * @returns A `div` element with `data-slot="card-action"` positioned at the end of the header grid; merges the provided `className` and spreads remaining `div` props onto the element.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card's content area.
 *
 * The element uses `data-slot="card-content"`, applies horizontal padding that adjusts when the card `size` is `"sm"`, merges any `className` provided, and forwards remaining `div` props onto the element.
 *
 * @returns The rendered `div` element for the card's content with `data-slot="card-content"`.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

/**
 * Renders the card footer region.
 *
 * @returns The rendered footer `div` element with `data-slot="card-footer"`, a top border, muted background, rounded bottom corners, and responsive padding.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
