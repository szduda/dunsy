import { FC } from "react";
import { useSnippetForm } from "./useSnippetForm";
import { Button, Input, Radios } from "..";

export const SnippetForm: FC = () => {
  const { loading, handleSubmit, swings } = useSnippetForm();
  return (
    <div className="h-fit w-full">
      <form className="grid grid-flow-row gap-8" onSubmit={handleSubmit}>
        <Input label="Author" placeholder="Who are you?" />
        <h2 className="my-12 w-full text-center text-gray-400 text-3xl tracking-wider">
          Required
        </h2>
        <Input label="Title" placeholder="Djansa dundun set" />
        <Input label="Tags" placeholder="dundun, set, djansa, 4/4" />
        <div className="bg-stone-300 md:rounded-lg mt-4 -mx-2 px-2 py-8 md:-mx-24 md:py-10 md:px-24">
          <div className="text-xl pb-4 flex justify-between items-end">
            <div className="text-sky-800 tracking-wide">Patterns</div>
            <div className="pl-4 text-gray-500 text-sm">min 1 required</div>
          </div>
          <div className="grid grid-flow-row gap-8 mt-4">
            <Input label="Dundunba" placeholder="o-----o-o---oo-o" />
            <Input label="Sangban" placeholder="x-o--oo-" />
            <Input label="Kenkeni" placeholder="o---" />
            <Input label="Kenkeni (low)" placeholder="--o-" />
            <Input label="Bell" placeholder="x-xx-xx-" />
          </div>
        </div>
        <h2 className="my-12 w-full text-center text-gray-400 text-3xl tracking-wider">
          Optional
        </h2>
        <Input
          label="Description"
          placeholder="Everybody loves djansa."
          textarea
        />
        <Input label="Tempo" placeholder="140" />
        <Radios label="Swing style" name="swing" items={swings} />
        <Input label="Custom call pattern" placeholder="sstsss------" />
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
