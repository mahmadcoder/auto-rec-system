import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en',
  
  // Domains can be configured for different locales if needed
  // domains: [
  //   {
  //     domain: 'example.com',
  //     defaultLocale: 'en'
  //   }
  // ]
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - Image files
  // - Internal Next.js files
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
