import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Eye, User, Calendar, Edit, Trash2, Reply, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { allPosts, comments } from '@/data/mockPosts';
import AppHeader from '@/components/AppHeader';

const MissingPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const post = allPosts.find(p => p.id === id && p.category === 'missing');
  const postComments = comments.filter(c => c.postId === id);

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

  // 이미지 배열 생성
  const images = (post as any).images || [post.imageUrl].filter(Boolean);

  // 사용자 권한 확인 (현재는 mock 데이터)
  const hasEditPermission = true; // 실제로는 현재 사용자와 게시글 작성자 비교

  // 실종/목격 타입에 따른 배지 색상
  const getMissingTypeColor = () => {
    return post.missingType === 'MS' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  const getMissingTypeLabel = () => {
    return post.missingType === 'MS' ? '실종' : '목격';
  };

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
              <Badge className={`${getMissingTypeColor()} hover:${getMissingTypeColor()} text-sm`}>
                {getMissingTypeLabel()}
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

            {/* 품종 (제목 위치) */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
              {post.breed || '반려동물'}
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
                {images.length === 1 ? (
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src={images[0]}
                      alt="실종/목격 사진"
                      className="w-full h-96 object-cover"
                    />
                  </div>
                ) : (
                  <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {images.map((image, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                          <div className="rounded-xl overflow-hidden shadow-md">
                            <img
                              src={image}
                              alt={`실종/목격 사진 ${index + 1}`}
                              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {images.length > 1 && (
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

            {/* 상세 정보 */}
            <div className="mb-8 bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">상세 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {post.gender && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-600">성별:</span>
                    <span className="text-gray-800">{post.gender}</span>
                  </div>
                )}
                {post.age && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-600">나이:</span>
                    <span className="text-gray-800">{post.age}</span>
                  </div>
                )}
                {post.furColor && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-600">털색:</span>
                    <span className="text-gray-800">{post.furColor}</span>
                  </div>
                )}
                {post.missingDate && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-600">{post.missingType === 'MS' ? '실종일:' : '목격일:'}</span>
                    <span className="text-gray-800">{post.missingDate}</span>
                  </div>
                )}
                {post.missingLocation && (
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-600">{post.missingType === 'MS' ? '실종장소:' : '목격장소:'}</span>
                    <span className="text-gray-800">{post.missingLocation}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 특징 */}
            {post.title && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">특징</h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
                  {post.title}
                </p>
              </div>
            )}

            {/* 연락처 */}
            <div className="mb-8 bg-blue-50 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">연락처</h3>
              </div>
              <p className="text-gray-700">
                {post.missingType === 'MS' ? '실종된 반려동물을 목격하신 분은' : '목격 관련 문의사항이나 추가 정보가 있으시면'} 아래 연락처로 연락 부탁드립니다.
              </p>
              <p className="text-blue-600 font-medium mt-2">
                작성자: {post.author}
              </p>
            </div>

            {/* 상세내용 (본문 내용) */}
            <div className="prose prose-lg max-w-none mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">상세내용</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                  {post.content}
                </p>
              </div>
            </div>
          </div>

          {/* 하단 인터랙션 섹션 */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${liked ? 'text-red-500 bg-red-50' : 'text-red-500'} hover:text-red-600 hover:bg-red-50`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                  좋아요 {(post as any).likes + (liked ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  댓글 {postComments.reduce((total, comment) => total + 1 + comment.replies.length, 0)}
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>조회 {post.views}</span>
              </div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="px-8 py-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              댓글 {postComments.reduce((total, comment) => total + 1 + comment.replies.length, 0)}개
            </h3>
            
            <div className="space-y-6">
              {postComments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  {/* 주 댓글 */}
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">{comment.author}</span>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2 text-gray-500 hover:text-gray-700">
                        <Reply className="w-4 h-4 mr-1" />
                        답글
                      </Button>
                    </div>
                  </div>

                  {/* 대댓글들 */}
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="ml-14 flex space-x-4">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">{reply.author}</span>
                            <span className="text-sm text-gray-500">{reply.date}</span>
                          </div>
                          <p className="text-gray-700">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* 댓글 입력 */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="댓글을 작성해주세요..."
                    className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      댓글 작성
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissingPostDetail;