import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

export default function Tips() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const tips = [
    {
      title: 'التغذية للرضاعة الطبيعية',
      content: `
        <p>تعتبر التغذية السليمة أثناء الرضاعة الطبيعية أمرًا حيويًا لصحة الأم والطفل. تحتاج الأم المرضعة إلى سعرات حرارية إضافية وعناصر غذائية معينة لإنتاج حليب كافٍ ومغذٍ. إليك بعض النصائح:</p>
        <ul class="list-disc list-inside space-y-2 mt-2">
          <li><strong>زيادة السعرات الحرارية:</strong> تحتاج الأم المرضعة إلى حوالي 300-500 سعرة حرارية إضافية يوميًا.</li>
          <li><strong>التركيز على البروتين:</strong> تناول مصادر جيدة للبروتين مثل اللحوم الخالية من الدهون، الدواجن، الأسماك، البيض، البقوليات، والمكسرات.</li>
          <li><strong>الكالسيوم وفيتامين د:</strong> ضروريان لصحة العظام. يمكن الحصول عليهما من منتجات الألبان، الخضروات الورقية الخضراء، والأسماك الدهنية.</li>
          <li><strong>الحديد:</strong> مهم للوقاية من فقر الدم. يوجد في اللحوم الحمراء، السبانخ، والعدس.</li>
          <li><strong>السوائل:</strong> شرب كميات كافية من الماء والسوائل الأخرى لمنع الجفاف ودعم إنتاج الحليب.</li>
          <li><strong>تجنب بعض الأطعمة:</strong> قد تسبب بعض الأطعمة مثل الكافيين الزائد أو الأطعمة الحارة اضطرابات للطفل.</li>
        </ul>
      `,
    },
    {
      title: 'صحة البروستاتا',
      content: `
        <p>صحة البروستاتا مهمة للرجال مع التقدم في العمر. يمكن لبعض التغييرات في نمط الحياة والنظام الغذائي أن تساعد في الحفاظ على صحتها:</p>
        <ul class="list-disc list-inside space-y-2 mt-2">
          <li><strong>نظام غذائي صحي:</strong> تناول الكثير من الفواكه والخضروات، خاصة الطماطم (التي تحتوي على الليكوبين)، التوت، والخضروات الورقية.</li>
          <li><strong>الدهون الصحية:</strong> دمج الدهون الصحية مثل أوميغا 3 الموجودة في الأسماك الدهنية والمكسرات.</li>
          <li><strong>الحد من اللحوم الحمراء والدهون المشبعة:</strong> قد تزيد هذه الأطعمة من خطر مشاكل البروستاتا.</li>
          <li><strong>النشاط البدني:</strong> ممارسة التمارين الرياضية بانتظام يمكن أن يقلل من خطر تضخم البروستاتا الحميد.</li>
          <li><strong>الحفاظ على وزن صحي:</strong> السمنة مرتبطة بزيادة خطر مشاكل البروستاتا.</li>
          <li><strong>الفحوصات الدورية:</strong> إجراء فحوصات منتظمة مع الطبيب، خاصة بعد سن الخمسين.</li>
        </ul>
      `,
    },
    {
      title: 'نصائح لمرضى السكري',
      content: `
        <p>إدارة مرض السكري تتطلب الالتزام بنمط حياة صحي. إليك بعض النصائح الأساسية:</p>
        <ul class="list-disc list-inside space-y-2 mt-2">
          <li><strong>مراقبة مستوى السكر في الدم:</strong> بانتظام ووفقًا لتوجيهات الطبيب.</li>
          <li><strong>النظام الغذائي:</strong> التركيز على الكربوهيدرات المعقدة (الحبوب الكاملة، الخضروات)، البروتينات الخالية من الدهون، والدهون الصحية. تجنب السكريات المضافة والأطعمة المصنعة.</li>
          <li><strong>النشاط البدني:</strong> ممارسة التمارين الرياضية بانتظام (مثل المشي السريع لمدة 30 دقيقة معظم أيام الأسبوع).</li>
          <li><strong>الأدوية:</strong> الالتزام بتناول الأدوية أو حقن الأنسولين حسب وصف الطبيب.</li>
          <li><strong>فحص القدمين:</strong> يوميًا للكشف عن أي جروح أو تقرحات.</li>
          <li><strong>الحفاظ على وزن صحي:</strong> فقدان الوزن يمكن أن يحسن من حساسية الأنسولين.</li>
          <li><strong>تجنب التدخين والكحول:</strong> يؤثران سلبًا على صحة مرضى السكري.</li>
        </ul>
      `,
    },
    {
      title: 'نصائح للتغلب على السمنة',
      content: `
        <p>تعتبر السمنة سببًا رئيسيًا للعديد من الأمراض المزمنة مثل أمراض القلب والضغط والسكري، وذلك بخلاف القدرة على الحركة وفساد شكل الجسم لزيادة الدهون في بعض المناطق. إليك بعض النصائح للتغلب على السمنة:</p>
        <ul class="list-disc list-inside space-y-2 mt-2">
          <li><strong>النظام الغذائي المتوازن:</strong> ركز على الأطعمة الكاملة مثل الفواكه، الخضروات، البروتينات الخالية من الدهون، والحبوب الكاملة.</li>
          <li><strong>التحكم في حجم الحصص:</strong> تناول كميات معتدلة من الطعام وتجنب الإفراط في الأكل.</li>
          <li><strong>الحد من السكريات والمشروبات الغازية:</strong> استبدلها بالماء أو المشروبات غير المحلاة.</li>
          <li><strong>النشاط البدني المنتظم:</strong> ممارسة التمارين الرياضية بانتظام مثل المشي، الجري، السباحة، أو ركوب الدراجات.</li>
          <li><strong>النوم الكافي:</strong> قلة النوم يمكن أن تؤثر على الهرمونات التي تتحكم في الشهية.</li>
          <li><strong>إدارة التوتر:</strong> التوتر يمكن أن يؤدي إلى الإفراط في تناول الطعام. ابحث عن طرق صحية لإدارة التوتر.</li>
          <li><strong>المتابعة مع أخصائي:</strong> استشر طبيبًا أو أخصائي تغذية لوضع خطة مناسبة لك.</li>
        </ul>
      `,
    },
  ];

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4 md:p-8" id="tips"> {/* Added id for tips section */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-right relative pb-2">
          نصائح
          <span className="absolute bottom-0 right-0 w-16 h-1 bg-blue-600 rounded-full"></span>
        </h2>

        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none text-right"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg font-semibold text-gray-800">{tip.title}</span>
                <ChevronDown
                  size={24}
                  className={`text-gray-600 transition-transform duration-300 ${
                    openAccordion === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openAccordion === index && (
                <div
                  className="p-4 text-gray-700 leading-relaxed text-right"
                  dangerouslySetInnerHTML={{ __html: tip.content }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
