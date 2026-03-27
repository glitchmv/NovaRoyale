import { arxanKiller } from "./titan/arxan";
import { redirectConnection } from "./connect";
import { patches } from "./nova/patches";

rpc.exports = {
    init(){
        arxanKiller();
        patches();
        redirectConnection();
    }
}