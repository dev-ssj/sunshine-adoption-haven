
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
    <div className="min-h-screen bg-gray-50">
      <AppHeader 
        onLoginClick={() => setIsLoggedIn(!isLoggedIn)}
        isLoggedIn={isLoggedIn}
        userName="김철수"
        onLogout={() => setIsLoggedIn(false)}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* 보호소 상세 정보 */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-sm">
            <CardHeader className="relative py-4">
              <Link to="/shelters" className="absolute left-4 top-4">
                <ArrowLeft className="w-6 h-6 text-primary hover:text-primary/80 transition-colors" />
              </Link>
              <CardTitle className="text-3xl font-bold text-gray-800 text-center pt-2">
                {shelter.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* 보호소 정보 */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{shelter.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">
                    {provinces.find(p => p.code === shelter.province)?.name} {cities.find(c => c.code === shelter.city)?.name}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">주소</h4>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <p className="text-gray-900">{shelter.address}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">전화번호</h4>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <a 
                      href={`tel:${shelter.phone}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {shelter.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* 지도 섹션 */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4">지도</h4>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>지도 기능은 추후 구현 예정입니다</p>
                    <p className="text-sm mt-1">{shelter.address}</p>
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
