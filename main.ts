import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.2/command/mod.ts";
import { Input } from "https://deno.land/x/cliffy@v1.0.0-rc.2/prompt/mod.ts";
import { ConversationalOutput, HfInference } from "npm:@huggingface/inference";
import { VERSION } from "./version.ts";

await new Command()
  .name("Llama-cli")
  .version(VERSION)
  .description(
    "A CLI for interacting with DialoGPT.\n https://github.com/randreu28/dialoGPT-cli",
  )
  .parse(Deno.args);

const hf = new HfInference();

let PREV_CONV: ConversationalOutput["conversation"] = {
  generated_responses: [],
  past_user_inputs: [],
};

console.log("Start chatting!\n");

while (true) {
  const question: string = await Input.prompt("");

  const response = await hf.conversational({
    parameters: { max_length: 500 },
    model: "microsoft/DialoGPT-medium",
    inputs: {
      ...PREV_CONV,
      text: question,
    },
  });

  PREV_CONV = response.conversation;
  console.log(response.generated_text);
}
