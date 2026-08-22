import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Dices, Sparkles, Wand2, Check, RefreshCw, Layers } from "lucide-react";
import {
  CATEGORIES,
  FRUITS,
  MATERIALS_BY_CATEGORY,
  FILLINGS_BY_CATEGORY,
  TOOLS,
  AESTHETICS,
  VIDEO_PLATFORMS,
} from "../data/gemstoneMatrix";
import {
  ItemCategory,
  SubjectItem,
  GemstoneItem,
  FluidItem,
  ToolItem,
  AestheticStyle,
  GenerationConfig,
} from "../types";

interface MatrixSelectorProps {
  onGenerate: (config: GenerationConfig) => void;
  isLoading: boolean;
}

export const MatrixSelector: React.FC<MatrixSelectorProps> = ({
  onGenerate,
  isLoading,
}) => {
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("fruit");
  const [selectedFruit, setSelectedFruit] = useState<SubjectItem>(FRUITS[0]); // Avocado
  const [selectedGemstone, setSelectedGemstone] = useState<GemstoneItem>(
    MATERIALS_BY_CATEGORY.fruit[0],
  ); // Ruby
  const [selectedFluid, setSelectedFluid] = useState<FluidItem>(
    FILLINGS_BY_CATEGORY.fruit[0],
  ); // Honey
  const [selectedTool, setSelectedTool] = useState<ToolItem>(TOOLS[0]); // Chef knife
  const [selectedStyle, setSelectedStyle] = useState<AestheticStyle>(
    AESTHETICS[0],
  ); // Dark slate
  const [selectedPlatform, setSelectedPlatform] =
    useState<string>("gemini_veo");
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9" | "1:1">(
    "9:16",
  );
  const [customNotes, setCustomNotes] = useState<string>("");

  // Search states
  const [fruitSearch, setFruitSearch] = useState("");
  const [gemSearch, setGemSearch] = useState("");

  // Category specific materials & fillings
  const currentMaterials =
    MATERIALS_BY_CATEGORY[activeCategory] || MATERIALS_BY_CATEGORY.fruit;
  const currentFillings =
    FILLINGS_BY_CATEGORY[activeCategory] || FILLINGS_BY_CATEGORY.fruit;

  // Filter subjects by active category and search keyword
  const categoryFilteredFruits = FRUITS.filter(
    (f) => f.category === activeCategory,
  );

  const displayedFruits = categoryFilteredFruits.filter(
    (f) =>
      f.nameVi.toLowerCase().includes(fruitSearch.toLowerCase()) ||
      f.nameEn.toLowerCase().includes(fruitSearch.toLowerCase()),
  );

  const filteredGems = currentMaterials.filter(
    (g) =>
      g.nameVi.toLowerCase().includes(gemSearch.toLowerCase()) ||
      g.nameEn.toLowerCase().includes(gemSearch.toLowerCase()),
  );

  // Handle switching category
  const handleSelectCategory = (catId: ItemCategory) => {
    setActiveCategory(catId);
    setFruitSearch("");
    setGemSearch("");
    const firstInCat = FRUITS.find((f) => f.category === catId);
    if (firstInCat) {
      setSelectedFruit(firstInCat);
    }
    const catMaterials = MATERIALS_BY_CATEGORY[catId];
    if (catMaterials && catMaterials.length > 0) {
      setSelectedGemstone(catMaterials[0]);
    }
    const catFillings = FILLINGS_BY_CATEGORY[catId];
    if (catFillings && catFillings.length > 0) {
      setSelectedFluid(catFillings[0]);
    }
  };

  // Random Slot Machine Combo
  const handleRandomize = () => {
    // Pick random category or random item from all
    const randomFruit = FRUITS[Math.floor(Math.random() * FRUITS.length)];
    const cat = randomFruit.category || "fruit";
    setActiveCategory(cat);

    const catMaterials =
      MATERIALS_BY_CATEGORY[cat] || MATERIALS_BY_CATEGORY.fruit;
    const catFillings = FILLINGS_BY_CATEGORY[cat] || FILLINGS_BY_CATEGORY.fruit;

    const randomGem =
      catMaterials[Math.floor(Math.random() * catMaterials.length)];
    const randomFluid =
      catFillings[Math.floor(Math.random() * catFillings.length)];
    const randomTool = TOOLS[Math.floor(Math.random() * TOOLS.length)];
    const randomStyle =
      AESTHETICS[Math.floor(Math.random() * AESTHETICS.length)];

    setSelectedFruit(randomFruit);
    setSelectedGemstone(randomGem);
    setSelectedFluid(randomFluid);
    setSelectedTool(randomTool);
    setSelectedStyle(randomStyle);

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: [randomGem.colorHex, "#0f172a", "#64748b"],
    });
  };

  const getCategoryMeta = (cat: ItemCategory) => {
    switch (cat) {
      case "tech_jelly":
        return {
          box2Title: "⚡ 2. Chất Liệu Vỏ & Màu Sắc",
          box2Search: "Tìm chất liệu (Neon, Thạch anh, Pha lê, Xà cừ...)",
          box3Title: "💡 3. Lõi Vi Mạch & Dòng Điện Lỏng",
        };
      case "cosmic_planet":
        return {
          box2Title: "🌌 2. Chất Liệu Bề Mặt & Khí Quyển",
          box2Search:
            "Tìm chất liệu (Sapphire, Moonstone, Carnelian, Obsidian...)",
          box3Title: "🌠 3. Lõi Dung Nham, Khí Tinh Vân & Bụi Sao",
        };
      case "illusion_cake":
        return {
          box2Title: "🧱 2. Bề Mặt Đánh Lừa Thị Giác",
          box2Search: "Tìm chất liệu (Vàng đúc, Gạch nung, Gỗ, Bê tông...)",
          box3Title: "🍫 3. Cốt Bánh, Kem Cheese & Ruy-băng Sáp",
        };
      case "dragon_egg":
        return {
          box2Title: "🥚 2. Loại Vỏ Vảy & Hóa Thạch",
          box2Search: "Tìm vỏ trứng (Băng tuyết, Hỏa diệm, Hổ phách, Titan...)",
          box3Title: "🔥 3. Lòng Đỏ Hoàng Kim, Khói Băng & Thạch Nhũ",
        };
      case "ocean_crystal":
        return {
          box2Title: "🐚 2. Chất Liệu Xà Cừ & Thủy Tinh Biển",
          box2Search: "Tìm chất liệu (Xà cừ, Ngọc trai, Aquamarine, San hô...)",
          box3Title: "🌊 3. Bọt Sóng Đại Dương, Ngọc Trai & Gel Biển",
        };
      default:
        return {
          box2Title: "💎 2. Loại Đá Quý / Ngọc",
          box2Search: "Tìm đá quý (Ruby, Sapphire, Emerald, Opal...)",
          box3Title: "🍯 3. Mật & Dịch Vàng Chảy Tràn",
        };
    }
  };

  const catMeta = getCategoryMeta(activeCategory);

  const handleStartGeneration = () => {
    const config: GenerationConfig = {
      category: activeCategory,
      fruit: selectedFruit,
      gemstone: selectedGemstone,
      fluid: selectedFluid,
      tool: selectedTool,
      style: selectedStyle,
      videoPlatform: selectedPlatform,
      aspectRatio,
      customNotes: customNotes.trim() || undefined,
      language: "both",
    };
    onGenerate(config);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Quick Summary & Action Buttons */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{selectedFruit.emoji}</span>
            <h2 className="text-base font-bold text-slate-900">
              {selectedFruit.nameVi} {selectedGemstone.nameVi}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              ({selectedGemstone.nameEn})
            </span>
          </div>
          <p className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-slate-700">
              <span
                className="w-2.5 h-2.5 rounded-full border border-slate-300"
                style={{ backgroundColor: selectedGemstone.colorHex }}
              />
              {selectedGemstone.nameVi}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-medium">
              {selectedFluid.nameVi}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700">{selectedTool.nameVi}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{selectedStyle.nameVi}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Random Slot Machine button */}
          <button
            onClick={handleRandomize}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold shadow-sm transition-colors"
          >
            <Dices className="w-4 h-4 text-slate-700" />
            <span>Xúc Xắc Random</span>
          </button>

          {/* Generate Trigger Button (Solid Black) */}
          <button
            onClick={handleStartGeneration}
            disabled={isLoading}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Gemini Đang Xử Lý...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Sinh Prompt AI Ngay</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 6 Satisfying Categories Switcher Bar */}
      <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-700" />
            <span>Chủ Đề Cắt Thỏa Mãn (6 Danh Mục Oddly Satisfying ASMR):</span>
          </label>
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            Bấm chọn để lọc nhanh danh sách vật thể & kịch bản tương ứng
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                title={`${cat.nameVi} (${cat.nameEn}): ${cat.description}`}
                className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1 min-w-0 overflow-hidden ${
                  isActive
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm ring-1 ring-slate-900"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs min-w-0 overflow-hidden">
                  <span className="text-base shrink-0">{cat.emoji}</span>
                  <span className="truncate block flex-1">{cat.nameVi}</span>
                </div>
                <span
                  className={`text-[10px] truncate block ${isActive ? "text-slate-300" : "text-slate-500"}`}
                >
                  {cat.nameEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Selector Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Category 1: SUBJECT (Trái Cây, Công Nghệ, Hành Tinh, Bánh, Trứng, Đại Dương) */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>
                {CATEGORIES.find((c) => c.id === activeCategory)?.emoji || "✨"}{" "}
                1. Vật Thể ({displayedFruits.length} mẫu)
              </span>
            </label>
            <span className="text-xs font-semibold text-slate-700">
              {selectedFruit.nameVi}
            </span>
          </div>

          <input
            type="text"
            placeholder={`Tìm trong ${CATEGORIES.find((c) => c.id === activeCategory)?.nameVi.toLowerCase()}...`}
            value={fruitSearch}
            onChange={(e) => setFruitSearch(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
          />

          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {displayedFruits.map((fruit) => {
              const isSelected = fruit.id === selectedFruit.id;
              return (
                <button
                  key={fruit.id}
                  onClick={() => setSelectedFruit(fruit)}
                  className={`p-2 rounded-lg text-left transition-colors flex flex-col items-center justify-center gap-1 border text-xs ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white font-bold shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-xl">{fruit.emoji}</span>
                  <span className="text-[11px] truncate w-full text-center">
                    {fruit.nameVi}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200 line-clamp-2">
            💡 {selectedFruit.typicalStructure}
          </p>
        </div>

        {/* Category 2: GEMSTONE / MATERIAL */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>
                {catMeta.box2Title} ({currentMaterials.length} loại)
              </span>
            </label>
            <span className="text-xs font-semibold text-slate-700">
              {selectedGemstone.nameVi}
            </span>
          </div>

          <input
            type="text"
            placeholder={catMeta.box2Search}
            value={gemSearch}
            onChange={(e) => setGemSearch(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
          />

          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {filteredGems.map((gem) => {
              const isSelected = gem.id === selectedGemstone.id;
              return (
                <button
                  key={gem.id}
                  onClick={() => setSelectedGemstone(gem)}
                  className={`p-2 rounded-lg text-left transition-colors flex items-center gap-2 border text-xs ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white font-bold shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0 border border-slate-300"
                    style={{ backgroundColor: gem.colorHex }}
                  />
                  <span className="text-[11px] truncate">{gem.nameVi}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200 line-clamp-2">
            ✨ {selectedGemstone.opticalProperty}
          </p>
        </div>

        {/* Category 3: FLUID / INTERNAL CORE */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>
                {catMeta.box3Title} ({currentFillings.length} hiệu ứng)
              </span>
            </label>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {currentFillings.map((fluid) => {
              const isSelected = fluid.id === selectedFluid.id;
              return (
                <button
                  key={fluid.id}
                  onClick={() => setSelectedFluid(fluid)}
                  className={`w-full p-2.5 rounded-lg text-left transition-colors border text-xs ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white font-semibold shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-slate-300"
                        style={{ backgroundColor: fluid.colorHex }}
                      />
                      {fluid.nameVi}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <p
                    className={`text-[10px] line-clamp-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}
                  >
                    {fluid.visualEffect}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category 4: CUTTING TOOL */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>🔪 4. Dụng Cụ Cắt & Lưỡi Dao</span>
            </label>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {TOOLS.map((tool) => {
              const isSelected = tool.id === selectedTool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={`w-full p-2.5 rounded-lg text-left transition-colors border text-xs ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white font-semibold shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[11px]">
                      {tool.nameVi}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <p
                    className={`text-[10px] line-clamp-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}
                  >
                    {tool.effectOnCut}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category 5: LIGHTING & AESTHETIC */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>🌌 5. Bối Cảnh & Ánh Sáng Macro</span>
            </label>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {AESTHETICS.map((style) => {
              const isSelected = style.id === selectedStyle.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`w-full p-2.5 rounded-lg text-left transition-colors border text-xs ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white font-semibold shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[11px]">
                      {style.nameVi}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <p
                    className={`text-[10px] line-clamp-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}
                  >
                    {style.lightingPrompt}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category 6: VIDEO PLATFORM & RATIO */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>🎬 6. Nền Tảng Video & Tỷ Lệ</span>
            </label>
          </div>

          <div className="space-y-2">
            {VIDEO_PLATFORMS.map((platform) => {
              const isSelected = platform.id === selectedPlatform;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`w-full p-2 rounded-lg text-left transition-colors border text-xs ${
                    isSelected
                      ? "bg-slate-900 border-slate-900 text-white font-semibold shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[11px]">
                      {platform.name}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Aspect Ratio Selector */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-600">
              Tỷ lệ khung hình:
            </span>
            <div className="flex gap-1.5">
              {(["9:16", "16:9", "1:1"] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md border transition-colors ${
                    aspectRatio === ratio
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {ratio} {ratio === "9:16" && "📱"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Notes input */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
        <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
          <Wand2 className="w-3.5 h-3.5 text-slate-700" />
          <span>Ghi chú bổ sung cho Gemini (Tùy chọn):</span>
        </label>
        <input
          type="text"
          value={customNotes}
          onChange={(e) => setCustomNotes(e.target.value)}
          placeholder="Ví dụ: Thêm hiệu ứng bốc khói đá khô, góc quay siêu cận cảnh macro 100mm, nhát cắt dứt khoát..."
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:border-slate-900 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
};
