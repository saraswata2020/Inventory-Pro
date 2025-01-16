"use client" // Ensures this file is used in a client-side context

import { usePathname } from "next/navigation"
import { Slash } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

export function AppHeader() {
  const pathname = usePathname()
  const pathnames = pathname.split("/").filter((x) => x)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">DASHBOARD</BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((name, index) => {
          const href = "/" + pathnames.slice(0, index + 1).join("/")
          const isLast = index === pathnames.length - 1
          const capitalizedName = name.toUpperCase() // Capitalizing each route part

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{capitalizedName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{capitalizedName}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
