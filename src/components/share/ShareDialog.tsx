import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Share2,
  Copy,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Eye,
  BarChart3,
  Settings,
  Check,
  Globe,
  Lock,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareDialogProps {
  documentId?: string;
  documentTitle?: string;
  documentDescription?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

interface ShareStats {
  totalShares: number;
  views: number;
  clicks: number;
  platforms: {
    facebook: number;
    twitter: number;
    linkedin: number;
    email: number;
    link: number;
  };
}

const ShareDialog = ({
  documentId = "doc-123",
  documentTitle = "Untitled Document",
  documentDescription = "A collaborative document created with our editor",
  isOpen = false,
  onOpenChange = () => {},
  children,
}: ShareDialogProps) => {
  const [shareUrl, setShareUrl] = useState(
    `${window.location.origin}/shared/${documentId}`,
  );
  const [copied, setCopied] = useState(false);
  const [privacySetting, setPrivacySetting] = useState<
    "public" | "private" | "team"
  >("team");
  const [emailRecipients, setEmailRecipients] = useState("");
  const [emailMessage, setEmailMessage] = useState(
    `Hi! I'd like to share this document with you: ${documentTitle}`,
  );

  // Mock analytics data
  const [shareStats] = useState<ShareStats>({
    totalShares: 24,
    views: 156,
    clicks: 89,
    platforms: {
      facebook: 8,
      twitter: 12,
      linkedin: 6,
      email: 15,
      link: 23,
    },
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // Track analytics
      trackShare("link");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const trackShare = (platform: string) => {
    // In a real app, this would send analytics to your backend
    console.log(`Share tracked: ${platform} for document ${documentId}`);
  };

  const shareToSocialMedia = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(documentTitle);
    const encodedDescription = encodeURIComponent(documentDescription);

    let shareLink = "";

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=YourApp`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400");
      trackShare(platform);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Shared Document: ${documentTitle}`);
    const body = encodeURIComponent(
      `${emailMessage}\n\nView the document here: ${shareUrl}`,
    );
    const mailtoLink = `mailto:${emailRecipients}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    trackShare("email");
  };

  const getPrivacyIcon = () => {
    switch (privacySetting) {
      case "public":
        return <Globe className="h-4 w-4" />;
      case "private":
        return <Lock className="h-4 w-4" />;
      case "team":
        return <Users className="h-4 w-4" />;
    }
  };

  const getPrivacyDescription = () => {
    switch (privacySetting) {
      case "public":
        return "Anyone with the link can view";
      case "private":
        return "Only you can access";
      case "team":
        return "Team members can view";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Document
          </DialogTitle>
          <DialogDescription>
            Share &quot;{documentTitle}&quot; with others via social media,
            email, or direct link.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="share" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-6">
            {/* Quick Share Link */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  Share Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input value={shareUrl} readOnly className="flex-1" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={copyToClipboard}
                          className={cn(
                            "transition-colors",
                            copied && "bg-green-50 border-green-200",
                          )}
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied ? "Copied!" : "Copy link"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {getPrivacyIcon()}
                  <span>{getPrivacyDescription()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-blue-50 hover:border-blue-200"
                    onClick={() => shareToSocialMedia("facebook")}
                  >
                    <Facebook className="h-6 w-6 text-blue-600" />
                    <span className="text-sm">Facebook</span>
                    <Badge variant="secondary" className="text-xs">
                      {shareStats.platforms.facebook} shares
                    </Badge>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-sky-50 hover:border-sky-200"
                    onClick={() => shareToSocialMedia("twitter")}
                  >
                    <Twitter className="h-6 w-6 text-sky-500" />
                    <span className="text-sm">Twitter</span>
                    <Badge variant="secondary" className="text-xs">
                      {shareStats.platforms.twitter} shares
                    </Badge>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-blue-50 hover:border-blue-200"
                    onClick={() => shareToSocialMedia("linkedin")}
                  >
                    <Linkedin className="h-6 w-6 text-blue-700" />
                    <span className="text-sm">LinkedIn</span>
                    <Badge variant="secondary" className="text-xs">
                      {shareStats.platforms.linkedin} shares
                    </Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Recipients (comma-separated)
                  </label>
                  <Input
                    placeholder="email1@example.com, email2@example.com"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Message
                  </label>
                  <Input
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                  />
                </div>
                <Button
                  onClick={shareViaEmail}
                  disabled={!emailRecipients.trim()}
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Sharing Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {shareStats.totalShares}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Shares
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {shareStats.views}
                    </div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {shareStats.clicks}
                    </div>
                    <div className="text-sm text-muted-foreground">Clicks</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Platform Breakdown</h4>
                  {Object.entries(shareStats.platforms).map(
                    ([platform, count]) => (
                      <div
                        key={platform}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 capitalize">
                          {platform === "facebook" && (
                            <Facebook className="h-4 w-4 text-blue-600" />
                          )}
                          {platform === "twitter" && (
                            <Twitter className="h-4 w-4 text-sky-500" />
                          )}
                          {platform === "linkedin" && (
                            <Linkedin className="h-4 w-4 text-blue-700" />
                          )}
                          {platform === "email" && (
                            <Mail className="h-4 w-4 text-gray-600" />
                          )}
                          {platform === "link" && (
                            <Link2 className="h-4 w-4 text-gray-600" />
                          )}
                          <span>{platform}</span>
                        </div>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-colors",
                      privacySetting === "public"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-accent",
                    )}
                    onClick={() => setPrivacySetting("public")}
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Public</div>
                        <div className="text-sm text-muted-foreground">
                          Anyone with the link can view this document
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-colors",
                      privacySetting === "team"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-accent",
                    )}
                    onClick={() => setPrivacySetting("team")}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Team Only</div>
                        <div className="text-sm text-muted-foreground">
                          Only team members can access this document
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-colors",
                      privacySetting === "private"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-accent",
                    )}
                    onClick={() => setPrivacySetting("private")}
                  >
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Private</div>
                        <div className="text-sm text-muted-foreground">
                          Only you can access this document
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
