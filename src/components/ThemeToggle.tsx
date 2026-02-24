import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "motion/react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-16 h-8 rounded-full bg-muted flex items-center px-1 transition-colors hover:bg-muted/80 overflow-hidden"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-1"
                    >
                        <Moon className="h-6 w-6 text-foreground" fill="currentColor" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-1"
                    >
                        <Sun className="h-6 w-6 text-primary" fill="currentColor" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background elements for sky effect could be added here if needed */}
        </button>
    );
}
