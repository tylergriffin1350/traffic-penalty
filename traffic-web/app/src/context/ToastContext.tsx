import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
      />
    </div>
  );
};

export default ToasterContext;