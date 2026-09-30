let splashTimer = null;
    let balanceVisible = true;
    let activeCurrency = 'USD';
    let currentBalanceValue = 1250.00;
    let faceIdMediaStream = null;
    let qrCameraStream = null;
    let qrScanActive = false;
    let qrScanLocked = false;
    let qrFlashEnabled = false;
    let audioCtx = null;

    // Graceful SVG fallback matching image_19a8e5.png if img.png is not yet uploaded locally
    function loadFallbackQrSvg(imgElement) {
      imgElement.onerror = null; // Prevent loop
      const svgFallback = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">
        <rect width="320" height="320" fill="white"/>
        <rect x="24" y="24" width="70" height="70" rx="8" fill="black"/>
        <rect x="36" y="36" width="46" height="46" rx="4" fill="white"/>
        <rect x="46" y="46" width="26" height="26" rx="2" fill="black"/>
        <rect x="226" y="24" width="70" height="70" rx="8" fill="black"/>
        <rect x="238" y="36" width="46" height="46" rx="4" fill="white"/>
        <rect x="248" y="46" width="26" height="26" rx="2" fill="black"/>
        <rect x="24" y="226" width="70" height="70" rx="8" fill="black"/>
        <rect x="36" y="238" width="46" height="46" rx="4" fill="white"/>
        <rect x="46" y="248" width="26" height="26" rx="2" fill="black"/>
        <rect x="104" y="52" width="14" height="14" fill="black"/>
        <rect x="132" y="52" width="14" height="14" fill="black"/>
        <rect x="160" y="52" width="14" height="14" fill="black"/>
        <rect x="188" y="52" width="14" height="14" fill="black"/>
        <rect x="52" y="104" width="14" height="14" fill="black"/>
        <rect x="52" y="132" width="14" height="14" fill="black"/>
        <rect x="52" y="160" width="14" height="14" fill="black"/>
        <rect x="52" y="188" width="14" height="14" fill="black"/>
        <rect x="236" y="236" width="50" height="50" rx="6" fill="black"/>
        <rect x="246" y="246" width="30" height="30" rx="3" fill="white"/>
        <rect x="254" y="254" width="14" height="14" rx="1" fill="black"/>
        <g fill="black">
          <rect x="104" y="24" width="12" height="12"/>
          <rect x="122" y="24" width="12" height="24"/>
          <rect x="144" y="32" width="18" height="12"/>
          <rect x="174" y="24" width="20" height="12"/>
          <rect x="202" y="32" width="12" height="24"/>
          <rect x="24" y="104" width="12" height="20"/>
          <rect x="40" y="112" width="12" height="12"/>
          <rect x="72" y="104" width="20" height="12"/>
          <rect x="80" y="122" width="14" height="22"/>
          <rect x="104" y="80" width="14" height="14"/>
          <rect x="126" y="86" width="22" height="12"/>
          <rect x="156" y="78" width="14" height="24"/>
          <rect x="180" y="84" width="24" height="12"/>
          <rect x="214" y="80" width="14" height="14"/>
          <rect x="104" y="112" width="16" height="16"/>
          <rect x="130" y="106" width="14" height="28"/>
          <rect x="178" y="108" width="26" height="14"/>
          <rect x="214" y="112" width="14" height="24"/>
          <rect x="238" y="104" width="26" height="14"/>
          <rect x="274" y="112" width="16" height="28"/>
          <rect x="104" y="178" width="16" height="26"/>
          <rect x="132" y="184" width="18" height="14"/>
          <rect x="160" y="196" width="14" height="26"/>
          <rect x="184" y="178" width="24" height="14"/>
          <rect x="218" y="184" width="16" height="26"/>
          <rect x="24" y="144" width="14" height="24"/>
          <rect x="46" y="152" width="26" height="12"/>
          <rect x="78" y="162" width="14" height="28"/>
          <rect x="104" y="214" width="28" height="14"/>
          <rect x="144" y="228" width="14" height="26"/>
          <rect x="170" y="214" width="26" height="14"/>
          <rect x="206" y="224" width="14" height="24"/>
          <rect x="104" y="254" width="14" height="36"/>
          <rect x="126" y="270" width="28" height="14"/>
          <rect x="164" y="258" width="14" height="28"/>
          <rect x="188" y="268" width="32" height="14"/>
          <rect x="274" y="154" width="16" height="28"/>
          <rect x="240" y="172" width="24" height="14"/>
          <rect x="272" y="194" width="18" height="16"/>
          <rect x="296" y="178" width="12" height="28"/>
        </g>
        <circle cx="160" cy="160" r="32" fill="white"/>
        <circle cx="160" cy="160" r="26" fill="#D32F2F"/>
        <circle cx="160" cy="160" r="24" fill="#E53935"/>
        <g stroke="white" stroke-width="2.2" stroke-linecap="round" fill="none">
          <circle cx="160" cy="160" r="6" fill="white"/>
          <rect x="150" y="150" width="20" height="20" rx="3" stroke="white" stroke-width="1.8"/>
          <rect x="150" y="150" width="20" height="20" rx="3" stroke="white" stroke-width="1.8" transform="rotate(45 160 160)"/>
        </g>
      </svg>`;
      imgElement.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgFallback);
    }

    function playAudioTone(type) {
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === 'face-success') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(1320, now + 0.14);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.36);
        } else if (type === 'click') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, now);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.09);
        }
      } catch (e) {
        console.warn('Web Audio note:', e);
      }
    }

    const balances = {
      USD: () => `$ ${currentBalanceValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      KHR: () => `\u17DB ${(currentBalanceValue * 4100).toLocaleString('en-US')}`,
      EUR: () => `\u20AC ${(currentBalanceValue * 0.92).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    };

    const screenSplash = document.getElementById('screenSplash');
    const screenLogin = document.getElementById('screenLogin');
    const screenProcess = document.getElementById('screenProcess');
    const screenDashboard = document.getElementById('screenDashboard');
    const splashProgressBar = document.getElementById('splashProgressBar');
    const splashPercentText = document.getElementById('splashPercentText');
    const splashStatusText = document.getElementById('splashStatusText');

    function showToast(message) {
      const toast = document.getElementById('toastNotification');
      const text = document.getElementById('toastMessage');
      if (!toast || !text) return;

      text.textContent = message;
      if (typeof lucide !== 'undefined') lucide.createIcons();

      toast.classList.remove('-translate-y-20', 'opacity-0', 'pointer-events-none');
      toast.classList.add('translate-y-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.add('-translate-y-20', 'opacity-0', 'pointer-events-none');
        toast.classList.remove('translate-y-0', 'opacity-100');
      }, 2600);
    }

    function showScreen(screenKey) {
      [screenSplash, screenLogin, screenProcess, screenDashboard].forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('screen-fade-enter');
      });

      if (screenKey === 'splash') {
        screenSplash.classList.remove('hidden');
        screenSplash.classList.add('screen-fade-enter');
      } else if (screenKey === 'login') {
        screenLogin.classList.remove('hidden');
        screenLogin.classList.add('screen-fade-enter');
      } else if (screenKey === 'process') {
        screenProcess.classList.remove('hidden');
        screenProcess.classList.add('screen-fade-enter');
      } else if (screenKey === 'dashboard') {
        screenDashboard.classList.remove('hidden');
        screenDashboard.classList.add('screen-fade-enter');
      }

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function startAutomatedSplash() {
      if (splashTimer) clearInterval(splashTimer);
      showScreen('splash');

      let progress = 0;
      splashProgressBar.style.width = '0%';
      splashPercentText.textContent = '0%';
      splashStatusText.textContent = 'Loading...';

      const statuses = [
        { at: 15, text: 'Connecting to secure server...' },
        { at: 45, text: 'Verifying credentials...' },
        { at: 75, text: 'Preparing your dashboard...' },
        { at: 96, text: 'Almost ready...' }
      ];

      splashTimer = setInterval(() => {
        progress += 2;
        if (progress > 100) progress = 100;
        
        splashProgressBar.style.width = progress + '%';
        splashPercentText.textContent = progress + '%';

        const match = statuses.find(s => progress >= s.at && progress < s.at + 25);
        if (match) splashStatusText.textContent = match.text;

        // Auto advance into Screen 2 (Login) without manual clicks
        if (progress >= 100) {
          clearInterval(splashTimer);
          setTimeout(() => {
            showScreen('login');
          }, 350);
        }
      }, 35);
    }

    function runLoginProcess() {
      showScreen('process');

      // Reset Step 3 elements
      const progressBar = document.getElementById('processProgressBar');
      const percentText = document.getElementById('processPercentText');
      const iconStep3 = document.getElementById('iconStep3');
      const connector3 = document.getElementById('connector3');
      const iconStep4 = document.getElementById('iconStep4');
      const titleStep4 = document.getElementById('titleStep4');

      progressBar.style.width = '80%';
      percentText.textContent = '80%';
      iconStep3.className = 'w-6 h-6 rounded-full border-2 border-brand-600 bg-white flex items-center justify-center shrink-0 z-10 radar-pulse-node transition-all duration-300';
      iconStep3.innerHTML = '<div class="w-2.5 h-2.5 rounded-full bg-brand-600"></div>';
      connector3.className = 'w-[2px] h-9 bg-slate-200 transition-colors duration-500';
      iconStep4.className = 'w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 z-10 transition-all duration-300';
      iconStep4.innerHTML = '<div class="w-2 h-2 rounded-full bg-slate-300"></div>';
      titleStep4.className = 'text-xs font-semibold text-slate-400 leading-tight';

      setTimeout(() => {
        iconStep3.className = 'w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-sm shrink-0 z-10';
        iconStep3.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 stroke-[2.5]"></i>';
        connector3.className = 'w-[2px] h-9 bg-brand-600 transition-colors duration-500';

        progressBar.style.width = '100%';
        percentText.textContent = '100%';
        iconStep4.className = 'w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-sm shrink-0 z-10';
        iconStep4.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 stroke-[2.5]"></i>';
        titleStep4.className = 'text-xs font-bold text-slate-900 leading-tight';

        if (typeof lucide !== 'undefined') lucide.createIcons();

        setTimeout(() => {
          showScreen('dashboard');
          showToast('Welcome back, LYHUO!');
        }, 600);
      }, 1400);
    }

    const faceIdModal = document.getElementById('faceIdModal');
    const faceIdVideo = document.getElementById('faceIdVideo');
    const faceIdFallbackMesh = document.getElementById('faceIdFallbackMesh');
    const faceIdSuccessCheck = document.getElementById('faceIdSuccessCheck');
    const faceIdStatusMsg = document.getElementById('faceIdStatusMsg');
    const cameraPromptMsg = document.getElementById('cameraPromptMsg');

    async function openFaceIdCameraModal() {
      if (!faceIdModal) return;
      playAudioTone('click');

      faceIdSuccessCheck.classList.add('opacity-0');
      faceIdStatusMsg.textContent = 'Opening front camera...';
      cameraPromptMsg.textContent = 'Requesting camera permission...';
      faceIdVideo.classList.add('hidden');
      faceIdFallbackMesh.classList.remove('hidden');

      faceIdModal.classList.remove('opacity-0', 'pointer-events-none');
      faceIdModal.classList.add('opacity-100');

      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'user',
              width: { ideal: 640 },
              height: { ideal: 640 }
            },
            audio: false
          });

          faceIdMediaStream = stream;
          faceIdVideo.srcObject = stream;
          faceIdVideo.classList.remove('hidden');
          faceIdFallbackMesh.classList.add('hidden');
          faceIdStatusMsg.textContent = 'Scanning facial geometry...';

          setTimeout(() => {
            finishFaceIdSuccess();
          }, 2400);

        } else {
          throw new Error('getUserMedia not supported');
        }
      } catch (err) {
        console.warn('Real camera not available or permission denied:', err);
        cameraPromptMsg.textContent = 'Camera not available / permitted. Using biometric mesh simulation.';
        faceIdStatusMsg.textContent = 'Simulating Face ID scan...';

        setTimeout(() => {
          finishFaceIdSuccess();
        }, 2200);
      }
    }

    function stopFaceIdCamera() {
      if (faceIdMediaStream) {
        faceIdMediaStream.getTracks().forEach(track => track.stop());
        faceIdMediaStream = null;
      }
      if (faceIdVideo) {
        faceIdVideo.srcObject = null;
      }
    }

    function closeFaceIdModal() {
      stopFaceIdCamera();
      if (!faceIdModal) return;
      faceIdModal.classList.add('opacity-0', 'pointer-events-none');
      faceIdModal.classList.remove('opacity-100');
    }

    function finishFaceIdSuccess() {
      faceIdStatusMsg.textContent = 'Face verified!';
      faceIdSuccessCheck.classList.remove('opacity-0');
      playAudioTone('face-success');

      setTimeout(() => {
        closeFaceIdModal();
        runLoginProcess();
      }, 700);
    }

    function bypassFaceIdSuccess() {
      finishFaceIdSuccess();
    }

    function triggerFingerprintLogin() {
      playAudioTone('click');
      showToast('Authenticating with Fingerprint sensor...');
      setTimeout(() => {
        runLoginProcess();
      }, 600);
    }

    function triggerGoogleLogin() {
      playAudioTone('click');
      showToast('Authenticating with Google Account...');
      setTimeout(() => {
        runLoginProcess();
      }, 600);
    }

    const myQrModal = document.getElementById('myQrModal');

    function openMyQrModal() {
      playAudioTone('click');
      if (!myQrModal) return;
      myQrModal.classList.remove('opacity-0', 'pointer-events-none');
      myQrModal.classList.add('opacity-100');
    }

    function closeMyQrModal() {
      if (!myQrModal) return;
      myQrModal.classList.add('opacity-0', 'pointer-events-none');
      myQrModal.classList.remove('opacity-100');
    }

    function shareMyQrCode() {
      playAudioTone('click');
      if (navigator.share) {
        navigator.share({
          title: 'HUO KHQR Code - LYHUO',
          text: 'Scan to pay LYHUO via HUO Mobile Banking / Bakong KHQR',
          url: window.location.href
        }).catch(() => {
          showToast('QR Code link copied to clipboard');
        });
      } else {
        const dummy = document.createElement('textarea');
        dummy.value = 'KHQR: HUO Bank Cambodia - Savings Account 011 406 52 (KHR)';
        document.body.appendChild(dummy);
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        showToast('QR payment link copied to clipboard!');
      }
    }

    function selectQrAccount(currency) {
      playAudioTone('click');
      showToast(`Active receiving account switched to ${currency}`);
    }

    const togglePasswordVisibility = document.getElementById('togglePasswordVisibility');
    const loginPasswordInput = document.getElementById('loginPasswordInput');
    const passwordEyeIcon = document.getElementById('passwordEyeIcon');

    if (togglePasswordVisibility && loginPasswordInput) {
      togglePasswordVisibility.addEventListener('click', () => {
        const isPassword = loginPasswordInput.type === 'password';
        loginPasswordInput.type = isPassword ? 'text' : 'password';
        passwordEyeIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    }

    const btnLoginAction = document.getElementById('btnLoginAction');
    if (btnLoginAction) {
      btnLoginAction.addEventListener('click', () => {
        playAudioTone('click');
        runLoginProcess();
      });
    }

    const btnToggleBalance = document.getElementById('btnToggleBalance');
    const balanceDisplay = document.getElementById('dashboardBalanceDisplay');
    const balanceEyeIcon = document.getElementById('balanceEyeIcon');

    if (btnToggleBalance) {
      btnToggleBalance.addEventListener('click', () => {
        balanceVisible = !balanceVisible;
        if (balanceVisible) {
          balanceDisplay.textContent = balances[activeCurrency]();
          balanceEyeIcon.setAttribute('data-lucide', 'eye');
        } else {
          balanceDisplay.textContent = '\u2022'.repeat(8);
          balanceEyeIcon.setAttribute('data-lucide', 'eye-off');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    }

    const btnCurrencyToggle = document.getElementById('btnCurrencyToggle');
    const currencyCodeLabel = document.getElementById('currencyCodeLabel');

    if (btnCurrencyToggle) {
      btnCurrencyToggle.addEventListener('click', () => {
        if (activeCurrency === 'USD') activeCurrency = 'KHR';
        else if (activeCurrency === 'KHR') activeCurrency = 'EUR';
        else activeCurrency = 'USD';

        currencyCodeLabel.textContent = activeCurrency;
        if (balanceVisible) {
          balanceDisplay.textContent = balances[activeCurrency]();
        }
        showToast('Currency changed to ' + activeCurrency);
      });
    }

    const transferModal = document.getElementById('transferModal');
    function openTransferModal() {
      if (!transferModal) return;
      transferModal.classList.remove('opacity-0', 'pointer-events-none');
      transferModal.classList.add('opacity-100');
    }
    function closeTransferModal() {
      if (!transferModal) return;
      transferModal.classList.add('opacity-0', 'pointer-events-none');
      transferModal.classList.remove('opacity-100');
    }
    function executeTransferAction() {
      const amountVal = parseFloat(document.getElementById('transferAmountInput').value) || 0;
      if (amountVal <= 0) {
        showToast('Please enter a valid amount');
        return;
      }
      currentBalanceValue -= amountVal;
      if (balanceVisible) {
        balanceDisplay.textContent = balances[activeCurrency]();
      }
      closeTransferModal();
      showToast(`Transferred $${amountVal.toFixed(2)} to 011 000 987 654`);
    }

    const qrScannerModal = document.getElementById('qrScannerModal');
    async function openScannerModal() {
      if (!qrScannerModal) return;
      qrScannerModal.classList.remove('opacity-0', 'pointer-events-none');
      qrScannerModal.classList.add('opacity-100');
      const video = document.getElementById('qrCameraVideo');
      const status = document.getElementById('qrCameraStatus');
      if (!navigator.mediaDevices?.getUserMedia) {
        status.textContent = 'Camera access is unavailable. Open this page over HTTPS to use the scanner.';
        return;
      }
      status.textContent = 'Starting camera\u2026';
      try {
        qrCameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
        if (!qrScannerModal.classList.contains('opacity-100')) {
          qrCameraStream.getTracks().forEach(track => track.stop());
          qrCameraStream = null;
          return;
        }
        video.srcObject = qrCameraStream;
        video.play().catch(() => {});
        qrFlashEnabled = false;
        document.getElementById('qrFlashButton')?.classList.remove('bg-amber-400', 'text-slate-950');
        if (!('BarcodeDetector' in window) && typeof jsQR !== 'function') {
          status.textContent = 'QR scanner could not load. Check your connection and reload the page.';
          return;
        }
        const detector = 'BarcodeDetector' in window ? new BarcodeDetector({ formats: ['qr_code'] }) : null;
        qrScanActive = true;
        qrScanLocked = false;
        status.textContent = 'Align KHQR or Merchant QR in box';
        scanQrFromCamera(video, detector);
      } catch (error) {
        status.textContent = error.name === 'NotAllowedError'
          ? 'Camera permission was denied. Allow camera access in your browser settings and try again.'
          : 'Could not start the camera. Check that it is available and try again.';
      }
    }
    function closeScannerModal() {
      if (!qrScannerModal) return;
      qrScannerModal.classList.add('opacity-0', 'pointer-events-none');
      qrScannerModal.classList.remove('opacity-100');
      qrScanActive = false;
      if (qrCameraStream) {
        qrCameraStream.getTracks().forEach(track => track.stop());
        qrCameraStream = null;
      }
      const video = document.getElementById('qrCameraVideo');
      if (video) video.srcObject = null;
      qrFlashEnabled = false;
    }
    async function scanQrFromCamera(video, detector) {
      if (!qrScanActive || qrScanLocked || video.readyState < 2) {
        if (qrScanActive && !qrScanLocked) requestAnimationFrame(() => scanQrFromCamera(video, detector));
        return;
      }
      try {
        let value = '';
        if (detector) {
          const codes = await detector.detect(video);
          value = codes[0]?.rawValue || '';
        } else {
          const canvas = scanQrFromCamera.canvas || (scanQrFromCamera.canvas = document.createElement('canvas'));
          const width = 320;
          const height = Math.round(video.videoHeight * (width / video.videoWidth));
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext('2d', { willReadFrequently: true });
          context.drawImage(video, 0, 0, width, height);
          const image = context.getImageData(0, 0, width, height);
          value = jsQR(image.data, image.width, image.height, { inversionAttempts: 'dontInvert' })?.data || '';
        }
        if (value) {
          qrScanLocked = true;
          closeScannerModal();
          showToast('QR code scanned: ' + value.slice(0, 80) + (value.length > 80 ? '\u2026' : ''));
          return;
        }
      } catch (error) {
        // Keep scanning; some frames may not be readable while the camera adjusts.
      }
      if (qrScanActive && !qrScanLocked) requestAnimationFrame(() => scanQrFromCamera(video, detector));
    }
    async function toggleQrFlash() {
      const track = qrCameraStream?.getVideoTracks()[0];
      if (!track || !track.getCapabilities?.().torch) {
        document.getElementById('qrCameraStatus').textContent = 'Flash is not available on this camera.';
        return;
      }
      try {
        qrFlashEnabled = !qrFlashEnabled;
        await track.applyConstraints({ advanced: [{ torch: qrFlashEnabled }] });
        document.getElementById('qrFlashButton')?.classList.toggle('bg-amber-400', qrFlashEnabled);
        document.getElementById('qrFlashButton')?.classList.toggle('text-slate-950', qrFlashEnabled);
      } catch (error) {
        document.getElementById('qrCameraStatus').textContent = 'Could not change the camera flash.';
      }
    }

    function logoutToSplash() {
      showToast('Logging out...');
      setTimeout(() => {
        startAutomatedSplash();
      }, 500);
    }

    window.addEventListener('DOMContentLoaded', () => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
      // Start automated splash sequence immediately on load
      startAutomatedSplash();
    });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
}
