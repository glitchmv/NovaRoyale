import { base } from "../constants";

export function patches(){
    base.add(0x139F602).writeUtf8String('<c57e289>Nova <cc3eb75>Royale</c>');
    Interceptor.attach(base.add(0xA01E20), { // NativeFont::formatString
        onEnter(args){
            args[4] = ptr(1)
        }
    });
    Interceptor.attach(base.add(0x75D5A0), { // Debugger::warning
        onEnter(args) {
            let msg = args[0].readUtf8String();
            console.log(`[Debugger::warning] ${msg}`)
        }
    });
    Interceptor.attach(base.add(0x6363B0), { // Debugger::error
        onEnter(args) {
            let msg = args[0].readUtf8String();
            console.log(`[Debugger::error] ${msg}`);
        },
    })
}