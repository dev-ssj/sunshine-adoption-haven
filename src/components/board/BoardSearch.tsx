
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface BoardSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const BoardSearch = ({ searchTerm, onSearchChange }: BoardSearchProps) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        placeholder="게시글을 검색해보세요..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-3 w-full max-w-md rounded-xl border-gray-200"
      />
    </div>
  );
};

export default BoardSearch;
