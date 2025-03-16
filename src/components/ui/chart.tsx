
import * as React from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

export interface ChartConfig {
  positive?: {
    color: string;
  };
  negative?: {
    color: string;
  };
  revenue?: {
    color: string;
  };
  profit?: {
    color: string;
  };
  expenses?: {
    color: string;
  };
  employees?: {
    color: string;
  };
  [key: string]: { color: string } | undefined;
}

const ChartContext = React.createContext<{
  config: ChartConfig;
} | null>(null);

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  config: ChartConfig;
  children: React.ReactElement;
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn("h-full w-full", className)}
        {...props}
      >
        <ChartStyle />
        {children}
      </div>
    </ChartContext.Provider>
  );
}

export function ChartTooltip({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ChartContainer config={{}}>
      <div
        className={cn(
          "rounded-lg border bg-background p-2 shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ChartContainer>
  );
}

export function ChartTooltipContent(props: any) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-md border bg-background p-3 shadow-md">
      <div className="mb-2 font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="mr-1 h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartLegend({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ChartContainer config={{}}>
      <div
        className={cn("flex flex-wrap items-center gap-4 text-sm", className)}
        {...props}
      />
    </ChartContainer>
  );
}

export function ChartLegendContent(props: any) {
  const { payload } = props;
  if (!payload?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 text-xs">
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center">
          <div
            className="mr-1 h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function ChartStyle() {
  const id = useId();
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("ChartStyle must be used within a ChartContainer");
  }

  const { config } = context;
  
  const cssVars = Object.entries(config)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `--color-${key}: ${value?.color};`)
    .join(" ");

  return (
    <style id={`chart-style-${id}`}>
      {`
        #${id} {
          ${cssVars}
        }
      `}
    </style>
  );
}
