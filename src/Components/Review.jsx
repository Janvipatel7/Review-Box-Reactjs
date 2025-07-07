import React, { useRef, useState } from 'react';

const Review = () => {
    const [input, setInput] = useState({
        name: '', message: '', date: '', rate: ''
    });

    const [errors, setErrors] = useState({});
    const formRef = useRef(null);
    const [allData, setAllData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: "" });
    };

    const handleUpdate = (idx)=>{
        const editObj = allData[idx];
        setInput({
            name: editObj.name, message: editObj.message, date: editObj.date, rate: editObj.rate
        })
        setEditIndex(idx);
        setIsUpdate(true);
    }

    const handleDelete=(idx)=>{
        const afterArr = allData.filter((data, index)=>{
            return idx != index;
        })

        setAllData(afterArr);
        setInput({
                name: "", message: "", date: "", rate: "",
            });
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let reviewError = {};

        if (input.name.trim() === "") {
            reviewError.name = "Enter Valid Name!";
        }
        if (input.message.trim() === "") {
            reviewError.message = "Enter Valid Review!";
        }
        if (input.date.trim() === "") {
            reviewError.date = "Select Valid Date!";
        }
        if (input.rate.trim() === "") {
            reviewError.rate = "Select Rating!";
        }

        setErrors(reviewError);

        if (Object.keys(reviewError).length === 0) {
            if(isUpdate){
                const updatedArr = [...allData];
                updatedArr[editIndex] = input;
                setAllData(updatedArr)
                setIsUpdate(false);

            }else{
                setAllData([...allData, input]);
            }
            setInput({
                name: "", message: "", date: "", rate: "",
            });
        }

    
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className={`container mx-auto my-5 flex gap-7 bg-white shadow-xl rounded-xl max-w-5xl p-5`}>
                <div className='w-6/12'>
                    <form ref={formRef} onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-lg shadow-xl rounded-xl p-6 w-full h-full ">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                            <input type="text" value={input.name} onChange={handleChange} id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Your Name" />
                            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                            <textarea id="message" value={input.message} onChange={handleChange} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Leave a comment..." />
                            {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                        </div>

                        <div className='grid gap-6 mb-6 md:grid-cols-2'>
                            <div>
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                                <input type="date" id="date" value={input.date} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                                {errors.date && <p className="mt-2 text-sm text-red-600">{errors.date}</p>}
                            </div>

                            <div>
                                <label htmlFor="rate" className="block mb-2 text-sm font-medium text-gray-900">Rate</label>
                                <select id="rate" value={input.rate} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                    <option value="">----Select Rate----</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value="5">5</option>
                                </select>
                                {errors.rate && <p className="mt-2 text-sm text-red-600">{errors.rate}</p>}
                            </div>
                        </div>

                        <div className='mt-5'>
                            <button type="submit" className="text-white bg-[#b4857d] hover:bg-white hover:text-[#b4857d] transition-all duration-300 ease-in-out border border-[#b4857d] font-medium rounded-lg text-1xl w-full pt-2 pb-2 text-center">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-6/12">
                    <div className='h-[425px] overflow-y-auto scrollbar-width '>
                        <div className=''>
                            {allData.map((review, index) => (
                                <div key={index} className = {`${index % 2 != 0 ? "bg-white `":"bg-[#b4857d]"} p-5 w-full mb-3 rounded-xl shadow-lg  transition-all duration-300`}>
                                    <div className="flex items-center mb-4">
                                        <div>
                                            <div className={`${index % 2 == 0 ? "text-white font-semibold text-[25px]" : " font-semibold text-dark text-[25px]"}`} >
                                                {review.name}
                                            </div>
                                        </div>
                                    </div>

                                    <p className={`${index % 2 == 0 ? "text-white font-semibold text-[18px]":
                                        " font-semibold text-black text-[18px]"}`}>
                                        {review.message}
                                    </p>


                                    <div className={`${index % 2 == 0 ? "text-white font-semibold text-[12px]" : "text-black font-semibold text-[12px]"}`}>{review.date}</div>
                                    <div className="text-yellow-500 text-base mb-4">
                                        {"⭐".repeat(Number(review.rate))}
                                    </div>


                                    <div className="flex gap-5 justify-end">
                                        <button className="text-2xl text-dark font-medium rounded-lg  transition-all duration-300" onClick={()=>{
                                            handleUpdate(index);
                                        }}>
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button className="text-2xl text-dark font-medium rounded-lg  transition-all duration-300" onClick={()=>{
                                            handleDelete(index);
                                        }}>
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
