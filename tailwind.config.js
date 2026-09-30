tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
          },
          colors: {
            brand: {
              50: '#F0F7FF',
              100: '#E0EEFF',
              200: '#BAE0FF',
              300: '#7AC4FF',
              400: '#38A0FF',
              500: '#0C7AFF',
              600: '#005CE6',
              700: '#0047B8',
              800: '#00338F',
              900: '#002066',
            }
          },
          boxShadow: {
            'card-hero': '0 14px 34px -4px rgba(0, 92, 230, 0.38)',
            'pill-blue': '0 10px 24px -4px rgba(0, 92, 230, 0.35)',
            'subtle-card': '0 2px 8px rgba(15, 23, 42, 0.04)',
            'app-elevated': '0 25px 65px -12px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(226, 232, 240, 0.65)',
            'logo-squircle': '0 12px 28px -6px rgba(0, 92, 230, 0.35)',
            'track-glow': '0 2px 10px rgba(0, 92, 230, 0.18)',
            'faceid-glow': '0 0 35px rgba(56, 189, 248, 0.35)',
          }
        }
      }
    }
