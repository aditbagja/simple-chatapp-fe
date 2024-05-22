import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const initialValues = {
  username: "",
  chatRoom: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username harus diisi"),
  chatRoom: Yup.string().required("Chat Room harus diisi"),
});

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sessionStorage.setItem("username", values.username);

      setTimeout(() => {
        navigate(`/chat/${values.chatRoom}`);
      }, 1000);
    },
  });

  return (
    <section className="w-full h-full py-32 lg:py-72">
      <div className="container mx-auto">
        <div className="px-5 xl:px-0">
          <div className="bg-slate-100 p-5 rounded-lg xl:w-1/2 xl:mx-auto">
            <h1 className="font-bold text-5xl">Login</h1>
            <div className="my-5">
              <p className="text-gray-500">
                Silahkan isi Username dan Chat Room dibawah ini
              </p>
              <p className="text-red-500">* = required</p>
            </div>
            <form
              className="flex flex-col gap-5"
              onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="username">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Username"
                  className="border border-gray-400 py-1 px-3 rounded-md"
                />
                <p className="text-red-500 text-sm">
                  {formik.touched.username && formik.errors.username}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="chatRoom">
                  Chat Room <span className="text-red-500">*</span>
                </label>
                <input
                  id="chatRoom"
                  name="chatRoom"
                  value={formik.values.chatRoom}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Chat Room"
                  className="border border-gray-400 py-1 px-3 rounded-md"
                />
                <p className="text-red-500 text-sm">
                  {formik.touched.chatRoom && formik.errors.chatRoom}
                </p>
              </div>

              <button
                className="bg-sky-500 p-1 rounded-md text-white font-bold border hover:bg-white hover:text-sky-500 ease-in-out duration-300"
                type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
