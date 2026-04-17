"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon } from "lucide-react";
import { GrupoCarMark } from "@/components/brand-marks";

const BRAND_LOGO_SRC: Record<"ford" | "mazda" | "volvo", string> = {
  ford: "/logos/ford_logo_icon_169155.png",
  mazda: "/logos/Mazda_logo.png",
  volvo: "/logos/Volvo-Logo-1930.png",
};
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BrandTone = "ford" | "mazda" | "volvo";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  href?: string;
  brand?: BrandTone;
}

const BRAND_TONE: Record<
  BrandTone,
  {
    ring: string;
    bg: string;
    text: string;
    glow: string;
    pulseRgba: string;
    label: string;
    badge: string;
  }
> = {
  ford: {
    ring: "border-navy-400/70",
    bg: "bg-gradient-to-br from-navy-700 to-navy-950",
    text: "text-white",
    glow: "shadow-[0_0_24px_rgba(59,90,135,0.55)]",
    pulseRgba: "rgba(90,130,190,0.35)",
    label: "text-navy-200",
    badge: "border-navy-400/70 bg-navy-800 text-white",
  },
  mazda: {
    ring: "border-wine-400/80",
    bg: "bg-gradient-to-br from-wine-600 to-wine-900",
    text: "text-white",
    glow: "shadow-[0_0_24px_rgba(169,69,80,0.55)]",
    pulseRgba: "rgba(201,104,120,0.4)",
    label: "text-wine-200",
    badge: "border-wine-400/70 bg-wine-700 text-white",
  },
  volvo: {
    ring: "border-graphite-200/80",
    bg: "bg-gradient-to-br from-graphite-200 to-graphite-500",
    text: "text-navy-950",
    glow: "shadow-[0_0_24px_rgba(203,208,216,0.5)]",
    pulseRgba: "rgba(203,208,216,0.45)",
    label: "text-graphite-100",
    badge: "border-graphite-300 bg-graphite-200 text-navy-950",
  },
};

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval> | undefined;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.25) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }
    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = isMobile ? 135 : 220;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.45,
      Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2)),
    );
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-wine-700 border-wine-400/70";
      case "in-progress":
        return "text-navy-950 bg-graphite-100 border-graphite-300";
      case "pending":
        return "text-white bg-navy-900/70 border-white/40";
      default:
        return "text-white bg-navy-900/70 border-white/40";
    }
  };

  return (
    <div
      className="relative flex h-[460px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-petrol-900 via-petrol-950 to-navy-950 sm:h-[640px]"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="absolute inset-0 bg-lux-grid-fine opacity-40" />

      <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          <div className="absolute z-10 flex h-14 w-14 animate-orbital-pulse items-center justify-center rounded-full bg-gradient-to-br from-gold-500 via-wine-700 to-navy-800 shadow-lg shadow-gold-500/30 sm:h-20 sm:w-20">
            <div className="absolute h-[72px] w-[72px] animate-orbital-ping rounded-full border border-gold-300/30 opacity-70 sm:h-24 sm:w-24" />
            <div
              className="absolute h-[88px] w-[88px] animate-orbital-ping rounded-full border border-gold-300/20 opacity-50 sm:h-28 sm:w-28"
              style={{ animationDelay: "0.5s" }}
            />
            <GrupoCarMark className="relative h-7 w-7 rounded-full bg-white p-0.5 drop-shadow sm:h-10 sm:w-10" />
          </div>

          <div className="absolute h-[270px] w-[270px] rounded-full border border-white/10 sm:h-[440px] sm:w-[440px]" />
          <div className="absolute h-[180px] w-[180px] rounded-full border border-white/5 sm:h-[300px] sm:w-[300px]" />

          {mounted && timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;
            const tone = item.brand ? BRAND_TONE[item.brand] : null;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            const pulseColor = tone?.pulseRgba ?? "rgba(201,104,120,0.25)";

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute -inset-1 rounded-full ${
                    isPulsing ? "animate-orbital-pulse" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${pulseColor} 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                <div
                  className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 bg-white transition-all duration-300 sm:h-11 sm:w-11 ${
                    isExpanded
                      ? `scale-150 border-white ${tone?.glow ?? "shadow-lg shadow-white/20"}`
                      : isRelated
                        ? `animate-orbital-pulse border-white`
                        : tone
                          ? `${tone.ring}`
                          : "border-white/40"
                  }`}
                >
                  {item.brand ? (
                    <img
                      src={BRAND_LOGO_SRC[item.brand]}
                      alt={item.brand}
                      className="h-5 w-5 object-contain sm:h-7 sm:w-7"
                    />
                  ) : (
                    <Icon size={16} className="text-navy-950" />
                  )}
                </div>

                <div
                  className={`absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:top-14 sm:text-[11px] sm:tracking-[0.2em] ${
                    isExpanded
                      ? `scale-110 ${tone?.label ?? "text-white"}`
                      : tone
                        ? `${tone.label} opacity-85`
                        : "text-white/70"
                  }`}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute left-1/2 top-20 w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 overflow-visible border-white/20 bg-navy-950/90 shadow-xl shadow-black/40 backdrop-blur-lg sm:top-24 sm:w-72">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          className={`border px-2 text-[10px] uppercase tracking-[0.15em] ${
                            tone?.badge ?? getStatusStyles(item.status)
                          }`}
                        >
                          {item.category}
                        </Badge>
                        <span className="font-mono text-[10px] text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="mt-3 font-display text-lg text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/75">
                      <p className="leading-relaxed">{item.content}</p>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <div className="mb-2 flex items-center">
                            <LinkIcon size={10} className="mr-1 text-white/70" />
                            <h4 className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                              Otras Agencias
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId,
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex h-6 items-center rounded-none border-white/20 bg-transparent px-2 py-0 text-[10px] text-white/80 transition-all hover:bg-white/10 hover:text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 flex items-center justify-between rounded-md border border-white/20 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.15em] text-white transition hover:border-wine-400 hover:bg-wine-700/20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visitar agencia
                          <ArrowRight size={12} />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
