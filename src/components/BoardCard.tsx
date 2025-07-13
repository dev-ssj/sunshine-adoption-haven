import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Calendar, User, Instagram } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  views: number;
  instagramLink?: string;
}

interface BoardCardProps {
  post: Post;
}

const BoardCard = ({ post }: BoardCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (post.category === 'sns') {
      navigate(`/sns-post/${post.id}`);
    } else {
      // 다른 카테고리의 경우 일반 상세 페이지로 이동 (추후 구현)
      console.log('Navigate to general post detail:', post.id);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'adoption':
        return '입양 후기';
      case 'sns':
        return 'SNS 홍보';
      case 'missing':
        return '실종/목격';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'adoption':
        return 'bg-green-100 text-green-800';
      case 'sns':
        return 'bg-blue-100 text-blue-800';
      case 'missing':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Instagram 게시물의 첫 번째 이미지를 추출하는 함수
  const getInstagramThumbnail = (url?: string) => {
    if (!url) return null;
    
    // Instagram URL에서 포스트 ID 추출
    const postId = url.split('/p/')[1]?.split('/')[0];
    if (!postId) return null;
    
    // Instagram의 썸네일 URL 구성 (실제로는 API를 통해 가져와야 하지만, 여기서는 예시 이미지 사용)
    return `https://images.unsplash.com/photo-1611095564982-c1cb2cccefae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
  };

  return (
    <Card 
      className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden hover:scale-[1.02] cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={post.category === 'sns' && post.instagramLink ? 
            getInstagramThumbnail(post.instagramLink) || post.imageUrl : 
            post.imageUrl
          }
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge className={`${getCategoryColor(post.category)} hover:${getCategoryColor(post.category)} text-xs flex items-center gap-1`}>
            {post.category === 'sns' && <Instagram className="w-3 h-3" />}
            {getCategoryLabel(post.category)}
          </Badge>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.content}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{post.date}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{post.views}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoardCard;
