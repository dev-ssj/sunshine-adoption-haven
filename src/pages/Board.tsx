
import React from 'react';
import AppHeader from '@/components/AppHeader';
import BoardTabs from '@/components/board/BoardTabs';
import BoardPagination from '@/components/board/BoardPagination';
import { useBoardFilter } from '@/hooks/useBoardFilter';
import { allPosts } from '@/data/mockPosts';

const Board = () => {
  const {
    activeTab,
    searchTerm,
    currentPage,
    currentPosts,
    totalPages,
    handleTabChange,
    handleSearchChange,
    setCurrentPage,
  } = useBoardFilter({
    posts: allPosts,
    postsPerPage: 12,
  });

  const handleLoginClick = () => {
    // 로그인 모달 열기 로직
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader onLoginClick={handleLoginClick} />
      
      <div className="container mx-auto px-4 py-8">
        <BoardTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          currentPosts={currentPosts}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <BoardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Board;
