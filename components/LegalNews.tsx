import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'civil' | 'criminal' | 'commercial' | 'administrative' | 'family' | 'labor' | 'constitutional';
  date: string;
  author: string;
  image: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

const LegalNews: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Sample news data (replace with real data from your API)
  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'تعديلات جديدة على قانون الأسرة الجزائري 2025',
      summary: 'صدرت تعديلات مهمة على قانون الأسرة تشمل إجراءات الطلاق وحضانة الأطفال وحقوق المرأة',
      content: 'نص مفصل عن التعديلات الجديدة على قانون الأسرة...',
      category: 'family',
      date: '2025-01-15',
      author: 'الأستاذ سعيد محمد',
      image: '/images/news/family-law-update.jpg',
      readTime: 5,
      tags: ['قانون الأسرة', 'تعديلات', 'الطلاق', 'الحضانة'],
      featured: true
    },
    {
      id: '2',
      title: 'قانون الاستثمار الجديد وتأثيره على الشركات',
      summary: 'تحليل شامل للقانون الجديد للاستثمار وما يعنيه للشركات الناشئة والمستثمرين',
      content: 'نص مفصل عن قانون الاستثمار الجديد...',
      category: 'commercial',
      date: '2025-01-10',
      author: 'الأستاذ سعيد محمد',
      image: '/images/news/investment-law.jpg',
      readTime: 8,
      tags: ['قانون الاستثمار', 'الشركات', 'الاقتصاد'],
      featured: false
    },
    {
      id: '3',
      title: 'تطورات في قانون العمل الجزائري',
      summary: 'آخر التطورات في قانون العمل وحقوق العمال والموظفين في القطاع العام والخاص',
      content: 'نص مفصل عن تطورات قانون العمل...',
      category: 'labor',
      date: '2025-01-05',
      author: 'الأستاذ سعيد محمد',
      image: '/images/news/labor-law.jpg',
      readTime: 6,
      tags: ['قانون العمل', 'حقوق العمال', 'الرواتب'],
      featured: true
    },
    {
      id: '4',
      title: 'أحكام جديدة في القانون الجنائي',
      summary: 'تحديثات مهمة في القانون الجنائي تشمل العقوبات البديلة والجرائم الإلكترونية',
      content: 'نص مفصل عن أحكام القانون الجنائي الجديدة...',
      category: 'criminal',
      date: '2024-12-28',
      author: 'الأستاذ سعيد محمد',
      image: '/images/news/criminal-law.jpg',
      readTime: 7,
      tags: ['القانون الجنائي', 'العقوبات', 'الجرائم الإلكترونية'],
      featured: false
    },
    {
      id: '5',
      title: 'حقوق المواطن في القانون الإداري',
      summary: 'دليل شامل لحقوق المواطن في التعامل مع الإدارات الحكومية والطعن في القرارات الإدارية',
      content: 'نص مفصل عن حقوق المواطن في القانون الإداري...',
      category: 'administrative',
      date: '2024-12-20',
      author: 'الأستاذ سعيد محمد',
      image: '/images/news/administrative-law.jpg',
      readTime: 9,
      tags: ['القانون الإداري', 'حقوق المواطن', 'الطعن الإداري'],
      featured: false
    },
    {
      id: '6',
      title: 'تفسير دستوري لحقوق الإنسان',
      summary: 'تحليل المواد الدستورية المتعلقة بحقوق الإنسان والحريات الأساسية في الدستور الجزائري',
      content: 'نص مفصل عن التفسير الدستوري لحقوق الإنسان...',
      category: 'constitutional',
      date: '2024-12-15',
      author: 'الأستاذ سعيد محمد',
      image: '/images/news/constitutional-law.jpg',
      readTime: 10,
      tags: ['القانون الدستوري', 'حقوق الإنسان', 'الحريات'],
      featured: true
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'جميع الأخبار', icon: '📰' },
    { id: 'civil', label: 'القانون المدني', icon: '⚖️' },
    { id: 'criminal', label: 'القانون الجنائي', icon: '👨‍⚖️' },
    { id: 'commercial', label: 'القانون التجاري', icon: '💼' },
    { id: 'administrative', label: 'القانون الإداري', icon: '🏛️' },
    { id: 'family', label: 'قانون الأسرة', icon: '👨‍👩‍👧‍👦' },
    { id: 'labor', label: 'قانون العمل', icon: '👷' },
    { id: 'constitutional', label: 'القانون الدستوري', icon: '📜' }
  ];

  // Filter articles based on category and search term
  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-DZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get category info
  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            الأخبار والتحديثات القانونية
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            آخر التطورات والأخبار في القوانين الجزائرية والتحديثات التشريعية المهمة
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث في الأخبار والمقالات القانونية..."
                className="
                  w-full px-6 py-4 pr-12 text-lg border-2 border-gray-200 rounded-2xl
                  focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20
                  transition-all duration-300 bg-white shadow-lg
                "
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.label}</span>
                {selectedCategory === category.id && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {selectedCategory === 'all' ? newsArticles.length : filteredArticles.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles (only show when no filters applied) */}
        {selectedCategory === 'all' && searchTerm === '' && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              المقالات المميزة
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.filter(article => article.featured).map((article) => (
                <div
                  key={article.id}
                  className="
                    group relative bg-white rounded-2xl shadow-lg overflow-hidden
                    hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2
                    cursor-pointer
                  "
                  onClick={() => setSelectedArticle(article)}
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ مميز
                    </span>
                  </div>
                  
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="%236b7280" font-size="16">${article.title}</text></svg>`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <span className="flex items-center gap-1 text-teal-600 font-medium">
                        {getCategoryInfo(article.category).icon}
                        {getCategoryInfo(article.category).label}
                      </span>
                      <span className="text-gray-500">{formatDate(article.date)}</span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                      {article.title}
                    </h4>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{article.readTime} دقائق قراءة</span>
                      </div>
                      
                      <button className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
                        اقرأ المزيد
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Articles Grid */}
        <div className="mb-12">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">لا توجد مقالات</h3>
              <p className="text-gray-600">لم يتم العثور على مقالات تطابق البحث أو الفئة المحددة</p>
            </div>
          ) : (
            <>
              {/* Results Info */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'all' ? 'جميع المقالات' : getCategoryInfo(selectedCategory).label}
                </h3>
                <span className="text-gray-600">
                  {filteredArticles.length} مقال
                  {searchTerm && ` • نتائج البحث عن "${searchTerm}"`}
                </span>
              </div>
              
              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedArticles.map((article) => (
                  <article
                    key={article.id}
                    className="
                      group bg-white rounded-2xl shadow-lg overflow-hidden
                      hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
                      cursor-pointer
                    "
                    onClick={() => setSelectedArticle(article)}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="%236b7280" font-size="16">${article.title}</text></svg>`;
                        }}
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          {getCategoryInfo(article.category).icon}
                          {getCategoryInfo(article.category).label}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                        <span>{formatDate(article.date)}</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {article.readTime} دقائق
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{article.author}</span>
                        <button className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1">
                          اقرأ المزيد
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="
                p-2 rounded-lg border border-gray-300 hover:bg-gray-50
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
              aria-label="الصفحة السابقة"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  px-4 py-2 rounded-lg transition-all
                  ${currentPage === page
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                    : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                  }
                `}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="
                p-2 rounded-lg border border-gray-300 hover:bg-gray-50
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
              aria-label="الصفحة التالية"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="
            relative w-full max-w-4xl max-h-[90vh] overflow-y-auto
            bg-white rounded-2xl shadow-2xl animate-scale-in
          ">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      {getCategoryInfo(selectedArticle.category).icon}
                      {getCategoryInfo(selectedArticle.category).label}
                    </span>
                    <span className="text-teal-100">{formatDate(selectedArticle.date)}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">{selectedArticle.title}</h2>
                  <div className="flex items-center gap-4 text-teal-100">
                    <span>{selectedArticle.author}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {selectedArticle.readTime} دقائق قراءة
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                  aria-label="إغلاق"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {/* Article Image */}
              <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-64 lg:h-80 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23f3f4f6"/><text x="300" y="200" text-anchor="middle" fill="%236b7280" font-size="20">${selectedArticle.title}</text></svg>`;
                  }}
                />
              </div>
              
              {/* Article Summary */}
              <div className="mb-6">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  {selectedArticle.summary}
                </p>
              </div>
              
              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-6">
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {selectedArticle.content || 'محتوى المقال سيكون متوفراً قريباً...'}
                </div>
              </div>
              
              {/* Tags */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3">الكلمات المفتاحية:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag, index) => (
                    <span key={index} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Share Buttons */}
              <div className="border-t pt-6">
                <h4 className="font-bold text-gray-800 mb-3">شارك المقال:</h4>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    تويتر
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    فيسبوك
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    واتساب
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    نسخ الرابط
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LegalNews;