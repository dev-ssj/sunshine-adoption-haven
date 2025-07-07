
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
  },
  {
    id: '7',
    title: '믹스견 초코의 첫 번째 생일 축하',
    content: '초코가 우리 집에 온 지 1년이 되었어요. 건강하게 잘 자라고 있답니다...',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
    author: '황미경',
    date: '2024-01-09',
    category: 'adoption',
    views: 178
  },
  {
    id: '8',
    title: '트위터 #구조동물홍보 해시태그 확산',
    content: '트위터에서 구조동물 홍보 해시태그가 많은 관심을 받고 있어요...',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    author: '조성민',
    date: '2024-01-08',
    category: 'sns',
    views: 267
  },
  {
    id: '9',
    title: '검은색 진돗개 실종 - 대구 달서구',
    content: '대구 달서구 상인동에서 검은색 진돗개가 실종되었습니다. 목에 빨간 목걸이...',
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop',
    author: '서다은',
    date: '2024-01-07',
    category: 'missing',
    views: 234
  },
  {
    id: '10',
    title: '보더콜리 루나의 훈련 성과',
    content: '루나를 입양한 후 기본 훈련을 시작했는데 정말 똑똑해요...',
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop',
    author: '김준호',
    date: '2024-01-06',
    category: 'adoption',
    views: 312
  },
  {
    id: '11',
    title: '유튜브 채널 통한 입양 홍보 영상',
    content: '유튜브에서 보호소 동물들을 소개하는 영상을 만들어 올리고 있어요...',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    author: '이예은',
    date: '2024-01-05',
    category: 'sns',
    views: 189
  },
  {
    id: '12',
    title: '삼색 고양이 제보 - 인천 연수구',
    content: '인천 연수구 송도동에서 삼색 고양이를 목격했다는 제보가 들어왔습니다...',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
    author: '박현수',
    date: '2024-01-04',
    category: 'missing',
    views: 145
  },
  {
    id: '13',
    title: '시베리안 허스키 하늘이의 입양 후기',
    content: '하늘이는 에너지가 넘치는 아이라 처음엔 걱정했는데...',
    imageUrl: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=300&fit=crop',
    author: '윤서현',
    date: '2024-01-03',
    category: 'adoption',
    views: 298
  },
  {
    id: '14',
    title: '페이스북 그룹 통한 입양 연결 성공',
    content: '페이스북 그룹에서 활동한 결과 이번 달에만 5마리가 입양되었어요...',
    imageUrl: 'https://images.unsplash.com/photo-1611003229968-3c8e90e3b9c1?w=400&h=300&fit=crop',
    author: '강민정',
    date: '2024-01-02',
    category: 'sns',
    views: 223
  },
  {
    id: '15',
    title: '노란색 래브라도 믹스 발견 - 광주',
    content: '광주 북구에서 노란색 래브라도 믹스로 보이는 개를 발견했습니다...',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
    author: '임지우',
    date: '2024-01-01',
    category: 'missing',
    views: 167
  }
];

// 더 많은 목데이터를 위해 반복하여 총 45개 게시글 생성
const generateMorePosts = () => {
  const additionalPosts = [];
  for (let i = 0; i < 2; i++) {
    mockPosts.forEach(post => {
      additionalPosts.push({
        ...post,
        id: post.id + '_' + (i + 2),
        title: post.title + ` (${i + 2}페이지)`,
        date: `2023-12-${30 - i * 5 - parseInt(post.id)}`,
      });
    });
  }
  return additionalPosts;
};

const allPosts = [...mockPosts, ...generateMorePosts()];

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
