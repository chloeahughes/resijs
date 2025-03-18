import { defineConfig } from "ai"
import { openai } from "@ai-sdk/openai"

export default defineConfig({
  providers: [openai],
})

