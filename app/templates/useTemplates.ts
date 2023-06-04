"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/_components/UserProviderClient";
import { Database } from "@/app/_types/supabase";

export const useTemplates = () => {
  const supabase = createClientComponentClient<Database>();
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();
  const user = useUser();

  const addTemplate = async () => {
    if (!user) {
      setError("ユーザーが見つかりませんでした。");
      return;
    }

    const { data: template, error } = await supabase
      .from("templates")
      .insert({
        user_id: user.id,
      })
      .select("id")
      .single();

    if (error || !template) {
      setError("テンプレートの作成に失敗しました。");
      return;
    }

    router.push(`/templates/${template.id}`);
  };

  const deleteTemplate = async (id: string) => {
    const { error } = await supabase.from("templates").delete().eq("id", id);

    if (error) {
      setError(error.message);
    }

    console.log("削除 template");
    router.push("/templates");
  };

  return {
    error,
    addTemplate,
    deleteTemplate,
  };
};
