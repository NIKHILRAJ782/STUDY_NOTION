import React from "react";
import { Link } from "react-router-dom";

const Issue = () => {
    return(
        <div className="bg-richblack-500 text-white w-40 px-2 py-1 rounded-l-2xl rounded-t-2xl hover:text-yellow-50 hover:bg-richblack-600 hover:scale-110 hover:shadow-none transition-all duration-200">
            <Link to="/contact">
                <button>
                🤔 Facing a Issue?
                </button>
            </Link>
        </div>
    )
}

export default Issue;