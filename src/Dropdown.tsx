import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function Dropdown({children}){
  let [open, setOpen] = useState(false);

  return (
    <RadixDropdownMenu.Root open={open} onOpenChange={setOpen}>
      {children}
    </RadixDropdownMenu.Root>
  )
}

function DropdownButton({children}){
  return(
    <RadixDropdownMenu.Trigger className="cursor-default select-none rounded px-4 text-2xl hover:bg-gray-200/50 focus-visible:outline-none data-[state=open]:bg-gray-200/75">
      {children}
    </RadixDropdownMenu.Trigger>
  )
}

function DropdownMenu(){
  return null;
}

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;