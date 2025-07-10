
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, ChevronDown, Bell, User, MessageSquare, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface AppHeaderProps {
  onLoginClick: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
}

const AppHeader = ({ onLoginClick, isLoggedIn = false, userName = "사용자", onLogout }: AppHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 더미 알림 데이터
  const notifications = [
    { id: 1, message: "새로운 입양 공고가 등록되었습니다.", time: "5분 전" },
    { id: 2, message: "댓글이 달렸습니다.", time: "1시간 전" },
    { id: 3, message: "좋아요를 받았습니다.", time: "2시간 전" },
    { id: 4, message: "실종 신고가 접수되었습니다.", time: "3시간 전" },
    { id: 5, message: "보호소에서 메시지를 보냈습니다.", time: "1일 전" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 golden rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 font-cute">함께하개냥</h1>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium">입양하기</Link>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium">보호소</a>
            <Link to="/board" className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium">커뮤니티</Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* 사용자 드롭다운 */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2">
                      <span className="text-sm font-medium">{userName}님</span>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>마이페이지</DropdownMenuItem>
                    <DropdownMenuItem>채팅내역</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* 알림 드롭다운 */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 relative px-3 py-2">
                      <span className="text-sm font-medium">알림</span>
                      <ChevronDown className="w-3 h-3" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-2">
                      <p className="font-semibold text-sm mb-2">알림</p>
                      {notifications.map((notification, index) => (
                        <div key={notification.id}>
                          <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {index < notifications.length - 1 && <div className="border-b border-gray-100 my-1" />}
                        </div>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* 로그아웃 버튼 */}
                <Button 
                  onClick={onLogout}
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2"
                >
                  <span className="text-sm font-medium">로그아웃</span>
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onLoginClick}
                className="golden hover:bg-yellow-500 text-gray-800 font-medium px-4 py-2 text-sm"
              >
                로그인
              </Button>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors py-2 text-sm font-medium">입양하기</Link>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors py-2 text-sm font-medium">보호소 찾기</a>
              <Link to="/board" className="text-gray-600 hover:text-gray-800 transition-colors py-2 text-sm font-medium">커뮤니티</Link>
              
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
