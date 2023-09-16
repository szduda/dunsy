import { FC } from "react";

const StoryPage: FC = () => (
  <main className="flex mx-auto flex-col px-2 pt-8 pb-8 max-w-[1024px]">
    <h1 className="text-yellowy text-5xl mt-6">
      Our mission is to help young djembefolas grow even if the soil around them
      is dry.
    </h1>
    <h2 className="text-graye text-3xl mt-12">Ok, nice... Wait, what?</h2>
    <p className="mt-6 text-xl">
      You discover djembe.
      <br />
      You find group classes.
      <br />
      You join the classes.
      <br />
      You start <span className="text-greeny-light">loving djembe</span>.
    </p>
    <h2 className="text-graye text-3xl mt-12">
      At some point you think it's time to grow
    </h2>
    <p className="mt-6 text-xl">
      But the growth ain't just happening. You want to practice your solos,
      breaks, unisonos, intros and outros. You need the backing tracks. You look
      for recordings, but all you can find are 200 BPM jams recorded with a
      potato. You barely hear the dun dun voice. And where's the pulse anyway?
      Which beat is the first beat? Wait... did they just change the rhythm? Or
      maybe it's just your mind who changed it for you. "Hey mind, don't do
      that". It keeps doing that.
    </p>
    <p className="mt-6 text-xl">
      You start <span className="text-orangey-light">hating djembe</span>. No -
      just the recordings. And the mind.
    </p>
    <h2 className="text-graye text-3xl mt-12">
      Then you realize which century you live in
    </h2>
    <p className="mt-6 text-xl">
      You browse the depths of the Internet in search for the app that will make
      you fully enjoy the way of fola.
    </p>
    <h2 className="text-graye text-3xl mt-12">Who am I?</h2>
    <p className="mt-6 text-xl">
      Web dev who decided to finally build that app.
    </p>
    <p className="mt-6 text-xl">(more about apps and Foka and GroovyPlayer)</p>
    <h2 className="text-graye text-3xl mt-12">
      It feels like this story miss the
    </h2>
    <p className="mt-6 text-xl">
      People. It's always better to play with people, but if for any reason at
      any moment you can't do that and still want to play...
    </p>
    <h3 className="text-greeny text-5xl mt-6">
      Be my guest and enjoy the app.
    </h3>
  </main>
);

export default StoryPage;
