import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, easeOut, motion, useAnimationControls } from "framer-motion";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

let DropdownContext = createContext({open: false});

export default function Dropdown({children}: {children: ReactNode}){
  let [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{open}}>
    <RadixDropdownMenu.Root open={open} onOpenChange={setOpen}>
      {children}
    </RadixDropdownMenu.Root>
    </DropdownContext.Provider>
  )
}

function DropdownButton({children}: {children: ReactNode}){
  return(
    <RadixDropdownMenu.Trigger className="cursor-default select-none rounded px-4 text-2xl hover:bg-gray-200/50 focus-visible:outline-none data-[state=open]:bg-gray-200/75">
      {children}
    </RadixDropdownMenu.Trigger>
  )
}

function DropdownMenu({children}: {children: ReactNode}){
  let {open} = useContext(DropdownContext);
  let controls = useAnimationControls();

  useEffect(()=>{
      if(open){
        controls.start("open")
      }
    },[controls, open]);

  return (
    <AnimatePresence>
      {open && (
        <RadixDropdownMenu.Portal forceMount>
          <RadixDropdownMenu.Content
            align="start"
            className="mt-1 overflow-hidden rounded bg-white/75 p-2 text-left shadow backdrop-blur"
            asChild
          >
            <motion.div 
              initial={"closed"} 
              animate={controls}
              exit={"closed"}
              variants={{
                open: {
                  opacity: 1, 
                  transition: {ease: "easeOut", duration: 0.1}
                },
                closed: {
                  opacity: 0 , 
                  transition: {ease: "easeIn", duration: 0.2}
                }
              }}
            >
              {children}
            </motion.div>
          </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
       )} 
    </AnimatePresence>
  );
}

function DropdownMenuItem({
  children,
  onSelect = () => {},
  closeMenu,
}: {
  children: ReactNode;
  onSelect?: () => void;
  closeMenu: () => void;
}) {
  let controls = useAnimationControls()
  return (
    <RadixDropdownMenu.Item
      onSelect={async(e)=>{
        e.preventDefault();

        await controls.start({
          backgroundColor: "#fff",
          color: "#000",
          transition: {duration: 0.04}
        })
        await controls.start({
          backgroundColor: "#38bdf8",
          color: "#fff",
          transition: {duration: 0.04}
        });
        await sleep(0.075);

        await closeMenu();
        onSelect();
      }}
      className="w-40 select-none rounded px-2 py-1.5 text-gray-700 data-[highlighted]:bg-sky-400 data-[highlighted]:text-white data-[highlighted]:focus:outline-none"
      asChild
    >
      <motion.div animate={controls}>{children}</motion.div>
    </RadixDropdownMenu.Item>
  );
}

const sleep = (s: number)=>
  new Promise ((resolve) => setTimeout(resolve, s*1000));

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.MenuItem = DropdownMenuItem;