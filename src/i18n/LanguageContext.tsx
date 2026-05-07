import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import en from "./en.json";
import id from "./id.json";

export type Lang = "id" | "en";
export type Dict = typeof id;

const DICTS: Record<Lang, Dict> = { id, en };
const STORAGE_KEY = "indomover.lang";

type Ctx = {
	lang: Lang;
	setLang: (l: Lang) => void;
	t: Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

function readInitial(): Lang {
	if (typeof window === "undefined") return "id";
	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === "id" || stored === "en") return stored;
	return "id";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [lang, setLangState] = useState<Lang>(readInitial);

	useEffect(() => {
		document.documentElement.lang = lang;
		window.localStorage.setItem(STORAGE_KEY, lang);
	}, [lang]);

	const setLang = useCallback((l: Lang) => setLangState(l), []);

	const value = useMemo<Ctx>(() => ({ lang, setLang, t: DICTS[lang] }), [lang, setLang]);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
	return ctx;
}
