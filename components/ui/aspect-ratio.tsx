import { cn } from "@/lib/utils"

/**
 * Renders a div that enforces an aspect ratio using a CSS custom property.
 *
 * @param ratio - The numeric aspect ratio to set on the `--ratio` CSS custom property (e.g., `16/9` or `1.5`).
 * @returns A `div` element with `data-slot="aspect-ratio"`, an inline `--ratio` style, composed class names, and any forwarded `div` props.
 */
function AspectRatio({
  ratio,
  className,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": ratio,
        } as React.CSSProperties
      }
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  )
}

export { AspectRatio }
