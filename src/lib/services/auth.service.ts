import { goto } from "$app/navigation";
import { authClient } from "@/auth/auth-client";

import { toast } from "svelte-sonner";

export class AuthService {
  async createUser(
    email: string,
    password: string,
    name: string,
    image: string
  ) {
    try {
      await authClient.signUp.email(
        {
          email, // user email address
          password, // user password -> min 8 characters by default
          name, // user display name
          image, // User image URL (optional)
          callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
        },
        {
          onSuccess: (ctx) => {
            toast.success(
              "Account created! Please check your email to verify."
            );
            goto("/login");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
            throw new Error(ctx.error.message);
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async loginUser({ email, password }: { email: string; password: string }) {
    try {
      await authClient.signIn.email(
        {
          email, // user email address
          password, // user password
          callbackURL: "/dashboard", // A URL to redirect to after the user signs in (optional)
        },
        {
          onSuccess: (ctx) => {
            toast.success("Logged in successfully!");
            goto("/dashboard");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
            throw new Error(ctx.error.message);
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async logoutUser() {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            goto("/login"); // redirect to login page
          },
        },
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
}
