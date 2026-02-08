"use client";

import { CVTemplate } from "@/types/cv";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface TemplateSelectorProps {
    selectedTemplate: CVTemplate;
    onSelect: (template: CVTemplate) => void;
}

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
    const templates: { id: CVTemplate; name: string; description: string; color: string }[] = [
        {
            id: "minimalist",
            name: "Tech Minimalist",
            description: "Clean, monospaced fonts. Best for Developers.",
            color: "bg-gray-800",
        },
        {
            id: "corporate",
            name: "Corporate",
            description: "Traditional serif fonts. Best for Enterprise/Banks.",
            color: "bg-blue-900",
        },
        {
            id: "creative",
            name: "Creative",
            description: "Modern layout with accent colors. Best for UI/UX.",
            color: "bg-purple-900",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {templates.map((template) => (
                <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(template.id)}
                    className={`relative p-4 rounded-xl text-left transition-all duration-300 border-2 ${selectedTemplate === template.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
                        }`}
                >
                    {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 text-blue-500">
                            <CheckCircle2 size={18} />
                        </div>
                    )}

                    <div className={`w-full h-24 rounded-lg mb-3 ${template.color} opacity-50`} />

                    <h3 className="font-bold text-white text-sm">{template.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                </motion.button>
            ))}
        </div>
    );
}
