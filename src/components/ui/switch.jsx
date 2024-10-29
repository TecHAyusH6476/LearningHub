/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef(({ className, switchColor, ...props }, ref) => {
  const bgColorClass = switchColor === "black" ? "bg-black" : "bg-green-500";
  return (
    <SwitchPrimitives.Root
      className={cn(
        " peer  inline-flex  h-6  w-11  shrink-0  cursor-pointer  items-center  rounded-full  border-2  border-transparent  transition-colors bg-${switchColor}-500 focus-visible: outline-none focus-visible: ring-2 focus-visible: ring-ring focus-visible: ring-offset-2 focus-visible: ring-offset-background disabled:  disabled: opacity-50 data-[state=checked]: data-[state=unchecked]:",
        className
      )}
      {...props}
      ref={ref}
    >
      {/* {switchColor} */}
      <SwitchPrimitives.Thumb
        className={cn(
          ` pointer-events-none  block  h-5  w-5  rounded-full ${bgColorClass}  shadow-lg  ring-0  transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0`
        )}
      />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
