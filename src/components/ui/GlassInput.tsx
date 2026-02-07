import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

export const GlassInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    type={type}
                    className={cn(
                        "glass-input w-full",
                        icon && "pl-10",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
            </div>
        );
    }
);
GlassInput.displayName = "GlassInput";
