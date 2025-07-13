
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import LoginModal from '@/components/LoginModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, Instagram } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CreateSNSPost = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [instagramEmbedUrl, setInstagramEmbedUrl] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (images.length + files.length > 5) {
      toast({
        title: "이미지 업로드 제한",
        description: "최대 5개의 이미지만 업로드할 수 있습니다.",
        variant: "destructive",
      });
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const getInstagramEmbedCode = (url: string) => {
    // Instagram 게시물 URL을 embed 코드로 변환
    if (url.includes('instagram.com/p/')) {
      const postId = url.split('/p/')[1].split('/')[0];
      return `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${postId}/" data-instgrm-version="14"><a href="https://www.instagram.com/p/${postId}/" target="_blank">Instagram에서 이 게시물 보기</a></blockquote>`;
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast({
        title: "입력 오류",
        description: "제목과 본문을 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    // SNS 홍보 게시글 저장 로직 (추후 백엔드 연동)
    const postData = {
      title,
      content,
      instagramEmbedUrl,
      images,
      category: 'sns'
    };
    
    console.log('SNS 홍보 게시글 데이터:', postData);
    
    toast({
      title: "SNS 홍보 게시글 작성 완료",
      description: "게시글이 성공적으로 작성되었습니다.",
    });
    
    navigate('/board');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader onLoginClick={handleLoginClick} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">SNS 홍보 게시글 작성</h1>
          <p className="text-gray-600">Instagram 게시물을 공유하여 반려동물을 홍보해보세요.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              SNS 홍보 글 작성
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 제목 */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">제목</Label>
                <Input
                  id="title"
                  placeholder="홍보할 내용의 제목을 입력해주세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-base"
                />
              </div>

              {/* Instagram Embed URL */}
              <div className="space-y-2">
                <Label htmlFor="instagram-url" className="text-base font-medium">
                  Instagram 게시물 링크
                </Label>
                <Input
                  id="instagram-url"
                  placeholder="https://www.instagram.com/p/..."
                  value={instagramEmbedUrl}
                  onChange={(e) => setInstagramEmbedUrl(e.target.value)}
                  className="text-base"
                />
              </div>

              {/* Instagram 미리보기 */}
              {instagramEmbedUrl && instagramEmbedUrl.includes('instagram.com/p/') && (
                <div className="space-y-2">
                  <Label className="text-base font-medium">Instagram 게시물 미리보기</Label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div 
                      className="max-w-md mx-auto"
                      dangerouslySetInnerHTML={{ 
                        __html: getInstagramEmbedCode(instagramEmbedUrl) 
                      }}
                    />
                    <script async src="//www.instagram.com/embed.js"></script>
                  </div>
                </div>
              )}

              {/* 본문 */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-base font-medium">본문</Label>
                <Textarea
                  id="content"
                  placeholder="홍보 내용을 자세히 작성해주세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] text-base resize-none"
                />
              </div>

              {/* 이미지 업로드 */}
              <div className="space-y-4">
                <Label className="text-base font-medium">추가 이미지 (최대 5개)</Label>
                
                <div className="space-y-4">
                  {/* 업로드 버튼 */}
                  {images.length < 5 && (
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-600">추가 이미지 선택하기</span>
                      <span className="text-xs text-gray-500 mt-1">
                        {images.length}/5개 선택됨
                      </span>
                    </label>
                  )}
                  
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={images.length >= 5}
                  />

                  {/* 선택된 이미지들 */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/board')}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button type="submit" className="flex-1">
                  SNS 홍보 게시글 작성
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default CreateSNSPost;
