import { Shield, Menu, Globe, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage } from "../lib/LanguageContext";
import { useTheme } from "../lib/ThemeContext";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userName?: string;
  planType?: "free" | "premium";
}

export function Header({ currentView, onViewChange, userName, planType = "premium" }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const defaultUserName = userName || (language === 'ro' ? 'Utilizator' : 'User');
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white">PhishGuard</h1>
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
            <p className="text-sm text-gray-900 dark:text-white">{defaultUserName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {planType === "premium" ? t.header.premiumPlan : t.header.freePlan}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    {defaultUserName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuLabel className="dark:text-white">{t.header.myAccount}</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700">{t.header.settings}</DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700">{t.header.browserExtension}</DropdownMenuItem>
              <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700">{t.header.support}</DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem className="text-red-600 dark:text-red-400 dark:hover:bg-gray-700">{t.header.logout}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden dark:text-gray-300">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}