
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Calendar, User } from 'lucide-react';

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

interface BoardCardProps {
  post: Post;
}

const BoardCard = ({ post }: BoardCardProps) => {
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
          <Badge className={`${getCategoryColor(post.category)} hover:${getCategoryColor(post.category)} text-xs`}>
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
