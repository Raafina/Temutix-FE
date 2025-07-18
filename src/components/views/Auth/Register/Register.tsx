import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();
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
            <h2 className="text-xl font-bold text-secondary">Create Account</h2>
            {errors.root && (
              <p className="font medium mb-2 text-red-500">
                {errors?.root?.message}
              </p>
            )}
            <form
              className={cn(
                "flex w-80 flex-col gap-2",
                Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
              )}
              onSubmit={handleSubmit(handleRegister)}
            >
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Fullname"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.fullName !== undefined} // if errors fullname, call it isInvalid
                    errorMessage={errors.fullName?.message}
                  />
                )}
              />
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Username"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.username !== undefined} // if errors username, call it isInvalid
                    errorMessage={errors.username?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Email"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.email !== undefined} // if errors email, call it isInvalid
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={visiblePassword.password ? "text" : "password"}
                    label="Password"
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        type="button"
                        className="focus:outline-none"
                        onClick={() => handleVisiblePassword("password")}
                      >
                        {visiblePassword.password ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    }
                    isInvalid={errors.password !== undefined} // if errors password, call it isInvalid
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={visiblePassword.confirmPassword ? "text" : "password"}
                    label="Password Confirmation"
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        type="button"
                        className="focus:outline-none"
                        onClick={() => handleVisiblePassword("confirmPassword")}
                      >
                        {visiblePassword.confirmPassword ? (
                          <FaEye />
                        ) : (
                          <FaEyeSlash />
                        )}
                      </button>
                    }
                    isInvalid={errors.confirmPassword !== undefined} // if errors confirmPassword, call it isInvalid
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />
              <Button color="secondary" size="lg" type="submit">
                {isPendingRegister ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  "Register"
                )}
              </Button>
              <p className="mb-4 text-center text-sm">
                Alrady have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-secondary hover:font-bold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;
