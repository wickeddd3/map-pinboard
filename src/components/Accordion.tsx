import { ChevronDown, ChevronUp } from "lucide-react";
import React, { createContext, useContext, useMemo, useState } from "react";

type AccordionContextValue = {
  type: "single" | "multiple";
  openItems: Set<string>;
  toggleItem: (id: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export type AccordionProps = {
  children: React.ReactNode;
  /** single = only one open at a time; multiple = any number open */
  type?: "single" | "multiple";
  /** Controlled: pass open items */
  value?: string[];
  /** Controlled: notify changes */
  onValueChange?: (openIds: string[]) => void;
  /** Uncontrolled default open items */
  defaultValue?: string[];
  className?: string;
};

export function Accordion({
  children,
  type = "single",
  value,
  onValueChange,
  defaultValue = [],
  className,
}: AccordionProps) {
  const [internal, setInternal] = useState<Set<string>>(new Set(defaultValue));
  const isControlled = value !== undefined;
  const openItems = useMemo(
    () => (isControlled ? new Set(value) : internal),
    [isControlled, value, internal]
  );

  const toggleItem = (id: string) => {
    const next = new Set(openItems);
    if (type === "single") {
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.clear();
        next.add(id);
      }
    } else {
      if (next.has(id)) next.delete(id);
      else next.add(id);
    }
    if (isControlled) {
      onValueChange?.([...next]);
    } else {
      setInternal(next);
    }
  };

  return (
    <AccordionContext.Provider value={{ type, openItems, toggleItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = {
  id: string;
  /** Header button label or custom node */
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function AccordionItem({
  id,
  header,
  children,
  className,
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within <Accordion>.");
  const { openItems, toggleItem } = ctx;
  const isOpen = openItems.has(id);

  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className={className}>
      <h3 className="border-b border-gray-200">
        <button
          id={buttonId}
          aria-controls={panelId}
          aria-expanded={isOpen}
          onClick={() => toggleItem(id)}
          className="flex w-full items-center justify-between py-3 text-left cursor-pointer"
        >
          <span className="font-medium">{header}</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </h3>

      {/* Animated panel: height auto with measuring for smooth transitions */}
      <AnimatedPanel id={panelId} labelledBy={buttonId} open={isOpen}>
        <div className="py-3 text-sm text-gray-700">{children}</div>
      </AnimatedPanel>
    </div>
  );
}

type AnimatedPanelProps = {
  id: string;
  labelledBy: string;
  open: boolean;
  children: React.ReactNode;
};

function AnimatedPanel({ id, labelledBy, open, children }: AnimatedPanelProps) {
  const [height, setHeight] = React.useState<number>(0);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const content = el.firstElementChild as HTMLElement | null;
    const target = content?.offsetHeight ?? 0;

    // Animate: set to target height then to auto after transition end
    if (open) {
      setHeight(target);
      const t = setTimeout(() => setHeight(-1), 200); // match duration-200
      return () => clearTimeout(t);
    } else {
      // If currently auto (-1), measure then go down to 0 for smoother close
      const current = height === -1 ? target : height;
      setHeight(current);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open]);

  const style = height === -1 ? { height: "auto" } : { height: `${height}px` };

  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      className="overflow-hidden transition-[height] duration-200 ease-in-out"
      style={style}
      ref={ref}
    >
      <div>{children}</div>
    </div>
  );
}
