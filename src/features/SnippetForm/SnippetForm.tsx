import { FC } from "react";
import slugify from "slugify";
import Image from "next/image";
import { Radios, usePickSnippet } from "@/features/admin";
import { Button, Input } from "@/features/rsc";
import { cx } from "@/utils";
import { useSnippetForm } from "./useSnippetForm";
import { PatternsForm } from "./PatternsForm";
import { PatternHint } from "./PatternHint";
import { FormSuccessScreen } from "./FormSuccessScreen";
import { BackToAdmin } from "./BackToAdmin";
import { FormErrors } from "./FormErrors";

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

  const { currentBarSize } = usePickSnippet();

  return (
    <>
      {success && <FormSuccessScreen {...{ mode, editAgain, resetForm }} />}

      <div className={cx(["h-fit w-full", success && "hidden"])}>
        <BackToAdmin />
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
            hint={mode === "add" ? "will change the slug" : ""}
            onChange={(e) =>
              updateFormData(
                mode === "add"
                  ? {
                      title: e.target.value,
                      slug: slugify(e.target.value, { lower: true }),
                    }
                  : {
                      title: e.target.value,
                    }
              )
            }
          />
          <div className="flex w-full flex-1 items-end">
            <div className="text-3xl pb-1 pr-1 text-graye">/</div>
            <div className="flex-1">
              <Input
                label="Slug"
                hint={
                  mode === "add"
                    ? "kebab case | unique | e.g. soli-sangban-variation-2"
                    : "can't touch this"
                }
                defaultValue={formData.slug}
                disabled={mode !== "add"}
                onChange={(e) =>
                  updateFormData({
                    slug: slugify(e.target.value, { lower: true }),
                  })
                }
              />
            </div>
          </div>
          <Input
            label="Tags"
            hint="coma-separated | please include meter e.g. 4/4 | min 3 required"
            value={formData.tags}
            onChange={(e) =>
              updateFormData({
                tags: e.target.value.toLowerCase(),
              })
            }
          />

          <PatternsForm {...formData} />

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
            hint="80 - 200"
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
            label="(beta) call pattern"
            hint={
              <>
                <span>open: bts | flam: f</span>
                {formData.signal?.length ? (
                  <>
                    {" | "}
                    <PatternHint
                      pattern={formData.signal}
                      barSize={currentBarSize}
                      factor={/^[btsf-]+$/.test(formData.signal)}
                    />
                  </>
                ) : null}
              </>
            }
            value={formData.signal}
            onChange={(e) => updateFormData({ signal: e.target.value })}
          />
          <div className="flex flex-col w-full pt-16 items-center">
            {errors.length > 0 && <FormErrors errors={errors} />}
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
