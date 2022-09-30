import { Watch } from "react-loader-spinner";
import Layout from "@components/layout";

const NotFound = () => {
  return (
    <Layout title="404 | Bashaway">
      <div className="h-screen w-screen flex flex-col justify-center items-center relative z-50">
        <Watch
          height="110"
          width="110"
          radius="48"
          color="#0070F3"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
        <h1 className="text-white text-6xl font-bold mt-10">404</h1>
      </div>
    </Layout>
  );
};

export default NotFound;
