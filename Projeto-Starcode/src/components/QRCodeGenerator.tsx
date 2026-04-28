import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling, {
  DrawType,
  DotType,
  CornerSquareType,
  CornerDotType,
  FileExtension,
  ErrorCorrectionLevel,
  Mode
} from "qr-code-styling";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Settings2, Palette, Image as ImageIcon, RefreshCw, Cpu, Layout, Sparkles, Share2, ShieldCheck, MessageSquare, Send, Crown, CheckCircle2, Globe, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/lib/LanguageContext";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "svg" as DrawType,
  data: "https://starcode.systems",
  image: "",
  dotsOptions: {
    color: "#ffffff",
    type: "rounded" as DotType
  },
  backgroundOptions: {
    color: "transparent",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 10
  },
  qrOptions: {
    typeNumber: 0,
    mode: "Byte" as Mode,
    errorCorrectionLevel: "Q" as ErrorCorrectionLevel
  }
});

export default function QRCodeGenerator() {
  const { t } = useLanguage();
  const [url, setUrl] = useState("https://starcode.systems");
  const [fileExt, setFileExt] = useState<FileExtension>("png");
  const [size, setSize] = useState(300);
  const [margin, setMargin] = useState(20);
  const [dotType, setDotType] = useState<DotType>("rounded");
  const [dotColor, setDotColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#00000000");
  const [cornerSquareType, setCornerSquareType] = useState<CornerSquareType>("extra-rounded");
  const [cornerSquareColor, setCornerSquareColor] = useState("#ffffff");
  const [cornerDotType, setCornerDotType] = useState<CornerDotType>("dot");
  const [cornerDotColor, setCornerDotColor] = useState("#ffffff");
  const [logo, setLogo] = useState("");
  const [logoSize, setLogoSize] = useState(0.4);
  const [logoMargin, setLogoMargin] = useState(10);
  
  // Advanced Features
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>("Q");
  const [isPro, setIsPro] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
      width: size,
      height: size,
      margin: margin,
      dotsOptions: {
        color: dotColor,
        type: dotType
      },
      backgroundOptions: {
        color: bgColor,
      },
      cornersSquareOptions: {
        color: cornerSquareColor,
        type: cornerSquareType
      },
      cornersDotOptions: {
        color: cornerDotColor,
        type: cornerDotType
      },
      image: logo,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: logoSize,
        margin: logoMargin,
        crossOrigin: "anonymous"
      },
      qrOptions: {
        errorCorrectionLevel: errorLevel
      }
    });
  }, [url, size, margin, dotType, dotColor, bgColor, cornerSquareType, cornerSquareColor, cornerDotType, cornerDotColor, logo, logoSize, logoMargin, errorLevel]);

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const shareQR = async () => {
    try {
      const blob = await qrCode.getRawData("png");
      if (!blob) return;
      const file = new File([blob], "starcode-qr.png", { type: "image/png" });
      
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: "My StarCode QR",
          text: "Check out this custom QR code I generated with StarCode!"
        });
      } else {
        setShowShareModal(true);
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* Left Panel: Configuration */}
      <div className="xl:col-span-8 space-y-8">
        <div className="glass-panel p-8 space-y-8 relative overflow-hidden">
          {!isPro && (
            <div className="absolute top-4 right-4 z-20">
              <Button 
                onClick={() => setIsPro(true)}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-black font-black text-[10px] uppercase tracking-widest h-8 px-4 rounded-full star-glow border-none"
              >
                <Crown className="w-3 h-3 mr-2" /> {t.upgradePro}
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold tracking-tight uppercase">{t.configModule}</h2>
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="url" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              {t.targetPayload}
            </Label>
            <div className="relative">
              <Input
                id="url"
                placeholder="https://starcode.systems"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-14 bg-white/5 border-white/10 text-lg font-mono focus:ring-primary/50 focus:border-primary transition-all pl-12"
              />
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <Tabs defaultValue="geometry" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl mb-8">
              <TabsTrigger value="geometry" className="flex-1 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all rounded-lg py-2">
                <Layout className="w-4 h-4" /> {t.geometry}
              </TabsTrigger>
              <TabsTrigger value="spectrum" className="flex-1 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all rounded-lg py-2">
                <Palette className="w-4 h-4" /> {t.spectrum}
              </TabsTrigger>
              <TabsTrigger value="branding" className="flex-1 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all rounded-lg py-2">
                <ImageIcon className="w-4 h-4" /> {t.branding}
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex-1 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all rounded-lg py-2">
                <ShieldCheck className="w-4 h-4" /> {t.advanced}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="geometry" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.resolution}</Label>
                    <span className="text-xs font-mono text-primary">{size}px</span>
                  </div>
                  <Slider value={[size]} min={100} max={1000} step={10} onValueChange={(val) => setSize(val[0])} />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.margin}</Label>
                    <span className="text-xs font-mono text-primary">{margin}px</span>
                  </div>
                  <Slider value={[margin]} min={0} max={100} step={1} onValueChange={(val) => setMargin(val[0])} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.matrixPattern}</Label>
                  <Select value={dotType} onValueChange={(val: DotType) => setDotType(val)}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10">
                      <SelectItem value="rounded">Rounded</SelectItem>
                      <SelectItem value="dots">Dots</SelectItem>
                      <SelectItem value="classy">Classy</SelectItem>
                      <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.anchorFrame}</Label>
                  <Select value={cornerSquareType} onValueChange={(val: CornerSquareType) => setCornerSquareType(val)}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10">
                      <SelectItem value="dot">Dot</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.anchorCore}</Label>
                  <Select value={cornerDotType} onValueChange={(val: CornerDotType) => setCornerDotType(val)}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10">
                      <SelectItem value="dot">Dot</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="spectrum" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.matrixColor}</Label>
                  <div className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                      <Input type="color" value={dotColor} onChange={(e) => setDotColor(e.target.value)} className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer" />
                    </div>
                    <Input type="text" value={dotColor} onChange={(e) => setDotColor(e.target.value)} className="flex-1 bg-white/5 border-white/10 font-mono" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.canvasColor}</Label>
                  <div className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                      <Input type="color" value={bgColor === "transparent" ? "#000000" : bgColor} onChange={(e) => setBgColor(e.target.value)} className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer" />
                    </div>
                    <div className="flex-1 flex gap-2">
                      <Input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1 bg-white/5 border-white/10 font-mono" />
                      <Button variant="outline" size="sm" onClick={() => setBgColor("transparent")} className="text-[10px] uppercase font-bold border-white/10">Clear</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="branding" className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-4">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.assetInjection}</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative group">
                    <Input type="file" accept="image/*" onChange={handleLogoUpload} className="cursor-pointer bg-white/5 border-white/10 h-14 pl-12 pt-4" />
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  {logo && (
                    <Button variant="destructive" size="icon" onClick={() => setLogo("")} className="h-14 w-14 rounded-xl">
                      <RefreshCw className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>

              {logo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.assetScale}</Label>
                      <span className="text-xs font-mono text-primary">{Math.round(logoSize * 100)}%</span>
                    </div>
                    <Slider value={[logoSize]} min={0.1} max={0.5} step={0.01} onValueChange={(val) => setLogoSize(val[0])} />
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.assetPadding}</Label>
                      <span className="text-xs font-mono text-primary">{logoMargin}px</span>
                    </div>
                    <Slider value={[logoMargin]} min={0} max={50} step={1} onValueChange={(val) => setLogoMargin(val[0])} />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="advanced" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.errorLevel}</Label>
                  <Select value={errorLevel} onValueChange={(val: ErrorCorrectionLevel) => setErrorLevel(val)}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10">
                      <SelectItem value="L">Level L (7% Recovery)</SelectItem>
                      <SelectItem value="M">Level M (15% Recovery)</SelectItem>
                      <SelectItem value="Q">Level Q (25% Recovery)</SelectItem>
                      <SelectItem value="H">Level H (30% Recovery)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Higher levels allow for more complex logos but increase QR density.</p>
                </div>

                <div className="space-y-3 relative">
                  {!isPro && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-lg border border-dashed border-primary/30">
                      <Lock className="w-4 h-4 text-primary mb-1" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-primary">{t.proFeature}</span>
                    </div>
                  )}
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.dynamicInjection}</Label>
                  <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg opacity-50">
                    <RefreshCw className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Auto-update from API endpoint</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" /> {t.proAdvantages}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-primary" /> {feature}
                    </div>
                  ))}
                </div>
                {!isPro && (
                  <Button 
                    onClick={() => setIsPro(true)}
                    className="w-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] h-12 mt-4"
                  >
                    {t.unlockPro}
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Support & Feedback Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-6 border-primary/10 hover:border-primary/30 transition-all cursor-pointer group"
            onClick={() => window.open("https://wa.me/yournumber", "_blank")}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest">{t.directSupport}</h4>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.whatsAppHelp}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-6 border-primary/10 hover:border-primary/30 transition-all cursor-pointer group"
            onClick={() => setShowFeedback(true)}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <Send className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest">{t.feedbackLoop}</h4>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.evolveEngine}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel: Output */}
      <div className="xl:col-span-4">
        <div className="sticky top-28 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-panel p-8 flex flex-col items-center justify-center min-h-[460px] relative group overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-xl" />
              
              <div className="relative z-10 transition-all duration-500 group-hover:scale-105 group-hover:star-glow p-4 bg-white/5 rounded-2xl border border-white/10">
                <div ref={ref} />
              </div>

              <div className="mt-10 w-full space-y-4 relative z-10">
                <div className="flex gap-3">
                  <Select value={fileExt} onValueChange={(val: FileExtension) => setFileExt(val)}>
                    <SelectTrigger className="w-[100px] bg-white/5 border-white/10 h-12 font-mono text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10">
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="webp">WEBP</SelectItem>
                      <SelectItem value="svg">SVG</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={onDownloadClick} className="flex-1 h-12 gap-3 font-bold uppercase tracking-[0.2em] star-glow">
                    <Download className="w-4 h-4" /> {t.export}
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={shareQR}
                  className="w-full h-12 gap-3 font-bold uppercase tracking-[0.2em] border-white/10 hover:bg-white/5"
                >
                  <Share2 className="w-4 h-4" /> {t.shareQR}
                </Button>

                <div className="flex items-center justify-center gap-2 text-[9px] text-muted-foreground uppercase tracking-widest font-mono">
                  <Sparkles className="w-3 h-3 text-primary" /> {t.productionReady}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="glass-panel p-6 border-primary/20 bg-primary/5">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Settings2 className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary">{t.optimizationProtocol}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider">
                  {t.optimizationDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-panel p-8 max-w-sm w-full space-y-6 text-center"
              onClick={e => e.stopPropagation()}
            >
              <Share2 className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-xl font-bold uppercase tracking-tight">{t.shareProtocol}</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider leading-relaxed">
                {t.shareError}
              </p>
              <Button onClick={() => setShowShareModal(false)} className="w-full h-12 font-bold uppercase tracking-widest">
                {t.understood}
              </Button>
            </motion.div>
          </motion.div>
        )}

        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowFeedback(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-panel p-8 max-w-md w-full space-y-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <Send className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold uppercase tracking-tight">{t.feedbackLoop}</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.message}</Label>
                  <textarea 
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:ring-primary/50 focus:border-primary transition-all outline-none resize-none"
                    placeholder={t.feedbackPlaceholder}
                  />
                </div>
                <Button onClick={() => setShowFeedback(false)} className="w-full h-12 font-bold uppercase tracking-widest gap-2">
                  <Send className="w-4 h-4" /> {t.transmitFeedback}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

