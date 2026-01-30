import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src={
            status === "success"
              ? "/images/illustration/success.svg"
              : "/images/illustration/pending.svg"
          }
          alt="success"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-primary">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-xl font-bold text-black">
          {status === "success"
            ? "Your account has been activated!"
            : "Your account has not been activated yet. Please check your email for activation."}
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

export default Activation;
