import { ChevronDown, ChevronUp, MapPin, Trash } from "lucide-react";
import React, { createContext, useContext, useMemo, useState } from "react";
import type { Coordinates } from "../types/pin";
import { formatCoordinates } from "../utils/format";

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
  color?: string;
  position: Coordinates;
  onClick?: () => void;
};

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-200 text-indigo-600 border-indigo-100",
  pink: "bg-pink-200 text-pink-600 border-pink-100",
  green: "bg-green-200 text-green-600 border-green-100",
  yellow: "bg-yellow-200 text-yellow-600 border-yellow-100",
  cyan: "bg-cyan-200 text-cyan-600 border-cyan-100",
  purple: "bg-purple-200 text-purple-600 border-purple-100",
};

export function AccordionItem({
  id,
  header,
  children,
  className,
  color,
  position,
  onClick,
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within <Accordion>.");
  const { openItems, toggleItem } = ctx;
  const isOpen = openItems.has(id);

  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <div className={className}>
      <h3 className="border-b border-gray-200" onClick={onClick}>
        <div
          id={buttonId}
          aria-controls={panelId}
          aria-expanded={isOpen}
          onClick={() => toggleItem(id)}
          className="flex w-full items-center justify-between py-3 text-left cursor-pointer"
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <span
                className={`w-12 h-12 rounded-full border-6 ${
                  color
                    ? colorMap[color]
                    : "bg-gray-500 text-gray-500 border-gray-300"
                } flex items-center justify-center font-bold`}
              >
                #{id}
              </span>
              <div className="flex flex-col">
                <span className="font-medium">{header}</span>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {formatCoordinates(position)}
                  </span>
                </div>
              </div>
            </div>
            <button
              className="px-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Delete action for item ${id}`);
              }}
            >
              <Trash size={18} className="text-red-500" />
            </button>
          </div>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
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
