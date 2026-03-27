import { base } from "../constants";

export function killPepper(){
    Interceptor.replace(base.add(0x533864), new NativeCallback(() => {
        console.log('decryptData: skipped decryption');
        return 1;
    }, 'int', []));
    Interceptor.attach(base.add(0x17B6B0), {
        onEnter(args) {
            this.state = args[0].add(0x18);
            console.log(`pepperstate: ${this.state.readInt()}`);
            args[1] = args[2];
            this.state.writeInt(5);
            console.log(`pepperstate: ${this.state.readInt()}`);
        },
        onLeave(){
            this.state.writeInt(5);
            console.log(`pepperstate: ${this.state.readInt()}`);
        }
    });
    Interceptor.attach(base.add(0x4C2A7C), function(){
        const ctx = this.context as Arm64CpuContext;
        ctx.x0 = ctx.x8;
    });
}