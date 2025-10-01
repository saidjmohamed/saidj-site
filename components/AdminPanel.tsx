import React, { useState, useEffect, Fragment } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// --- TYPES ---
interface Article {
    image_url: string;
    category: string;
    title: string;
    excerpt: string;
}
interface AllArticles {
    ar: Article[];
    fr: Article[];
    en: Article[];
}
interface ArticleSet {
    ar: Article;
    fr: Article;
    en: Article;
}
type LanguageKey = 'ar' | 'fr' | 'en';

// --- CONSTANTS ---
const ADMIN_PASSWORD = 'Saidj@2024'; // A simple password for demonstration
const EMPTY_ARTICLE_SET: ArticleSet = {
    ar: { image_url: '', category: '', title: '', excerpt: '' },
    fr: { image_url: '', category: '', title: '', excerpt: '' },
    en: { image_url: '', category: '', title: '', excerpt: '' },
};

// --- HELPER COMPONENTS ---

const SaveChangesCard: React.FC<{ allArticles: AllArticles }> = ({ allArticles }) => {
    const { t } = useLanguage();
    const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

    const jsonString = JSON.stringify(allArticles, null, 2);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonString).then(() => {
            setCopyState('copied');
            setTimeout(() => setCopyState('idle'), 2500);
        }).catch(err => {
            console.error("Failed to copy articles JSON:", err);
            alert("Failed to copy!");
        });
    };

    return (
        <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-6 rounded-lg mb-6 shadow-lg" role="alert">
            <h3 className="font-bold text-xl mb-2 text-amber-900">{t('admin_save_changes_title')}</h3>
            <p className="mb-2">{t('admin_copy_instructions_p1')}</p>
            <ol className="list-decimal list-inside mb-4 space-y-1 text-sm">
                <li>{t('admin_copy_instructions_p2')}</li>
                <li>{t('admin_copy_instructions_p3')}</li>
                <li>{t('admin_copy_instructions_p4')}</li>
            </ol>
            <textarea
                readOnly
                className="w-full h-48 p-2 border border-amber-300 rounded bg-amber-50 font-mono text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={jsonString}
            />
            <div className="mt-4">
                <button
                    onClick={handleCopy}
                    className={`w-full md:w-auto font-bold py-2 px-6 rounded transition-all duration-300 ease-in-out flex items-center justify-center ${
                        copyState === 'copied' 
                        ? 'bg-green-500 text-white cursor-default' 
                        : 'bg-amber-500 hover:bg-amber-600 text-white'
                    }`}
                    disabled={copyState === 'copied'}
                >
                    {copyState === 'copied' ? (
                        <>
                            <svg className="w-5 h-5 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            {t('admin_copied_button')}
                        </>
                    ) : (
                        t('admin_copy_button')
                    )}
                </button>
            </div>
        </div>
    );
};


const ArticleEditorModal: React.FC<{
    articleIndex: number | null;
    initialData: AllArticles;
    onSave: (index: number | null, data: AllArticles) => void;
    onClose: () => void;
}> = ({ articleIndex, initialData, onSave, onClose }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<ArticleSet>(EMPTY_ARTICLE_SET);
    
    useEffect(() => {
        if (articleIndex !== null && initialData.ar[articleIndex] && initialData.fr[articleIndex] && initialData.en[articleIndex]) {
            setFormData({
                ar: initialData.ar[articleIndex],
                fr: initialData.fr[articleIndex],
                en: initialData.en[articleIndex],
            });
        } else {
            setFormData(EMPTY_ARTICLE_SET);
        }
    }, [articleIndex, initialData]);

    const handleChange = (lang: LanguageKey, field: keyof Article, value: string) => {
        setFormData(prev => {
            const updatedLangArticle = { ...prev[lang], [field]: value };
            // Sync image_url across all languages for consistency
            if (field === 'image_url') {
                return {
                    ar: { ...prev.ar, image_url: value },
                    fr: { ...prev.fr, image_url: value },
                    en: { ...prev.en, image_url: value },
                }
            }
            return { ...prev, [lang]: updatedLangArticle };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullDataSet: AllArticles = {
            ar: [...initialData.ar],
            fr: [...initialData.fr],
            en: [...initialData.en],
        };

        if (articleIndex !== null) { // Editing
            fullDataSet.ar[articleIndex] = formData.ar;
            fullDataSet.fr[articleIndex] = formData.fr;
            fullDataSet.en[articleIndex] = formData.en;
        } else { // Adding new
            fullDataSet.ar.push(formData.ar);
            fullDataSet.fr.push(formData.fr);
            fullDataSet.en.push(formData.en);
        }
        onSave(articleIndex, fullDataSet);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <header className="p-4 border-b bg-slate-50 rounded-t-lg">
                    <h2 className="text-2xl font-bold text-slate-800">{articleIndex !== null ? t('admin_edit_article') : t('admin_add_article')}</h2>
                </header>
                <form id="article-editor-form" onSubmit={handleSubmit} className="overflow-y-auto p-6 flex-grow">
                    <div className="mb-6">
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="image_url">{t('admin_image_url')}</label>
                        <input type="text" id="image_url" value={formData.ar.image_url} onChange={(e) => handleChange('ar', 'image_url', e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {(['ar', 'fr', 'en'] as LanguageKey[]).map(lang => (
                            <div key={lang} className="space-y-4 border p-4 rounded-md bg-slate-50">
                                <h3 className="font-bold text-lg text-slate-700 border-b pb-2 mb-4">{lang.toUpperCase()}</h3>
                                <div>
                                    <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor={`${lang}_category`}>{t('admin_category')}</label>
                                    <input type="text" id={`${lang}_category`} value={formData[lang].category} onChange={(e) => handleChange(lang, 'category', e.target.value)} className="w-full p-2 border rounded" required />
                                </div>
                                <div>
                                    <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor={`${lang}_title`}>{t('admin_title_field')}</label>
                                    <input type="text" id={`${lang}_title`} value={formData[lang].title} onChange={(e) => handleChange(lang, 'title', e.target.value)} className="w-full p-2 border rounded" required />
                                </div>
                                <div>
                                    <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor={`${lang}_excerpt`}>{t('admin_excerpt')}</label>
                                    <textarea id={`${lang}_excerpt`} value={formData[lang].excerpt} onChange={(e) => handleChange(lang, 'excerpt', e.target.value)} rows={4} className="w-full p-2 border rounded" required />
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
                 <footer className="p-4 flex justify-end gap-3 bg-slate-50 border-t rounded-b-lg">
                    <button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 px-4 rounded">{t('admin_cancel')}</button>
                    <button type="submit" form="article-editor-form" className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded">{t('admin_save')}</button>
                </footer>
            </div>
        </div>
    );
};

// --- MAIN COMPONENTS ---

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const { t } = useLanguage();
    const [allArticles, setAllArticles] = useState<AllArticles | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDirty, setIsDirty] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [editingArticleIndex, setEditingArticleIndex] = useState<number | null>(null);

    useEffect(() => {
        const loadArticles = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/articles.json');
                // Allow 404s (file not found) to be treated as an empty list
                if (response.status === 404) {
                    setAllArticles({ ar: [], fr: [], en: [] });
                    return;
                }
                // For other non-ok statuses, throw an error
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const text = await response.text();
                const data = text ? JSON.parse(text) : { ar: [], fr: [], en: [] };
                
                if (data && Array.isArray(data.ar) && Array.isArray(data.fr) && Array.isArray(data.en)) {
                    setAllArticles(data);
                } else {
                    console.warn('articles.json is malformed. Initializing with empty list.');
                    setAllArticles({ ar: [], fr: [], en: [] });
                }
            } catch (err) {
                console.error("Failed to load or parse articles.json:", err);
                setAllArticles({ ar: [], fr: [], en: [] });
            } finally {
                setIsLoading(false);
            }
        };

        loadArticles();
    }, []);
    
    const handleAddNew = () => {
        setEditingArticleIndex(null);
        setShowEditor(true);
    };

    const handleEdit = (index: number) => {
        setEditingArticleIndex(index);
        setShowEditor(true);
    };

    const handleDelete = (index: number) => {
        if(window.confirm(t('admin_confirm_delete'))) {
            if (!allArticles) return;
            const updatedArticles: AllArticles = {
                ar: [...allArticles.ar],
                fr: [...allArticles.fr],
                en: [...allArticles.en],
            };
            updatedArticles.ar.splice(index, 1);
            updatedArticles.fr.splice(index, 1);
            updatedArticles.en.splice(index, 1);
            setAllArticles(updatedArticles);
            setIsDirty(true);
        }
    };
    
    const handleSaveArticle = (index: number | null, data: AllArticles) => {
        setAllArticles(data);
        setIsDirty(true);
        setShowEditor(false);
    };


    if (isLoading) return <div className="p-8 text-center">Loading articles...</div>;
    if (!allArticles) return <div className="p-8 text-center">Could not load articles. Please check the console for errors.</div>;

    return (
        <div className="min-h-screen bg-slate-100">
            {showEditor && <ArticleEditorModal articleIndex={editingArticleIndex} initialData={allArticles} onSave={handleSaveArticle} onClose={() => setShowEditor(false)} />}
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">{t('admin_title')}</h1>
                <button onClick={onLogout} className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded">{t('admin_logout')}</button>
            </header>
            <main className="p-4 md:p-8">
                {isDirty && <SaveChangesCard allArticles={allArticles} />}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4 border-b pb-4">
                        <h2 className="text-xl font-semibold text-slate-700">{t('admin_articles_section')}</h2>
                        <button onClick={handleAddNew} className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded">{t('admin_add_article')}</button>
                    </div>
                    <div className="space-y-4">
                        {allArticles.ar.map((article, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-md bg-slate-50 border">
                                <div className="flex items-center gap-4">
                                    <img src={article.image_url} alt={article.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0"/>
                                    <div>
                                        <h3 className="font-bold text-slate-800">{article.title}</h3>
                                        <p className="text-sm text-slate-500">{article.category}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(index)} className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-1 px-3 rounded">{t('admin_edit_article')}</button>
                                    <button onClick={() => handleDelete(index)} className="text-sm bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-1 px-3 rounded">{t('admin_delete_article')}</button>
                                </div>
                            </div>
                        ))}
                         {allArticles.ar.length === 0 && <p className="text-center text-slate-500 py-8">No articles found. Add one to get started!</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};

const AdminPanel: React.FC = () => {
    const { t } = useLanguage();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            setIsLoggedIn(true);
            setError('');
        } else {
            setError(t('admin_invalid_password'));
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        setIsLoggedIn(false);
        setPassword('');
        window.location.hash = '';
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4" dir="ltr">
                <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">{t('admin_login_title')}</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">{t('admin_password')}</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 text-slate-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                        <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            {t('admin_login_button')}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return <Dashboard onLogout={handleLogout} />;
};

export default AdminPanel;