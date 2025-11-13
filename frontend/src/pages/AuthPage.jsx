import React, { useState } from 'react';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    gender: '',
    birthDate: '',
    interests: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // İlgi alanları seçenekleri
  const interestOptions = [
    'Spor',
    'Müzik',
    'Sanat',
    'Teknoloji',
    'Edebiyat',
    'Sinema',
    'Tiyatro',
    'Fotoğrafçılık',
    'Yemek',
    'Seyahat',
    'Doğa',
    'Gönüllülük',
    'Bilim',
    'Tarih',
    'Felsefe'
  ];

  // E-posta formatı doğrulama: numara@ismu.edu.tr
  const validateEmail = (email) => {
    const emailRegex = /^\d+@ismu\.edu\.tr$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
    if (errors.interests) {
      setErrors(prev => ({
        ...prev,
        interests: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // E-posta doğrulama
    if (!formData.email) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Geçerli bir İSMÜ e-posta adresi giriniz';
    }

    // Şifre doğrulama
    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    // Kayıt için ekstra alanlar
    if (!isLogin) {
      if (!formData.name || formData.name.trim() === '') {
        newErrors.name = 'Ad Soyad gereklidir';
      }
      if (!formData.gender) {
        newErrors.gender = 'Cinsiyet seçimi gereklidir';
      }
      if (!formData.birthDate) {
        newErrors.birthDate = 'Doğum tarihi gereklidir';
      }
      if (formData.interests.length === 0) {
        newErrors.interests = 'En az bir ilgi alanı seçmelisiniz';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Şifre tekrarı gereklidir';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Şifreler eşleşmiyor';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Burada API çağrısı yapılacak
      if (isLogin) {
        console.log('Giriş yapılıyor:', { email: formData.email });
        // await login(formData.email, formData.password);
      } else {
        console.log('Kayıt olunuyor:', formData);
        // await register(formData);
      }
    } catch (error) {
      console.error('Hata:', error);
      setErrors({ submit: error.message || 'Bir hata oluştu' });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      gender: '',
      birthDate: '',
      interests: []
    });
    setErrors({});
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-center">
          <div className="auth-card">
            <div className="auth-header">
              <h2>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
              <p className="auth-subtitle">
                {isLogin 
                  ? 'Hesabınıza giriş yaparak devam edin' 
                  : 'Yeni hesap oluşturun ve aramıza katılın'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Ad Soyad <span className="required">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Adınız ve Soyadınız"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Cinsiyet <span className="required">*</span></label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value="Erkek"
                          checked={formData.gender === 'Erkek'}
                          onChange={handleChange}
                        />
                        <span>Erkek</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value="Kadın"
                          checked={formData.gender === 'Kadın'}
                          onChange={handleChange}
                        />
                        <span>Kadın</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value="Diğer"
                          checked={formData.gender === 'Diğer'}
                          onChange={handleChange}
                        />
                        <span>Diğer</span>
                      </label>
                    </div>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="birthDate">Doğum Tarihi <span className="required">*</span></label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className={errors.birthDate ? 'error' : ''}
                      max={new Date().toISOString().split('T')[0]}
                    />
                    {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
                  </div>

                  <div className="form-group">
                    <label>İlgi Alanları <span className="required">*</span></label>
                    <div className="interests-grid">
                      {interestOptions.map(interest => (
                        <label key={interest} className="interest-checkbox">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                          />
                          <span>{interest}</span>
                        </label>
                      ))}
                    </div>
                    {errors.interests && <span className="error-message">{errors.interests}</span>}
                    <small className="form-hint">İstediğiniz kadar ilgi alanı seçebilirsiniz</small>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">Üniversite E-posta Adresi <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="@ismu.edu.tr"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
                <small className="form-hint">Sadece @ismu.edu.tr uzantılı e-postalar kabul edilir</small>
              </div>

              <div className="form-group">
                <label htmlFor="password">Şifre <span className="required">*</span></label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Şifrenizi giriniz"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Şifre Tekrar <span className="required">*</span></label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Şifrenizi tekrar giriniz"
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              )}

              {errors.submit && (
                <div className="error-message submit-error">{errors.submit}</div>
              )}

              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'İşleniyor...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                {isLogin ? "Hesabınız yok mu? " : "Zaten hesabınız var mı? "}
                <button 
                  type="button" 
                  onClick={switchMode}
                  className="switch-mode-button"
                >
                  {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
