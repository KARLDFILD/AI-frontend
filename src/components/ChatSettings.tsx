import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings, MessageCircle, Palette, Volume2, Info } from "lucide-react";

function ChatSettings() {
  return (
    <div className="h-full w-full bg-background">
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="fixed top-20 right-4 z-50"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Chat Settings</SheetTitle>
          </SheetHeader>
          <SettingsContent />
        </SheetContent>
      </Sheet>

      <div className="hidden md:block h-full border-l">
        <SettingsContent />
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <MessageCircle className="h-5 w-5" />
        <span>Chat Options</span>
      </div>
      <div className="flex items-center space-x-2">
        <Palette className="h-5 w-5" />
        <span>Appearance</span>
      </div>
      <div className="flex items-center space-x-2">
        <Volume2 className="h-5 w-5" />
        <span>Sound Settings</span>
      </div>
      <div className="flex items-center space-x-2">
        <Info className="h-5 w-5" />
        <span>About</span>
      </div>
    </div>
  );
}

export default ChatSettings;
