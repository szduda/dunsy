import { Snippet } from "./types";

export const validate = ({
  title,
  tags,
  patterns,
  tempo,
  swing,
  signal,
}: Snippet) => {
  const patternKeys = Object.keys(patterns).filter((key) =>
    Boolean(patterns[key])
  );
  const patternValues = Object.values(patterns).filter(Boolean);
  let messages: string[] = [];

  const firstLen = patternValues?.[0]?.length || 1;
  const meter =
    Number.parseInt(tags.charAt(0)) || firstLen % 12 === 0
      ? 12
      : firstLen % 6 === 0
      ? 6
      : firstLen % 4 === 0
      ? 4
      : firstLen % 3 === 0
      ? 3
      : -1;
  const base =
     meter % 3 === 0 ? 3 : meter % 4 === 0 ? 4 : 0;

  if (!base) {
    throw new Error("Unhandled meter.");
  }

  const incorrectPatterns = patternKeys.filter(
    (inst) => patterns[inst].length % meter !== 0
  );

  if (!title) {
    messages.push("A rhythm needa title, sir.");
  }

  if ((tags?.length || 0) < 3) {
    messages.push("At least 3 tags sir. Coma separated.");
  }

  if (patternValues.length < 1) {
    messages.push("At least one drum pattern, sir.");
  } else {
    if (meter < 0) {
      messages.push(`Incorrect pattern: ${patternKeys[0]}.`);
    }

    if (meter > 0 && incorrectPatterns.length > 0) {
      messages.push(`Incorrect patterns: ${incorrectPatterns.join(", ")}.`);
    }
  }

  const incorrectNotation = patternKeys.find((inst) =>
    [...patterns[inst]].some((char) => !["x", "o", "-"].includes(char))
  );

  if (incorrectNotation) {
    messages.push("Incorrect notation. Patterns speak only: x o -");
  }

  if (tempo && (Number(tempo) < 80 || Number(tempo) > 180)) {
    messages.push("Tempo between 80 and 180, sir.");
  }

  if (signal && signal.length % meter !== 0) {
    messages.push("Incorrect signal pattern, sir.");
  }

  if (
    swing &&
    !(
      (base === 3 && [">>", "<<"].includes(swing)) ||
      (base === 4 && [">", "<", "--<", "-->"].includes(swing))
    )
  ) {
    messages.push("Ya messed up dem swings, sir.");
  }

  return messages;
};
