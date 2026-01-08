import nextIntlPlugin from 'next-intl/plugin';

const withNextIntl = nextIntlPlugin('./i18n/request.ts');

const nextConfig = withNextIntl({
	output: 'standalone',
});

export default nextConfig;
