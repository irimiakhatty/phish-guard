"use client";

import Image from "next/image";
import { Menu, Globe, Moon, Sun } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useLanguage } from "~/lib/LanguageContext";
import { useTheme } from "~/lib/ThemeContext";
import { useUser, useClerk } from "@clerk/nextjs";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const { signOut } = useClerk();

  const userName = user?.fullName ?? user?.firstName ?? (language === 'ro' ? 'Utilizator' : 'User');
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userImage = user?.imageUrl;
  const planType = user?.publicMetadata?.plan as string ?? "free";

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
              <Image
                src="/logo.png"
                alt="PhishGuard Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">PhishGuard</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.header.tagline}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant={currentView === "dashboard" ? "secondary" : "ghost"}
              onClick={() => onViewChange("dashboard")}
              className="dark:text-gray-300"
            >
              {t.header.dashboard}
            </Button>
            <Button
              variant={currentView === "analyze" ? "secondary" : "ghost"}
              onClick={() => onViewChange("analyze")}
              className="dark:text-gray-300"
            >
              {t.header.analyze}
            </Button>
            <Button
              variant={currentView === "pricing" ? "secondary" : "ghost"}
              onClick={() => onViewChange("pricing")}
              className="dark:text-gray-300"
            >
              {t.header.pricing}
            </Button>
          </nav>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 dark:text-gray-300">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'ro' ? 'RO' : 'EN'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuItem onClick={() => setLanguage('ro')} className={`dark:text-gray-300 dark:hover:bg-gray-700 ${language === 'ro' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                🇷🇴 Română
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')} className={`dark:text-gray-300 dark:hover:bg-gray-700 ${language === 'en' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" className="gap-2 dark:text-gray-300" onClick={toggleTheme}>
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </Button>

          <div className="hidden md:block text-right">
            <p className="text-sm text-gray-900 dark:text-white">{userName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {planType === "premium" ? t.header.premiumPlan : t.header.freePlan}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  {userImage && <AvatarImage src={userImage} alt={userName} />}
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuLabel className="dark:text-white">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{userName}</p>
                  {userEmail && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700">{t.header.settings}</DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700">{t.header.browserExtension}</DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700">{t.header.support}</DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem
                className="text-red-600 dark:text-red-400 dark:hover:bg-gray-700"
                onClick={() => void signOut()}
              >
                {t.header.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden dark:text-gray-300">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div >
    </header >
  );
}
