'use client';
import React, { createContext, useContext, useState } from 'react';

export type BreadcrumbItemProps = {
    label: string;
    href?: string;
    isPage?: boolean;
}

export const BreadcrumbContext = createContext<{
  breadcrumbItems: BreadcrumbItemProps[];
  setBreadcrumbItems: React.Dispatch<React.SetStateAction<BreadcrumbItemProps[]>>;
}>({
  breadcrumbItems: [],
  setBreadcrumbItems: () => {},
});

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItemProps[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbItems, setBreadcrumbItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => useContext(BreadcrumbContext);