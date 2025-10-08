import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

interface Article {
    image_url: string;
    category: string;
    title: string;
    excerpt: string;
}

const LegalArticles: React.FC = () => {
    const { t, language } = useLanguage();
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/articles.json');
                 // A 404 means no articles, which is not an error for the display component.
                if (response.status === 404) {
                    setArticles([]);
                    return;
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();
                const allArticles = text ? JSON.parse(text) : {};
                setArticles(allArticles[language] || []);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
                setArticles([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [language]);

    return (
        <section id="articles" className="py-20 bg-slate-50 overflow-hidden">
            <div
                ref={ref}
                className={`container mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('articles_title')}</h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        {t('articles_description')}
                    </p>
                </div>
                {isLoading ? (
                    <div className="text-center text-slate-500">
                        <p>Loading articles...</p>
                    </div>
                ) : articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col card-glow">
                                <img src={article.image_url} alt={article.title} className="w-full h-56 object-cover" />
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-sm font-semibold text-teal-600 uppercase mb-2">{article.category}</p>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3">{article.title}</h3>
                                    <p className="text-slate-600 leading-relaxed mb-4 flex-grow">{article.excerpt}</p>
                                    <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold text-slate-800 hover:text-teal-600 transition-colors self-start inline-flex items-center gap-2 mt-auto">
                                        {t('articles_read_more')}
                                        {language === 'ar' ? <ArrowLeftIcon className="w-4 h-4" /> : <ArrowRightIcon className="w-4 h-4" />}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                     <div className="text-center text-slate-500 bg-white p-8 rounded-lg shadow">
                        <p>No articles available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LegalArticles;