import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, History, Users, RotateCcw, Eye } from "lucide-react";

interface CollaboratorProps {
  id: string;
  name: string;
  avatarUrl?: string;
  color: string;
  status: "editing" | "viewing" | "idle";
  lastActive?: string;
}

interface VersionProps {
  id: string;
  timestamp: string;
  author: string;
  description: string;
}

interface ChangeProps {
  id: string;
  timestamp: string;
  author: string;
  content: string;
  type: "addition" | "deletion" | "formatting";
}

interface CollaborationPanelProps {
  collaborators?: CollaboratorProps[];
  versions?: VersionProps[];
  changes?: ChangeProps[];
}

const CollaborationPanel = ({
  collaborators = [
    {
      id: "1",
      name: "Jane Smith",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      color: "#4CAF50",
      status: "editing",
    },
    {
      id: "2",
      name: "John Doe",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      color: "#2196F3",
      status: "viewing",
    },
    {
      id: "3",
      name: "Alex Johnson",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      color: "#FF9800",
      status: "idle",
      lastActive: "5 min ago",
    },
  ],
  versions = [
    {
      id: "v1",
      timestamp: "2023-06-15 14:30",
      author: "Jane Smith",
      description: "Initial draft",
    },
    {
      id: "v2",
      timestamp: "2023-06-15 15:45",
      author: "John Doe",
      description: "Added introduction section",
    },
    {
      id: "v3",
      timestamp: "2023-06-15 16:20",
      author: "Alex Johnson",
      description: "Revised conclusion",
    },
    {
      id: "v4",
      timestamp: "2023-06-15 17:10",
      author: "Jane Smith",
      description: "Fixed formatting issues",
    },
    {
      id: "v5",
      timestamp: "2023-06-15 18:05",
      author: "John Doe",
      description: "Added references section",
    },
  ],
  changes = [
    {
      id: "c1",
      timestamp: "2 min ago",
      author: "Jane Smith",
      content: "Added paragraph about methodology",
      type: "addition",
    },
    {
      id: "c2",
      timestamp: "5 min ago",
      author: "John Doe",
      content: "Removed outdated statistics",
      type: "deletion",
    },
    {
      id: "c3",
      timestamp: "10 min ago",
      author: "Alex Johnson",
      content: "Changed heading style",
      type: "formatting",
    },
    {
      id: "c4",
      timestamp: "15 min ago",
      author: "Jane Smith",
      content: "Added bullet points to summary",
      type: "addition",
    },
    {
      id: "c5",
      timestamp: "20 min ago",
      author: "John Doe",
      content: "Fixed typo in conclusion",
      type: "deletion",
    },
  ],
}: CollaborationPanelProps) => {
  return (
    <Card className="h-full w-full bg-background border-l">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Collaboration
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="collaborators" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
            <TabsTrigger value="collaborators" className="rounded-none">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-none">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="changes" className="rounded-none">
              <Clock className="h-4 w-4 mr-2" />
              Changes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collaborators" className="p-0 m-0">
            <ScrollArea className="h-[calc(100vh-12rem)] p-4">
              <div className="space-y-4">
                {collaborators.map((collaborator) => (
                  <div
                    key={collaborator.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={collaborator.avatarUrl} />
                          <AvatarFallback
                            style={{ backgroundColor: collaborator.color }}
                          >
                            {collaborator.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background"
                          style={{
                            backgroundColor:
                              collaborator.status === "editing"
                                ? "green"
                                : collaborator.status === "viewing"
                                  ? "blue"
                                  : "gray",
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">
                          {collaborator.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {collaborator.status === "editing"
                            ? "Editing now"
                            : collaborator.status === "viewing"
                              ? "Viewing now"
                              : `Last active ${collaborator.lastActive}`}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        collaborator.status === "editing"
                          ? "default"
                          : collaborator.status === "viewing"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {collaborator.status === "editing"
                        ? "Editing"
                        : collaborator.status === "viewing"
                          ? "Viewing"
                          : "Idle"}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="history" className="p-0 m-0">
            <ScrollArea className="h-[calc(100vh-12rem)] p-4">
              <div className="space-y-4">
                {versions.map((version) => (
                  <Card key={version.id} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <History className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {version.description}
                          </span>
                        </div>
                        <Badge variant="outline">{version.id}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        {version.author} • {version.timestamp}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Restore
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="changes" className="p-0 m-0">
            <ScrollArea className="h-[calc(100vh-12rem)] p-4">
              <div className="space-y-4">
                {changes.map((change) => (
                  <div key={change.id} className="pb-3">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              change.type === "addition"
                                ? "green"
                                : change.type === "deletion"
                                  ? "red"
                                  : "blue",
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{change.author}</p>
                          <span className="text-xs text-muted-foreground">
                            {change.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{change.content}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {change.type === "addition"
                            ? "Added content"
                            : change.type === "deletion"
                              ? "Removed content"
                              : "Changed formatting"}
                        </Badge>
                      </div>
                    </div>
                    <Separator className="mt-3" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CollaborationPanel;
