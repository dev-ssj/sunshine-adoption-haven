import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  address: string;
  name: string;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude, address, name }) => {
  // 임시로 구글 맵 링크로 대체
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;
  
  const handleMapClick = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div 
      onClick={handleMapClick}
      className="w-full h-64 rounded-lg border border-border bg-muted/50 flex items-center justify-center cursor-pointer hover:bg-muted/70 transition-colors"
      style={{ minHeight: '256px' }}
    >
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-muted-foreground">{address}</div>
        <div className="text-xs text-muted-foreground">클릭하여 구글 맵에서 보기</div>
      </div>
    </div>
  );
};

export default KakaoMap;