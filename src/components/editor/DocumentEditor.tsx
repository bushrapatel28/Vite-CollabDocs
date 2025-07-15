import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FormattingToolbar from "./FormattingToolbar";
import { User, FileText, History, Save } from "lucide-react";

interface DocumentEditorProps {
  documentId?: string;
  initialContent?: string;
  collaborators?: Collaborator[];
}

interface Collaborator {
  id: string;
  name: string;
  color: string;
  avatarUrl?: string;
  cursorPosition?: { x: number; y: number };
  selection?: { start: number; end: number };
}

const DocumentEditor = ({
  documentId = "doc-123",
  initialContent = "Start typing your document here...",
  collaborators = [
    {
      id: "1",
      name: "Jane Smith",
      color: "#FF5733",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: "2",
      name: "John Doe",
      color: "#33A1FF",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "3",
      name: "Alex Johnson",
      color: "#33FF57",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
  ],
}: DocumentEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Simulate saving the document
  const saveDocument = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  };

  // Auto-save effect
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      saveDocument();
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, []);

  // Render collaborator cursors (simplified for UI scaffolding)
  const renderCollaboratorCursors = () => {
    return collaborators.map((collaborator) => (
      <div
        key={collaborator.id}
        className="absolute"
        style={{
          top: collaborator.cursorPosition?.y || Math.random() * 400, // Random position for demo
          left: collaborator.cursorPosition?.x || Math.random() * 800, // Random position for demo
          pointerEvents: "none",
        }}
      >
        <div
          className="w-0.5 h-5"
          style={{ backgroundColor: collaborator.color }}
        />
        <div
          className="text-xs px-1 rounded-sm text-white whitespace-nowrap"
          style={{ backgroundColor: collaborator.color }}
        >
          {collaborator.name}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* Document header with title and save status */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Untitled Document</h1>
          <Badge variant="outline" className="ml-2">
            {lastSaved
              ? `Last saved ${lastSaved.toLocaleTimeString()}`
              : "Not saved yet"}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {collaborators.map((user) => (
              <TooltipProvider key={user.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar
                      className="border-2 border-background"
                      style={{ borderColor: user.color }}
                    >
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback style={{ backgroundColor: user.color }}>
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={saveDocument}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Formatting toolbar */}
      <FormattingToolbar />

      {/* Editor area */}
      <Card className="flex-grow m-4 overflow-hidden relative">
        <div className="p-6 h-full">
          {/* Editable content area */}
          <div
            className="prose prose-sm max-w-none h-full outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setContent(e.currentTarget.textContent || "")}
          >
            {content}
          </div>

          {/* Collaborator cursors */}
          {renderCollaboratorCursors()}
        </div>
      </Card>

      {/* Status bar */}
      <div className="flex justify-between items-center p-2 border-t text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          <User className="h-3 w-3" />
          <span>{collaborators.length} collaborators</span>
        </div>
        <div className="flex items-center space-x-2">
          <History className="h-3 w-3" />
          <span>Version history available</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
