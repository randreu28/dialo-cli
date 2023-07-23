import { Input } from "https://deno.land/x/cliffy@v1.0.0-rc.2/prompt/mod.ts";

const name: string = await Input.prompt(`What's your name?`);

console.log(name);
