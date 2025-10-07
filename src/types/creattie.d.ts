// src/types/creattie.d.ts
import React from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "creattie-embed": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                src?: string;
                delay?: string | number;
                speed?: string | number;
                frame_rate?: string | number;
                trigger?: string; // "loop" | "hover" | "click" etc.
                style?: React.CSSProperties;
            };
        }
    }
}

export { };
