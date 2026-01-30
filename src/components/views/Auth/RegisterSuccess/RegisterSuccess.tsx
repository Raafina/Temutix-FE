import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@heroui/react";
const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/illustration/email-send.svg"
          alt="success"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary">
          Create Account Success
        </h1>
        <p className="text-xl font-bold text-black">
          Check your email for account activation.
        </p>
        <Button
          className="mt-4 w-fit"
          variant="solid"
          color="primary"
          onPress={() => {
            router.push("/");
          }}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
