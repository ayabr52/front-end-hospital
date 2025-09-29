import React, { useState } from 'react';
import { Send, Upload, BrainCircuit } from 'lucide-react';

const BrainChat = () => {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosisType, setDiagnosisType] = useState('brain-tumor');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // مفتاح Gemini API.
  // ملاحظة: هذا غير آمن في تطبيقات الإنتاج.
  const API_KEY = " AIzaSyAuSL9brWStHdH1TKMcCjainfwK-Ko3vcA";

  const diagnosisOptions = [
    { value: 'brain-tumor', label: 'ورم دماغي' },
    { value: 'stroke', label: 'سكتة دماغية' },
    { value: 'aneurysm', label: 'تمدد الأوعية الدموية' },
    { value: 'hemorrhage', label: 'نزيف دماغي' },
    { value: 'trauma', label: 'إصابة دماغية' },
    { value: 'other', label: 'أخرى' },
  ];

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // دالة لتحويل ملف الصورة إلى بيانات base64
  const fileToGenerativePart = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          inlineData: {
            data: reader.result.split(',')[1],
            mimeType: file.type,
          },
        });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    if (!symptoms && images.length === 0) {
      // استخدام نافذة منبثقة مخصصة بدلاً من alert لبيئة React
      alert('الرجاء إدخال الأعراض أو رفع صورة على الأقل.');
      setLoading(false);
      return;
    }
    
    // التحقق من أن مفتاح الـ API تم إدخاله
    if (API_KEY === "أدخل مفتاحك الخاص هنا" || !API_KEY) {
      alert("الرجاء إدخال مفتاح Gemini API الخاص بك.");
      setLoading(false);
      return;
    }

    try {
      // بناء محتوى الطلب (Prompt)
      const prompt = `
        أنت مساعد طبي متخصص في التشخيص الدماغي. يرجى تحليل الأعراض وصور التصوير الشعاعي التالية. قدم تقريراً مفصلاً ومختصراً.
        الأعراض: ${symptoms}
        نوع الحالة المتوقع: ${diagnosisType}
        التحليل:
      `;

      // تحويل جميع الصور إلى بيانات Gemini GenerativePart
      const imageParts = await Promise.all(images.map(fileToGenerativePart));

      // بناء جسم الطلب
      const payload = {
        contents: [
          {
            parts: [
              { text: prompt },
              ...imageParts
            ],
          },
        ],
      };

      // نقطة النهاية للاتصال المباشر بـ Gemini API
      // تم تغيير النموذج إلى "gemini-2.5-flash-preview-05-20"
      const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
      }

      const data = await res.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "لا يمكن الحصول على استجابة.";

      setResponse({ text: generatedText });
      
      // مسح الحقول بعد الإرسال الناجح
      setSymptoms('');
      setImages([]);
    } catch (error) {
      console.error('Error sending data to Gemini API:', error);
      setResponse({
        error: `حدث خطأ أثناء الاتصال. يرجى المحاولة مرة أخرى.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center text-blue-800 mb-6">
        <BrainCircuit size={32} className="ml-3" />
        <h3 className="text-2xl font-bold">مساعد ذكي للتشخيص الدماغي</h3>
      </div>
      <p className="text-gray-600 mb-6">
        يمكنك هنا إرسال الأعراض ووصف الحالة مع صور شعاعية للحصول على تحليل أولي   .
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* حقل الأعراض */}
        <div>
          <label htmlFor="symptoms" className="block text-gray-700 font-semibold mb-2">
            وصف الأعراض والحالة:
          </label>
          <textarea
            id="symptoms"
            rows="6"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y"
            placeholder="مثال: صداع مستمر، ضعف في الجهة اليمنى من الجسم، مشاكل في الرؤية..."
          ></textarea>
        </div>

        {/* قائمة نوع التشخيص */}
        <div>
          <label htmlFor="diagnosisType" className="block text-gray-700 font-semibold mb-2">
            نوع التشخيص المتوقع (لتحسين دقة الإجابة):
          </label>
          <select
            id="diagnosisType"
            value={diagnosisType}
            onChange={(e) => setDiagnosisType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            {diagnosisOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* حقل رفع الصور */}
        <div>
          <label htmlFor="image-upload" className="block text-gray-700 font-semibold mb-2">
            تحميل صور شعاعية (MRI, CT Scan):
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={36} className="text-gray-400 mb-2" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">انقر لرفع الصور</span> أو اسحبها هنا
                </p>
                <p className="text-xs text-gray-500">(JPG, PNG, DICOM)</p>
              </div>
              <input
                id="image-upload"
                type="file"
                className="hidden"
                multiple
                accept=".jpg,.jpeg,.png,.dcm"
                onChange={handleImageChange}
              />
            </label>
          </div>
          {images.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              تم اختيار: <span className="font-medium">{images.length}</span> صورة.
            </div>
          )}
        </div>

        {/* زر الإرسال */}
        <button
          type="submit"
          className="w-full flex items-center justify-center p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            'جاري الإرسال...'
          ) : (
            <>
              <Send size={20} className="ml-2" />
              إرسال للتحليل
            </>
          )}
        </button>
      </form>

      {/* منطقة عرض الاستجابة */}
      {response && (
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200 shadow-inner">
          <h4 className="text-xl font-bold text-blue-800 mb-4">نتائج التحليل من Gemini:</h4>
          {response.error ? (
            <p className="text-red-600">{response.error}</p>
          ) : (
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p>{response.text}</p>
              {response.findings && (
                <>
                  <h5 className="mt-4 font-semibold text-blue-700">الملاحظات الهامة:</h5>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {response.findings.map((finding, index) => (
                      <li key={index}>{finding}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrainChat;
