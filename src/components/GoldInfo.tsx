import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
// import GoldInfo from './components/GoldInfo'; // Removed self-import
// import GoldCalculator from './components/GoldCalculator'; // Removed as GoldCalculator route is not part of this component

const GoldInfo: React.FC = () => {
  useEffect(() => {
    const dateElement = document.createElement('div');
    dateElement.className = 'date-header';
    dateElement.textContent = 'تاريخ اليوم: ' + new Date().toLocaleDateString('ar-IQ');
    document.body.insertBefore(dateElement, document.body.firstChild);
    
    return () => {
      if (document.querySelector('.date-header')) {
        document.querySelector('.date-header')?.remove();
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://www.zahabprice.online/gold-info" />
        <title>أنواع الذهب وأعيرته في العراق | دليل المثقال والغرام</title>
        <meta name="description" content="تعرف على أنواع الذهب المختلفة، أعيرته (24، 22، 21، 18)، وكيفية حساب المثقال والغرام في العراق. دليل مفصل للمستثمرين والمهتمين بسوق الذهب." />
        <meta name="keywords" content="أنواع الذهب, أعيرة الذهب, المثقال, الغرام, العراق, سعر الذهب, الذهب الأبيض, الذهب الأصفر, الذهب الوردي, الاستثمار في الذهب" />
      </Helmet>

      <div dir="rtl" style={{
        lineHeight: '1.6',
        margin: 0,
        padding: '20px',
        backgroundColor: '#f9f9f9',
        color: '#333'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: 'auto',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            color: '#b8860b',
            borderBottom: '1px solid #eee',
            paddingBottom: '5px',
            textAlign: 'center',
            marginBottom: '30px'
          }}>أنواع الذهب وأعيرته في العراق: دليل المثقال والغرام</h1>
          
          <p>مرحبًا بكم في موقع زَهَب برايس، وجهتكم الموثوقة لمعرفة كل ما يتعلق بالذهب، من أعيرته وأنواعه إلى أسعاره ومعلومات عن المثقال.</p>

          <h2 style={{
            color: '#b8860b',
            borderBottom: '1px solid #eee',
            paddingBottom: '5px',
            marginTop: '30px'
          }}>ما هي أعيرة الذهب؟</h2>
          <p>عيار الذهب هو مقياس يُستخدم لتحديد نسبة الذهب الخالص في السبيكة مقارنة بالمعادن الأخرى الممزوجة به. يُعبر عن العيار عادةً بأرقام مثل 24، 22، 21، 18، وغيرها، حيث يشير العيار 24 إلى الذهب الخالص بنسبة 100%، بينما تشير الأعيرة الأقل إلى خلط الذهب مع معادن أخرى مثل النحاس أو الفضة لزيادة متانته.</p>
          <ul style={{ listStyle: 'none', paddingRight: '20px' }}>
            <li style={{ marginBottom: '10px', paddingRight: '15px', position: 'relative' }}>
              <span style={{ position: 'absolute', right: '-5px', top: 0, color: '#b8860b', fontWeight: 'bold' }}>•</span>
              عيار 24: ذهب خالص (99.9%)، يستخدم غالبًا في السبائك والاستثمار.
            </li>
            <li style={{ marginBottom: '10px', paddingRight: '15px', position: 'relative' }}>
              <span style={{ position: 'absolute', right: '-5px', top: 0, color: '#b8860b', fontWeight: 'bold' }}>•</span>
              عيار 22: يحتوي على 91.67% ذهب، شائع في المجوهرات الفاخرة.
            </li>
            <li style={{ marginBottom: '10px', paddingRight: '15px', position: 'relative' }}>
              <span style={{ position: 'absolute', right: '-5px', top: 0, color: '#b8860b', fontWeight: 'bold' }}>•</span>
              عيار 21: يحتوي على 87.5% ذهب، وهو الأكثر استخدامًا في الدول العربية.
            </li>
            <li style={{ marginBottom: '10px', paddingRight: '15px', position: 'relative' }}>
              <span style={{ position: 'absolute', right: '-5px', top: 0, color: '#b8860b', fontWeight: 'bold' }}>•</span>
              عيار 18: يحتوي على 75% ذهب، ويتميز بصلابته وتنوع ألوانه.
            </li>
          </ul>

          <h2 style={{
            color: '#b8860b',
            borderBottom: '1px solid #eee',
            paddingBottom: '5px',
            marginTop: '30px'
          }}>ما هو المثقال؟</h2>
          <p>المثقال هو وحدة قياس تقليدية تُستخدم في العالم العربي والإسلامي لوزن الذهب. يساوي المثقال الواحد حوالي 5 غرامًا من الذهب عيار 21، ويُعتبر معيارًا شائعًا في تسعير الذهب الخام أو السبائك. يختلف المثقال أحيانًا حسب المنطقة، لكنه يظل مرجعًا أساسيًا في الأسواق العربية.</p>

          <h2 style={{
            color: '#b8860b',
            borderBottom: '1px solid #eee',
            paddingBottom: '5px',
            marginTop: '30px'
          }}>أنواع الذهب المختلفة</h2>
          <p>الذهب لا يختلف فقط في العيار، بل أيضًا في اللون والاستخدامات حسب المعادن الممزوجة به:</p>
          <ul style={{ listStyle: 'none', paddingRight: '20px' }}>
            <li style={{ marginBottom: '10px', paddingRight: '15px', position: 'relative' }}>
              <span style={{ position: 'absolute', right: '-5px', top: 0, color: '#b8860b', fontWeight: 'bold' }}>•</span>
              الذهب الأصفر: اللون التقليدي للذهب، يتميز بلمعانه الطبيعي وشعبيته في المجوهرات.
            </li>
            <li style={{ marginBottom: '10px', paddingRight: '15px', position: 'relative' }}>
              <span style={{ position: 'absolute', right: '-5px', top: 0, color: '#b8860b', fontWeight: 'bold' }}>•</span>
              الذهب الأبيض: يُمزج مع معادن مثل البلاديوم أو النيكل للحصول على مظهر فضي أنيق.
            </li>
            <li style={{ marginBottom: '10px', paddingRight: '15px', position: 'relative' }}>
              <span style={{ position: 'absolute', right: '-5px', top: 0, color: '#b8860b', fontWeight: 'bold' }}>•</span>
              الذهب الوردي: يحتوي على نسبة أعلى من النحاس، مما يمنحه لونًا ورديًا مميزًا.
            </li>
          </ul>

          <hr style={{ marginTop: '30px', border: 0, borderTop: '1px solid #eee' }} />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/" style={{ 
              color: '#007bff', 
              textDecoration: 'none',
              marginRight: '20px',
              fontWeight: '600',
              padding: '8px 12px',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5'
            }}>العودة إلى الصفحة الرئيسية</Link>
            <span style={{ color: '#aaa', margin: '0 10px' }}>|</span>
            {/* <Link to="/calculate" style={{ 
              color: '#007bff', 
              textDecoration: 'none',
              fontWeight: '600',
              padding: '8px 12px',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5'
            }}>الذهاب إلى حاسبة الذهب</Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GoldInfo;

// <Route path="/gold-info" element={<GoldInfo />} /> // Removed misplaced Route
// <Route path="/calculate" element={<GoldCalculator />} /> // Removed misplaced Route
