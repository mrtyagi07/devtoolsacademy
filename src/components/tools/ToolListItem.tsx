'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Star, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { CATEGORY_COLORS, DEFAULT_COLOR, type Tool } from "@/app/tools/data";
import { cn } from "@/lib/utils";
import GitHubStarsTrend from "./GitHubStarsTrend";
import { motion, AnimatePresence } from "framer-motion";

interface ToolListItemProps {
  tool: Tool;
}

export function ToolListItem({ tool }: ToolListItemProps) {
  const [showTrend, setShowTrend] = useState(false);

  return (
    <Card className="flex flex-col gap-4 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Tool Name and Stars */}
        <div className="flex-1">
          <div className="flex items-center justify-between md:justify-start md:gap-4">
            <h3 className="text-xl font-bold">
              <Link
                href={`/tools/${tool.id}`}
                className="hover:text-primary transition-colors duration-200"
              >
                {tool.name}
              </Link>
            </h3>
            <button
              onClick={() => setShowTrend(!showTrend)}
              className="flex items-center gap-1 bg-yellow-100/80 dark:bg-yellow-900/80 rounded-full px-2 py-1 cursor-pointer hover:bg-yellow-200/80 dark:hover:bg-yellow-800/80 transition-colors"
            >
              <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                {Intl.NumberFormat('en-US', { notation: 'compact' }).format(tool.githubStars)}
              </span>
              {showTrend ? (
                <ChevronUp className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              )}
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {tool.description}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {tool.category.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className={cn(
                "rounded-full text-xs font-medium px-2 py-1",
                CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS] || DEFAULT_COLOR
              )}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-primary/5 text-primary dark:bg-primary/10 rounded-full px-2 py-1"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:flex-col">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full"
          >
            <Link
              href={tool.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full"
          >
            <Link
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Website
            </Link>
          </Button>
        </div>
      </div>

      {/* Trend Graph */}
      <AnimatePresence>
        {showTrend && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t">
              <GitHubStarsTrend
                tool={tool}
                compact
                className="bg-black rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}