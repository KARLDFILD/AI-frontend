import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { User, MoreHorizontal, Heart, MessageCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Character {
  id: number;
  name: string;
  description: string;
  character_picture?: string;
  isPublic: boolean;
  creator_id: number;
  settings?: string;
  createdAt?: string;
}

function MainContent() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/character/get-all",
        { withCredentials: true }
      );
      setCharacters(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      try {
        await axios.delete(`http://localhost:5000/api/character/${id}`, {
          withCredentials: true,
        });
        fetchCharacters();
      } catch (error) {
        console.error("Error deleting character:", error);
      }
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="container mx-auto py-5 max-w-6xl overflow-auto w-[90%] hideScroll">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card
              key={item}
              className="overflow-hidden h-[140px] flex flex-row p-4"
            >
              <div className="w-32 h-full">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="flex-1 flex flex-col justify-between ml-4">
                <CardHeader className="p-0">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardFooter className="p-0">
                  <Skeleton className="h-9 w-24" />
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      ) : characters.length === 0 ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <CardTitle className="mb-2">No Characters</CardTitle>
            <CardDescription className="mb-6 text-center max-w-md">
              Create your first character to start working with the application.
            </CardDescription>
            <NavLink to="/create-character">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Character
              </Button>
            </NavLink>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {characters.map((char) => (
            <NavLink
              to={`/character/${char.id}`}
              key={char.id}
              className="block"
            >
              <Card className="flex flex-row gap-4 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-muted h-[140px] w-full cursor-pointer">
                <div className="flex-shrink-0 w-32 h-full rounded-xl overflow-hidden bg-muted">
                  {char.character_picture ? (
                    <img
                      src={char.character_picture}
                      alt={char.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
                      <User className="h-10 w-10 text-muted-foreground opacity-50" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0">
                      <CardTitle
                        title={char.name}
                        className="text-base truncate"
                      >
                        {char.name}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2 text-muted-foreground">
                        {char.description}
                      </CardDescription>
                    </div>

                    <div onClick={stopPropagation}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(char.id)}
                            className="text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-muted-foreground">
                      Created:{" "}
                      {new Date(char.createdAt || "").toLocaleDateString()}
                    </div>
                    <div className="flex gap-1" onClick={stopPropagation}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-60 hover:opacity-100"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-60 hover:opacity-100"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainContent;
