import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
}
export default function Container({ id, children, className }: ContainerProps) {
  return (
    <section id={id || ""} className={`w-full bg-base-100 ${className}`}>
      <div className="w-full max-w-4xl mx-auto">{children}</div>
    </section>
  );
}
