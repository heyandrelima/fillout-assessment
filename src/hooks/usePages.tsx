"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Page = {
  id: string;
  title: string;
};

type PagesState = {
  pages: Page[];
  addPage: (pageTitle: string, afterId?: string) => void;
  removePage: (id: string) => void;
  movePage: (id: string, afterId?: string) => void;
  getPageById?: (id: string) => Page | undefined;
};

const PagesContext = createContext<PagesState | undefined>(undefined);

export const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<Page[]>([]);

  const addPage = (pageTitle: string, afterId?: string) => {
    const newPage: Page = {
      id: crypto.randomUUID(),
      title: pageTitle,
    };

    setPages((prev) => {
      if (!afterId) {
        return [...prev, newPage];
      }

      const index = prev.findIndex((p) => p.id === afterId);
      if (index === -1) {
        return [...prev, newPage]; // If afterId not found, add to the end
      }

      return [...prev.slice(0, index + 1), newPage, ...prev.slice(index + 1)];
    });
  };

  const removePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const movePage = (id: string, afterId?: string) => {
    setPages((prev) => {
      const pageToMove = prev.find((p) => p.id === id);
      if (!pageToMove) return prev; // If page not found, do nothing

      const newPages = prev.filter((p) => p.id !== id);
      if (!afterId) {
        return [pageToMove, ...newPages];
      }

      const index = newPages.findIndex((p) => p.id === afterId);
      if (index === -1) {
        return [...newPages, pageToMove];
      }

      return [
        ...newPages.slice(0, index + 1),
        pageToMove,
        ...newPages.slice(index + 1),
      ];
    });
  };

  const getPageById = (id: string): Page | undefined => {
    return pages.find((page) => page.id === id);
  };

  return (
    <PagesContext.Provider
      value={{ pages, addPage, removePage, movePage, getPageById }}
    >
      {children}
    </PagesContext.Provider>
  );
};
export const usePages = () => {
  const context = useContext(PagesContext);
  if (!context) {
    throw new Error("usePages must be used within a PagesProvider");
  }
  return context;
};
