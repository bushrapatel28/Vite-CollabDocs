import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Share utilities
export const generateShareableLink = (
  documentId: string,
  baseUrl?: string,
): string => {
  const base = baseUrl || window.location.origin;
  return `${base}/shared/${documentId}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

export const trackShareEvent = (
  platform: string,
  documentId: string,
  userId?: string,
) => {
  // In a real application, this would send data to your analytics service
  const event = {
    type: "document_shared",
    platform,
    documentId,
    userId,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer,
  };

  // Example: Send to analytics service
  console.log("Share event tracked:", event);

  // You could integrate with services like:
  // - Google Analytics: gtag('event', 'share', { method: platform });
  // - Mixpanel: mixpanel.track('Document Shared', event);
  // - Custom analytics API: fetch('/api/analytics/track', { method: 'POST', body: JSON.stringify(event) });
};

export const getSocialShareUrl = (
  platform: string,
  url: string,
  title: string,
  description?: string,
): string => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  switch (platform.toLowerCase()) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`;
    case "reddit":
      return `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
    case "telegram":
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
    default:
      return url;
  }
};

export const generateEmailShareLink = (
  recipients: string,
  subject: string,
  body: string,
): string => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${recipients}?subject=${encodedSubject}&body=${encodedBody}`;
};
