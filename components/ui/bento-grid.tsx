"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
}

// دالة صغيرة بدل cn (ما تحتاج مكتبات)
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-5 rounded-xl overflow-hidden transition-all duration-300",
            "border border-gray-200/70 dark:border-white/10 bg-white dark:bg-black",
            "hover:shadow-[0_3px_15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_3px_15px_rgba(255,255,255,0.05)]",
            "hover:-translate-y-1",
            item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
            item.hasPersistentHover && "shadow-[0_3px_15px_rgba(0,0,0,0.05)]"
          )}
        >
          {/* خلفية صغيرة تظهر مع الهوفر */}
          <div
            className={cn(
              "absolute inset-0",
              "bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)]",
              "dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)]",
              "bg-[length:6px_6px] transition-opacity duration-300",
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            )}
          />

          <div className="relative flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10">
                {item.icon}
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                {item.status || "Active"}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-[15px] leading-tight">
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 dark:text-gray-400">
                {item.cta || "Explore →"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
