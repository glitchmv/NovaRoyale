// src/constants.ts
var libg = Process.getModuleByName("libg.so");
var libc = Process.getModuleByName("libc.so");
var base = libg.base;
var size = libg.size;
var getaddrinfo = libc.getExportByName("getaddrinfo");

// src/titan/arxan.ts
function arxanKiller() {
  Interceptor.replace(base.add(11499908), base.add(11500684));
  Interceptor.replace(base.add(11490052), base.add(11500684));
  Interceptor.replace(base.add(1878368), base.add(1881988));
  Interceptor.replace(base.add(9289264), base.add(9290712));
  Interceptor.replace(base.add(6619528), base.add(6620180));
}

// src/titan/crypto.ts
function killPepper() {
  Interceptor.replace(base.add(5453924), new NativeCallback(() => {
    console.log("decryptData: skipped decryption");
    return 1;
  }, "int", []));
  Interceptor.attach(base.add(1554096), {
    onEnter(args) {
      this.state = args[0].add(24);
      console.log(`pepperstate: ${this.state.readInt()}`);
      args[1] = args[2];
      this.state.writeInt(5);
      console.log(`pepperstate: ${this.state.readInt()}`);
    },
    onLeave() {
      this.state.writeInt(5);
      console.log(`pepperstate: ${this.state.readInt()}`);
    }
  });
  Interceptor.attach(base.add(4991612), function() {
    const ctx = this.context;
    ctx.x0 = ctx.x8;
  });
}

// src/connect.ts
function redirectConnection() {
  Interceptor.attach(getaddrinfo, {
    onEnter(args) {
      if (args[0].readUtf8String() === "game.clashroyaleapp.com") {
        args[0].writeUtf8String("192.168.1.22");
        args[1].writeUtf8String("9339");
        killPepper();
      }
    }
  });
}

// src/nova/patches.ts
function patches() {
  base.add(20575746).writeUtf8String("<c57e289>Nova <cc3eb75>Royale</c>");
  Interceptor.attach(base.add(10493472), {
    onEnter(args) {
      args[4] = ptr(1);
    }
  });
  Interceptor.attach(base.add(7722400), {
    onEnter(args) {
      let msg = args[0].readUtf8String();
      console.log(`[Debugger::warning] ${msg}`);
    }
  });
  Interceptor.attach(base.add(6513584), {
    onEnter(args) {
      let msg = args[0].readUtf8String();
      console.log(`[Debugger::error] ${msg}`);
    }
  });
}

// src/index.ts
rpc.exports = {
  init() {
    arxanKiller();
    patches();
    redirectConnection();
  }
};
