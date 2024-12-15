"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const goTo = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => goTo("/new")}>New note</CommandItem>
          <CommandItem onSelect={() => goTo("/notes")}>List</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
