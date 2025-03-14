import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Login = () => {
  const {
    isVisible,
    handleVisibilityPassword,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();
  console.log(errors);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row lg:gap-20">
      <div className="hidden w-full flex-col items-center justify-center gap-10 md:flex lg:w-1/3">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          className="w-1/3"
          width={100}
          height={100}
        />
        <Image
          src="/images/illustration/login.svg"
          alt="logo"
          className="w-full"
          width={1024}
          height={1024}
        />
      </div>
      <div>
        <Card>
          <CardBody className="gap-4 p-8">
            <h2 className="text-xl font-bold text-danger">Login</h2>
            {errors.root && (
              <p className="font medium mb-2 text-danger">
                {errors?.root?.message}
              </p>
            )}
            <form
              className={cn(
                "flex w-80 flex-col gap-2",
                Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
              )}
              onSubmit={handleSubmit(handleLogin)}
            >
              <Controller
                name="identifier"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Email or Username"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.identifier !== undefined} // if errors identifier, call it isInvalid
                    errorMessage={errors.identifier?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={!isVisible ? "text" : "password"}
                    label="Password"
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        type="button"
                        className="focus:outline-none"
                        onClick={() => handleVisibilityPassword()}
                      >
                        {isVisible ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    }
                    isInvalid={errors.password !== undefined} // if errors password, call it isInvalid
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Button color="danger" size="lg" type="submit">
                {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
              </Button>
            </form>
            <p className="mb-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-danger hover:font-bold hover:underline"
              >
                Register Here
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
