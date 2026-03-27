let libg = Process.getModuleByName('libg.so');
let libc = Process.getModuleByName('libc.so');
export let base = libg.base;
export let size = libg.size;
export let getaddrinfo = libc.getExportByName('getaddrinfo')