import QRCodeGenerator from "@/components/QRCodeGenerator";
import { Star, Github, Twitter, Zap, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StarCodeApp() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      {/* Background Stars Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-300" />
        <div className="absolute top-1/5 right-1/10 w-1 h-1 bg-white rounded-full animate-pulse delay-1000" />
      </div>

      <header className="relative z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center star-glow transition-transform group-hover:rotate-12">
              <Star className="text-primary-foreground w-6 h-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tighter text-2xl leading-none">{t.brand}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{t.tagline}</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:tracking-widest">{t.engine}</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:tracking-widest">{t.protocols}</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:tracking-widest">{t.network}</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
                <SelectTrigger className="w-[80px] bg-transparent border-none h-8 text-[10px] uppercase font-bold tracking-widest focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-white/10">
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="pt">PT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button className="p-2 text-muted-foreground hover:text-primary transition-colors hidden sm:block">
              <Github className="w-5 h-5" />
            </button>
            <button className="px-5 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">
              {t.connect}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 py-12 px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                <Zap className="w-3 h-3 fill-current" /> {t.nextGen}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.9]">
                {t.futureTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40 italic">{t.visualData}</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                {t.heroDesc}
              </p>
            </div>
            
            <div className="flex gap-4 text-xs font-mono text-muted-foreground border-l border-white/10 pl-8 hidden xl:flex">
              <div className="space-y-1">
                <p className="text-primary font-bold">{t.status}</p>
                <p>{t.operational}</p>
              </div>
              <div className="space-y-1">
                <p className="text-primary font-bold">{t.version}</p>
                <p>2.4.0-STAR</p>
              </div>
              <div className="space-y-1">
                <p className="text-primary font-bold">{t.latency}</p>
                <p>12ms</p>
              </div>
            </div>
          </div>

          <QRCodeGenerator />
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-black/20 py-16 mt-32">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Star className="text-primary w-6 h-6 fill-current" />
                <span className="font-bold tracking-tighter text-xl">{t.brand}</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                {t.footerDesc}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xs mb-6 uppercase tracking-[0.2em] text-primary">{t.resources}</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-white transition-colors">{t.documentation}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.apiRef}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.openSource}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs mb-6 uppercase tracking-[0.2em] text-primary">{t.social}</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Twitter className="w-4 h-4" /> Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4 text-[10px] text-muted-foreground uppercase tracking-widest">
            <p>© 2026 {t.brand} Systems. {t.rights}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.terms}</a>
              <a href="#" className="hover:text-white transition-colors">{t.security}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
