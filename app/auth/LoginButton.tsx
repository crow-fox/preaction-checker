"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth as AuthLogin } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { appConfig } from "@/app/_consts/appConfig";

export default function LoginButton() {
  const supabase = createClientComponentClient();

  return (
    <AuthLogin
      appearance={{
        theme: ThemeSupa,
        extend: false,
        className: {
          button:
            "flex items-center justify-center w-full rounded border border-gray-600 bg-white px-4 py-2 font-bold",
        },
      }}
      localization={{
        variables: {
          sign_up: {
            loading_button_label: "Signing up ...",
            social_provider_text: "{{provider}}でログイン",
          },
          sign_in: {
            loading_button_label: "Signing in ...",
            social_provider_text: "{{provider}}でログイン",
          },
        },
      }}
      supabaseClient={supabase}
      providers={["google"]}
      onlyThirdPartyProviders={true}
      redirectTo={new URL("/auth/callback", appConfig.url).toString()}
    />
  );
}
