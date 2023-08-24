import { FC } from "react";
import Image from "next/image";
import { Button, Input, Radios } from "@/features";
import { useSnippetForm, FormData } from "./useSnippetForm";

type Props = {
  initialData?: Partial<FormData>;
  onBack?(): void;
};

export const SnippetForm: FC<Props> = ({ initialData, onBack }) => {
  const {
    loading,
    errors,
    success,
    handleSubmit,
    swings,
    formData,
    updateFormData,
    resetForm,
    editAgain,
    dirty,
  } = useSnippetForm(initialData);

  return (
    <>
      {success && (
        <div className="flex flex-col items-center">
          <Image
            className="rounded-lg my-8"
            src="/gods.avif"
            width={717}
            height={403}
            alt="Happy African Gods"
          />
          <h2 className="my-8 md:my-16 w-full text-center text-emerald-500 text-4xl tracking-wider">
            Mandé Gods are pleased with your sacrifice
          </h2>
          {initialData ? (
            <Button className="mt-8" onClick={editAgain}>
              Edit this rhythm again
            </Button>
          ) : (
            <Button className="mt-8" onClick={resetForm}>
              Add another rhythm
            </Button>
          )}
          <Button
            className="mt-8 bg-transparent md:hover:bg-transparent border-transparent hover:border-gray-300"
            onClick={onBack}
          >
            <span className="text-black">Go to mountains</span>
          </Button>
        </div>
      )}
      <div
        className={["h-fit w-full", success && "hidden"]
          .filter(Boolean)
          .join(" ")}
      >
        <button
          className="p-2 md:px-4 text-lg text-neutral-500 absolute top-16 left-2 tracking-wider rounded-md hover:bg-[#0002] hover:scale-110 transition-all"
          onClick={onBack}
        >
          {"\u2190"} Back
        </button>
        <form className="grid grid-flow-row gap-8" onSubmit={handleSubmit}>
          <div className="flex w-full justify-center">
            <Image
              src={initialData ? "/godess2.avif" : "/host.avif"}
              alt="The rhythm vault host in person"
              width={450}
              height={450}
              className="rounded-lg"
            />
          </div>

          <h2 className="my-12 w-full text-center text-gray-400 text-3xl tracking-wider">
            Required
          </h2>

          <Input
            label="Title"
            placeholder="Djansa dundun set"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
          />
          <Input
            label="Tags"
            placeholder="dundun, set, djansa, 4/4"
            value={formData.tags}
            onChange={(e) => updateFormData({ tags: e.target.value })}
          />

          <div className="bg-amber-300 md:rounded-lg mt-4 -mx-2 px-2 py-8 md:-mx-24 md:pt-12 md:pb-14 md:px-24">
            <div className="text-xl pb-4 flex justify-between items-end">
              <div className="text-orange-800 tracking-wide">Patterns</div>
              <div className="pl-4 text-orange-800 text-sm">min 1 required</div>
            </div>

            <div className="grid grid-flow-row gap-8 mt-4">
              <Input
                label="Dundunba"
                placeholder="o-----o-o---oo-o"
                value={formData.patterns.dundunba}
                onChange={(e) =>
                  updateFormData({
                    patterns: {
                      ...formData.patterns,
                      dundunba: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Sangban"
                placeholder="x-o--oo-"
                value={formData.patterns.sangban}
                onChange={(e) =>
                  updateFormData({
                    patterns: { ...formData.patterns, sangban: e.target.value },
                  })
                }
              />
              <Input
                label="Kenkeni"
                placeholder="o---"
                value={formData.patterns.kenkeni}
                onChange={(e) =>
                  updateFormData({
                    patterns: { ...formData.patterns, kenkeni: e.target.value },
                  })
                }
              />
              <Input
                label="Kenkeni (low)"
                placeholder="--o-"
                value={formData.patterns.kenkeni2}
                onChange={(e) =>
                  updateFormData({
                    patterns: {
                      ...formData.patterns,
                      kenkeni2: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Bell"
                placeholder="x-xx-xx-"
                value={formData.patterns.bell}
                onChange={(e) =>
                  updateFormData({
                    patterns: { ...formData.patterns, bell: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <h2 className="my-12 w-full text-center text-gray-400 text-3xl tracking-wider">
            Optional
          </h2>

          <Input
            label="Description"
            placeholder="Everybody loves djansa."
            textarea
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
          />
          <Input
            label="Tempo"
            placeholder="140"
            value={formData.tempo}
            onChange={(e) => updateFormData({ tempo: e.target.value })}
          />
          <Radios
            label="Swing style"
            name="swing"
            items={swings}
            value={formData.swing}
            onChange={(swing) => updateFormData({ swing })}
          />
          <Input
            label="Custom call pattern"
            placeholder="sstsss------"
            value={formData.signal}
            onChange={(e) => updateFormData({ signal: e.target.value })}
          />
          <div className="flex flex-col w-full pt-16 items-center">
            {errors.length > 0 && (
              <div className="py-4 flex md:flex-row-reverse justify-center md:justify-between md:order-reverse items-center flex-wrap w-full">
                <div className="py-4">
                  {errors.map((msg) => (
                    <div key={msg} className="text-xl text-orange-600 py-2">
                      {msg}
                    </div>
                  ))}
                </div>
                <div className="py-4 md:pr-8">
                  <Image
                    src="/dictator.avif"
                    alt="The Great Validator"
                    width={165}
                    height={330}
                    className="rounded-md"
                  />
                </div>
              </div>
            )}
            <Button type="submit" disabled={loading || !dirty}>
              {loading ? "..." : "Submit rhythm"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SnippetForm;
