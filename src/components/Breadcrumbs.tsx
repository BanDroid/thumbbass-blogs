import SvgIcons from "@/utils/icons";
import { Fragment, ReactNode } from "react";

interface BreadcrumbsProps {
  nodeList: ReactNode[];
  className?: string;
}
export default function Breadcrumbs({ nodeList, className }: BreadcrumbsProps) {
  return (
    <p className={`text-sm ${className}`}>
      {nodeList.map((node, index) => (
        <Fragment key={index}>
          <span className="hover:underline">{node}</span>
          {index !== nodeList.length - 1 && (
            <SvgIcons name="chevron_right" className="!w-2 !h-2 mx-2 inline" />
          )}
        </Fragment>
      ))}
    </p>
  );
}
