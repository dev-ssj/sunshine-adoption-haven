
import { Shelter, Province, City } from '@/types/shelter';

export const provinces: Province[] = [
  { code: 'seoul', name: '서울특별시' },
  { code: 'busan', name: '부산광역시' },
  { code: 'daegu', name: '대구광역시' },
  { code: 'incheon', name: '인천광역시' },
  { code: 'gwangju', name: '광주광역시' },
  { code: 'daejeon', name: '대전광역시' },
  { code: 'ulsan', name: '울산광역시' },
  { code: 'sejong', name: '세종특별자치시' },
  { code: 'gyeonggi', name: '경기도' },
  { code: 'gangwon', name: '강원도' },
  { code: 'chungbuk', name: '충청북도' },
  { code: 'chungnam', name: '충청남도' },
  { code: 'jeonbuk', name: '전라북도' },
  { code: 'jeonnam', name: '전라남도' },
  { code: 'gyeongbuk', name: '경상북도' },
  { code: 'gyeongnam', name: '경상남도' },
  { code: 'jeju', name: '제주특별자치도' },
];

export const cities: City[] = [
  // 서울
  { code: 'gangnam', name: '강남구', provinceCode: 'seoul' },
  { code: 'gangdong', name: '강동구', provinceCode: 'seoul' },
  { code: 'gangbuk', name: '강북구', provinceCode: 'seoul' },
  { code: 'gangseo', name: '강서구', provinceCode: 'seoul' },
  { code: 'gwanak', name: '관악구', provinceCode: 'seoul' },
  { code: 'gwangjin', name: '광진구', provinceCode: 'seoul' },
  
  // 부산
  { code: 'haeundae', name: '해운대구', provinceCode: 'busan' },
  { code: 'busanjin', name: '부산진구', provinceCode: 'busan' },
  { code: 'dongnae', name: '동래구', provinceCode: 'busan' },
  
  // 경기도
  { code: 'suwon', name: '수원시', provinceCode: 'gyeonggi' },
  { code: 'seongnam', name: '성남시', provinceCode: 'gyeonggi' },
  { code: 'goyang', name: '고양시', provinceCode: 'gyeonggi' },
  { code: 'yongin', name: '용인시', provinceCode: 'gyeonggi' },
  { code: 'bucheon', name: '부천시', provinceCode: 'gyeonggi' },
];

export const shelters: Shelter[] = [
  {
    id: '1',
    name: '서울동물사랑센터',
    introduction: '유기동물들에게 따뜻한 보금자리를 제공하며, 입양을 통해 새로운 가족을 만나도록 돕고 있습니다. 전문 수의사와 함께 건강한 동물들의 입양을 진행합니다.',
    province: 'seoul',
    city: 'gangnam',
    address: '서울특별시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    latitude: 37.5665,
    longitude: 126.9780
  },
  {
    id: '2',
    name: '부산해안동물보호센터',
    introduction: '바다가 보이는 쾌적한 환경에서 유기동물들을 보호하고 있습니다. 매주 토요일마다 입양 상담을 진행하며, 반려동물 교육도 함께 제공합니다.',
    province: 'busan',
    city: 'haeundae',
    address: '부산광역시 해운대구 해운대해변로 456',
    phone: '051-9876-5432',
    latitude: 35.1796,
    longitude: 129.0756
  },
  {
    id: '3',
    name: '수원시동물보호소',
    introduction: '경기도 수원시에서 운영하는 공립 동물보호소입니다. 체계적인 관리 시스템을 통해 유기동물들의 건강과 복지를 책임지고 있습니다.',
    province: 'gyeonggi',
    city: 'suwon',
    address: '경기도 수원시 영통구 월드컵로 789',
    phone: '031-5555-1234',
    latitude: 37.2636,
    longitude: 127.0286
  },
  {
    id: '4',
    name: '성남사랑동물의집',
    introduction: '개와 고양이는 물론 토끼, 햄스터 등 다양한 동물들을 보호하고 있습니다. 입양 전 충분한 상담과 교육을 통해 책임감 있는 입양을 지원합니다.',
    province: 'gyeonggi',
    city: 'seongnam',
    address: '경기도 성남시 분당구 판교로 321',
    phone: '031-7777-8888',
    latitude: 37.3595,
    longitude: 127.1052
  },
  {
    id: '5',
    name: '강서구동물복지센터',
    introduction: '서울 강서구 지역의 유기동물 보호와 입양을 전담하는 센터입니다. 24시간 응급의료 시스템을 갖추고 있어 언제든지 안전한 보호가 가능합니다.',
    province: 'seoul',
    city: 'gangseo',
    address: '서울특별시 강서구 공항대로 987',
    phone: '02-3333-4444',
    latitude: 37.5509,
    longitude: 126.8495
  },
  {
    id: '6',
    name: '고양시반려동물센터',
    introduction: '고양시에서 운영하는 현대적인 시설을 갖춘 동물보호센터입니다. 입양뿐만 아니라 반려동물 교육 프로그램도 운영하고 있습니다.',
    province: 'gyeonggi',
    city: 'goyang',
    address: '경기도 고양시 일산동구 중앙로 654',
    phone: '031-9999-0000',
    latitude: 37.6588,
    longitude: 126.7708
  }
];
