import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function Dropdown({children}){
  let [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      {children}
    </DropdownMenu.Root>
  )
}

function DropdownButton({children}){
  return(
    <DropdownMenu.Trigger className="cursor-default select-none rounded px-4 text-2xl hover:bg-gray-200/50 focus-visible:outline-none data-[state=open]:bg-gray-200/75">
      {children}
    </DropdownMenu.Trigger>
  )
}

Dropdown.Button = DropdownButton;