<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { AuthService } from "@/services/auth.service";

  const authService = new AuthService();

  let email = $state("");
  let password = $state("");
  let name = $state("");
  let confirmPassword = $state("");
  let agreeToTerms = $state(false);
  let isLoading = $state(false);

  // Form validation states
  let emailError = $state("");
  let passwordError = $state("");
  let confirmPasswordError = $state("");
  let termsError = $state("");

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  // Real-time validation
  $effect(() => {
    if (email && !validateEmail(email)) {
      emailError = "Please enter a valid email address";
    } else {
      emailError = "";
    }
  });

  $effect(() => {
    if (password && !validatePassword(password)) {
      passwordError = "Password must be at least 8 characters long";
    } else {
      passwordError = "";
    }
  });

  $effect(() => {
    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordError = "Passwords do not match";
    } else {
      confirmPasswordError = "";
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors
    emailError = "";
    passwordError = "";
    confirmPasswordError = "";
    termsError = "";

    // Validate all fields
    let hasErrors = false;

    if (!email) {
      emailError = "Email is required";
      hasErrors = true;
    } else if (!validateEmail(email)) {
      emailError = "Please enter a valid email address";
      hasErrors = true;
    }

    if (!password) {
      passwordError = "Password is required";
      hasErrors = true;
    } else if (!validatePassword(password)) {
      passwordError = "Password must be at least 8 characters long";
      hasErrors = true;
    }

    if (!confirmPassword) {
      confirmPasswordError = "Please confirm your password";
      hasErrors = true;
    } else if (password !== confirmPassword) {
      confirmPasswordError = "Passwords do not match";
      hasErrors = true;
    }

    if (!agreeToTerms) {
      termsError = "You must agree to the terms and conditions";
      hasErrors = true;
    }

    if (hasErrors) return;

    isLoading = true;

    try {
      await authService.createUser(email, password, name, "");
      // Handle successful signup
      console.log("Account created successfully!", { email });

      // Reset form
      email = "";
      password = "";
      confirmPassword = "";
      agreeToTerms = false;
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      isLoading = false;
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Sign up with ${provider}`);
  };
</script>

<svelte:head>
  <title>Sign Up - Join Us Today</title>
  <meta
    name="description"
    content="Create your account and get exclusive access to our features"
  />
</svelte:head>

<div class="w-full max-w-md space-y-6">
  <!-- Social Sign Up Options -->
  <div class="space-y-3">
    <Button
      variant="outline"
      class="w-full"
      onclick={() => handleSocialSignup("Google")}
      disabled={isLoading}
    >
      <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Continue with Google
    </Button>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t border-border"></span>
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground"
          >Or continue with email</span
        >
      </div>
    </div>
  </div>

  <!-- Sign Up Form -->
  <Card>
    <CardHeader class="space-y-1">
      <CardTitle class="text-2xl text-center">Create Account</CardTitle>
      <CardDescription class="text-center">
        Enter your details below to create your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onsubmit={handleSubmit} class="space-y-4">
        <!-- Email Field -->
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            bind:value={email}
            class={emailError ? "border-destructive" : ""}
            disabled={isLoading}
          />
          {#if emailError}
            <p class="text-sm text-destructive">{emailError}</p>
          {/if}
        </div>
        <!-- Name Field -->
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            bind:value={name}
            disabled={isLoading}
          />
        </div>

        <!-- Password Field -->
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            bind:value={password}
            class={passwordError ? "border-destructive" : ""}
            disabled={isLoading}
          />
          {#if passwordError}
            <p class="text-sm text-destructive">{passwordError}</p>
          {/if}
        </div>

        <!-- Confirm Password Field -->
        <div class="space-y-2">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            bind:value={confirmPassword}
            class={confirmPasswordError ? "border-destructive" : ""}
            disabled={isLoading}
          />
          {#if confirmPasswordError}
            <p class="text-sm text-destructive">{confirmPasswordError}</p>
          {/if}
        </div>

        <!-- Terms and Conditions -->
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <Checkbox
              id="terms"
              bind:checked={agreeToTerms}
              disabled={isLoading}
            />
            <Label
              for="terms"
              class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the <a
                href="/terms"
                class="text-primary hover:underline">Terms and Conditions</a
              >
              and
              <a href="/privacy" class="text-primary hover:underline"
                >Privacy Policy</a
              >
            </Label>
          </div>
          {#if termsError}
            <p class="text-sm text-destructive">{termsError}</p>
          {/if}
        </div>

        <!-- Submit Button -->
        <Button type="submit" class="w-full" disabled={isLoading}>
          {#if isLoading}
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creating Account...
          {:else}
            Create Account
          {/if}
        </Button>
      </form>

      <!-- Sign In Link -->
      <div class="mt-6 text-center">
        <p class="text-sm text-muted-foreground">
          Already have an account?
          <a href="/signin" class="text-primary hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </CardContent>
  </Card>
</div>
