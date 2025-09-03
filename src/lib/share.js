import LZString from 'lz-string'

export function encodeState(state) {
    return LZString.compressToEncodedURIComponent(JSON.stringify(state))
}

export function decodeStateFromURL() {
    try {
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')
        if (!code) return null
        return JSON.parse(LZString.decompressFromEncodedURIComponent(code))
    } catch { return null }
}

export function updateURL(state) {
    try {
        const encoded = encodeState(state)
        const u = new URL(window.location.href)
        u.searchParams.set('code', encoded)
        window.history.replaceState({}, '', u.toString())
        return u.toString()
    } catch (e) {
        return null
    }
}