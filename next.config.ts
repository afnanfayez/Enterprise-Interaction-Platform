import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@countrystatecity/countries'],
  outputFileTracingIncludes: {
    '/api/countries': ['./node_modules/@countrystatecity/countries/dist/data/**/*'],
    '/api/cities': ['./node_modules/@countrystatecity/countries/dist/data/**/*'],
  },
};

export default nextConfig;
