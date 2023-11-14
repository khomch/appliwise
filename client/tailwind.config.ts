import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Inter var", sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        appprimary: '#007AFF',
        appbg: '#FBFBFD',
        appborder: '#E4E5E8',
        apptprimary: '#18191C',
        apptsecondary: '#767F8C',
        appcardinactive: '#D9D9D9',
        appcolbg: '#F2F2F7',
        appprimary50: '#CDE5FF',
        appprimary30: '#E4F1FF',
        appprimary80: '#51A4FF',
        appmodalbg: '#F8F8FA',
        appdanger: '#FF6961',
      },
    },
  },
  plugins: [],
};
export default config;
