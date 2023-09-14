import { FC, FormEvent, useState } from "react";
import { Button, Input, useAuth } from ".";
import Image from "next/image";
import { cx } from "@/utils"

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { logIn } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await logIn(email, password);
    setError(!res);
    setLoading(false);
  };

  return (
    <form className="grid grid-flow-row gap-4 md:gap-6" onSubmit={handleSubmit}>
      <Image
        className="rounded-lg"
        src={error ? "/dictator.avif" : "/god2.avif"}
        width={480}
        height={480}
        alt="Dundunin The Guardian"
      />
      <h2
        className={cx([
          "my-4 md:mt-8 w-full text-center text-xl tracking-wider italic h-[84px]",
          error ? "text-redy-dark" : "text-graye",
        ]
  )}
      >
        {error ? (
          <>
            {!email && password && "Dundunfola needa name."}
            {email && !password && "Mi a know dundunfola has a secret."}
            {email && password && "Yar a quick learner, mi a say."}
            {!email && !password && (
              <>
                Needa key to enta ina di garage.
                <br />
                Ya beda geta key.
                <br />
                Mi a wait. Ya know di way.
              </>
            )}
          </>
        ) : (
          <>
            Ayè si la bila yo djembéfola luye,
            <br />
            temi wolu ma wèndyèlon
          </>
        )}
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
