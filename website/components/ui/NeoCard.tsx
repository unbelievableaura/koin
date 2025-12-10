import React from 'react';

interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    offset?: boolean;
}

export function NeoCard({ children, className = '', offset = true, ...props }: NeoCardProps) {
    const baseStyles = "bg-white border-4 border-black p-6";
    const offsetStyles = offset ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "";

    return (
        <div
            className={`${baseStyles} ${offsetStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
