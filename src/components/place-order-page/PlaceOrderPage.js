import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrderPage.css";
import { CheckBox } from "@mui/icons-material";

function OrderDetails({ selectedAddress }) {
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    // Implement logic to place order
    // console.log('Order confirmed:', product);
    // Redirect to products page
    navigate("/products");
  };

  return (
    <>
    <div className="upper-sec ">
    <i class="fa-solid fa-circle-check"></i><span>items</span> 
    <div className="1"><hr style={{width:"400px"}}/></div>
    <span style={{backgroundColor:"red",height:"20px",width:"20px",borderRadius:"50%",margin:"0px"}}>2</span>
    <i class="fa-solid fa-circle-check"></i><span>items</span> 
    <div className="1"><hr style={{width:"400px"}}/></div>
    <i class="fa-solid fa-circle-check"></i><span>items</span>
    </div>
      <div className="order-details-container">
        <div className="L-section">
          <p>
            <b>Name:</b>
          </p>
          <p>
            <b>Quantity:</b>
          </p>
          <p>
            <b>Category:</b>
          </p>
          <p>
            <b>Description:</b>Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Magni consectetur doloremque animi incidunt
            reprehenderit tempora inventore, quae blanditiis architecto?
            Quisquam repellendus numquam accusamus et iste. Praesentium ut
            incidunt tempora omnis.
          </p>
          <p>
            <b>Total Price:</b> ₹PRICE
          </p>
        </div>
        <div className="R-section">
          <h2>Address Details</h2>
          <p>Apt. 419 3469 Ronnie Knoll, Bayerborough, WY 03399-8652</p>
        </div>
      </div>
      <div className="place-order-buttons">
        <button style={{backgroundColor:"white", color:"black"}}>BACK</button>
        <button onClick={handleConfirmOrder}>PLACE ORDER</button>
      </div>
    </>
  );
}

export default OrderDetails;
