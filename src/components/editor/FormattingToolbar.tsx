import React from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FormattingToolbarProps {
  onFormatText?: (format: string) => void;
  onHeadingChange?: (level: number) => void;
  onListChange?: (listType: string) => void;
  onAlignChange?: (alignment: string) => void;
  onLinkInsert?: () => void;
  onImageInsert?: () => void;
}

const FormattingToolbar = ({
  onFormatText = () => {},
  onHeadingChange = () => {},
  onListChange = () => {},
  onAlignChange = () => {},
  onLinkInsert = () => {},
  onImageInsert = () => {},
}: FormattingToolbarProps) => {
  return (
    <div className="flex items-center p-2 border-b bg-white w-full gap-1 overflow-x-auto">
      <TooltipProvider>
        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onFormatText("bold")}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onFormatText("italic")}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6" />

        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onHeadingChange(1)}
              >
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 1</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onHeadingChange(2)}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 2</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6" />

        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onListChange("bullet")}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bullet List</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onListChange("ordered")}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Numbered List</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6" />

        <div className="flex items-center">
          <ToggleGroup type="single" defaultValue="left">
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="left"
                  onClick={() => onAlignChange("left")}
                >
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Left</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="center"
                  onClick={() => onAlignChange("center")}
                >
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Center</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="right"
                  onClick={() => onAlignChange("right")}
                >
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Right</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroup>
        </div>

        <Separator orientation="vertical" className="mx-2 h-6" />

        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={onLinkInsert}
              >
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert Link</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={onImageInsert}
              >
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Insert Image</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default FormattingToolbar;
