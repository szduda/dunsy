import { FC } from "react";

const StoryPage: FC = () => (
  <main className="flex mx-auto flex-col px-3 pt-8 pb-8 max-w-[1024px]">
    <h1 className="text-yellowy text-5xl mt-12 font-bold">
      Our mission is to help young djembefolas grow even if the soil around them
      is dry.
    </h1>
    <h2 className="text-graye text-3xl mt-24">Ok, nice... Wait, what?</h2>
    <p className="mt-6 text-xl leading-relaxed tracking-wider">
      You discover djembe.
      <br />
      You find group classes.
      <br />
      You join the classes.
      <br />
      You start <span className="text-greeny-light">loving djembe</span>.
    </p>
    <h2 className="text-graye text-3xl mt-24">
      At some point you think it&rsquo;s time to grow
    </h2>
    <p className="mt-6 text-xl leading-relaxed tracking-wider">
      But the growth ain&rsquo;t just happening. You want to practice your solos,
      breaks, unisonos, intros and outros. You need the backing tracks. You look
      for recordings, but all you can find are 200 BPM jams recorded with a
      potato. You barely hear the dun dun voice. And where&rsquo;s the pulse anyway?
      Which beat is the first beat? Wait... did they just change the rhythm? Or
      maybe it&rsquo;s just your mind who changed it for you. &rsquo;Hey mind, don&rsquo;t do
      that&rsquo;. It keeps doing that.
    </p>
    <p className="mt-6 text-xl leading-relaxed tracking-wider">
      You start <span className="text-orangey-light">hating djembe</span>. No -
      just the recordings. And the mind.
    </p>
    <h2 className="text-graye text-3xl mt-24">
      Then you realize which century you live in
    </h2>
    <p className="mt-6 text-xl leading-relaxed tracking-wider">
      Let the modern tech be helpful one more time. You browse the depths of the
      Internet in search for the app that will make you fully prepared to follow
      the path of the fola. But no app is realy satisfactory. None is enough.
      Just a few rhythms? No new content? No customisation? No editing?
    </p>
    <p className="mt-6 text-xl leading-relaxed tracking-wider">
      All these apps are really good in fact. And this is just one more. Maybe
      better, maybe not. What&rsquo;s sure is that it&rsquo;s not perfect. The performance
      could (and hopefully eventually will) be improved. The sound samples could
      be more authentic. Plenty of things could be added or bettered. Feel free
      to provide your feedback. I accept it all.
    </p>
    {/* <p className="mt-6 text-xl leading-relaxed tracking-wider">
      (more about GroovyPlayer project)
    </p> */}
    <h2 className="text-graye text-3xl mt-24">
      It feels like this story miss the...
    </h2>
    <p className="mt-6 text-xl leading-relaxed tracking-wider">
      People. It&rsquo;s always better to play with people, together. To let your
      tones speak, your slaps scream, your bases rumble. If for any reason at
      any moment you can&rsquo;t play with other people and you still want to play
      djembe or dundun...
    </p>
    <h3 className="text-greeny text-5xl mt-6 font-bold">
      Be my guest and enjoy the app.
    </h3>
  </main>
);

export default StoryPage;
