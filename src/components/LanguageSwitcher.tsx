'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale from pathname and add the new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2 bg-[#21262D]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-white/5">
      <span className="text-gray-400 text-sm">Language:</span>
      <div className="flex gap-1">
        <motion.button
          onClick={() => switchLanguage('fr')}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            locale === 'fr' 
              ? 'bg-orange-500 text-white' 
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          FR
        </motion.button>
        <motion.button
          onClick={() => switchLanguage('en')}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            locale === 'en' 
              ? 'bg-orange-500 text-white' 
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EN
        </motion.button>
      </div>
    </div>
  );
}