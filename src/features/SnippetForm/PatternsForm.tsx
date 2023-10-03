import { FC } from "react";
import { GroovyPlayer } from "@/features";
import { Input } from "@/features/rsc";
import { Snippet } from "../SnippetApi";
import { PatternHint } from "./PatternHint";
import { usePickSnippet } from "./PickSnippetContext";

export const PatternsForm: FC<Snippet> = ({
  patterns,
  signal,
  swing,
  tempo,
}) => {
  const { currentBarSize } = usePickSnippet();

  return (
    <div className="bg-[#0004] md:rounded-lg mt-4 -mx-2 px-2 pt-8 md:-mx-24 md:pt-12 md:px-24">
      <div className="text-xl pb-4 flex justify-between items-end">
        <div className="text-yellowy tracking-wide">Patterns</div>
        <div className="pl-4 text-yellowy text-sm text-right">
          {currentBarSize > 0 ? (
            <div className="flex items-center">
              <div className="mr-2 opacity-50">notes in bar:</div>
              <div
                className="bg-black rounded-full w-8 h-8 flex items-center justify-center text-xl cursor-help"
                title="Resolved from your first pattern. All patterns must by divisible by this number."
              >
                {currentBarSize || "?"}
              </div>
            </div>
          ) : (
            "min 1 pattern required"
          )}
        </div>
      </div>

      <div className="grid grid-flow-row gap-8 mt-4">
        <PatternInput label="Dundunba" track="dundunba" />
        <PatternInput label="Sangban" track="sangban" />
        <PatternInput label="Kenkeni" track="kenkeni" />
        <PatternInput label="Kenkeni (low)" track="kenkeni2" />
        <PatternInput label="Bell" track="bell" />
      </div>
      <div className="pt-8 lg:pt-12">
        <div className="-mx-2 w-fill xl:-mx-24">
          <GroovyPlayer
            signal={signal}
            swingStyle={swing}
            tempo={tempo ? Number(tempo) : 110}
            tracks={Object.keys(patterns)
              .map((instrument) => ({
                instrument,
                title: instrument,
                pattern: patterns[instrument],
              }))
              .filter((track) => Boolean(track.pattern))}
          />
        </div>
      </div>
    </div>
  );
};

export const PatternInput: FC<{ track: string; label: string }> = ({
  track,
  label,
}) => {
  const {
    currentBarSize,
    formData: { patterns },
    updateFormData,
  } = usePickSnippet();
  const pattern = patterns[track];
  const patternOk = (track === "bell" ? /^[x-]+$/ : /^[xo-]+$/).test(pattern);
  return (
    <Input
      label={label}
      hint={
        <>
          {pattern.length ? (
            <>
              {!patternOk && (
                <>
                  <span className="text-redy-dark">
                    {track === "bell" ? "x-" : "xo-"} only
                  </span>
                  {" | "}
                </>
              )}
              <PatternHint
                pattern={pattern}
                barSize={currentBarSize}
                factor={patternOk}
              />
            </>
          ) : null}
        </>
      }
      value={pattern}
      onChange={(e) =>
        updateFormData({
          patterns: { ...patterns, [track]: e.target.value.toLowerCase() },
        })
      }
    />
  );
};
