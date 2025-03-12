import AuthLayout from "@/components/layouts/AuthLayout";
import Activation from "@/components/views/Auth/Activation";
import authServices from "@/services/auth.service";

interface PropTypes {
  status: "success" | "failed";
}

const ActivationPage = (props: PropTypes) => {
  return (
    <AuthLayout title="Temutix | Activation">
      <Activation {...props} />
    </AuthLayout>
  );
};

export async function getServerSideProps(context: { query: { code: string } }) {
  console.log(context.query.code, "tes");
  try {
    const result = await authServices.activation({ code: context.query.code });
    console.log(result.data.data, "tessss");
    if (result.data.data) {
      return {
        props: {
          status: "success",
        },
      };
    } else {
      return {
        props: {
          status: "failed",
        },
      };
    }
  } catch (error) {
    return {
      props: {
        status: "success",
      },
    };
  }
}
export default ActivationPage;
