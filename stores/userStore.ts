import { defineStore } from "pinia";
export type Bookmark = {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  id: number
};

export const useUsersStore = defineStore("user", async () => {
  const client = useSupabaseAuthClient();
  const user = useSupabaseUser();

  const { data: bookmarks, error } = await client
    .from("user_bookmarks")
    .select("bookmarks")
    .eq("user", user.value?.id);
  return { bookmarks, error };
});
