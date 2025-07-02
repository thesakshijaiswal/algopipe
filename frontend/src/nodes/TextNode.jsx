import { useState, useEffect, useRef, useCallback } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const [usedTags, setUsedTags] = useState(new Set());
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const extractVariables = useCallback((text) => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.add(match[1]);
    }
    return Array.from(matches);
  }, []);

  const checkForSuggestions = useCallback(
    (text, cursorPos) => {
      const beforeCursor = text.substring(0, cursorPos);

      const openBraceMatch = beforeCursor.match(/\{\{([^}]*)$/);

      if (openBraceMatch) {
        const partialTag = openBraceMatch[1].trim();

        const matchingSuggestions = Array.from(usedTags).filter((tag) => {
          if (partialTag.length === 0) return true;
          return (
            tag.toLowerCase().startsWith(partialTag.toLowerCase()) &&
            tag !== partialTag
          );
        });

        if (matchingSuggestions.length > 0) {
          setSuggestions(matchingSuggestions);
          setShowSuggestions(true);
          setSelectedSuggestion(0);
          return;
        }
      }

      setShowSuggestions(false);
      setSuggestions([]);
    },
    [usedTags]
  );

  const handleTextChange = (e) => {
    const newText = e.target.value;
    const cursorPos = e.target.selectionStart;

    setCurrText(newText);
    setCursorPosition(cursorPos);
    const newVariables = extractVariables(newText);
    newVariables.forEach((variable) => {
      setUsedTags((prev) => new Set([...prev, variable]));
    });

    checkForSuggestions(newText, cursorPos);
  };

  const handleKeyDown = (e) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        applySuggestion(suggestions[selectedSuggestion]);
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    }
  };

  const applySuggestion = (suggestion) => {
    const textarea = textareaRef.current;
    const beforeCursor = currText.substring(0, cursorPosition);
    const afterCursor = currText.substring(cursorPosition);

    const openBraceMatch = beforeCursor.match(/\{\{([^}]*)$/);
    if (openBraceMatch) {
      const newText =
        beforeCursor.substring(0, openBraceMatch.index) +
        `{{${suggestion}}}` +
        afterCursor;

      setCurrText(newText);
      setShowSuggestions(false);

      setTimeout(() => {
        const newCursorPos = openBraceMatch.index + suggestion.length + 4;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      }, 0);
    }
  };

  const handleCursorChange = (e) => {
    setCursorPosition(e.target.selectionStart);
    checkForSuggestions(currText, e.target.selectionStart);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.width = "100%";
    }

    const newVariables = extractVariables(currText);

    if (JSON.stringify(newVariables) !== JSON.stringify(variables)) {
      setVariables(newVariables);
      setTimeout(() => {
        updateNodeInternals(id);
      }, 0);
    }
  }, [currText, variables, extractVariables, id, updateNodeInternals]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  const minHeightForHandles =
    variables.length > 0 ? 120 + (variables.length - 1) * 24 : 0;

  return (
    <BaseNode
      id={id}
      label="Text Node"
      colorTheme="amber"
      footerText="Content ready"
      minHeight={minHeightForHandles}
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: `${id}-output`,
          className: "!bg-gradient-to-r !from-amber-500 !to-orange-600",
        },
        ...variables.map((variable, index) => ({
          type: "target",
          position: Position.Left,
          id: `${id}-${variable}`,
          style: {
            top: 80 + index * 24,
            background: "#a855f7",
          },
        })),
      ]}
    >
      <div className="space-y-1">
        <label className="block text-xs font-medium text-gray-700 tracking-wide">
          Content Text
        </label>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            onSelect={handleCursorChange}
            onClick={handleCursorChange}
            rows={1}
            className="w-full px-2 py-1.5 bg-white/80 border border-gray-200 rounded-md text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 hover:bg-white hover:border-amber-300 resize-none font-mono"
            placeholder="Enter your text content..."
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-48">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`px-3 py-2 text-xs cursor-pointer border-b last:border-b-0 border-gray-100 ${
                    index === selectedSuggestion
                      ? "bg-violet-100 border-violet-200"
                      : "hover:bg-violet-50"
                  }`}
                  onClick={() => applySuggestion(suggestion)}
                >
                  <div className="font-mono text-purple-600">{`{{${suggestion}}}`}</div>
                  <div className="text-gray-500 text-xs mt-0.5">
                    Previously used
                  </div>
                </div>
              ))}
              <div className="px-3 py-1 text-xs text-gray-400 bg-gray-50 border-t">
                ↑↓ Navigate • Tab/Enter Apply • Esc Close
              </div>
            </div>
          )}
        </div>
      </div>

      {variables.length > 0 && (
        <div className="flex items-center gap-1 mt-1">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          <span className="text-xs text-purple-600 font-medium">
            {variables.length} variable{variables.length > 1 && "s"} detected
          </span>
        </div>
      )}

      <style jsx>{`
        .variable-styled-textarea {
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.1) 0%,
            rgba(236, 72, 153, 0.1) 100%
          );
        }

        /* Style variables in textarea - this is a simplified approach */
        .variable-styled-textarea:focus {
          background: rgba(255, 255, 255, 0.95);
        }
      `}</style>
    </BaseNode>
  );
};
