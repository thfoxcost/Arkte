import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCurrentUser } from "@/data/get-user"
import { HeaderSearch } from "@/components/header-search"
import { cn } from "@/lib/utils"

export default async function Page({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  const avatarSrc = user?.avatar || null

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 bg-background/80 px-4 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
          <HeaderSearch />
          <div className="flex items-center">
            <Avatar
              className={cn(
                "size-8 ring-2 ring-offset-2 ring-offset-background cursor-pointer transition-all",
                user?.isAdmin
                  ? "ring-blue-500/70 hover:ring-blue-500"  // admin → blue
                  : "ring-ring"                              // normal → default ring color
              )}
            >
              {avatarSrc && (
                <AvatarImage src={avatarSrc} alt={user?.name ?? "User"} />
              )}
              <AvatarFallback className="text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}