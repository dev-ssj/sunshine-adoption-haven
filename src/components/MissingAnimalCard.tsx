import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Calendar, MapPin } from 'lucide-react';
import { Post } from '@/types/board';

interface MissingAnimalCardProps {
  post: Post;
}

const MissingAnimalCard = ({ post }: MissingAnimalCardProps) => {
  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl overflow-hidden hover:scale-[1.02] cursor-pointer">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">
            실종/목격
          </Badge>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Eye className="w-3 h-3" />
            <span>{post.views}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-tight">
          {post.title}
        </h3>
        
        {/* 첫 번째 줄: 품종 | 성별 | 나이 | 털색 */}
        <div className="text-sm text-gray-600 mb-2 flex flex-wrap gap-1">
          <span>{post.breed}</span>
          <span className="text-gray-400">|</span>
          <span>{post.gender}</span>
          <span className="text-gray-400">|</span>
          <span>{post.age}</span>
          <span className="text-gray-400">|</span>
          <span>{post.furColor}</span>
        </div>
        
        {/* 두 번째 줄: 실종 장소 */}
        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
          <MapPin className="w-3 h-3" />
          <span>{post.missingLocation}</span>
        </div>
        
        {/* 세 번째 줄: 실종일과 작성자 */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>실종일: {post.missingDate}</span>
          </div>
        </div>
        
        {/* 작성자 정보 - 우상단 스타일 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">{post.author.charAt(0)}</span>
            </div>
            <span className="text-sm font-medium text-gray-700">{post.author}</span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{post.date}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MissingAnimalCard;