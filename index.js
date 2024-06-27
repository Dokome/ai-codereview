import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { prompt } from "./template.js";

const deepSeek = new ChatOpenAI({
  modelName: "deepseek-chat",
  configuration: {
    baseURL: "https://api.deepseek.com/v1",
  },
});

const output = new StringOutputParser();
const chain = deepSeek.pipe(output);

export const answer = async (code) => {
  const question = await prompt.formatMessages({
    code,
  });

  return chain.invoke(question);
};
