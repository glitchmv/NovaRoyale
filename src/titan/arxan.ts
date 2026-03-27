import { base } from "../constants";

export function arxanKiller(){
   Interceptor.replace(base.add(0xAF7984), base.add(0xAF7C8C)); // g_createGameInstance
   Interceptor.replace(base.add(0xAF5304), base.add(0xAF7C8C)); // g_createGameInstance
   Interceptor.replace(base.add(0x1CA960), base.add(0x1CB784)); // GameMain::GameMain
   Interceptor.replace(base.add(0x8DBE30), base.add(0x8DC3D8)); // InputSystem::update
   Interceptor.replace(base.add(0x650188), base.add(0x650414)); // LoginMessage::encode
}