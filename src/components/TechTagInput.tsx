
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface TechTagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TechTagInput({ value, onChange }: TechTagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
    inputRef.current?.focus();
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        inputValue.trim()
      ) {
        if (!value.includes(inputValue.trim())) {
          onChange([...value, inputValue.trim()]);
        }
        setInputValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue, value, onChange]);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap items-center gap-2 p-2 border rounded-md bg-background focus-within:ring-1 focus-within:ring-ring"
      onClick={handleContainerClick}
    >
      {value.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-sm">
          {tag}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 ml-1 -mr-1 hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveTag(tag);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[120px] border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder={value.length === 0 ? "Add technologies..." : ""}
      />
    </div>
  );
}
