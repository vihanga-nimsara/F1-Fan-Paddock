"use client";

import { Select } from "@base-ui/react/select";
import { Tabs } from "@base-ui/react/tabs";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { Separator } from "@base-ui/react/separator";
import { Tooltip } from "@base-ui/react/tooltip";
import { StandingsTable, type StandingRow } from "@/components/f1kit";

const SEASONS = [
  { label: "2026", value: "2026" },
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
];

function CaretIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M11 10H5l3 3.5zm0-4H5l3-3.5z" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}

function InfoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM7.25 5a.75.75 0 0 1 1.5 0v.5a.75.75 0 0 1-1.5 0V5Zm.25 3a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 7.5 8Z" />
    </svg>
  );
}

export default function StandingsTabs({
  driverRows,
  conRows,
}: {
  driverRows: StandingRow[];
  conRows: StandingRow[];
}) {
  return (
    <Tooltip.Provider>
      <div className="flex flex-col gap-6 rounded-[2px] border border-pebble-10 bg-carbon-deep p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
              <h2 className="m-0 font-headline text-[clamp(20px,2.4vw,30px)] font-semibold uppercase leading-[0.95] tracking-[0.02em] text-pebble">
              Season Standings
            </h2>
            <Tooltip.Root>
              <Tooltip.Trigger
                aria-label="About standings"
                className="flex size-6 items-center justify-center rounded-full text-pebble-80 transition-colors hover:bg-f1red-15 hover:text-f1red focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-f1red data-popup-open:bg-f1red-15 data-popup-open:text-f1red"
              >
                <InfoIcon aria-hidden="true" />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner sideOffset={8}>
                  <Tooltip.Popup className="max-w-[220px] rounded-[2px] border border-pebble-20 bg-carbon-deep px-3 py-2 text-[11px] leading-snug text-pebble-80 shadow-[0_12px_30px_rgb(0_0_0/0.5)]">
                    <Tooltip.Arrow className="relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=top]:bottom-[-6px] before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:border before:border-pebble-20 before:bg-carbon-deep" />
                    Championship points update after every session.
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>

          <Select.Root items={SEASONS} defaultValue="2026">
            <Select.Trigger className="flex h-9 min-w-32 items-center justify-between gap-3 rounded-[2px] border border-pebble-20 bg-carbon px-3 text-sm leading-none text-pebble select-none hover:bg-pebble-5 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-f1red data-pressed:bg-pebble-5">
              <Select.Value
                className="data-placeholder:text-pebble-50"
                placeholder="Season"
              />
              <Select.Icon className="text-pebble-50">
                <CaretIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner className="z-50 outline-hidden" sideOffset={4}>
                <Select.Popup className="min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-[2px] border border-pebble-20 bg-carbon-deep bg-clip-padding text-pebble outline-hidden shadow-[0_12px_30px_rgb(0_0_0/0.5)] transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
                  <Select.List className="relative max-h-[var(--available-height)] overflow-y-auto py-1">
                    {SEASONS.map(({ label, value }) => (
                      <Select.Item
                        key={value}
                        value={value}
                        className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 py-1.5 pr-4 pl-2.5 text-sm outline-hidden select-none data-highlighted:bg-f1red-15 data-highlighted:text-f1red"
                      >
                        <Select.ItemIndicator className="col-start-1">
                          <CheckIcon />
                        </Select.ItemIndicator>
                        <Select.ItemText className="col-start-2">
                          {label}
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>

        <Separator className="h-px w-full bg-pebble-10" />

        <Tabs.Root defaultValue="drivers">
          <Tabs.List className="relative -mb-px flex gap-1 border-b border-pebble-15">
            <Tabs.Tab
              value="drivers"
              className="flex h-[calc(2.25rem+1px)] items-center justify-center border-b-2 border-transparent px-4 font-display text-sm font-semibold tracking-[0.06em] text-pebble-80 outline-none select-none transition-colors hover:text-pebble focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-f1red data-active:border-f1red data-active:text-pebble"
            >
              Drivers
            </Tabs.Tab>
            <Tabs.Tab
              value="constructors"
              className="flex h-[calc(2.25rem+1px)] items-center justify-center border-b-2 border-transparent px-4 font-display text-sm font-semibold tracking-[0.06em] text-pebble-80 outline-none select-none transition-colors hover:text-pebble focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-f1red data-active:border-f1red data-active:text-pebble"
            >
              Constructors
            </Tabs.Tab>
            <Tabs.Indicator className="absolute top-0 left-0 -z-1 h-full w-(--active-tab-width) translate-x-(--active-tab-left) border-x border-t border-f1red/40 bg-f1red-15 transition-[translate,width] duration-150 ease-in-out" />
          </Tabs.List>

          <div className="mt-4 grid w-full">
            <Tabs.Panel value="drivers" className="col-start-1 row-start-1 focus-visible:outline-none data-[hidden]:hidden">
              <ScrollArea.Root className="h-[420px] w-full rounded-[2px] border border-pebble-10 bg-carbon">
                <ScrollArea.Viewport className="h-full rounded-[2px] focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-f1red">
                  <ScrollArea.Content className="py-2 pr-3 pl-2">
                    <StandingsTable rows={driverRows} />
                  </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="m-px flex w-2 justify-center bg-pebble-10 opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:pointer-events-auto data-scrolling:pointer-events-auto">
                  <ScrollArea.Thumb className="w-full rounded-full bg-pebble-40" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </Tabs.Panel>

            <Tabs.Panel value="constructors" className="col-start-1 row-start-1 focus-visible:outline-none data-[hidden]:hidden">
              <ScrollArea.Root className="h-[420px] w-full rounded-[2px] border border-pebble-10 bg-carbon">
                <ScrollArea.Viewport className="h-full rounded-[2px] focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-f1red">
                  <ScrollArea.Content className="py-2 pr-3 pl-2">
                    <StandingsTable rows={conRows} />
                  </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="m-px flex w-2 justify-center bg-pebble-10 opacity-0 transition-opacity data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:pointer-events-auto data-scrolling:pointer-events-auto">
                  <ScrollArea.Thumb className="w-full rounded-full bg-pebble-40" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </Tabs.Panel>
          </div>
        </Tabs.Root>
      </div>
    </Tooltip.Provider>
  );
}
