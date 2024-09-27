import SalesPageLayout from "@/components/layouts/SalesPageLayout";

const page = ({ params }: { params: { saleName: string } }) => {
  const { saleName } = params;

  return <SalesPageLayout saleName={saleName} />;
};
export default page;
