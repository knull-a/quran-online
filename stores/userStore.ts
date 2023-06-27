import { defineStore } from "pinia";
type Bookmark = {
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
};

const client = useSupabaseAuthClient()

export const useUsersStore = defineStore("user", async () => {
  const { data: bookmarks, error } = await client.from("user_bookmarks").select("*");

  const userBookmarks = ref<Bookmark[]>([]);
});
