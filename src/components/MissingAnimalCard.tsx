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
        
        {/* 세 번째 줄: 실종일 */}
        <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
          <Calendar className="w-3 h-3" />
          <span>실종일: {post.missingDate}</span>
        </div>
        
        {/* 네 번째 줄: 작성자 */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-600">작성자: <span className="font-medium text-gray-800">{post.author}</span></span>
          <span className="text-xs text-gray-400">{post.date}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MissingAnimalCard;