(function () {
  // Inject CSS
  var style = document.createElement('style');
  style.textContent = `
    #cookieConsent {
      display:none;position:fixed;bottom:20px;right:20px;
      background:#2a2a2a;color:#fff;box-shadow:0 4px 20px rgba(0,0,0,.25);
      padding:18px 22px;border-radius:10px;z-index:9999;max-width:360px;
      transition:opacity .4s ease,transform .4s ease;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    }
    #cookieConsent p {
      margin:0 0 14px;font-size:0.92rem;line-height:1.4;color:#e8e8e8;
    }
    #cookieConsent a {
      color:#ffd54f;text-decoration:none;border-bottom:1px solid #ffd54f;
    }
    #cookieConsent .btn-container {
      display:flex;gap:8px;
    }
    #cookieConsent button {
      flex:1;padding:9px 14px;border:none;border-radius:6px;
      font-weight:600;font-size:0.88rem;cursor:pointer;transition:all .2s ease;
    }
    #acceptBtn {background:#fbc02d;color:#000;}
    #acceptBtn:hover {background:#f9a825;transform:translateY(-2px);box-shadow:0 4px 12px rgba(251,192,45,.4);}
    #rejectBtn {background:#666;color:#fff;}
    #rejectBtn:hover {background:#555;transform:translateY(-2px);}
    @media (max-width: 600px) {
      #cookieConsent {left:10px!important;right:10px!important;bottom:10px!important;max-width:none!important;}
    }
  `;
  document.head.appendChild(style);

  // Inject HTML
  var banner = document.createElement('div');
  banner.id = 'cookieConsent';
  banner.innerHTML = `
    <p>
      Използваме „бисквитки“, за да подобрим вашето преживяване в сайта. <a href="/privacy-policy.html">Прочетете повече</a> за нашата Политика за „бисквитките“.
      
    </p>
    <div class="btn-container">
      <button id="acceptBtn">Приемам</button>
      <button id="rejectBtn">Отказвам</button>
    </div>
  `;
  document.body.appendChild(banner);

  // Cookie functions
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  function loadGoogleAds() {
    console.log('Loading Google Ads...');

    // Initialize dataLayer FIRST
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;

    // Load script
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17655576561';

    s.onload = function () {
      console.log('Google Ads script loaded');
      gtag('js', new Date());
      gtag('config', 'AW-17655576561');
      console.log('Google Ads configured');
    };

    s.onerror = function (e) {
      console.error('Failed to load Google Ads:', e);
    };

    document.head.appendChild(s);
  }

  // Check consent on page load
  var consent = getCookie('cookieAdsConsent');
  console.log('Current consent status:', consent);

  if (consent === 'yes') {
    // Already accepted - load immediately
    console.log('Consent already given, loading Google Ads');
    loadGoogleAds();
  } else if (!consent) {
    // No consent yet - show banner
    console.log('No consent found, showing banner');
    banner.style.display = 'block';
    setTimeout(function () {
      banner.style.opacity = '1';
      banner.style.transform = 'translateY(0)';
    }, 200);

    // Accept button
    document.getElementById('acceptBtn').onclick = function () {
      console.log('User accepted cookies');
      setCookie('cookieAdsConsent', 'yes', 365);
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(function () { banner.remove(); }, 400);
      loadGoogleAds();
    };

    // Reject button
    document.getElementById('rejectBtn').onclick = function () {
      console.log('User rejected cookies');
      setCookie('cookieAdsConsent', 'no', 365);
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(function () { banner.remove(); }, 400);
    };
  } else {
    console.log('Consent rejected, not loading Google Ads');
  }
})();
