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
    console.log('KakaoMap 컴포넌트 마운트됨:', { latitude, longitude, name });

    const initializeMap = () => {
      console.log('지도 초기화 시작');
      if (!mapRef.current) {
        console.error('mapRef.current가 없습니다');
        return;
      }

      if (!window.kakao || !window.kakao.maps) {
        console.error('카카오맵 API가 로드되지 않았습니다');
        return;
      }

      console.log('지도 생성 중...');
      
      try {
        const mapOption = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3
        };

        const map = new window.kakao.maps.Map(mapRef.current, mapOption);
        console.log('지도 생성 완료');

        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });

        marker.setMap(map);
        console.log('마커 생성 완료');

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
        
        console.log('지도 초기화 완료');
      } catch (error) {
        console.error('지도 초기화 중 오류:', error);
      }
    };

    const loadKakaoMap = () => {
      // 이미 스크립트가 로드되어 있는지 확인
      const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
      
      if (window.kakao && window.kakao.maps) {
        // 이미 로드됨
        initializeMap();
      } else if (existingScript) {
        // 스크립트는 있지만 아직 로드되지 않음
        existingScript.addEventListener('load', () => {
          window.kakao.maps.load(initializeMap);
        });
      } else {
        // 스크립트 추가
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=b2adfe5a3da5b3d7cf9958f2688c5126&autoload=false`;
        script.async = true;
        
        script.onload = () => {
          window.kakao.maps.load(initializeMap);
        };
        
        script.onerror = () => {
          console.error('카카오맵 스크립트 로딩 실패');
        };
        
        document.head.appendChild(script);
      }
    };

    // 컴포넌트 마운트 후 약간의 지연을 두고 실행
    const timer = setTimeout(loadKakaoMap, 100);

    return () => {
      clearTimeout(timer);
    };
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