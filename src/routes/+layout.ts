import { AuthService } from "@/services/auth.service";
import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
  const authService = new AuthService();
  return {
    authService,
  };
};
