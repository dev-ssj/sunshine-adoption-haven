
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Post, BoardCategory } from '@/types/board';
import BoardCard from '@/components/BoardCard';
import BoardSearch from '@/components/board/BoardSearch';

interface BoardTabsProps {
  activeTab: BoardCategory;
  onTabChange: (value: BoardCategory) => void;
  currentPosts: Post[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const BoardTabs = ({ activeTab, onTabChange, currentPosts, searchTerm, onSearchChange }: BoardTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="adoption" className="text-sm">입양 후기</TabsTrigger>
          <TabsTrigger value="sns" className="text-sm">SNS 홍보</TabsTrigger>
          <TabsTrigger value="missing" className="text-sm">실종/목격 제보</TabsTrigger>
        </TabsList>
        
        <div className="flex-shrink-0">
          <BoardSearch 
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
          />
        </div>
      </div>

      <TabsContent value="adoption" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPosts.map((post) => (
            <BoardCard key={post.id} post={post} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="sns" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPosts.map((post) => (
            <BoardCard key={post.id} post={post} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="missing" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPosts.map((post) => (
            <BoardCard key={post.id} post={post} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BoardTabs;
