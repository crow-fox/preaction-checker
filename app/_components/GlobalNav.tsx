"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import ActionIcon from "@/app/_components/icons/ActionIcon";
import TemplateIcon from "@/app/_components/icons/TemplateIcon";

const GlobalNav: FC = () => {
  const pathname = usePathname();
  const isRootActionPage = pathname === "/";
  const isRootTemplatePage = pathname === "/templates";
  const isActionPage = isRootActionPage || pathname.startsWith("/actions");
  const isTemplatePage =
    isRootTemplatePage || pathname.startsWith("/templates");

  return (
    <nav className="me-auto ms-auto mt-4 box-content max-w-container pe-4 ps-4">
      <ul className="flex gap-6">
        <li>
          <Link
            href="/"
            className={` flex items-center gap-1 rounded-t border-b-4 py-2 font-bold ${
              isActionPage ? "border-black" : "border-transparent"
            } `}
            aria-current={isRootActionPage ? "page" : undefined}
          >
            <ActionIcon />
            <span className=" hidden sm:inline-block">アクション</span>
          </Link>
        </li>
        <li>
          <Link
            href="/templates"
            className={`flex items-center gap-1 rounded-t border-b-4 py-2 font-bold ${
              isTemplatePage ? "border-black" : "border-transparent"
            }`}
            aria-current={isRootTemplatePage ? "page" : undefined}
          >
            <TemplateIcon />
            <span className="hidden sm:inline-block">テンプレート</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default GlobalNav;
