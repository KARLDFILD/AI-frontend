import { MessageCircle, Palette, Volume2, Info } from "lucide-react";
import { CharacterInfo } from "@/types/CharacterInfo";

interface ChatSettingsProps {
  characterInfo: CharacterInfo | null;
}

function ChatSettings({ characterInfo }: ChatSettingsProps) {
  return (
    <div className="h-full w-full bg-background">
      <div className=" h-full border-l">
        <div className="p-4 space-y-4">
          {characterInfo && (
            <div className="text-center border-b pb-4">
              <img
                src={characterInfo.avatar}
                alt={characterInfo.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
              />
              <h2 className="text-lg font-semibold">{characterInfo.name}</h2>
              <p className="text-sm text-gray-600">
                {characterInfo.description}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Creator: {characterInfo.creator_name}
              </p>
            </div>
          )}
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
      </div>
    </div>
  );
}

export default ChatSettings;
