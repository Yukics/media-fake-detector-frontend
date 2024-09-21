
export async function getHash(blob: any, algo = "SHA-256") {
    // convert your Blob to an ArrayBuffer
    // could also use a FileRedaer for this for browsers that don't support Response API
    const buf = await new Response(blob).arrayBuffer();
    const hash = await crypto.subtle.digest(algo, buf);
    let result = '';
    const view = new DataView(hash);
    for (let i = 0; i < hash.byteLength; i += 4) {
        result += view.getUint32(i).toString(16).padStart(2, '0');
    }
    return result;
}