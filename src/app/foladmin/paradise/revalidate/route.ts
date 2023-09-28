import { revalidatePath } from "next/cache";

export const POST = async (req: Request) => {
  const { path, secret } = await req.json();

  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response("Unauthorized", { status: 403 });
  }

  revalidatePath(`/${path}`);
  console.log("Path revalidated:", path);
  return new Response("path revalidated", { status: 200 });
};
