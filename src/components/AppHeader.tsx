
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppHeaderProps {
  onLoginClick: () => void;
}

const AppHeader = ({ onLoginClick }: AppHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 golden rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">함께하개냥</h1>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium">입양하기</Link>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium">보호소</a>
            <Link to="/board" className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium">커뮤니티</Link>
            
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button 
              onClick={onLoginClick}
              className="golden hover:bg-yellow-500 text-gray-800 font-medium px-4 py-2 text-sm"
            >
              로그인
            </Button>
            
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
