
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { shelters, provinces, cities } from '@/data/shelterData';

const ShelterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const shelter = shelters.find(s => s.id === id);

  if (!shelter) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AppHeader 
          onLoginClick={() => setIsLoggedIn(!isLoggedIn)}
          isLoggedIn={isLoggedIn}
          userName="김철수"
          onLogout={() => setIsLoggedIn(false)}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">보호소를 찾을 수 없습니다</h1>
            <Link to="/shelters">
              <Button>보호소 목록으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <AppHeader 
        onLoginClick={() => setIsLoggedIn(!isLoggedIn)}
        isLoggedIn={isLoggedIn}
        userName="김철수"
        onLogout={() => setIsLoggedIn(false)}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* 보호소 상세 정보 */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="relative py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <Link to="/shelters" className="absolute left-4 top-4">
                <ArrowLeft className="w-8 h-8 text-white hover:text-white/80 transition-colors" />
              </Link>
              <CardTitle className="text-3xl font-bold text-center pt-2">
                {shelter.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {/* 보호소 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 주소 카드 */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-green-800">주소</h4>
                  </div>
                  <p className="text-green-700 leading-relaxed">{shelter.address}</p>
                </div>
                
                {/* 전화번호 카드 */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-blue-800">전화번호</h4>
                  </div>
                  <a 
                    href={`tel:${shelter.phone}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                  >
                    {shelter.phone}
                  </a>
                </div>
              </div>

              {/* 지도 섹션 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-bold text-purple-800">지도</h4>
                </div>
                <div className="bg-white/70 rounded-lg h-64 flex items-center justify-center border border-purple-200">
                  <div className="text-center text-purple-600">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-purple-400" />
                    <p className="font-medium">지도 기능은 추후 구현 예정입니다</p>
                    <p className="text-sm mt-1 text-purple-500">{shelter.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShelterDetail;
