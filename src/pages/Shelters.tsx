
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Phone } from 'lucide-react';
import { Shelter } from '@/types/shelter';
import { provinces, cities, shelters } from '@/data/shelterData';

const Shelters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 선택된 시/도에 따른 시/군/구 필터링
  const filteredCities = selectedProvince 
    ? cities.filter(city => city.provinceCode === selectedProvince)
    : [];

  // 보호소 필터링
  const filteredShelters = shelters.filter(shelter => {
    const matchesSearch = shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelter.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = !selectedProvince || selectedProvince === 'all' || shelter.province === selectedProvince;
    const matchesCity = !selectedCity || selectedCity === 'all' || shelter.city === selectedCity;
    
    return matchesSearch && matchesProvince && matchesCity;
  });

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedCity(''); // 시/도 변경시 시/군/구 초기화
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader 
        onLoginClick={() => setIsLoggedIn(!isLoggedIn)}
        isLoggedIn={isLoggedIn}
        userName="김철수"
        onLogout={() => setIsLoggedIn(false)}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">보호소 찾기</h1>
          <p className="text-gray-600">우리 지역의 동물보호소를 찾아보세요</p>
        </div>

        {/* 검색 및 필터 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-4">
            {/* 검색바 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="보호소 이름이나 주소로 검색해보세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-xl border-gray-200 text-base"
              />
            </div>

            {/* 지역 선택 */}
            <div className="flex gap-4">
              {/* 시/도 선택 */}
              <div className="flex-1">
                <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="시/도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 지역</SelectItem>
                    {provinces.map((province) => (
                      <SelectItem key={province.code} value={province.code}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 시/군/구 선택 - 시/도가 선택되었고 'all'이 아닐 때만 표시 */}
              {selectedProvince && selectedProvince !== 'all' && (
                <div className="flex-1">
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="시/군/구 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      {filteredCities.map((city) => (
                        <SelectItem key={city.code} value={city.code}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 보호소 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShelters.map((shelter) => (
            <Link key={shelter.id} to={`/shelter/${shelter.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {shelter.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{shelter.address}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{shelter.phone}</span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                      {shelter.introduction}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredShelters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">검색 조건에 맞는 보호소가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shelters;
