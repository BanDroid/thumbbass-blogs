import { ReactNode } from "react";

interface GridProps {
  data: any[];
  render: (item: any) => ReactNode;
  className?: string;
}
export default function Grid({ data, render, className = "" }: GridProps) {
  return (
    <div className={`grid ${className}`}>
      {data &&
        data.map((item, index) => (
          <article key={item.id ?? index}>{render(item)}</article>
        ))}
    </div>
  );
}
