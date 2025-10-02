// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Fingerprint } from 'lucide-react';
import { verifyUser } from '../services/VerifyAccount';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [dataForm, setDataForm] = useState({
        email: '',
        favorite_form: ''
    })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const data = await verifyUser({
                email: dataForm.email,
                favorite_club: dataForm.favorite_form
            });
            alert(data.message);
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.message || 'حدث خطأ أثناء التحقق من الحساب');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <section id="login" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 relative pb-2 inline-block">
                    نسيت كلمة المرور
                    <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full left-0 mx-auto"></span>
                </h2>
                <div className="flex justify-center mb-8">
                    <Fingerprint size={100} className="text-blue-600 mx-auto" />
                </div>
                <form className="space-y-6 text-right" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            البريد الإلكتروني
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            required
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                            placeholder="ادخل بريدك الإلكتروني"
                            value={dataForm.email}
                            onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })}
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="favorite_club" className="block text-gray-700 text-sm font-bold mb-2">
                            اسم النادي المفضل
                        </label>
                        <input
                            type={'favorite_club'}
                            id="favorite_club"
                            name="favorite_club"
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-right"
                            placeholder="ادخل اسم النادي المفضل"
                            value={dataForm.favorite_form}
                            onChange={(e) => setDataForm({ ...dataForm, favorite_form: e.target.value })}
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <div>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className={`w-full ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-700'} text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300`}
                        >
                            {isLoading ? 'جاري التحقق...' : 'تحقق'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ResetPassword;
