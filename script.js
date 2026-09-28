/* =========================================================
   ELEMENTS
========================================================= */
const tabletChassis = document.getElementById('tabletChassis');
const screenContent = document.getElementById('screenContent');

const toggleOrientationBtn = document.getElementById('toggleOrientationBtn');
const orientationText = document.getElementById('orientationText');

const toggleFrameBtn = document.getElementById('toggleFrameBtn');
const frameColorText = document.getElementById('frameColorText');

const toggleMotionBtn = document.getElementById('toggleMotionBtn');
const motionBtnText = document.getElementById('motionBtnText');
const toggleGuideBtn = document.getElementById('toggleGuideBtn');
const guideBtnText = document.getElementById('guideBtnText');
const toggleScaleBtn = document.getElementById('toggleScaleBtn');
const scaleBtnText = document.getElementById('scaleBtnText');

const brightnessSlider = document.getElementById('brightnessSlider');
const resetDemoBtn = document.getElementById('resetDemoBtn');
const toggleFullscreenBtn = document.getElementById('toggleFullscreenBtn');
const fullscreenText = document.getElementById('fullscreenText');

const currentTime = document.getElementById('currentTime');
const screenContainer = document.getElementById('screenContainer');

const powerBtn = document.getElementById('powerBtn');
const volUpBtn = document.getElementById('volUpBtn');
const volDownBtn = document.getElementById('volDownBtn');

const tabletHomeView = document.getElementById('tabletHomeView');
const teachingGuideHint = document.getElementById('teachingGuideHint');
const splashLoadingView = document.getElementById('splashLoadingView');
const loginView = document.getElementById('loginView');
const forgotPwView = document.getElementById('forgotPwView');
const forgotPwSuccessView = document.getElementById('forgotPwSuccessView');
const outlookEmailView = document.getElementById('outlookEmailView');
const loginScreenPasswordResetView =
    document.getElementById('loginScreenPasswordResetView');
const dashboardView = document.getElementById('dashboardView');
const changePasswordView = document.getElementById('changePasswordView');

const changePwBackBtn = document.getElementById('changePwBackBtn');
const changePasswordForm = document.getElementById('changePasswordForm');
const currentPwInput = document.getElementById('currentPwInput');
const newPwInput = document.getElementById('newPwInput');
const confirmPwInput = document.getElementById('confirmPwInput');
const showPwCheckbox = document.getElementById('showPwCheckbox');
const drawerBtnChangePassword = document.getElementById('drawerBtnChangePassword');

const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const eyeIcon = document.getElementById('eyeIcon');

const resetPwInput = document.getElementById('resetPwInput');
const toggleResetPwBtn = document.getElementById('toggleResetPwBtn');
const resetEyeIcon = document.getElementById('resetEyeIcon');

const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const forgotPwHeaderBackBtn =
    document.getElementById('forgotPwHeaderBackBtn');
const forgotPwCancelBtn =
    document.getElementById('forgotPwCancelBtn');
const forgotPwSubmitBtn =
    document.getElementById('forgotPwSubmitBtn');

const openOutlookBtn = document.getElementById('openOutlookBtn');
const outlookBackBtn = document.getElementById('outlookBackBtn');

const copyPasswordInline =
    document.getElementById('copyPasswordInline');
const copyPwReturnBtn =
    document.getElementById('copyPwReturnBtn');

const loginForm = document.getElementById('loginForm');
const finalLoginForm = document.getElementById('finalLoginForm');

const resetForgotBtn = document.getElementById('resetForgotBtn');
const logoutButton = document.getElementById('logoutBtn') ||
    document.getElementById('logoutButton');
const dashboardUserId = document.getElementById('dashUserId');
const welcomeUser = document.getElementById('welcomeUser');
const demoAccountId = document.getElementById('demoAccountId');
const userInitial = document.getElementById('userInitial');

const langEnBtn = document.getElementById('langEnBtn');
const langKhBtn = document.getElementById('langKhBtn');

const gpsContainer = document.getElementById('gpsContainer');
const gpsIcon = document.getElementById('gpsIcon');

const navBackBtn = document.getElementById('navBackBtn');
const navHomeBtn = document.getElementById('navHomeBtn');
const navRecentsBtn = document.getElementById('navRecentsBtn');

/* =========================================================
   STATE
========================================================= */
let isPortrait = true;
let isTitanium = true;
let isScreenOn = true;
let isWorkingHourCheckedIn = false;
let isMotionEnabled = true;
let isGuideEnabled = true;
let scaleMode = 'standard';

/* =========================================================
   CLOCK
========================================================= */
function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    currentTime.textContent = `${hours}:${minutes} ${ampm}`;

    const homeDigitalTime = document.getElementById('homeDigitalTime');
    const homeDigitalDate = document.getElementById('homeDigitalDate');
    if (homeDigitalTime) {
        homeDigitalTime.innerHTML = `${hours}<span class="clock-colon">:</span>${minutes}`;
    }
    if (homeDigitalDate) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        homeDigitalDate.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
    }
}

updateClock();
setInterval(updateClock, 1000);

let toastTimeout = null;
function showToast(message, iconClass = 'fa-solid fa-circle-check text-emerald-400') {
    const toast = document.getElementById('appToast');
    const toastMsg = document.getElementById('appToastMsg');
    const toastIcon = document.getElementById('appToastIcon');
    if (!toast || !toastMsg) return;

    if (toastTimeout) clearTimeout(toastTimeout);

    toastMsg.textContent = message;
    if (toastIcon && iconClass) {
        toastIcon.className = iconClass;
    }

    toast.classList.remove('hidden');
    void toast.offsetWidth;
    toast.classList.remove('opacity-0', '-translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');

    toastTimeout = setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', '-translate-y-2');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 2400);
}

/* =========================================================
   VIEW SYSTEM
========================================================= */
const allViews = [
    tabletHomeView,
    splashLoadingView,
    loginView,
    forgotPwView,
    forgotPwSuccessView,
    outlookEmailView,
    loginScreenPasswordResetView,
    dashboardView,
    changePasswordView
];

function showView(view) {
    allViews.forEach(item => {
        item.classList.add('hidden');
        item.classList.remove('view-enter', 'app-launch-enter', 'home-screen-enter');
    });

    view.classList.remove('hidden');

    requestAnimationFrame(() => {
        view.classList.add('view-enter');
    });

    screenContent.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showHomeView() {
    allViews.forEach(item => {
        item.classList.add('hidden');
        item.classList.remove('view-enter', 'app-launch-enter', 'home-screen-enter');
    });

    tabletHomeView.classList.remove('hidden');

    if (isGuideEnabled) {
        teachingGuideHint?.classList.remove('guide-hidden');
    }

    requestAnimationFrame(() => {
        tabletHomeView.classList.add('home-screen-enter');
    });

    screenContent.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function launchAppFromHome(triggerBtn, targetView, toastMessage, toastIcon = 'fa-solid fa-mobile-screen text-blue-400') {
    if (triggerBtn) {
        triggerBtn.classList.add('launching');
        setTimeout(() => triggerBtn.classList.remove('launching'), 450);
    }

    if (toastMessage) {
        showToast(toastMessage, toastIcon);
    }

    // Delay slightly to let the tactile icon spring feedback play smoothly before expanding the window
    setTimeout(() => {
        allViews.forEach(item => {
            item.classList.add('hidden');
            item.classList.remove('view-enter', 'app-launch-enter', 'home-screen-enter');
        });

        targetView.classList.remove('hidden');

        requestAnimationFrame(() => {
            targetView.classList.add('app-launch-enter');
        });

        screenContent.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }, 130);
}

function showLoginView() {
    showView(loginView);
}

/* =========================================================
   HOME SCREEN APP LAUNCHERS
========================================================= */
function launchOnboardingApp(triggerBtn) {
    if (triggerBtn) {
        triggerBtn.classList.add('launching');
        setTimeout(() => triggerBtn.classList.remove('launching'), 450);

        // Radiant expanding launch burst ripple from icon center
        const burst = document.createElement('span');
        burst.className = 'app-launch-burst';
        burst.style.left = '50%';
        burst.style.top = '50%';
        triggerBtn.appendChild(burst);
        setTimeout(() => burst.remove(), 650);
    }

    // Temporarily hide teaching guide hint during app session
    teachingGuideHint?.classList.add('guide-hidden');

    // Reset and replay splash loader track animation smoothly
    const progressTrack = splashLoadingView.querySelector('.splash-progress-track');
    if (progressTrack) {
        progressTrack.style.animation = 'none';
        void progressTrack.offsetWidth;
        progressTrack.style.animation = '';
    }

    // Show splash loading screen first before revealing loginView
    showView(splashLoadingView);

    // After realistic splash load time, reveal loginView
    setTimeout(() => {
        showView(loginView);
    }, 1800);
}

const appIconOnboarding = document.getElementById('appIconOnboarding');
const dockIconOnboarding = document.getElementById('dockIconOnboarding');
[appIconOnboarding, dockIconOnboarding].forEach(btn => {
    btn?.addEventListener('click', () => {
        launchOnboardingApp(btn);
    });
});

// Teaching guide pointer click launches the app too
teachingGuideHint?.addEventListener('click', (e) => {
    e.stopPropagation();
    launchOnboardingApp(appIconOnboarding);
});

const appIconOutlook = document.getElementById('appIconOutlook');
const dockIconOutlook = document.getElementById('dockIconOutlook');
[appIconOutlook, dockIconOutlook].forEach(btn => {
    btn?.addEventListener('click', () => {
        launchAppFromHome(btn, outlookEmailView, 'Opening Outlook...', 'fa-solid fa-envelope text-blue-400');
    });
});

document.querySelectorAll('.home-app-item[data-app-name]').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-app-name');
        btn.classList.add('launching');
        setTimeout(() => btn.classList.remove('launching'), 450);
        showToast(`Opening ${name}...`, 'fa-solid fa-cube text-blue-400');
    });
});

/* =========================================================
   PASSWORD VISIBILITY
========================================================= */
togglePasswordBtn.addEventListener('click', () => {
    const visible = passwordInput.type === 'text';

    passwordInput.type = visible ? 'password' : 'text';

    eyeIcon.className = visible
        ? 'fa-regular fa-eye text-xs'
        : 'fa-regular fa-eye-slash text-xs text-sathapana-blue';
});

toggleResetPwBtn.addEventListener('click', () => {
    const visible = resetPwInput.type === 'text';

    resetPwInput.type = visible ? 'password' : 'text';

    resetEyeIcon.className = visible
        ? 'fa-regular fa-eye text-xs'
        : 'fa-regular fa-eye-slash text-xs text-sathapana-blue';
});

// Enable direct text copy and selection from resetPwInput
resetPwInput?.addEventListener('click', () => {
    resetPwInput.select();
});

resetPwInput?.addEventListener('copy', (e) => {
    const val = resetPwInput.value;
    if (e.clipboardData) {
        e.clipboardData.setData('text/plain', val);
        e.preventDefault();
    }
    showToast(
        currentLanguage === 'kh' ? 'បានចម្លងពាក្យសម្ងាត់៖ ' + val : 'Password copied: ' + val,
        'fa-solid fa-copy text-emerald-400'
    );
});

resetPwInput?.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        navigator.clipboard?.writeText(resetPwInput.value);
        showToast(
            currentLanguage === 'kh' ? 'បានចម្លងពាក្យសម្ងាត់៖ ' + resetPwInput.value : 'Password copied: ' + resetPwInput.value,
            'fa-solid fa-copy text-emerald-400'
        );
    }
});

/* =========================================================
   MOTION / EFFECTS TOGGLE (ចលនា)
========================================================= */
toggleMotionBtn?.addEventListener('click', () => {
    isMotionEnabled = !isMotionEnabled;
    tabletChassis.classList.toggle('motion-disabled', !isMotionEnabled);
    toggleMotionBtn.classList.toggle('active', isMotionEnabled);

    if (motionBtnText) {
        const textKey = isMotionEnabled ? 'effectsOn' : 'effectsOff';
        motionBtnText.textContent = t(textKey);
    }

    showToast(
        isMotionEnabled
            ? (currentLanguage === 'kh' ? 'បានបើកចលនា (Effects ON)' : 'Dynamic Effects: ON')
            : (currentLanguage === 'kh' ? 'បានបិទចលនា (Effects OFF)' : 'Dynamic Effects: OFF'),
        isMotionEnabled ? 'fa-solid fa-wand-magic-sparkles text-amber-300' : 'fa-solid fa-ban text-slate-400'
    );
});

/* =========================================================
   TEACHING GUIDE TOGGLE (ការណែនាំ)
========================================================= */
toggleGuideBtn?.addEventListener('click', () => {
    isGuideEnabled = !isGuideEnabled;
    teachingGuideHint?.classList.toggle('guide-hidden', !isGuideEnabled);
    toggleGuideBtn.classList.toggle('active', isGuideEnabled);

    if (guideBtnText) {
        const textKey = isGuideEnabled ? 'guideOn' : 'guideOff';
        guideBtnText.textContent = t(textKey);
    }

    showToast(
        isGuideEnabled
            ? (currentLanguage === 'kh' ? 'បានបើកការណែនាំ (Guide ON)' : 'Teaching Guide: ON')
            : (currentLanguage === 'kh' ? 'បានបិទការណែនាំ (Guide OFF)' : 'Teaching Guide: OFF'),
        isGuideEnabled ? 'fa-solid fa-hand-pointer text-cyan-300' : 'fa-solid fa-eye-slash text-slate-400'
    );
});

/* =========================================================
   ANDROID HIGH-VISIBILITY TOUCH / TAP FEEDBACK (FOR VIDEO)
========================================================= */
screenContainer?.addEventListener('pointerdown', (e) => {
    if (!isScreenOn) return;

    const rect = screenContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tapRipple = document.createElement('span');
    tapRipple.className = 'screen-touch-ripple';
    tapRipple.style.left = `${x}px`;
    tapRipple.style.top = `${y}px`;

    screenContainer.appendChild(tapRipple);
    tapRipple.addEventListener('animationend', () => tapRipple.remove(), { once: true });
});

/* =========================================================
   SCALE / RESOLUTION TOGGLE (FOR HD & 4K RECORDING)
========================================================= */
toggleScaleBtn?.addEventListener('click', () => {
    if (scaleMode === 'standard') {
        scaleMode = 'hd';
        tabletChassis.classList.remove('scale-4k');
        tabletChassis.classList.add('scale-hd');
        if (scaleBtnText) scaleBtnText.textContent = 'Size: 125% (HD)';
        showToast('Scale: 125% (HD Resolution)', 'fa-solid fa-up-right-and-down-left-from-center text-purple-300');
    } else if (scaleMode === 'hd') {
        scaleMode = '4k';
        tabletChassis.classList.remove('scale-hd');
        tabletChassis.classList.add('scale-4k');
        if (scaleBtnText) scaleBtnText.textContent = 'Size: 150% (4K)';
        showToast('Scale: 150% (4K Resolution)', 'fa-solid fa-up-right-and-down-left-from-center text-purple-400');
    } else {
        scaleMode = 'standard';
        tabletChassis.classList.remove('scale-hd', 'scale-4k');
        if (scaleBtnText) scaleBtnText.textContent = 'Size: 100%';
        showToast('Scale: 100% (Standard)', 'fa-solid fa-compress text-blue-400');
    }
});

/* =========================================================
   ORIENTATION
========================================================= */
toggleOrientationBtn.addEventListener('click', () => {
    isPortrait = !isPortrait;

    tabletChassis.classList.toggle('portrait', isPortrait);
    tabletChassis.classList.toggle('landscape', !isPortrait);

    orientationText.textContent =
        isPortrait ? 'Portrait' : 'Landscape';

    showToast(
        isPortrait
            ? 'Portrait mode'
            : 'Landscape mode',
        'fa-solid fa-rotate text-blue-400'
    );
});

/* =========================================================
   FRAME
========================================================= */
toggleFrameBtn.addEventListener('click', () => {
    isTitanium = !isTitanium;

    tabletChassis.classList.toggle('frame-titanium', isTitanium);
    tabletChassis.classList.toggle('frame-silver', !isTitanium);

    frameColorText.textContent =
        isTitanium ? 'Titanium' : 'Silver';

    showToast(
        isTitanium ? 'Titanium frame' : 'Silver frame',
        'fa-solid fa-palette text-amber-400'
    );
});

/* =========================================================
   FULL SCREEN TOGGLE
========================================================= */
if (toggleFullscreenBtn) {
    toggleFullscreenBtn.addEventListener('click', () => {
        const isFs = document.fullscreenElement || tabletChassis.classList.contains('fullscreen-mode');

        if (!isFs) {
            tabletChassis.classList.add('fullscreen-mode');
            if (fullscreenText) fullscreenText.textContent = 'Exit Full Screen';
            toggleFullscreenBtn.querySelector('i')?.classList.replace('fa-expand', 'fa-compress');

            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(() => {});
            }

            showToast('Full Screen enabled', 'fa-solid fa-expand text-emerald-400');
        } else {
            tabletChassis.classList.remove('fullscreen-mode');
            if (fullscreenText) fullscreenText.textContent = 'Full Screen';
            toggleFullscreenBtn.querySelector('i')?.classList.replace('fa-compress', 'fa-expand');

            if (document.fullscreenElement && document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }

            showToast('Standard view', 'fa-solid fa-compress text-blue-400');
        }
    });

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            tabletChassis.classList.remove('fullscreen-mode');
            if (fullscreenText) fullscreenText.textContent = 'Full Screen';
            toggleFullscreenBtn.querySelector('i')?.classList.replace('fa-compress', 'fa-expand');
        }
    });
}

/* =========================================================
   BRIGHTNESS
========================================================= */
brightnessSlider.addEventListener('input', event => {
    screenContent.style.filter =
        `brightness(${event.target.value}%)`;
});

/* =========================================================
   POWER
========================================================= */
powerBtn.addEventListener('click', () => {
    isScreenOn = !isScreenOn;

    if (isScreenOn) {
        screenContent.style.opacity = '1';
        screenContent.style.pointerEvents = 'auto';

        showToast(
            'Screen awake',
            'fa-solid fa-power-off text-emerald-400'
        );
    } else {
        screenContent.style.opacity = '0';
        screenContent.style.pointerEvents = 'none';

        showToast(
            'Screen asleep',
            'fa-solid fa-power-off text-slate-400'
        );
    }
});

volUpBtn.addEventListener('click', () => {
    showToast(
        'Volume 85%',
        'fa-solid fa-volume-high text-amber-400'
    );
});

volDownBtn.addEventListener('click', () => {
    showToast(
        'Volume 40%',
        'fa-solid fa-volume-low text-amber-400'
    );
});

/* =========================================================
   FULL ENGLISH / KHMER LANGUAGE SYSTEM
========================================================= */
const UI_TRANSLATIONS = {
    en: {
        simulator: 'Simulator',
        subtitle: 'Sathapana Bank - ONBOARDING App Interactive Simulator',
        portrait: 'Portrait',
        landscape: 'Landscape',
        titanium: 'Titanium',
        silver: 'Silver',
        resetFlow: 'Reset Flow',
        userId: 'User ID',
        password: 'Password',
        forgotPassword: 'Forgot Password?',
        signIn: 'LOGIN',
        login: 'LOGIN',
        quickService: 'QUICK SERVICE',
        printTutortKhqr: 'Print Tutort KHQR',
        selectLanguage: 'Select Language',
        gpsChecking: 'GPS Checking',
        gpsWorking: 'GPS is working',
        gpsVerified: 'GPS Verified: Active Location',
        checkingGps: 'Checking GPS Location...',
        version: 'Version 2.7.9',
        enterUserId: 'Enter your User ID',
        emailAddress: 'Email Address',
        submit: 'Submit',
        cancel: 'Cancel',
        openOutlook: 'Open Outlook',
        dear: 'Dear Sir/Ms,',
        informed: 'Be informed that your password has been',
        resetTo: 'reset to',
        autoEmail: 'This is an auto generating email. Do not reply.',
        thanks: 'Thanks and best regards,',
        bank: 'Sathapana Bank',
        helpdesk: 'If you did not request a password reset, please contact IT Helpdesk immediately.',
        successTitle: 'Your password reset request has been sent successfully!',
        successText: 'An email has been sent to your registered email address with instructions to reset your password.',
        loginSuccess: 'Login Successful!',
        portal: 'Sathapana Onboarding App Portal',
        newPassword: 'New Password:',
        branch: 'Branch:',
        appStatus: 'App Status:',
        authenticated: 'Authenticated',
        backStart: 'Back to Start Login',
        passwordCopied: 'Password copied! Showing login screen.',
        screenAwake: 'Screen Awake',
        screenAsleep: 'Screen Asleep',
        volume85: 'Volume: 85%',
        volume40: 'Volume: 40%',
        languageEnglish: 'Language switched to English',
        languageKhmer: 'បានប្តូរទៅភាសាខ្មែរ',
        screenForgot: 'Forgot Password Form',
        requestSent: 'Password Request Sent!',
        outlookView: 'Outlook Mobile Email View',
        authenticating: 'Authenticating...',
        authenticatingPassword: 'Authenticating with password...',
        welcome: 'Welcome! Login Successful!',
        returned: 'Returned to Screen 1',
        resetDone: 'Simulator reset to Screen 1',
        gpsActive: 'GPS Verified: Active Location',
        archive: 'Archive',
        delete: 'Delete',
        markUnread: 'Mark Unread',
        moreOptions: 'More options',
        copyReturn: 'Return to Login',
        onboardingTitle: 'Onboarding App',
        workingHour: 'Working Hour:',
        checkInNotYet: 'Not yet check in',
        checkInActive: '08:30 AM',
        secOnboarding: 'Onboarding',
        createCustomer: 'Create New<br>Customer',
        createAccount: 'Create New Account<br>Existing Customer',
        loanCollection: 'Loan Collection',
        phoneInfo: 'Phone Information',
        updateSecondary: 'Update Secondary<br>Number',
        drawerHome: 'Home',
        drawerCheckInOut: 'My Check In/Out',
        drawerSignature: 'Staff Signature',
        drawerChangePassword: 'Change Password',
        drawerLanguage: 'Language',
        drawerLogout: 'Logout',
        changePwTitle: 'Change Password',
        currentPassword: 'Current Password',
        newPasswordPlaceholder: 'New Password',
        confirmPasswordPlaceholder: 'Confirm Password',
        showPasswordLabel: 'Show Password',
        btnChangePassword: 'CHANGE PASSWORD',
        effectsOn: 'Effects: ON',
        effectsOff: 'Effects: OFF',
        guideOn: 'Guide: ON',
        guideOff: 'Guide: OFF'
    },
    kh: {
        simulator: 'កម្មវិធីសាកល្បង',
        subtitle: 'ធនាគារ ស្ថាបនា - កម្មវិធីសាកល្បង ONBOARDING អន្តរកម្ម',
        portrait: 'បញ្ឈរ',
        landscape: 'ផ្ដេក',
        titanium: 'ទីតានីញ៉ូម',
        silver: 'ប្រាក់',
        resetFlow: 'កំណត់ឡើងវិញ',
        userId: 'លេខសម្គាល់អ្នកប្រើប្រាស់',
        password: 'ពាក្យសម្ងាត់',
        forgotPassword: 'ភ្លេចពាក្យសម្ងាត់?',
        signIn: 'ចូលប្រើប្រាស់',
        login: 'ចូល',
        quickService: 'សេវារហ័ស',
        printTutortKhqr: 'បោះពុម្ព Tutort KHQR',
        selectLanguage: 'ជ្រើសរើសភាសា',
        gpsChecking: 'កំពុងពិនិត្យ GPS',
        gpsWorking: 'GPS ដំណើរការធម្មតា',
        gpsVerified: 'GPS បានផ្ទៀងផ្ទាត់៖ ទីតាំងសកម្ម',
        checkingGps: 'កំពុងពិនិត្យទីតាំង GPS...',
        version: 'កំណែ 2.7.9',
        enterUserId: 'បញ្ចូលលេខសម្គាល់អ្នកប្រើប្រាស់',
        emailAddress: 'អាសយដ្ឋានអ៊ីមែល',
        submit: 'បញ្ជូន',
        cancel: 'បោះបង់',
        openOutlook: 'បើក Outlook',
        dear: 'ជូនចំពោះ លោក/លោកស្រី,',
        informed: 'សូមជម្រាបថា ពាក្យសម្ងាត់របស់អ្នកត្រូវបាន',
        resetTo: 'កំណត់ទៅជា',
        autoEmail: 'នេះជាអ៊ីមែលស្វ័យប្រវត្តិ។ សូមកុំឆ្លើយតប។',
        thanks: 'សូមអរគុណ និងដោយក្តីគោរព,',
        bank: 'ធនាគារ ស្ថាបនា',
        helpdesk: 'ប្រសិនបើអ្នកមិនបានស្នើសុំកំណត់ពាក្យសម្ងាត់ឡើងវិញ សូមទាក់ទង IT Helpdesk ភ្លាមៗ។',
        successTitle: 'សំណើកំណត់ពាក្យសម្ងាត់របស់អ្នកត្រូវបានបញ្ជូនដោយជោគជ័យ!',
        successText: 'អ៊ីមែលត្រូវបានផ្ញើទៅអាសយដ្ឋានអ៊ីមែលដែលបានចុះឈ្មោះរបស់អ្នក ជាមួយសេចក្តីណែនាំសម្រាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញ។',
        loginSuccess: 'ចូលប្រើប្រាស់បានជោគជ័យ!',
        portal: 'ប្រព័ន្ធ Onboarding របស់ធនាគារ ស្ថាបនា',
        newPassword: 'ពាក្យសម្ងាត់ថ្មី:',
        branch: 'សាខា:',
        appStatus: 'ស្ថានភាពកម្មវិធី:',
        authenticated: 'បានផ្ទៀងផ្ទាត់',
        backStart: 'ត្រឡប់ទៅការចូល',
        passwordCopied: 'បានចម្លងពាក្យសម្ងាត់! កំពុងបង្ហាញទំព័រចូល។',
        screenAwake: 'អេក្រង់បានបើក',
        screenAsleep: 'អេក្រង់បានបិទ',
        volume85: 'កម្រិតសំឡេង៖ 85%',
        volume40: 'កម្រិតសំឡេង៖ 40%',
        languageEnglish: 'បានប្តូរទៅភាសាអង់គ្លេស',
        languageKhmer: 'បានប្តូរទៅភាសាខ្មែរ',
        screenForgot: 'ទម្រង់ភ្លេចពាក្យសម្ងាត់',
        requestSent: 'សំណើពាក្យសម្ងាត់ត្រូវបានបញ្ជូន!',
        outlookView: 'ទំព័រអ៊ីមែល Outlook លើទូរស័ព្ទ',
        authenticating: 'កំពុងផ្ទៀងផ្ទាត់...',
        authenticatingPassword: 'កំពុងផ្ទៀងផ្ទាត់ដោយប្រើពាក្យសម្ងាត់...',
        welcome: 'សូមស្វាគមន៍! ចូលប្រើប្រាស់បានជោគជ័យ!',
        returned: 'បានត្រឡប់ទៅទំព័រទី 1',
        resetDone: 'កម្មវិធីសាកល្បងបានកំណត់ទៅទំព័រទី 1',
        gpsActive: 'GPS បានផ្ទៀងផ្ទាត់៖ ទីតាំងសកម្ម',
        archive: 'ទុកក្នុងប័ណ្ណសារ',
        delete: 'លុប',
        markUnread: 'សម្គាល់ថាមិនទាន់អាន',
        moreOptions: 'ជម្រើសបន្ថែម',
        copyReturn: 'ត្រឡប់ទៅការចូល',
        onboardingTitle: 'កម្មវិធី Onboarding',
        workingHour: 'ម៉ោងធ្វើការ:',
        checkInNotYet: 'មិនទាន់ Check In នៅឡើយ',
        checkInActive: 'ម៉ោង 08:30 ព្រឹក',
        secOnboarding: 'ការចុះឈ្មោះ (Onboarding)',
        createCustomer: 'បង្កើតអតិថិជន<br>ថ្មី',
        createAccount: 'បង្កើតគណនីថ្មី<br>សម្រាប់អតិថិជនចាស់',
        loanCollection: 'ការប្រមូលប្រាក់កម្ចី',
        phoneInfo: 'ព័ត៌មានលេខទូរស័ព្ទ',
        updateSecondary: 'ធ្វើបច្ចុប្បន្នភាព<br>លេខបន្ទាប់បន្សំ',
        drawerHome: 'ទំព័រដើម',
        drawerCheckInOut: 'ការ Check In/Out របស់ខ្ញុំ',
        drawerSignature: 'ហត្ថលេខាបុគ្គលិក',
        drawerChangePassword: 'ផ្លាស់ប្តូរពាក្យសម្ងាត់',
        drawerLanguage: 'ភាសា',
        drawerLogout: 'ចាកចេញ',
        changePwTitle: 'ផ្លាស់ប្តូរពាក្យសម្ងាត់',
        currentPassword: 'ពាក្យសម្ងាត់បច្ចុប្បន្ន',
        newPasswordPlaceholder: 'ពាក្យសម្ងាត់ថ្មី',
        confirmPasswordPlaceholder: 'បញ្ជាក់ពាក្យសម្ងាត់',
        showPasswordLabel: 'បង្ហាញពាក្យសម្ងាត់',
        btnChangePassword: 'ផ្លាស់ប្តូរពាក្យសម្ងាត់',
        effectsOn: 'ចលនា៖ បើក',
        effectsOff: 'ចលនា៖ បិទ',
        guideOn: 'ការណែនាំ៖ បើក',
        guideOff: 'ការណែនាំ៖ បិទ'
    }
};

let currentLanguage = 'en';

function t(key) {
    return UI_TRANSLATIONS[currentLanguage][key] || UI_TRANSLATIONS.en[key] || key;
}

function setElementText(selector, key) {
    const el = document.querySelector(selector);
    if (el) el.textContent = t(key);
}

function setElementHTML(selector, key) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = t(key);
}

function translateAllUI(lang = currentLanguage) {
    currentLanguage = lang;
    const khmer = lang === 'kh';

    document.documentElement.lang = khmer ? 'km' : 'en';
    document.body.classList.toggle('font-khmer', khmer);

    const langEnBtnReset = document.getElementById('langEnBtnReset');
    const langKhBtnReset = document.getElementById('langKhBtnReset');

    langEnBtn?.classList.toggle('active', !khmer);
    langKhBtn?.classList.toggle('active', khmer);
    langEnBtnReset?.classList.toggle('active', !khmer);
    langKhBtnReset?.classList.toggle('active', khmer);

    langEnBtn?.setAttribute('aria-pressed', String(!khmer));
    langKhBtn?.setAttribute('aria-pressed', String(khmer));
    langEnBtnReset?.setAttribute('aria-pressed', String(!khmer));
    langKhBtnReset?.setAttribute('aria-pressed', String(khmer));

    // Simulator header
    setElementText('#orientationText', isPortrait ? 'portrait' : 'landscape');
    setElementText('#frameColorText', isTitanium ? 'titanium' : 'silver');
    setElementText('#resetDemoBtn span', 'resetFlow');

    const simBadge = document.querySelector('header .text-xs.bg-slate-700');
    if (simBadge) simBadge.textContent = t('simulator');

    const subtitle = document.querySelector('header p.text-xs.text-slate-400');
    if (subtitle) subtitle.textContent = t('subtitle');

    // Login
    setElementText('#lblUserId', 'userId');
    setElementText('#lblPassword', 'password');
    setElementText('#txtForgotPw', 'forgotPassword');
    setElementText('#txtLoginBtn', 'signIn');
    setElementText('#lblSelectLanguage', 'selectLanguage');
    setElementText('#lblSelectLanguageReset', 'selectLanguage');
    setElementText('#txtQuickService', 'quickService');
    setElementText('#txtGps', 'gpsWorking');

    const loginInput = document.querySelector('#userIdInput');
    const passwordInputEl = document.querySelector('#passwordInput');
    if (loginInput) loginInput.placeholder = t('userId');
    if (passwordInputEl) passwordInputEl.placeholder = t('password');

    // Forgot password screen
    setElementText('#forgotPwView h2', 'forgotPassword');
    const forgotLabels = document.querySelectorAll('#forgotPwView label');
    if (forgotLabels[0]) forgotLabels[0].textContent = t('enterUserId');
    if (forgotLabels[1]) forgotLabels[1].textContent = t('emailAddress');
    setElementText('#forgotPwSubmitBtn', 'submit');
    setElementText('#forgotPwCancelBtn', 'cancel');

    // Success screen
    setElementText('#forgotPwSuccessView h3', 'successTitle');
    const successP = document.querySelector('#forgotPwSuccessView > div:first-child p');
    if (successP) successP.textContent = t('successText');
    setElementText('#openOutlookBtn span', 'openOutlook');

    // Outlook
    const outlook = document.querySelector('#outlookEmailView');
    if (outlook) {
        const buttons = outlook.querySelectorAll('button[title]');
        buttons.forEach(btn => {
            const title = btn.getAttribute('title');
            const key = title === 'Archive' ? 'archive'
                : title === 'Delete' ? 'delete'
                    : title === 'Mark Unread' ? 'markUnread'
                        : title === 'More options' ? 'moreOptions'
                            : null;
            if (key) {
                btn.setAttribute('title', t(key));
                btn.setAttribute('aria-label', t(key));
            }
        });

        const emailPs = outlook.querySelectorAll('.p-5 > p');
        if (emailPs[0]) emailPs[0].textContent = t('dear');
        if (emailPs[1]) emailPs[1].textContent = t('informed');
        if (emailPs[2]) emailPs[2].textContent = t('resetTo');
        if (emailPs[3]) emailPs[3].textContent = t('autoEmail');
        if (emailPs[4]) {
            emailPs[4].innerHTML = `<span>${t('thanks')}</span>`;
            const bank = document.createElement('p');
            bank.className = 'font-semibold text-slate-900';
            bank.textContent = t('bank');
            emailPs[4].after(bank);
        }
        const help = outlook.querySelector('.p-5 > p:last-child');
        if (help) help.textContent = t('helpdesk');

        const copyButton = outlook.querySelector('.p-3 button');
        if (copyButton) {
            const span = copyButton.querySelector('span');
            if (span) span.textContent = t('copyReturn');
        }
    }

    // Reset-password login
    const resetLabels = document.querySelectorAll('#loginScreenPasswordResetView label');
    if (resetLabels[0]) resetLabels[0].textContent = t('userId');
    if (resetLabels[1]) resetLabels[1].textContent = t('password');

    const resetSubmit = document.querySelector('#loginScreenPasswordResetView button[type="submit"]');
    if (resetSubmit) resetSubmit.textContent = t('login');

    const resetForgot = document.querySelector('#loginScreenPasswordResetView form button[type="button"]');
    if (resetForgot) resetForgot.textContent = t('forgotPassword');

    // Translate Onboarding Dashboard
    const titleEl = document.getElementById('onboardingAppTitle');
    if (titleEl) {
        titleEl.innerHTML = `${t('onboardingTitle')} <span id="dashLoanRmId">LOAN-RM-000</span>`;
    }
    setElementText('#lblWorkingHour', 'workingHour');
    const checkInStatusVal = document.getElementById('checkInStatusVal');
    if (checkInStatusVal) {
        if (!isWorkingHourCheckedIn) {
            checkInStatusVal.textContent = t('checkInNotYet');
        } else {
            checkInStatusVal.textContent = t('checkInActive');
        }
    }
    setElementText('#secOnboardingTitle', 'secOnboarding');
    setElementHTML('#lblCreateCustomer', 'createCustomer');
    setElementHTML('#lblCreateAccount', 'createAccount');
    setElementText('#lblLoanCollection', 'loanCollection');
    setElementText('#secPhoneInfoTitle', 'phoneInfo');
    setElementHTML('#lblUpdateSecondary', 'updateSecondary');

    setElementText('#txtDrawerHome', 'drawerHome');
    setElementText('#txtDrawerCheckInOut', 'drawerCheckInOut');
    setElementText('#txtDrawerSignature', 'drawerSignature');
    setElementText('#txtDrawerChangePassword', 'drawerChangePassword');
    setElementText('#txtDrawerLanguage', 'drawerLanguage');
    setElementText('#txtDrawerLogout', 'drawerLogout');

    setElementText('#lblChangePwTitle', 'changePwTitle');
    setElementText('#lblShowPassword', 'showPasswordLabel');
    setElementText('#txtBtnChangePw', 'btnChangePassword');

    const curInput = document.getElementById('currentPwInput');
    if (curInput) curInput.placeholder = t('currentPassword');
    const nwInput = document.getElementById('newPwInput');
    if (nwInput) nwInput.placeholder = t('newPasswordPlaceholder');
    const cfInput = document.getElementById('confirmPwInput');
    if (cfInput) cfInput.placeholder = t('confirmPasswordPlaceholder');

    // Translate common title/aria labels
    if (motionBtnText) {
        motionBtnText.textContent = isMotionEnabled ? t('effectsOn') : t('effectsOff');
    }
    if (guideBtnText) {
        guideBtnText.textContent = isGuideEnabled ? t('guideOn') : t('guideOff');
    }
    document.querySelector('#toggleMotionBtn')?.setAttribute(
        'title', khmer ? 'ប្តូរចលនា និងបែបផែន (Motion Effects)' : 'Toggle Dynamic Animation Effects'
    );
    document.querySelector('#toggleGuideBtn')?.setAttribute(
        'title', khmer ? 'ប្តូរបង្ហាញការណែនាំសម្រាប់វីដេអូបង្រៀន' : 'Toggle Teaching Guide Pointer'
    );
    document.querySelector('#toggleOrientationBtn')?.setAttribute(
        'title', khmer ? 'ប្តូរទិសដៅថេប្លេត' : 'Rotate Tablet'
    );
    document.querySelector('#toggleFrameBtn')?.setAttribute(
        'title', khmer ? 'ប្តូរពណ៌ស៊ុម' : 'Change Frame Color'
    );
    document.querySelector('#resetDemoBtn')?.setAttribute(
        'title', khmer ? 'កំណត់អេក្រង់សាកល្បងឡើងវិញ' : 'Reset Demo Screen'
    );
    powerBtn?.setAttribute('title', khmer ? 'ប៊ូតុងបើក/បិទ' : 'Power Button');
    volUpBtn?.setAttribute('title', khmer ? 'បង្កើនសំឡេង' : 'Volume Up');
    volDownBtn?.setAttribute('title', khmer ? 'បន្ថយសំឡេង' : 'Volume Down');
    navBackBtn?.setAttribute('title', khmer ? 'ត្រឡប់ក្រោយ' : 'Back');
    navHomeBtn?.setAttribute('title', khmer ? 'ទំព័រដើម' : 'Home');

    // Update version
    document.querySelectorAll('p').forEach(p => {
        if (/^Version 2\.7\.9$/.test(p.textContent.trim()) || /^កំណែ 2\.7\.9$/.test(p.textContent.trim())) {
            p.textContent = t('version');
        }
    });
}

langEnBtn?.addEventListener('click', () => {
    translateAllUI('en');
});

langKhBtn?.addEventListener('click', () => {
    translateAllUI('kh');
});

document.getElementById('langEnBtnReset')?.addEventListener('click', () => {
    translateAllUI('en');
});

document.getElementById('langKhBtnReset')?.addEventListener('click', () => {
    translateAllUI('kh');
});

/* =========================================================
   LOGIN FLOW
========================================================= */
function openDashboard(userId) {
    const safeUserId = userId || '15165';
    try {
        sessionStorage.setItem('onboardingUserId', safeUserId);
    } catch {
        // The in-page dashboard still works when storage is unavailable (for example, file://).
    }
    const loanRmIdEl = document.getElementById('dashLoanRmId');
    if (loanRmIdEl) loanRmIdEl.textContent = 'LOAN-RM-000';
    const drawerUserName = document.getElementById('drawerUserName');
    if (drawerUserName) drawerUserName.textContent = 'NA LYHUO';
    const drawerUserId = document.getElementById('drawerUserId');
    if (drawerUserId) drawerUserId.textContent = '000';
    const drawerAvatarInitials = document.getElementById('drawerAvatarInitials');
    if (drawerAvatarInitials) drawerAvatarInitials.textContent = 'NL';
    showView(dashboardView);
}

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const submitButton = loginForm.querySelector('[type="submit"]');
    if (submitButton.disabled) return;

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    const userId = document.getElementById('userIdInput').value.trim() || '15165';

    // This is a local onboarding demo: accept the entered ID and continue.
    requestAnimationFrame(() => {
        openDashboard(userId);
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
    });
});

/* =========================================================
   FORGOT PASSWORD
========================================================= */
forgotPasswordBtn.addEventListener('click', () => {
    showView(forgotPwView);
});

forgotPwHeaderBackBtn.addEventListener('click', showLoginView);
forgotPwCancelBtn.addEventListener('click', showLoginView);

forgotPwSubmitBtn.addEventListener('click', () => {
    const email =
        document.getElementById('forgotEmailInput').value.trim();

    if (!email) {
        showToast(
            'Please enter your email',
            'fa-solid fa-triangle-exclamation text-rose-400'
        );
        return;
    }

    document.getElementById('submittedEmailDisplay').textContent =
        `(${email})`;

    showView(forgotPwSuccessView);

    showToast(
        'Password reset request sent',
        'fa-solid fa-circle-check text-emerald-400'
    );
});

/* =========================================================
   OUTLOOK
========================================================= */
openOutlookBtn.addEventListener('click', () => {
    showView(outlookEmailView);

    showToast(
        'Opening Outlook',
        'fa-solid fa-envelope text-blue-400'
    );
});

outlookBackBtn.addEventListener('click', showLoginView);

/* =========================================================
   COPY PASSWORD
========================================================= */
async function copyPassword() {
    const password = 'b9tTd3pb';

    try {
        await navigator.clipboard.writeText(password);
    } catch {
        const area = document.createElement('textarea');

        area.value = password;
        area.style.position = 'fixed';
        area.style.opacity = '0';

        document.body.appendChild(area);
        area.select();

        try {
            document.execCommand('copy');
        } catch { }

        area.remove();
    }
}

async function copyPwAndLogin() {
    await copyPassword();

    showView(loginScreenPasswordResetView);

    showToast(
        'Password copied',
        'fa-solid fa-key text-emerald-400'
    );
}

copyPasswordInline?.addEventListener('click', copyPwAndLogin);
copyPwReturnBtn?.addEventListener('click', () => {
    showView(loginScreenPasswordResetView);
});

/* =========================================================
   FINAL LOGIN
========================================================= */
finalLoginForm.addEventListener('submit', event => {
    event.preventDefault();
    const submitButton = finalLoginForm.querySelector('[type="submit"]');
    if (submitButton.disabled) return;

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    let storedUserId = '';
    try {
        storedUserId = sessionStorage.getItem('onboardingUserId') || '';
    } catch { }
    const userId = storedUserId ||
        document.getElementById('userIdInput').value.trim() || '15165';

    requestAnimationFrame(() => {
        openDashboard(userId);
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
    });
});

resetForgotBtn.addEventListener('click', () => {
    showView(loginView);
});

logoutButton?.addEventListener('click', () => {
    try {
        sessionStorage.removeItem('onboardingUserId');
    } catch { }
    showLoginView();
});

/* =========================================================
   GPS & QUICK SERVICE (PRINT TUTORT KHQR)
========================================================= */
gpsContainer?.addEventListener('click', () => {
    gpsIcon?.classList.add('gps-spin');

    showToast(
        currentLanguage === 'kh' ? 'កំពុងពិនិត្យទីតាំង GPS...' : 'Checking GPS location...',
        'fa-solid fa-location-dot text-amber-400'
    );

    setTimeout(() => {
        gpsIcon?.classList.remove('gps-spin');
        showToast(
            currentLanguage === 'kh' ? 'GPS បានផ្ទៀងផ្ទាត់៖ ដំណើរការធម្មតា' : 'GPS is working: Location verified',
            'fa-solid fa-location-dot text-emerald-400'
        );
    }, 1000);
});

// Quick Service - Print Tutort KHQR
const btnPrintTutortKhqr = document.getElementById('btnPrintTutortKhqr');
const btnPrintTutortKhqrReset = document.getElementById('btnPrintTutortKhqrReset');
const tutortKhqrModalBackdrop = document.getElementById('tutortKhqrModalBackdrop');
const closeTutortKhqrBtn = document.getElementById('closeTutortKhqrBtn');
const cancelTutortKhqrBtn = document.getElementById('cancelTutortKhqrBtn');
const printKhqrActionBtn = document.getElementById('printKhqrActionBtn');

function openTutortKhqrModal() {
    if (!tutortKhqrModalBackdrop) return;
    tutortKhqrModalBackdrop.classList.add('open');
    tutortKhqrModalBackdrop.setAttribute('aria-hidden', 'false');
    showToast(
        currentLanguage === 'kh' ? 'កំពុងបើក Sathapana Tutort KHQR...' : 'Opening Sathapana Tutort KHQR...',
        'fa-solid fa-qrcode text-blue-400'
    );
}

function closeTutortKhqrModal() {
    if (!tutortKhqrModalBackdrop) return;
    tutortKhqrModalBackdrop.classList.remove('open');
    tutortKhqrModalBackdrop.setAttribute('aria-hidden', 'true');
}

btnPrintTutortKhqr?.addEventListener('click', openTutortKhqrModal);
btnPrintTutortKhqrReset?.addEventListener('click', openTutortKhqrModal);
closeTutortKhqrBtn?.addEventListener('click', closeTutortKhqrModal);
cancelTutortKhqrBtn?.addEventListener('click', closeTutortKhqrModal);
tutortKhqrModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === tutortKhqrModalBackdrop) closeTutortKhqrModal();
});

printKhqrActionBtn?.addEventListener('click', () => {
    showToast(
        currentLanguage === 'kh' ? 'កំពុងបញ្ជូនទៅកាន់ម៉ាស៊ីនបោះពុម្ព...' : 'Printing Sathapana Tutort KHQR...',
        'fa-solid fa-print text-emerald-400'
    );
    setTimeout(() => {
        closeTutortKhqrModal();
    }, 1500);
});

/* =========================================================
   ANDROID NAVIGATION
========================================================= */
navBackBtn.addEventListener('click', () => {
    if (changePasswordView && !changePasswordView.classList.contains('hidden')) {
        showView(dashboardView);
        return;
    }

    if (!dashboardView.classList.contains('hidden')) {
        showLoginView();
        showToast('Back to login', 'fa-solid fa-chevron-left text-blue-400');
        return;
    }

    if (!forgotPwView.classList.contains('hidden') ||
        !forgotPwSuccessView.classList.contains('hidden') ||
        !outlookEmailView.classList.contains('hidden') ||
        !loginScreenPasswordResetView.classList.contains('hidden')) {

        showLoginView();
        showToast('Back to login', 'fa-solid fa-chevron-left text-blue-400');
        return;
    }

    if (!loginView.classList.contains('hidden')) {
        showHomeView();
        showToast('Home', 'fa-solid fa-house text-blue-400');
        return;
    }

    screenContent.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

navHomeBtn.addEventListener('click', () => {
    showHomeView();
    showToast(
        'Home',
        'fa-solid fa-house text-blue-400'
    );
});

navRecentsBtn.addEventListener('click', () => {
    showToast(
        'Recent apps',
        'fa-solid fa-layer-group text-blue-400'
    );
});

/* =========================================================
   RESET
========================================================= */
resetDemoBtn.addEventListener('click', () => {

    isPortrait = true;
    isTitanium = true;
    isScreenOn = true;
    scaleMode = 'standard';

    tabletChassis.classList.remove('landscape', 'frame-silver', 'scale-hd', 'scale-4k');
    tabletChassis.classList.add('portrait', 'frame-titanium');

    orientationText.textContent = 'Portrait';
    frameColorText.textContent = 'Titanium';
    if (scaleBtnText) scaleBtnText.textContent = 'Size: 100%';

    brightnessSlider.value = 100;
    screenContent.style.filter = 'brightness(100%)';
    screenContent.style.opacity = '1';
    screenContent.style.pointerEvents = 'auto';

    document.getElementById('userIdInput').value = '15165';
    passwordInput.value = '••••••••';
    passwordInput.type = 'password';

    resetPwInput.value = 'b9tTd3pb';
    resetPwInput.type = 'text';
    if (resetEyeIcon) resetEyeIcon.className = 'fa-regular fa-eye-slash text-xs text-sathapana-blue';

    translateAllUI('en');
    showHomeView();

    showToast(
        'Simulator reset',
        'fa-solid fa-arrows-rotate text-emerald-400'
    );
});

/* =========================================================
   ONBOARDING APP LOAN-RM-000 DASHBOARD INTERACTIONS
========================================================= */
const workingHourToggle = document.getElementById('workingHourToggle');
const checkInStatusVal = document.getElementById('checkInStatusVal');
const locationCoordsVal = document.getElementById('locationCoordsVal');

workingHourToggle?.addEventListener('click', () => {
    isWorkingHourCheckedIn = !isWorkingHourCheckedIn;
    workingHourToggle.classList.toggle('active', isWorkingHourCheckedIn);
    workingHourToggle.setAttribute('aria-checked', String(isWorkingHourCheckedIn));

    if (isWorkingHourCheckedIn) {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const timeStr = `${hours}:${minutes} ${ampm}`;

        if (checkInStatusVal) {
            checkInStatusVal.textContent = currentLanguage === 'kh' ? `ម៉ោង ${timeStr}` : timeStr;
        }
        if (locationCoordsVal) {
            locationCoordsVal.textContent = '11.5564, 104.9282';
        }
    } else {
        if (checkInStatusVal) {
            checkInStatusVal.textContent = t('checkInNotYet');
        }
        if (locationCoordsVal) {
            locationCoordsVal.textContent = '0.00, 0.00';
        }
    }
});

// Side Drawer Navigation
const dashboardMenuBtn = document.getElementById('dashboardMenuBtn');
const drawerBackdrop = document.getElementById('drawerBackdrop');

function closeDrawer() {
    drawerBackdrop?.classList.remove('open');
    drawerBackdrop?.setAttribute('aria-hidden', 'true');
}

function openDrawer() {
    drawerBackdrop?.classList.add('open');
    drawerBackdrop?.setAttribute('aria-hidden', 'false');
}

dashboardMenuBtn?.addEventListener('click', openDrawer);

drawerBackdrop?.addEventListener('click', (e) => {
    if (e.target === drawerBackdrop) {
        closeDrawer();
    }
});

const drawerBtnHome = document.getElementById('drawerBtnHome');
const drawerBtnCheckInOut = document.getElementById('drawerBtnCheckInOut');
const drawerBtnSignature = document.getElementById('drawerBtnSignature');
const drawerBtnLanguage = document.getElementById('drawerBtnLanguage');

drawerBtnHome?.addEventListener('click', () => {
    closeDrawer();
    showView(dashboardView);
});

drawerBtnCheckInOut?.addEventListener('click', () => {
    closeDrawer();
    workingHourToggle?.click();
    showToast(
        isWorkingHourCheckedIn
            ? (currentLanguage === 'kh' ? 'បាន Check In ម៉ោងធ្វើការ' : 'Working Hour Checked In')
            : (currentLanguage === 'kh' ? 'បាន Check Out ម៉ោងធ្វើការ' : 'Working Hour Checked Out'),
        'fa-solid fa-hourglass-half text-amber-400'
    );
});

drawerBtnSignature?.addEventListener('click', () => {
    closeDrawer();
    showToast(
        currentLanguage === 'kh' ? 'ហត្ថលេខាបុគ្គលិកមានសុពលភាព' : 'Staff Signature is verified and active',
        'fa-solid fa-file-signature text-blue-400'
    );
});

drawerBtnChangePassword?.addEventListener('click', () => {
    closeDrawer();
    // Smooth transition into change password screen
    setTimeout(() => {
        showView(changePasswordView);
    }, 120);
});

drawerBtnLanguage?.addEventListener('click', () => {
    const nextLang = currentLanguage === 'en' ? 'kh' : 'en';
    translateAllUI(nextLang);
    showToast(
        nextLang === 'kh' ? 'បានប្តូរទៅភាសាខ្មែរ' : 'Switched to English',
        'fa-solid fa-language text-sky-400'
    );
});

logoutButton?.addEventListener('click', () => {
    closeDrawer();
    try {
        sessionStorage.removeItem('onboardingUserId');
    } catch { }
    showLoginView();
    showToast(
        currentLanguage === 'kh' ? 'បានចាកចេញដោយជោគជ័យ' : 'Signed out successfully',
        'fa-solid fa-arrow-right-from-bracket text-rose-400'
    );
});

/* =========================================================
   CHANGE PASSWORD SCREEN INTERACTIONS
========================================================= */
changePwBackBtn?.addEventListener('click', () => {
    showView(dashboardView);
});

showPwCheckbox?.addEventListener('change', () => {
    const isVisible = showPwCheckbox.checked;
    const inputType = isVisible ? 'text' : 'password';
    if (currentPwInput) currentPwInput.type = inputType;
    if (newPwInput) newPwInput.type = inputType;
    if (confirmPwInput) confirmPwInput.type = inputType;
});

changePasswordForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const curVal = currentPwInput?.value.trim() || '';
    const newVal = newPwInput?.value.trim() || '';
    const cfVal = confirmPwInput?.value.trim() || '';

    if (!curVal) {
        showToast(
            currentLanguage === 'kh' ? 'សូមបញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន' : 'Please enter current password',
            'fa-solid fa-triangle-exclamation text-amber-400'
        );
        currentPwInput?.focus();
        return;
    }
    if (!newVal) {
        showToast(
            currentLanguage === 'kh' ? 'សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី' : 'Please enter new password',
            'fa-solid fa-triangle-exclamation text-amber-400'
        );
        newPwInput?.focus();
        return;
    }
    if (newVal !== cfVal) {
        showToast(
            currentLanguage === 'kh' ? 'ពាក្យសម្ងាត់បញ្ជាក់មិនត្រូវគ្នាទេ' : 'Passwords do not match',
            'fa-solid fa-circle-xmark text-rose-400'
        );
        confirmPwInput?.focus();
        return;
    }

    // Success animation and toast
    showToast(
        currentLanguage === 'kh' ? 'ពាក្យសម្ងាត់ត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ!' : 'Password changed successfully!',
        'fa-solid fa-circle-check text-emerald-400'
    );

    // Reset inputs
    if (currentPwInput) currentPwInput.value = '';
    if (newPwInput) newPwInput.value = '';
    if (confirmPwInput) confirmPwInput.value = '';
    if (showPwCheckbox) {
        showPwCheckbox.checked = false;
        if (currentPwInput) currentPwInput.type = 'password';
        if (newPwInput) newPwInput.type = 'password';
        if (confirmPwInput) confirmPwInput.type = 'password';
    }

    // Smooth return to dashboard
    setTimeout(() => {
        showView(dashboardView);
    }, 450);
});

// Interactive Modals for the 4 Cards
const modalBackdrop = document.getElementById('onboardingModalBackdrop');
const modalIcon = document.getElementById('modalIcon');
const modalTitleText = document.getElementById('modalTitleText');
const modalBodyContent = document.getElementById('modalBodyContent');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');

function openOnboardingModal(type) {
    if (!modalBackdrop) return;

    if (type === 'createCustomer') {
        if (modalIcon) modalIcon.className = 'fa-solid fa-user-plus';
        if (modalTitleText) modalTitleText.textContent = currentLanguage === 'kh' ? 'បង្កើតអតិថិជនថ្មី' : 'Create New Customer';
        if (modalBodyContent) {
            modalBodyContent.innerHTML = `
                <div class="space-y-3">
                    <div class="bg-blue-50/80 p-2.5 rounded-lg border border-blue-100 flex items-center justify-between text-xs text-blue-900">
                        <span class="font-semibold"><i class="fa-solid fa-id-card-clip mr-1.5 text-sathapana-blue"></i>${currentLanguage === 'kh' ? 'ស្កេនអត្តសញ្ញាណប័ណ្ណ / លិខិតឆ្លងដែន' : 'Scan National ID / Passport'}</span>
                        <button type="button" class="px-2.5 py-1 bg-sathapana-blue text-white rounded text-[11px] font-medium hover:bg-sathapana-darkBlue shadow-sm"><i class="fa-solid fa-camera mr-1"></i>Scan</button>
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'ឈ្មោះជាភាសាអង់គ្លេស' : 'Full Name (English)'}</label>
                        <input type="text" value="SOK CHANTHA" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sathapana-blue">
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'ភេទ' : 'Gender'}</label>
                            <select class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sathapana-blue">
                                <option>Male / ប្រុស</option>
                                <option>Female / ស្រី</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'ថ្ងៃខែឆ្នាំកំណើត' : 'Date of Birth'}</label>
                            <input type="date" value="1992-05-18" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sathapana-blue">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'លេខអត្តសញ្ញាណប័ណ្ណ' : 'National ID No'}</label>
                            <input type="text" value="010984521" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sathapana-blue">
                        </div>
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'លេខទូរស័ព្ទ' : 'Phone Number'}</label>
                            <input type="text" value="012 889 977" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sathapana-blue">
                        </div>
                    </div>
                </div>
            `;
        }
        if (modalConfirmBtn) modalConfirmBtn.textContent = currentLanguage === 'kh' ? 'ចុះឈ្មោះអតិថិជន' : 'Register Customer';
    } else if (type === 'createAccount') {
        if (modalIcon) modalIcon.className = 'fa-solid fa-file-circle-plus';
        if (modalTitleText) modalTitleText.textContent = currentLanguage === 'kh' ? 'បង្កើតគណនីថ្មីសម្រាប់អតិថិជនចាស់' : 'Create New Account Existing Customer';
        if (modalBodyContent) {
            modalBodyContent.innerHTML = `
                <div class="space-y-3">
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'ស្វែងរកតាមលេខ CIF ឬ អត្តសញ្ញាណប័ណ្ណ' : 'Search by CIF or National ID'}</label>
                        <div class="flex gap-2">
                            <input type="text" value="0098412" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sathapana-blue">
                            <button type="button" class="px-3 py-1.5 bg-sathapana-blue text-white rounded-lg text-xs font-semibold shadow hover:bg-sathapana-darkBlue"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </div>
                    <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                        <div class="font-bold text-slate-800">SOK CHANTHA (CIF: 0098412)</div>
                        <div class="text-[11px] text-slate-500">National ID: 010984521 • Phnom Penh</div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'ប្រភេទគណនី' : 'Account Type'}</label>
                            <select class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sathapana-blue">
                                <option>Savings Account</option>
                                <option>Current Account</option>
                                <option>Fixed Deposit</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'រូបិយប័ណ្ណ' : 'Currency'}</label>
                            <select class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sathapana-blue">
                                <option>USD ($)</option>
                                <option>KHR (៛)</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
        }
        if (modalConfirmBtn) modalConfirmBtn.textContent = currentLanguage === 'kh' ? 'បង្កើតគណនី' : 'Open Account';
    } else if (type === 'loanCollection') {
        if (modalIcon) modalIcon.className = 'fa-solid fa-hand-holding-dollar';
        if (modalTitleText) modalTitleText.textContent = currentLanguage === 'kh' ? 'ការប្រមូលប្រាក់កម្ចី' : 'Loan Collection';
        if (modalBodyContent) {
            modalBodyContent.innerHTML = `
                <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-2 text-center">
                        <div class="p-2 bg-blue-50 rounded-lg border border-blue-100">
                            <div class="text-[10px] text-blue-700 font-semibold">${currentLanguage === 'kh' ? 'ត្រូវប្រមូលថ្ងៃនេះ' : 'Due Today'}</div>
                            <div class="text-sm font-bold text-blue-900">$1,250.00</div>
                        </div>
                        <div class="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                            <div class="text-[10px] text-emerald-700 font-semibold">${currentLanguage === 'kh' ? 'បានប្រមូល' : 'Collected'}</div>
                            <div class="text-sm font-bold text-emerald-900">$850.00</div>
                        </div>
                        <div class="p-2 bg-amber-50 rounded-lg border border-amber-100">
                            <div class="text-[10px] text-amber-700 font-semibold">${currentLanguage === 'kh' ? 'នៅសល់' : 'Pending'}</div>
                            <div class="text-sm font-bold text-amber-900">$400.00</div>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                            <div>
                                <div class="font-bold text-slate-800">1. CHHENG VANNA</div>
                                <div class="text-[10px] text-slate-500">Loan #LN-99201 • Due: $200.00</div>
                            </div>
                            <button type="button" class="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold hover:bg-emerald-700 shadow-sm">${currentLanguage === 'kh' ? 'ប្រមូលប្រាក់' : 'Collect'}</button>
                        </div>
                        <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                            <div>
                                <div class="font-bold text-slate-800">2. HENG SOPHEAK</div>
                                <div class="text-[10px] text-slate-500">Loan #LN-88312 • Due: $150.00</div>
                            </div>
                            <button type="button" class="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold hover:bg-emerald-700 shadow-sm">${currentLanguage === 'kh' ? 'ប្រមូលប្រាក់' : 'Collect'}</button>
                        </div>
                    </div>
                </div>
            `;
        }
        if (modalConfirmBtn) modalConfirmBtn.textContent = currentLanguage === 'kh' ? 'រួចរាល់' : 'Done';
    } else if (type === 'updateSecondary') {
        if (modalIcon) modalIcon.className = 'fa-solid fa-id-card';
        if (modalTitleText) modalTitleText.textContent = currentLanguage === 'kh' ? 'ធ្វើបច្ចុប្បន្នភាពលេខបន្ទាប់បន្សំ' : 'Update Secondary Number';
        if (modalBodyContent) {
            modalBodyContent.innerHTML = `
                <div class="space-y-3">
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'លេខកូដអតិថិជន (CIF) / គណនី' : 'Customer CIF / Account No'}</label>
                        <input type="text" value="0098412" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sathapana-blue">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'លេខទូរស័ព្ទចម្បង (Primary Phone)' : 'Primary Phone (Current)'}</label>
                        <input type="text" value="+855 12 345 678" readonly class="w-full px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600 font-semibold">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-600 mb-1">${currentLanguage === 'kh' ? 'លេខទូរស័ព្ទបន្ទាប់បន្សំថ្មី (New Secondary Phone)' : 'New Secondary Phone Number'}</label>
                        <input type="text" placeholder="+855 98 765 432" value="+855 98 765 432" class="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-sathapana-blue">
                    </div>
                </div>
            `;
        }
        if (modalConfirmBtn) modalConfirmBtn.textContent = currentLanguage === 'kh' ? 'រក្សាទុក' : 'Save Changes';
    }

    if (modalBodyContent) modalBodyContent.scrollTop = 0;
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
}

function closeOnboardingModal() {
    modalBackdrop?.classList.remove('open');
    modalBackdrop?.setAttribute('aria-hidden', 'true');
}

document.getElementById('cardCreateCustomer')?.addEventListener('click', () => openOnboardingModal('createCustomer'));
document.getElementById('cardCreateAccount')?.addEventListener('click', () => openOnboardingModal('createAccount'));
document.getElementById('cardLoanCollection')?.addEventListener('click', () => openOnboardingModal('loanCollection'));
document.getElementById('cardUpdateSecondaryPhone')?.addEventListener('click', () => openOnboardingModal('updateSecondary'));

modalCloseBtn?.addEventListener('click', closeOnboardingModal);
modalCancelBtn?.addEventListener('click', closeOnboardingModal);
modalConfirmBtn?.addEventListener('click', () => {
    closeOnboardingModal();
});
modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeOnboardingModal();
});

/* =========================================================
   INITIAL STATE
========================================================= */
showHomeView();


// ===== MODERN CURSOR / CLICK EFFECT =====
(function initCursorEffects() {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    const cursor = document.createElement('div');
    cursor.id = 'customCursor';
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let previousFrame = performance.now();

    const animateCursor = now => {
        // Frame-rate independent easing stays smooth while keeping the dot close.
        const elapsed = Math.min(now - previousFrame, 50);
        const follow = 1 - Math.exp(-elapsed / 18);
        cursorX += (mouseX - cursorX) * follow;
        cursorY += (mouseY - cursorY) * follow;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        previousFrame = now;
        requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    const interactiveSelector = 'button, a, input, select, textarea, [role="button"], .cursor-target';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) cursor.classList.add('cursor-hover');
    });

    document.addEventListener('mouseout', (e) => {
        const leaving = e.target.closest(interactiveSelector);
        if (leaving && !leaving.contains(e.relatedTarget)) cursor.classList.remove('cursor-hover');
    });

    document.addEventListener('mousedown', (e) => {
        cursor.classList.add('cursor-down');

        const ring = document.createElement('span');
        ring.className = 'cursor-click-ring';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
        document.body.appendChild(ring);
        ring.addEventListener('animationend', () => ring.remove(), { once: true });

        const dot = document.createElement('span');
        dot.className = 'cursor-click-dot';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        document.body.appendChild(dot);
        dot.addEventListener('animationend', () => dot.remove(), { once: true });

        const button = e.target.closest('button, a, [role="button"]');
        if (button && !button.disabled) {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'cursor-ripple';
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            if (getComputedStyle(button).position === 'static') button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
        }
    });

    document.addEventListener('mouseup', () => cursor.classList.remove('cursor-down'));
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
})();

