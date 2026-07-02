---
name: health-check
description: Check if app is running, run dev health metrics, test ports 3000 and 5173, verify server endpoints.
tools: ["#terminal"]
---

# Skill: Check Dev Health

Use for: "is app running?", "check health", "verify environment".

## Instructions:

1. Run the local health verification script inside WSL:
   `sh .agents/skills/health-check/verify.sh`
2. Display the script's terminal output directly to the user.
3. Provide a concise, 1-2 sentence summary of whether the environment is up or down. Do not add conversational fluff.
