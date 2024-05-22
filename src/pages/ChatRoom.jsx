import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const initialValues = {
  message: "",
};

const validationSchema = Yup.object().shape({
  message: Yup.string().required("Pesan tidak boleh kosong"),
});

const ChatRoom = () => {
  const params = useParams();
  const username = sessionStorage.getItem("username");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <section className="w-full h-full py-32 lg:py-52">
      <div className="container mx-auto">
        <div className="px-5 xl:px-0">
          <div className="xl:w-1/2 xl:mx-auto">
            <h1 className="font-bold text-2xl">Halo, {username}!</h1>
            <div className="bg-slate-200 mt-5">
              <div className="bg-sky-500 rounded-t-md p-2 text-white">
                <p className="font-bold text-lg">Chat Room {params.chatRoom}</p>
              </div>
              <div className="min-h-[30rem] p-2 flex flex-col justify-between">
                <div>
                  {/* Receiver Balloon Chat */}
                  <div className="flex flex-col gap-1 w-3/4 md:w-1/2">
                    <p className="text-sm">Username</p>
                    <div className="bg-gray-500 p-3 overflow-hidden break-words rounded-xl text-white">
                      <p>
                        Isi Chat asdasdsadsadsadasdsaddadsadadasdasdasdasdas
                      </p>
                    </div>
                    <p className="text-sm text-right">10:10</p>
                  </div>

                  {/* Sender Balloon Chat */}
                  <div className="flex flex-col ml-auto gap-1 w-3/4 md:w-1/2">
                    <div className="bg-sky-500 p-3 overflow-hidden break-words rounded-xl text-white">
                      <p>
                        Isi Chat asdasdsadsadsadasdsaddadsadadasdasdasdasdas
                      </p>
                    </div>
                    <p className="text-sm text-left">10:11</p>
                  </div>
                </div>

                <form className="flex gap-3" onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    placeholder="Ketik pesan.."
                    className="p-2 w-full border border-gray-300 rounded-md"
                  />

                  <button
                    type="submit"
                    className="bg-sky-500 p-2 rounded-md text-white font-bold">
                    Kirim
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatRoom;
