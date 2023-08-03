import { FC, FormEvent, useState } from "react";
import { Button, Input, useAuth } from ".";
import Image from "next/image";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    logIn(email, password);
  };

  return (
    <form className="grid grid-flow-row gap-4 md:gap-6" onSubmit={handleSubmit}>
      <Image
        className="rounded-lg"
        src="/god2.avif"
        width={480}
        height={480}
        alt="The Doors of Durin"
      />
      <h2 className="my-4 md:my-8 w-full text-center text-neutral-400 text-xl tracking-wider italic">
        Ayè si la bila yo djembéfola luye,
        <br />
        temi wolu ma wèndyèlon
      </h2>
      <div className="grid grid-flow-row gap-2">
        <Input
          name="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Who are you?"
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="What's your secret?"
        />
        <div className="flex w-full h-fit justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "..." : "I vow to add many rhythms"}
          </Button>
        </div>
      </div>
    </form>
  );
};
