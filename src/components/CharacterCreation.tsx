import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { getToken } from "../utils/getToken";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenIcon, ImageIcon } from "lucide-react";

interface CharacterCreationForm {
  name: string;
  description: string;
  settings: string;
  isPublic: boolean;
}

function CharacterCreation() {
  const { register, handleSubmit } = useForm<CharacterCreationForm>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [characterNameCount, setCharacterNameCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [settingsCount, setGreetingCount] = useState(0);

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Allowed formats: JPEG, PNG, WEBP");
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      setError(null);
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const submit: SubmitHandler<CharacterCreationForm> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("settings", data.settings);
      formData.append("isPublic", String(data.isPublic));

      if (file) {
        formData.append("character_picture", file);
      }

      const accessToken = getToken();

      const response = await axios.post(
        "http://localhost:5000/api/character/create",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Character created");
      return response.data;
    } catch (error: any) {
      console.error("Error creating character:", error.message);
    }
  };

  return (
    <div className="w-[90%] sm:w-[70%] px-4 py-8">
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Avatar className="w-24 h-24 cursor-pointer">
              <AvatarImage src={previewUrl || ""} alt="Character avatar" />
              <AvatarFallback className="bg-orange-100">
                <ImageIcon className="text-orange-400" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
              <PenIcon size={16} className="text-black" />
            </div>
            <input
              type="file"
              id="character_picture"
              className="hidden"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageChange}
            />
            <Label
              htmlFor="character_picture"
              className="absolute inset-0 cursor-pointer"
              aria-label="Upload character image"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
        )}

        <Card className="mb-6 !gap-1">
          <CardHeader>
            <CardTitle className="text-md font-medium">
              Character Name
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input
                placeholder="e.g., Albert Einstein"
                {...register("name")}
                onChange={(e) => setCharacterNameCount(e.target.value.length)}
                maxLength={20}
              />
              <div className="text-right text-sm text-muted-foreground">
                {characterNameCount}/20
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 !gap-1">
          <CardHeader>
            <CardTitle className="text-md font-medium">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Textarea
                placeholder="How would your character describe themselves?"
                className="min-h-24"
                {...register("description")}
                onChange={(e) => setDescriptionCount(e.target.value.length)}
                maxLength={500}
              />
              <div className="text-right text-sm text-muted-foreground">
                {descriptionCount}/500
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 !gap-1">
          <CardHeader>
            <CardTitle className="text-md font-medium">
              Behavior Prompt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Textarea
                placeholder="e.g., Hello, I am Albert. Ask me about my scientific contributions."
                className="min-h-24"
                {...register("settings")}
                onChange={(e) => setGreetingCount(e.target.value.length)}
                maxLength={4096}
              />
              <div className="text-right text-sm text-muted-foreground">
                {settingsCount}/4096
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 !gap-1">
          <CardHeader>
            <CardTitle className="text-md font-medium">Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch id="isPublic" {...register("isPublic")} />
              <Label htmlFor="isPublic">Private</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="px-8">
            Create Character
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CharacterCreation;
