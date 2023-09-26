import { FC } from "react";
import Image from "next/image";
import { GroovyPlayer } from "@/features";
import { Radios } from "@/features/admin";
import { Button, Input } from "@/features/rsc";
import { ArrowIcon } from "@/features/Icons";
import { cx } from "@/utils";
import { useSnippetForm } from "./useSnippetForm";
import Link from "next/link";

export const SnippetForm: FC = () => {
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
    mode,
  } = useSnippetForm();

  return (
    <>
      {success && (
        <div className="flex flex-col items-center">
          <Image
            className="rounded-lg my-8"
            src="/gods.avif"
            quality={25}
            width={717}
            height={403}
            alt="Happy African Gods"
          />
          <h2 className="my-8 md:my-16 w-full text-center text-greeny-light text-4xl tracking-wider">
            Mandé Gods are pleased with your sacrifice
          </h2>
          {mode === "edit" ? (
            <Button className="mt-8" onClick={editAgain}>
              Edit this rhythm again
            </Button>
          ) : (
            <Button className="mt-8" onClick={resetForm}>
              Add another rhythm
            </Button>
          )}
          <Link href="/admin">
            <Button className="mt-8 bg-transparent md:hover:bg-transparent border-transparent hover:border-graye">
              <span className="text-graye-light">Go to the mountains</span>
            </Button>
          </Link>
        </div>
      )}
      <div className={cx(["h-fit w-full", success && "hidden"])}>
        <Link
          className="p-2 md:px-4 text-lg text-graye absolute top-16 left-2 tracking-wider rounded-md hover:bg-[#0002] hover:scale-110 transition-all flex items-center"
          href="/admin"
        >
          <ArrowIcon className="fill-graye rotate-180 mr-2" /> Back
        </Link>
        <form className="grid grid-flow-row gap-8">
          <div className="flex w-full justify-center">
            <Image
              placeholder="blur"
              blurDataURL="favicons/fav-64.png"
              src={mode === "edit" ? "/godess2.avif" : "/host.avif"}
              alt="The rhythm vault host in person"
              quality={25}
              width={450}
              height={450}
              className="rounded-lg"
            />
          </div>

          <h2 className="my-12 w-full text-center text-graye text-3xl tracking-wider">
            Required
          </h2>

          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
          />
          <Input
            label="Tags"
            value={formData.tags}
            onChange={(e) => updateFormData({ tags: e.target.value })}
          />

          <div className="bg-[#0004] md:rounded-lg mt-4 -mx-2 px-2 pt-8 md:-mx-24 md:pt-12 md:px-24">
            <div className="text-xl pb-4 flex justify-between items-end">
              <div className="text-yellowy tracking-wide">Patterns</div>
              <div className="pl-4 text-yellowy opacity-50 text-sm">
                min 1 required
              </div>
            </div>

            <div className="grid grid-flow-row gap-8 mt-4">
              <Input
                label="Dundunba"
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
                value={formData.patterns.sangban}
                onChange={(e) =>
                  updateFormData({
                    patterns: { ...formData.patterns, sangban: e.target.value },
                  })
                }
              />
              <Input
                label="Kenkeni"
                value={formData.patterns.kenkeni}
                onChange={(e) =>
                  updateFormData({
                    patterns: { ...formData.patterns, kenkeni: e.target.value },
                  })
                }
              />
              <Input
                label="Kenkeni (low)"
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
                value={formData.patterns.bell}
                onChange={(e) =>
                  updateFormData({
                    patterns: { ...formData.patterns, bell: e.target.value },
                  })
                }
              />
            </div>
            <div className="pt-8 lg:pt-12">
              {/* lg:w-[min(100dvw,calc(100%+12rem))] */}
              <div className="-mx-2 w-fill xl:-mx-24">
                {/* <div className="-mx-2  w-[min(100dvw,calc(1024px+12rem))]"> */}
                <GroovyPlayer
                  signal={formData.signal}
                  swingStyle={formData.swing}
                  tempo={formData.tempo ? Number(formData.tempo) : 110}
                  tracks={Object.keys(formData.patterns)
                    .map((instrument) => ({
                      instrument,
                      title: instrument,
                      pattern: formData.patterns[instrument],
                    }))
                    .filter((track) => Boolean(track.pattern))}
                />
              </div>
            </div>
          </div>

          <h2 className="my-12 w-full text-center text-graye text-3xl tracking-wider">
            Optional
          </h2>

          <Input
            label="Description"
            textarea
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
          />
          <Input
            label="Tempo"
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
            value={formData.signal}
            onChange={(e) => updateFormData({ signal: e.target.value })}
          />
          <div className="flex flex-col w-full pt-16 items-center">
            {errors.length > 0 && (
              <div className="py-4 flex md:flex-row-reverse justify-center md:justify-between md:order-reverse items-center flex-wrap w-full">
                <div className="py-4 flex-1">
                  {errors.map((msg) => (
                    <div key={msg} className="text-xl text-redy py-2">
                      {msg}
                    </div>
                  ))}
                </div>
                <div className="py-4 md:pr-8">
                  <Image
                    placeholder="blur"
                    blurDataURL="favicons/fav-64.png"
                    src="/dictator.avif"
                    alt="The Great Validator"
                    quality={20}
                    width={165}
                    height={330}
                    className="rounded-md"
                  />
                </div>
              </div>
            )}
            <Button
              type="submit"
              disabled={loading || !dirty}
              onClick={handleSubmit}
            >
              {loading ? "Submitting..." : "Submit rhythm"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SnippetForm;
