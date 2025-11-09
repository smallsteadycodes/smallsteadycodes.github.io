// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // 정적 내보내기
  images: { unoptimized: true }, // next/image 정적 호환
};
export default nextConfig;
