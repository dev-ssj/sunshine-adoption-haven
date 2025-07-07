
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BoardCard from '@/components/BoardCard';

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  views: number;
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: '우리 강아지 복실이의 행복한 입양 후기',
    content: '복실이를 입양한 지 벌써 3개월이 지났어요. 처음에는 낯선 환경에 적응하느라 힘들어했지만...',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
    author: '김민수',
    date: '2024-01-15',
    category: 'adoption',
    views: 245
  },
  {
    id: '2',
    title: 'SNS로 유기견 입양홍보 캠페인 참여해요!',
    content: '많은 분들이 참여해주셔서 벌써 10마리의 강아지들이 새로운 가족을 찾았어요...',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    author: '박지영',
    date: '2024-01-14',
    category: 'sns',
    views: 189
  },
  {
    id: '3',
    title: '실종된 골든리트리버를 찾습니다',
    content: '어제 오후 2시경 서울 강남구 역삼동에서 실종되었습니다. 목걸이를 하고 있어요...',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
    author: '이수진',
    date: '2024-01-13',
    category: 'missing',
    views: 156
  },
  {
    id: '4',
    title: '고양이 나비의 새로운 시작',
    content: '나비는 처음에 사람을 무서워했지만, 지금은 가족들과 함께 행복하게 지내고 있어요...',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
    author: '최영희',
    date: '2024-01-12',
    category: 'adoption',
    views: 203
  },
  {
    id: '5',
    title: '인스타그램 해시태그 이벤트 참여방법',
    content: '#펫하트입양 해시태그와 함께 우리 아이들을 알려주세요...',
    imageUrl: 'https://images.unsplash.com/photo-1611003229968-3c8e90e3b9c1?w=400&h=300&fit=crop',
    author: '김태현',
    date: '2024-01-11',
    category: 'sns',
    views: 134
  },
  {
    id: '6',
    title: '흰색 페르시안 고양이 목격 제보',
    content: '부산 해운대구에서 흰색 페르시안 고양이를 목격했습니다...',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
    author: '정민우',
    date: '2024-01-10',  
    category: 'missing',
    views: 98
  }
];

// 더 많은 목데이터를 위해 반복
const allPosts = [...mockPosts, ...mockPosts.map(post => ({
  ...post,
  id: post.id + '_2',
  title: post.title + ' (2)',
})), ...mockPosts.map(post => ({
  ...post,
  id: post.id + '_3',
  title: post.title + ' (3)',
}))];

const Board = () => {
  const [activeTab, setActiveTab] = useState('adoption');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = activeTab === 'all' || post.category === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleLoginClick = () => {
    // 로그인 모달 열기 로직
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader onLoginClick={handleLoginClick} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">커뮤니티</h1>
          
          {/* 검색창 */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="게시글을 검색해보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full max-w-md rounded-xl border-gray-200"
            />
          </div>

          {/* 게시판 탭 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="adoption" className="text-sm">입양 후기</TabsTrigger>
              <TabsTrigger value="sns" className="text-sm">SNS 홍보</TabsTrigger>
              <TabsTrigger value="missing" className="text-sm">실종/목격 제보</TabsTrigger>
            </TabsList>

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
        </div>

        {/* 페이징 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
