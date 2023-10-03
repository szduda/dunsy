import { Snippet } from "./types";

export const validate = (data: Snippet) => {
  let messages: string[] = [];
  const meter = getMeter(data);
  const base = meter % 3 === 0 ? 3 : meter % 4 === 0 ? 4 : 0;

  const options = {
    base,
    meter,
  };

  validateTitle(messages, data);
  validateTags(messages, data);
  validateTempo(messages, data);
  validateSignal(messages, data, options);
  validateSwing(messages, data, options);
  validatePatterns(messages, data, options);

  return messages;
};

const validateTitle = (messages: string[], data: Snippet) => {
  if (!data.title) {
    messages.push("A rhythm needa title, sir.");
  }
};

const validateTags = (messages: string[], data: Snippet) => {
  const { tags } = data;
  const tagsArray = tags.split(",");

  if (tagsArray.length < 3) {
    messages.push("At least 3 tags sir. Coma separated.");
  }

  if (tagsArray.find((tag) => tag.length > 20)) {
    messages.push("Each tag betta be shorter than 20 characters.");
  }

  if (tags && !/^[a-z0-9/,\s]+$/.test(tags)) {
    messages.push("Tags betta be simple a-z0-9/,\\s expression.");
  }
};

const validateTempo = (messages: string[], data: Snippet) => {
  if (!data.tempo) {
    return;
  }

  const tempo = Number(data.tempo);
  if (tempo < 80 || tempo > 200) {
    messages.push("Tempo between 80 and 200, sir.");
  }
};

type ValidatorOptions = {
  base: number;
  meter: number;
};

const validateSwing = (
  messages: string[],
  data: Snippet,
  { base }: ValidatorOptions
) => {
  const { swing } = data;
  if (
    swing &&
    !(
      (base === 3 && [">>", "<<"].includes(swing)) ||
      (base === 4 && [">", "<", "<<<", "-->"].includes(swing))
    )
  ) {
    messages.push("Ya messed up dem swings, sir.");
  }
};

const validateSignal = (
  messages: string[],
  data: Snippet,
  { meter }: ValidatorOptions
) => {
  const { signal } = data;

  if (!signal) {
    return;
  }

  if (signal.length % meter !== 0) {
    messages.push("Incorrect signal legth, sir.");
  }

  if (!/^[btsf-]+$/.test(signal)) {
    messages.push("Incorrect signal notation. Use only symbols: b t s f -");
  }
};

const validatePatterns = (
  messages: string[],
  data: Snippet,
  { meter, base }: ValidatorOptions
) => {
  const patternKeys = Object.keys(data.patterns).filter((key) =>
    Boolean(data.patterns[key])
  );
  const patternValues = Object.values(data.patterns).filter(Boolean);

  if (patternValues.length < 1) {
    messages.push("At least one drum pattern, sir.");
  } else {
    if (meter < 1 || base < 1) {
      messages.push(
        `The ${patternKeys[0]} pattern has incorrect length of ${patternValues[0].length}. It must be a multiple of 8 or 6.`
      );
    }

    const incorrectPatterns = patternKeys.filter(
      (inst) => data.patterns[inst].length % (base * 2) !== 0
    );

    if (meter > 0 && incorrectPatterns.length > 0) {
      messages.push(
        `Inconsistent pattern length between ${
          patternKeys[0]
        } and ${incorrectPatterns.join(", ")}.`
      );
    }
  }

  const incorrectNotation = patternKeys.find((inst) =>
    [...data.patterns[inst]].some((char) => !["x", "o", "-"].includes(char))
  );

  if (incorrectNotation) {
    messages.push("Incorrect dundun notation. Use only symbols: x o -");
  }
};

const getMeter = (data: Snippet) => {
  const firstLen =
    Object.values(data.patterns).filter(Boolean)?.[0]?.length || 1;
  // const meterFromTag = Number.parseInt(
  //   data.tags
  //     .split(",")
  //     ?.find((tag) => /\d{1,2}\/\d/.test(tag))
  //     ?.charAt(0) ?? "0"
  // );
  return firstLen % 6 === 0 ? 6 : firstLen % 8 === 0 ? 4 : -1;
};
