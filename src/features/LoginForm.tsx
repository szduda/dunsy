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
        src="/doors.webp"
        width={960}
        height={480}
        alt="The Doors of Durin"
      />
      <h2 className="my-4 md:my-12 w-full text-center text-stone-300 text-2xl tracking-wider italic">
        Ennyn Durin Aran Moria.
        <br />
        Pedo Mellon a Minno.
      </h2>
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
    </form>
  );
};
