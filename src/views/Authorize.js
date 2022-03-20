import { useSearchParams } from "react-router-dom";

const Authorize = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams?.get("code");
  console.log(code);

  return <div />;
};

export { Authorize };
