// lib/getPlatform.ts
export function getPlatform(): string {
    const ua = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(ua)) return 'iOS';
    if (/android/.test(ua)) return 'Android';
    if (/macintosh|mac os x/.test(ua)) return 'Mac';
    if (/windows/.test(ua)) return 'Windows';
    if (/linux/.test(ua)) return 'Linux';

    return 'Unknown';
}
