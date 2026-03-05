"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";

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
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
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
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.2) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
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
    const radius = window.innerWidth < 768 ? 140 : window.innerWidth < 1024 ? 180 : 220;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.7,
      Math.min(1, 0.7 + 0.3 * ((1 + Math.sin(radian)) / 2))
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


  return (
    <div
      className="w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex flex-col items-center justify-center bg-transparent overflow-hidden py-12 md:py-16"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-6xl h-full flex items-center justify-center px-4">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
          }}
        >
          {/* Center Content */}
          <div className="absolute z-20 flex flex-col items-center justify-center text-center">
            <h3
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2"
              style={{
                color: document.documentElement.classList.contains('dark')
                  ? '#e5e7eb'
                  : '#0f172a',
              }}
            >
              How We Work
            </h3>
            <p
              className="text-base md:text-lg lg:text-xl max-w-[280px] md:max-w-[320px]"
              style={{
                color: document.documentElement.classList.contains('dark')
                  ? '#9ca3af'
                  : '#0f172a',
              }}
            >
              7-Step Process
            </p>
          </div>

          {/* Orbit Ring - Matching Icon Positions */}
          <div 
            className="absolute rounded-full"
            style={{
              width: windowWidth < 768 ? '280px' : windowWidth < 1024 ? '360px' : '440px',
              height: windowWidth < 768 ? '280px' : windowWidth < 1024 ? '360px' : '440px',
              border: '2px solid',
              borderColor: document.documentElement.classList.contains('dark') 
                ? 'rgba(156, 163, 175, 0.6)' 
                : 'rgba(15, 23, 42, 0.4)',
              boxShadow: document.documentElement.classList.contains('dark')
                ? '0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                : 'none',
              opacity: 0.8,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1
            }}
          ></div>
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Pulse Effect */}
                {isPulsing && (
                  <div
                    className="absolute rounded-full -inset-4 animate-pulse"
                    style={{
                      background: `radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, rgba(249, 115, 22, 0) 70%)`,
                    }}
                  ></div>
                )}

                {/* Node - Larger Background, Same Icon Size */}
                <div
                  className="rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    width: isExpanded 
                      ? (windowWidth < 768 ? '88px' : windowWidth < 1024 ? '104px' : '120px')
                      : (windowWidth < 768 ? '72px' : windowWidth < 1024 ? '88px' : '104px'),
                    height: isExpanded 
                      ? (windowWidth < 768 ? '88px' : windowWidth < 1024 ? '104px' : '120px')
                      : (windowWidth < 768 ? '72px' : windowWidth < 1024 ? '88px' : '104px'),
                    backgroundColor: isExpanded 
                      ? '#f97316' 
                      : isRelated 
                      ? 'rgba(249, 115, 22, 0.2)' 
                      : (document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff'),
                    color: isExpanded 
                      ? '#ffffff' 
                      : isRelated 
                      ? '#f97316' 
                      : (document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#0f172a'),
                    border: isExpanded ? 'none' : isRelated ? '3px solid #f97316' : (document.documentElement.classList.contains('dark') ? '3px solid #4b5563' : '3px solid #0f172a'),
                    boxShadow: isExpanded 
                      ? '0 20px 25px -5px rgba(249, 115, 22, 0.4)' 
                      : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <Icon size={24} strokeWidth={2.5} />
                </div>

                {/* Title - Larger and More Visible */}
                <div
                  className={`
                  absolute top-20 md:top-24 lg:top-28 whitespace-nowrap text-center
                  text-sm md:text-base lg:text-lg font-bold tracking-wide
                  transition-all duration-300
                  ${isExpanded ? "text-[#f97316] scale-110" : "text-[#0f172a] dark:text-[#9ca3af]"}
                `}
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                >
                  {item.title.split(' ')[0]}
                </div>

                {/* Expanded Card - Simple Design Matching Reference */}
                {isExpanded && (
                  <div 
                    className="absolute top-32 md:top-36 lg:top-40 left-1/2 -translate-x-1/2 w-[280px] max-w-xs bg-[#1e293b] dark:bg-[#0f172a] border border-[#334155] dark:border-[#374151] shadow-xl z-50 overflow-hidden"
                    style={{
                      borderRadius: '1rem',
                      padding: '1.75rem'
                    }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#f97316] rounded-full"></div>
                    <div className="flex justify-end items-start mb-5">
                      <span className="text-xs font-medium text-white/50 dark:text-[#9ca3af]">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl text-white dark:text-[#e5e7eb] font-bold leading-tight mb-4">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/90 dark:text-[#9ca3af] leading-relaxed font-normal">
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
