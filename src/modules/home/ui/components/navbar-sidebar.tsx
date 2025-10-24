"use client";
import useTRPCSession from "@/app/hooks/use-trpc-session";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import React from "react";

interface INavbarItem {
  href: string;
  name: React.ReactNode;
}

interface Props {
  items: INavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NavbarSidebar = ({ items, onOpenChange, open }: Props) => {
  const { session } = useTRPCSession();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2 ">
          <div className="p-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium "
                onClick={() => onOpenChange(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t">
              {session.data?.user ? (
                <Link
                  href="/admin"
                  className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium "
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium "
                  >
                    Log in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium "
                  >
                    Start selling
                  </Link>
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSidebar;
