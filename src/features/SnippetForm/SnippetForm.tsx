import { FC } from "react";
import { useSnippetForm } from "./useSnippetForm";
import { Button, Input, Radios } from "..";
import Image from "next/image";

export const SnippetForm: FC = () => {
  const { loading, handleSubmit, swings, formData, updateFormData } =
    useSnippetForm();
  return (
    <div className="h-fit w-full">
      <form className="grid grid-flow-row gap-8" onSubmit={handleSubmit}>
        <div className="flex w-full justify-center">
          <Image
            src="/host.avif"
            alt=""
            width={300}
            height={400}
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

        <div className="bg-sky-100 md:rounded-lg mt-4 -mx-2 px-2 py-8 md:-mx-24 md:py-10 md:px-24">
          <div className="text-xl pb-4 flex justify-between items-end">
            <div className="text-sky-800 tracking-wide">Patterns</div>
            <div className="pl-4 text-gray-500 text-sm">min 1 required</div>
          </div>

          <div className="grid grid-flow-row gap-8 mt-4">
            <Input
              label="Dundunba"
              placeholder="o-----o-o---oo-o"
              value={formData.patterns.dundunba}
              onChange={(e) =>
                updateFormData({
                  patterns: { ...formData.patterns, dundunba: e.target.value },
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
                  patterns: { ...formData.patterns, kenkeni2: e.target.value },
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
        <Radios label="Swing style" name="swing" items={swings} />
        <Input
          label="Custom call pattern"
          placeholder="sstsss------"
          value={formData.signal}
          onChange={(e) => updateFormData({ signal: e.target.value })}
        />
        <div className="flex w-full pt-16 justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "..." : "Submit rhythm"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SnippetForm;
