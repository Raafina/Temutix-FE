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
  console.log(errors);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row lg:gap-20">
      <div className="w-full flex-col items-center justify-center gap-10 hidden md:flex lg:w-1/3">
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
          <CardBody className="p-8">
            <h2 className="text-xl font-bold text-danger">Create Account</h2>
            <p className="mb-4 text-sm">
              Have an account?
              <Link href="/auth/login" className="text-danger">
                Login
              </Link>
              {errors.root && (
                <p className="font medium mb-2 text-danger">
                  {errors?.root?.message}
                </p>
              )}
            </p>
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
              <Button color="danger" size="lg" type="submit">
                {isPendingRegister ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;
