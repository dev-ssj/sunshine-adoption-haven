import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Eye, User, Calendar, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { allPosts } from '@/data/mockPosts';
import AppHeader from '@/components/AppHeader';

const AdoptionReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = allPosts.find(p => p.id === id && p.category === 'adoption');

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">게시글을 찾을 수 없습니다</h1>
          <Button onClick={() => navigate('/board')} variant="outline">
            게시판으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  // 이미지 배열 생성 (최대 5장 시뮬레이션)
  const images = (post as any).images || [
    post.imageUrl,
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ].filter(Boolean);

  // 사용자 권한 확인 (현재는 mock 데이터)
  const hasEditPermission = true; // 실제로는 현재 사용자와 게시글 작성자 비교

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader onLoginClick={() => {}} />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로가기
        </Button>

        <div className="bg-white rounded-2xl shadow-sm border-0 overflow-hidden">
          <div className="p-8">
            {/* 카테고리 배지 */}
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-sm">
                입양후기
              </Badge>
              
              {/* 수정/삭제 버튼 */}
              {hasEditPermission && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-800">
                    <Edit className="w-4 h-4 mr-1" />
                    수정
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-1" />
                    삭제
                  </Button>
                </div>
              )}
            </div>

            {/* 제목 */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* 작성자 정보 */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-gray-500">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
            </div>

            {/* 이미지 섹션 */}
            {images.length > 0 && (
              <div className="mb-8 bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">입양 사진</h3>
                {images.length === 1 ? (
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src={images[0]}
                      alt="입양 사진"
                      className="w-full h-96 object-cover"
                    />
                  </div>
                ) : (
                  <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {images.slice(0, 5).map((image, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                          <div className="rounded-xl overflow-hidden shadow-md">
                            <img
                              src={image}
                              alt={`입양 사진 ${index + 1}`}
                              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {images.length > 3 && (
                      <>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                      </>
                    )}
                  </Carousel>
                )}
                {images.length > 3 && (
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    총 {images.length}장의 사진이 있습니다. 좌우 버튼으로 더 많은 사진을 확인하세요.
                  </p>
                )}
              </div>
            )}

            {/* 본문 내용 */}
            <div className="prose prose-lg max-w-none mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">입양 후기</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                {post.content}
              </p>
            </div>
          </div>

          {/* 하단 인터랙션 섹션 */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Heart className="w-5 h-5 mr-2" />
                  좋아요
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  댓글
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>조회 {post.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionReviewDetail;