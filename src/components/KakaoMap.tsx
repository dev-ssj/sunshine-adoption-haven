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
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=b2adfe5a3da5b3d7cf9958f2688c5126&autoload=false`;
        script.async = true;
        
        script.onload = () => {
          window.kakao.maps.load(() => {
            initializeMap();
          });
        };
        
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.kakao) return;

      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOption);

      // 마커 생성
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });

      marker.setMap(map);

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `
          <div style="padding:10px; min-width:200px;">
            <div style="font-weight:bold; margin-bottom:5px;">${name}</div>
            <div style="font-size:12px; color:#666;">${address}</div>
          </div>
        `
      });

      // 마커 클릭 시 인포윈도우 표시
      window.kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
      });

      // 지도 타입 컨트롤 추가
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      // 줌 컨트롤 추가
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    };

    loadKakaoMap();
  }, [latitude, longitude, address, name]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-64 rounded-lg border border-yellow-300"
      style={{ minHeight: '256px' }}
    />
  );
};

export default KakaoMap;