import { getaddrinfo } from "./constants";
import { killPepper } from "./titan/crypto";

export function redirectConnection(){
    Interceptor.attach(getaddrinfo, {
        onEnter(args) {
            if (args[0].readUtf8String() === 'game.clashroyaleapp.com') {
                args[0].writeUtf8String('192.168.1.22');
                args[1].writeUtf8String('9339');
                killPepper();
            }
        },
    })
}