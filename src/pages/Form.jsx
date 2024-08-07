import { useForm } from "react-hook-form"

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();


    const onSubmit = async (data, e) => {
        try {
            const response = await fetch('http://localhost:3500/contact-us', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
                credentials: 'include'
            });
            if (response.error) {
                console.log(response.error)
            }
            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.error('Error:', error);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
        e.target.reset(); // Reset the form fields
    }

    return (
        <div className='w-[100%] md:w-[50%] mt-6 flex items-center justify-center p-6'>
            <form
                action="#"
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                className="w-[70%] max-w-lg"
            >
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="mb-2">Name:</label>
                    {errors.username && <div>{errors.username.message}</div>}
                    <input
                        type="text"
                        id="name"
                        name="name"
                        {...register("name", {
                            required: "Name is required",
                        })}
                        placeholder='Your name...'
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="mb-2">Email:</label>
                    {errors.email && <div>{errors.email.message}</div>}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        {...register("email", {
                            required: "Email is required",
                            validate: (value) => {

                                if (!value.includes("@")) {
                                    return "Email must include @";
                                }
                                return true;
                            }
                        })}
                        placeholder='Your email address...'
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="message" className="mb-2">Message:</label>
                    {errors.message && <div>{errors.message.message}</div>}
                    <textarea
                        id="message"
                        type="text"
                        name="message"
                        {...register("message", {
                            required: "Input your Message",
                        })}
                        placeholder='Your message...'
                        rows="4"
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    {isSubmitting ? "SUBMITTING.." : "SUBMIT"}
                </button>
            </form>
        </div>
    )
}

export default Form