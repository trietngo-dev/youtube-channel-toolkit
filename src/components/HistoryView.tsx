import React, { useState } from "react";
import { Search, Star, Download, Trash2, Layers } from "lucide-react";
import { GeneratedShortsIdea } from "../types";
import { PromptOutputCard } from "./PromptOutputCard";
import { ExportService } from "../services/exportService";

interface HistoryViewProps {
  ideas: GeneratedShortsIdea[];
  onToggleFavorite: (id: string) => void;
  onDeleteIdea: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  ideas,
  onToggleFavorite,
  onDeleteIdea,
  onClearAll,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const filteredIdeas = ideas.filter((item) => {
    const matchesFav = onlyFavorites ? item.isFavorite : true;
    const matchesSearch =
      searchTerm === "" ||
      item.conceptTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.config?.fruit?.nameVi
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.config?.fruit?.nameEn
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.config?.gemstone?.nameVi
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.config?.gemstone?.nameEn
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesFav && matchesSearch;
  });

  const handleExportAll = () => {
    if (filteredIdeas.length === 0) return;
    ExportService.exportToCSV(
      filteredIdeas,
      `gemstone_history_${Date.now()}.csv`,
    );
  };

  const handleExportJSON = () => {
    if (filteredIdeas.length === 0) return;
    ExportService.exportToJSON(
      filteredIdeas,
      `gemstone_history_${Date.now()}.json`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Search & Action Bar */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên quả, đá quý, concept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-slate-900 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* Favorite filter toggle */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
              onlyFavorites
                ? "bg-amber-50 border-amber-300 text-amber-800"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Star
              className={`w-3.5 h-3.5 ${onlyFavorites ? "fill-amber-500 text-amber-500" : ""}`}
            />
            <span>Mục Yêu Thích</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportAll}
            disabled={filteredIdeas.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất CSV ({filteredIdeas.length})</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            disabled={filteredIdeas.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors disabled:opacity-40"
          >
            <span>JSON</span>
          </button>

          {/* Clear All */}
          {ideas.length > 0 && (
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Bạn có chắc chắn muốn xóa toàn bộ lịch sử này không?",
                  )
                ) {
                  onClearAll();
                }
              }}
              title="Xóa toàn bộ lịch sử"
              className="p-2 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* List of Prompt Output Cards */}
      {filteredIdeas.length === 0 ? (
        <div className="p-16 rounded-xl bg-white border border-dashed border-slate-300 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            Không có kịch bản nào phù hợp
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm || onlyFavorites
              ? "Thử thay đổi từ khóa tìm kiếm hoặc bỏ bộ lọc yêu thích."
              : 'Hãy chuyển sang tab "Tạo Đơn Lẻ" hoặc "Hàng Đợi Batch" để bắt đầu sinh các ý tưởng Shorts đầu tiên!'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredIdeas.map((idea) => (
            <PromptOutputCard
              key={idea.id}
              idea={idea}
              onToggleFavorite={onToggleFavorite}
              onDelete={onDeleteIdea}
            />
          ))}
        </div>
      )}
    </div>
  );
};
