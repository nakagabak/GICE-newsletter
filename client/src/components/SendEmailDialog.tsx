import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SendEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  htmlBody: string;
  defaultSubject?: string;
}

export function SendEmailDialog({
  open,
  onOpenChange,
  htmlBody,
  defaultSubject = "",
}: SendEmailDialogProps) {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setSubject(defaultSubject);
    }
  }, [open, defaultSubject]);

  const handleAddRecipient = () => {
    const email = currentEmail.trim();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (recipients.includes(email)) {
      toast({
        title: "Duplicate Email",
        description: "This email address is already in the recipient list",
        variant: "destructive",
      });
      return;
    }

    setRecipients([...recipients, email]);
    setCurrentEmail("");
  };

  const handleRemoveRecipient = (email: string) => {
    setRecipients(recipients.filter((r) => r !== email));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddRecipient();
    }
  };

  const handleSend = async () => {
    if (recipients.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please add at least one recipient",
        variant: "destructive",
      });
      return;
    }

    if (!subject.trim()) {
      toast({
        title: "No Subject",
        description: "Please enter an email subject",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      await apiRequest("POST", "/api/send-email", {
        to: recipients,
        subject: subject.trim(),
        htmlBody,
      });

      toast({
        title: "Email Sent",
        description: `Successfully sent to ${recipients.length} recipient${recipients.length > 1 ? "s" : ""}`,
      });

      setRecipients([]);
      setCurrentEmail("");
      onOpenChange(false);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message.replace(/^\d+:\s*/, '')
        : "Failed to send email";
      toast({
        title: "Send Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleCancel = () => {
    setSubject(defaultSubject);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" data-testid="dialog-send-email">
        <DialogHeader>
          <DialogTitle>Send Email</DialogTitle>
          <DialogDescription>
            Enter recipient email addresses and subject line
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              data-testid="input-email-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
              disabled={sending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipients</Label>
            <div className="flex gap-2">
              <Input
                id="recipient"
                data-testid="input-email-recipient"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter email address and press Enter"
                disabled={sending}
              />
              <Button
                type="button"
                onClick={handleAddRecipient}
                disabled={sending}
                data-testid="button-add-recipient"
              >
                Add
              </Button>
            </div>
            {recipients.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {recipients.map((email) => (
                  <Badge
                    key={email}
                    variant="secondary"
                    className="gap-1 pr-1"
                    data-testid={`badge-recipient-${email}`}
                  >
                    {email}
                    <button
                      onClick={() => handleRemoveRecipient(email)}
                      className="ml-1 hover-elevate active-elevate-2 rounded-sm"
                      disabled={sending}
                      data-testid={`button-remove-recipient-${email}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={sending}
            data-testid="button-cancel-send"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={sending}
            data-testid="button-confirm-send"
          >
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {sending ? "Sending..." : "Send Email"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
